import React, { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import CouponSection from "../../Components/CouponSection";
import { getGuestCart, updateGuestCart } from "../../utils/cart_model";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
// import Swal from "sweetalert2"; // if you use SweetAlert2

function CartDetail() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countCart, setCountCart] = useState(0);

    // Coupon states
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [couponMessageStyle, setCouponMessageStyle] = useState("");
    const [isApplying, setIsApplying] = useState(false);
    const [appliedCouponCode, setAppliedCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);

    // ---------------------------
    // Fetch Cart Items (Parent)
    // ---------------------------
    const fetchCartItems = async () => {
        const UserID = localStorage.getItem("userId");
        if (!UserID) {
            // Guest cart scenario
            const guestCart = getGuestCart();
            setCartItems(guestCart);
            setCountCart(guestCart.length);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/cart-items`,
                { params: { user_id: UserID } }
            );
            const data = response.data;

            setCartItems(data.CartList);
            setCountCart(data.countCart);

            // If any item has coupon_code, set it
            const appliedCoupon = data.CartList.find(
                (item) => item.coupon_code
            );
            if (appliedCoupon) {
                setAppliedCouponCode(appliedCoupon.coupon_code);
                setCouponDiscount(
                    parseFloat(appliedCoupon.cou_discount_value) || 0
                );
            } else {
                setAppliedCouponCode("");
                setCouponDiscount(0);
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            alert("Failed to fetch cart data.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    // ---------------------------
    // Calculate Totals
    // ---------------------------
    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => {
                const price = item.sale_price || item.unit_price;
                return total + price * item.quantity;
            }, 0)
            .toFixed(2);
    };

    const AddoncalculateTotal = () => {
        return cartItems
            .reduce((sum, item) => sum + (item.total_addon_price || 0), 0)
            .toFixed(2);
    };

    const GstcalculateTotal = () => {
        const totalGst = cartItems.reduce((gstSum, item) => {
            const price = item.sale_price || item.unit_price;
            const itemTotal = price * item.quantity;
            const gstPercentage = item.gst || 0;
            return gstSum + (itemTotal * gstPercentage) / 100;
        }, 0);
        return Math.round(totalGst);
    };

    const deliveryCharge = 0.0;
    const ConvenienceCharge = 0.0;
    const totalGst = parseFloat(GstcalculateTotal());
    const itemTotal = parseFloat(calculateTotal());
    const addonTotal = parseFloat(AddoncalculateTotal());
    const totalAmount = (
        itemTotal +
        addonTotal +
        totalGst +
        deliveryCharge +
        ConvenienceCharge -
        couponDiscount
    ).toFixed(2);

    // ---------------------------
    // Quantity Update Logic
    // ---------------------------

    // Decrease item quantity by 1
    const handleDecrease = async (cartItemId) => {
        const item = cartItems.find((i) => i.cart_item_id === cartItemId);
        if (!item) return;

        // If quantity is 1 -> remove item
        if (item.quantity === 1) {
            handleRemoveItem(cartItemId);
            return;
        }

        // Check if user is logged in
        const userId = localStorage.getItem("userId");
        if (!userId) {
            // Guest user => localStorage update
            const guestCart = getGuestCart();
            const updatedCart = guestCart.map((product) => {
                if (product.cart_item_id === cartItemId) {
                    return { ...product, quantity: product.quantity - 1 };
                }
                return product;
            });
            updateGuestCart(updatedCart);
            setCartItems(updatedCart);
            setCountCart(updatedCart.length);
            return;
        }

        // If logged in => call your API
        try {
            const response = await updateQuantityInDatabase(
                cartItemId,
                "decrease"
            );
            if (response.cartItem) {
                setCartItems((prev) =>
                    prev.map((it) =>
                        it.cart_item_id === cartItemId
                            ? { ...it, quantity: response.cartItem.quantity }
                            : it
                    )
                );
                await fetchCartItems(); // to sync coupon discount, etc.
            }
        } catch (error) {
            console.error("Error decreasing quantity:", error.message);
        }
    };

    // Increase item quantity by 1
    const handleIncrease = async (cartItemId) => {
        // Check if user is logged in
        const userId = localStorage.getItem("userId");
        if (!userId) {
            // Guest user => localStorage update
            const guestCart = getGuestCart();
            const updatedCart = guestCart.map((product) => {
                if (product.cart_item_id === cartItemId) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            });
            updateGuestCart(updatedCart);
            setCartItems(updatedCart);
            setCountCart(updatedCart.length);
            return;
        }

        // If logged in => call your API
        try {
            const response = await updateQuantityInDatabase(
                cartItemId,
                "increase"
            );
            if (response.cartItem) {
                setCartItems((prev) =>
                    prev.map((it) =>
                        it.cart_item_id === cartItemId
                            ? { ...it, quantity: response.cartItem.quantity }
                            : it
                    )
                );
                await fetchCartItems();
            }
        } catch (error) {
            console.error("Error increasing quantity:", error.message);
        }
    };

    // Helper for calling the DB API
    const updateQuantityInDatabase = async (cartItemId, action, newQty) => {
        try {
            const payload =
                action === "set"
                    ? { action: "set", quantity: newQty }
                    : { action }; // "increase" or "decrease"

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/update-quantity/${cartItemId}`,
                payload
            );
            return response.data;
        } catch (error) {
            console.error("Error updating quantity:", error.response || error);
            throw error;
        }
    };

    // For direct input changes (manually setting a quantity)
    const handleQuantityChange = async (cartItemId, value) => {
        const newQuantity = parseInt(value, 10);
        if (isNaN(newQuantity) || newQuantity < 1) return;

        const userId = localStorage.getItem("userId");
        if (!userId) {
            // guest cart
            const guestCart = getGuestCart();
            const updatedCart = guestCart.map((item) =>
                item.cart_item_id === cartItemId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
            updateGuestCart(updatedCart);
            setCartItems(updatedCart);
            setCountCart(updatedCart.length);
            return;
        }

        // Logged in
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/update-quantity/${cartItemId}`,
                { action: "set", quantity: newQuantity }
            );
            if (response.data.cartItem) {
                setCartItems((prev) =>
                    prev.map((it) =>
                        it.cart_item_id === cartItemId
                            ? {
                                  ...it,
                                  quantity: response.data.cartItem.quantity,
                              }
                            : it
                    )
                );
                await fetchCartItems();
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    // Remove item
    const handleRemoveItem = async (cart_item_id) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            // guest cart remove
            const guestCart = getGuestCart();
            const updatedCart = guestCart.filter(
                (item) => item.cart_item_id !== cart_item_id
            );
            updateGuestCart(updatedCart);
            setCartItems(updatedCart);
            setCountCart(updatedCart.length);
            return;
        }

        // Logged in
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/remove-item`,
                { cart_item_id }
            );
            if (response.data.success) {
                // remove from state
                setCartItems((prev) =>
                    prev.filter((item) => item.cart_item_id !== cart_item_id)
                );
                await fetchCartItems();
            } else {
                alert(
                    response.data.message ||
                        "Failed to remove item. Please try again."
                );
            }
        } catch (error) {
            console.error("Error removing item:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // ---------------------------
    // Coupon Logic
    // ---------------------------
    const handleCouponChange = (e) => {
        setCouponCode(e.target.value);
    };

    const handleApplyCoupon = async () => {
        setIsApplying(true);
        if (!couponCode) {
            setCouponMessage("Please enter a coupon code.");
            setCouponMessageStyle("text-red-600 bg-red-100");
            setIsApplying(false);
            return;
        }
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setCouponMessage(
                "User is not logged in. Please log in to apply coupon."
            );
            setCouponMessageStyle("text-red-600 bg-red-100");
            setIsApplying(false);
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/apply-coupon`,
                {
                    coupon_code: couponCode,
                    user_id: userId,
                }
            );
            if (response.data.success) {
                setCouponMessage(response.data.message);
                setCouponMessageStyle("text-green-600 bg-green-100");
                setAppliedCouponCode(couponCode);
                await fetchCartItems(); // refresh discount
            } else if (response.data.message) {
                setCouponMessage(response.data.message);
                setCouponMessageStyle("text-red-600 bg-red-100");
            }
        } catch (error) {
            console.error("Error applying coupon:", error);
            setCouponMessage("Error applying coupon. Please try again.");
            setCouponMessageStyle("text-red-600 bg-red-100");
        } finally {
            setIsApplying(false);
        }
    };

    const handleRemoveCoupon = async () => {
        const userId = localStorage.getItem("userId");
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/remove-coupon`,
                {
                    user_id: userId,
                }
            );
            if (response.data.success) {
                setAppliedCouponCode("");
                setCouponCode("");
                setCouponDiscount(0);
                setCouponMessage("Coupon removed successfully");
                setCouponMessageStyle("text-green-600 bg-green-100");
                await fetchCartItems();
            }
        } catch (error) {
            console.error("Error removing coupon:", error);
            setCouponMessage("Failed to remove coupon");
            setCouponMessageStyle("text-red-600 bg-red-100");
        }
    };

    // Callback to refresh cart after a coupon is applied from child
    const handleChildCouponApplied = async () => {
        // Re-fetch cart items from parent
        await fetchCartItems();
    };

    // Show coupon if applied
    const CouponDisplay = ({ couponCode, onRemove }) => {
        if (!couponCode) return null;
        return (
            <div className="flex items-center justify-between p-2 mb-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center">
                    <span className="text-blue-600 mr-2">
                        <i className="fa-solid fa-ticket"></i>
                    </span>
                    <span className="text-sm font-medium text-blue-800">
                        Applied: {couponCode}
                    </span>
                </div>
                <button
                    onClick={onRemove}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    aria-label="Remove coupon"
                >
                    <i className="fa-solid fa-times"></i>
                </button>
            </div>
        );
    };

    // Checkout
    const handleOrderNowClick = () => {
        const UserID = localStorage.getItem("userId");
        if (!UserID) {
            alert("You must login to proceed.");
            window.location.href = "/";
            return;
        }
        router.get("/check-out");
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-screen">
                    {/* Simple Spinner */}
                    <svg
                        className="animate-spin h-12 w-12 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                </div>
            </MainLayout>
        );
    }

    // Format price
    const formatPrice = (price) => `₹${parseFloat(price).toFixed(2)}`;

    // Group by product if needed
    const groupedItems = cartItems.reduce((acc, item) => {
        const key = item.product_id;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    return (
        <MainLayout>
            {/* Banner Section */}
            <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] bg-cover bg-center">
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
                            Shop Cart
                        </h2>
                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb bg-primary rounded-[10px] inline-block py-[7px] px-3.5 m-0">
                                <li className="breadcrumb-item inline-block text-white">
                                    <Link href="/" className="text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item inline-block text-white active">
                                    Shop Cart
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Cart Section */}
            <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[100px] sm:pb-10 pb-5 bg-white">
                <div className="container">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Cart Content */}
                        <div className="lg:w-2/3 w-full">
                            <div className="shadow-lg rounded-md border overflow-hidden">
                                {/* Header */}
                                <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                                    <h2 className="font-semibold text-lg text-gray-800">
                                        Shopping Cart ({countCart} items)
                                    </h2>
                                </div>

                                {/* Cart Items */}
                                <div className="p-6 space-y-6">
                                    {Object.entries(groupedItems).map(
                                        ([productId, items]) => (
                                            <div
                                                key={productId}
                                                className="space-y-6"
                                            >
                                                {items.map((item) => (
                                                    <div
                                                        key={item.cart_item_id}
                                                        className="flex flex-row gap-4 p-4 border-b last:border-0 hover:bg-gray-50 transition-colors rounded-md"
                                                    >
                                                        {/* Image on left */}
                                                        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                                                            <img
                                                                src={`https://console.pizzaportindia.com/${item.product_image_url}`}
                                                                alt={
                                                                    item.product_name
                                                                }
                                                                className="w-full h-full object-cover rounded-md shadow-sm"
                                                            />
                                                        </div>

                                                        {/* Details on the right */}
                                                        <div className="flex-1 space-y-3">
                                                            <div className="flex justify-between">
                                                                <div>
                                                                    <h3 className="font-semibold text-lg text-gray-800">
                                                                        {
                                                                            item.product_name
                                                                        }
                                                                    </h3>
                                                                    {/* Description */}
                                                                    {item.product_description && (
                                                                        <p className="text-sm text-gray-600 mt-1">
                                                                            {
                                                                                item.product_description
                                                                            }
                                                                        </p>
                                                                    )}
                                                                    {/* Variation */}
                                                                    {item.variation_name && (
                                                                        <span className="text-xs text-gray-500">
                                                                            Size:{" "}
                                                                            {
                                                                                item.variation_name
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-lg font-semibold text-primary">
                                                                        {item.sale_price &&
                                                                        item.sale_price <
                                                                            item.unit_price ? (
                                                                            <>
                                                                                <span>
                                                                                    {formatPrice(
                                                                                        item.sale_price *
                                                                                            item.quantity
                                                                                    )}
                                                                                </span>
                                                                                <del className="text-sm text-gray-400 ml-2">
                                                                                    {formatPrice(
                                                                                        item.unit_price *
                                                                                            item.quantity
                                                                                    )}
                                                                                </del>
                                                                            </>
                                                                        ) : (
                                                                            <span>
                                                                                {formatPrice(
                                                                                    item.unit_price *
                                                                                        item.quantity
                                                                                )}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Add-ons */}
                                                            {item.addon_details &&
                                                                item
                                                                    .addon_details
                                                                    .length >
                                                                    0 && (
                                                                    <div className="bg-gray-50 p-3 rounded-md">
                                                                        <h4 className="text-xs font-medium text-blue-600 mb-2">
                                                                            Customizations
                                                                        </h4>
                                                                        {item.addon_details.map(
                                                                            (
                                                                                addon,
                                                                                aIdx
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        aIdx
                                                                                    }
                                                                                    className="flex justify-between text-xs text-gray-600"
                                                                                >
                                                                                    <span>
                                                                                        {
                                                                                            addon.name
                                                                                        }
                                                                                    </span>
                                                                                    <span className="text-primary">
                                                                                        {formatPrice(
                                                                                            addon.price
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                        {item.total_addon_price >
                                                                            0 && (
                                                                            <p className="text-xs text-primary mt-1">
                                                                                Total
                                                                                Add-on
                                                                                Price:{" "}
                                                                                {formatPrice(
                                                                                    item.total_addon_price
                                                                                )}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}

                                                            {/* Quantity Controls */}
                                                            <div className="flex justify-between items-center">
                                                                <div className="flex items-center space-x-1">
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDecrease(
                                                                                item.cart_item_id
                                                                            )
                                                                        }
                                                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        value={
                                                                            item.quantity
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleQuantityChange(
                                                                                item.cart_item_id,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="w-12 text-center border border-gray-300 rounded-md"
                                                                    />
                                                                    <button
                                                                        onClick={() =>
                                                                            handleIncrease(
                                                                                item.cart_item_id
                                                                            )
                                                                        }
                                                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                                <button
                                                                    onClick={() =>
                                                                        handleRemoveItem(
                                                                            item.cart_item_id
                                                                        )
                                                                    }
                                                                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                                                                >
                                                                    <i className="fa-solid fa-trash"></i>
                                                                    <span>
                                                                        Remove
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:w-1/3 w-full">
                            <div className="shadow-lg rounded-md border overflow-hidden sticky top-24">
                                {/* Header */}
                                <div className="px-6 py-4 border-b bg-gray-50">
                                    <h3 className="font-semibold text-lg text-gray-800">
                                        Order Summary
                                    </h3>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-6">
                                    {/* Coupon Section */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold">
                                            Apply Coupon
                                        </h3>
                                        <CouponSection
                                            appliedCoupon={appliedCouponCode}
                                            onCouponApplied={
                                                handleChildCouponApplied
                                            }
                                        />

                                        <CouponDisplay
                                            couponCode={appliedCouponCode}
                                            onRemove={handleRemoveCoupon}
                                        />
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Enter coupon code"
                                                value={couponCode}
                                                onChange={handleCouponChange}
                                                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                disabled={isApplying}
                                                className="btn btn-primary px-4 py-2 rounded-md"
                                            >
                                                {isApplying
                                                    ? "Applying..."
                                                    : "Apply"}
                                            </button>
                                        </div>
                                        {couponMessage && (
                                            <p
                                                className={`text-sm p-3 rounded-md ${couponMessageStyle}`}
                                            >
                                                {couponMessage}
                                            </p>
                                        )}
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span>Items Total</span>
                                            <span>
                                                {formatPrice(itemTotal)}
                                            </span>
                                        </div>
                                        {addonTotal > 0 && (
                                            <div className="flex justify-between">
                                                <span>Add-ons Total</span>
                                                <span>
                                                    {formatPrice(addonTotal)}
                                                </span>
                                            </div>
                                        )}
                                        {totalGst > 0 && (
                                            <div className="flex justify-between">
                                                <span>GST</span>
                                                <span>
                                                    {formatPrice(totalGst)}
                                                </span>
                                            </div>
                                        )}
                                        {couponDiscount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Coupon Discount</span>
                                                <span>
                                                    -{" "}
                                                    {formatPrice(
                                                        couponDiscount
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between font-semibold">
                                                <span>Total Amount</span>
                                                <span className="text-primary text-lg">
                                                    {formatPrice(totalAmount)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <button
                                        onClick={handleOrderNowClick}
                                        className="w-full btn btn-primary py-3 rounded-md text-center font-semibold"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Cart Section End */}
        </MainLayout>
    );
}

export default CartDetail;
