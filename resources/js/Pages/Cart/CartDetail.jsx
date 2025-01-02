import React, { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";

function CartDetail() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countCart, setCountCart] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [couponMessageStyle, setCouponMessageStyle] = useState("");
    const [isApplying, setIsApplying] = useState(false);

    const calculateTotal = () => {
        return cartItems
            .reduce((total, cartItem) => {
                const price = cartItem.sale_price || cartItem.unit_price;
                return total + price * cartItem.quantity;
            }, 0)
            .toFixed(2);
    };

    const AddoncalculateTotal = () => {
        return cartItems
            .reduce((AddonTotal, cartItem) => {
                const AddonPrice = cartItem.total_addon_price || 0;
                return AddonTotal + AddonPrice;
            }, 0)
            .toFixed(2);
    };

    const GstcalculateTotal = () => {
        const totalGst = cartItems.reduce((totalGst, cartItem) => {
            const price = cartItem.sale_price || cartItem.unit_price;
            const itemTotal = price * cartItem.quantity;
            const gstPercentage = cartItem.gst || 0;
            const itemGst = (itemTotal * gstPercentage) / 100;
            return totalGst + itemGst;
        }, 0);
        return Math.round(totalGst);
    };

    const CouponCalculateTotal = () => {
        return cartItems
            .reduce((CouponTotal, cartItem) => {
                const CouponPrice =
                    parseFloat(cartItem.cou_discount_value) || 0;
                return CouponTotal + CouponPrice;
            }, 0)
            .toFixed(2);
    };

    const deliveryCharge = 30.0;
    const ConvenienceCharge = 15.0;
    const totalGst = parseFloat(GstcalculateTotal());
    const CouponCodeAmount = parseFloat(CouponCalculateTotal());
    const itemTotal = parseFloat(calculateTotal());
    const addonTotal = parseFloat(AddoncalculateTotal());
    const totalAmount = (
        itemTotal +
        addonTotal +
        totalGst +
        deliveryCharge +
        ConvenienceCharge -
        CouponCodeAmount
    ).toFixed(2);

    const handleDecrease = async (id) => {
        try {
            const response = await updateQuantityInDatabase(id, "decrease");
            if (response.cartItem) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id
                            ? { ...item, quantity: response.cartItem.quantity }
                            : item
                    )
                );
                // Optionally, remove window.location.reload() for better UX
            }
        } catch (error) {
            console.error("Error decreasing quantity:", error.message);
        }
    };

    const handleIncrease = async (id) => {
        try {
            const response = await updateQuantityInDatabase(id, "increase");
            if (response.cartItem) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id
                            ? { ...item, quantity: response.cartItem.quantity }
                            : item
                    )
                );
                // Optionally, remove window.location.reload() for better UX
            }
        } catch (error) {
            console.error("Error increasing quantity:", error.message);
        }
    };

    const updateQuantityInDatabase = async (productId, action) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/update-quantity/${productId}`,
                { action }
            );
            return response.data;
        } catch (error) {
            console.error(
                "Error updating quantity:",
                error.response || error.message
            );
            throw error;
        }
    };

    const handleRemoveItem = async (cart_item_id) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/remove-item`,
                { cart_item_id }
            );
            if (response.data.success) {
                setCartItems((prevItems) =>
                    prevItems.filter(
                        (item) => item.cart_item_id !== cart_item_id
                    )
                );
            } else {
                alert(
                    response.data.message ||
                        "Failed to remove item. Please try again."
                );
            }
        } catch (error) {
            console.error("Error removing item:", error.message);
            alert("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            const UserID = localStorage.getItem("userId");
            if (!UserID) {
                alert(
                    "User is not logged in. Please log in to view your cart."
                );
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/cart-items`,
                    {
                        params: {
                            user_id: UserID,
                        },
                    }
                );

                setCartItems(response.data.CartList);
                setCountCart(response.data.countCart);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart items:", error.message);
                alert("Failed to fetch cart data.");
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    // Handle coupon input change
    const handleCouponChange = (event) => {
        setCouponCode(event.target.value);
    };

    // Handle apply coupon button click
    const handleApplyCoupon = async () => {
        setIsApplying(true);
        if (!couponCode) {
            setCouponMessage("Please enter a coupon code.");
            setCouponMessageStyle("text-red-600 bg-red-100");
            return;
        }

        const userId = localStorage.getItem("userId");

        if (!userId) {
            setCouponMessage(
                "User is not logged in. Please log in to apply coupon."
            );
            setCouponMessageStyle("text-red-600 bg-red-100");
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
            } else if (response.data.message) {
                setCouponMessage(response.data.message);
                setCouponMessageStyle("text-red-600 bg-red-100");
            }
            window.location.reload();
            // Optionally, remove window.location.reload() for better UX
        } catch (error) {
            console.error("Error applying coupon:", error);
            setCouponMessage(
                "An error occurred while applying the coupon. Please try again."
            );
            setCouponMessageStyle("text-red-600 bg-red-100");
        } finally {
            setIsApplying(false);
        }
    };

    // Handle quantity change via input
    const handleQuantityChange = async (cartId, value) => {
        const newQuantity = parseInt(value, 10);
        if (isNaN(newQuantity) || newQuantity < 1) {
            // Optionally, show an error message or reset to previous quantity
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/update-quantity/${cartId}`,
                { action: "set", quantity: newQuantity }
            );

            if (response.data.cartItem) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === cartId
                            ? {
                                  ...item,
                                  quantity: response.data.cartItem.quantity,
                              }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error("Error updating quantity:", error.message);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-screen">
                    {/* SVG Spinner */}
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

    return (
        <MainLayout>
            {/* <!-- Banner Section --> */}
            <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
                            Shop Cart
                        </h2>
                        {/* <!-- Breadcrumb Row --> */}
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal">
                                    <Link href="/" className="text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">
                                    Shop Cart
                                </li>
                            </ul>
                        </nav>
                        {/* <!-- Breadcrumb Row End --> */}
                    </div>
                </div>
            </section>
            {/* <!-- Banner End --> */}

            {/* <!-- Search Section --> */}
            <section
                className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[100px] sm:pb-10 pb-5 relative bg-white"
                style={{
                    border: "1px solid red",
                    display: cartItems.length === 0 ? "none" : "", // If no items in cart, hide the section
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="lg:w-2/3 w-full px-[15px]">
                            <div className="flex justify-between items-center">
                                <h5 className="lg:mb-[15px] mb-5">
                                    ({countCart})Item you have selected
                                </h5>
                            </div>

                            {cartItems.length > 0 ? (
                                cartItems.map((product) => {
                                    // Parse addon_ids if it's a string
                                    let addonIdArray = [];
                                    try {
                                        addonIdArray =
                                            typeof product.addon_ids ===
                                            "string"
                                                ? JSON.parse(product.addon_ids)
                                                : product.addon_ids;
                                    } catch (error) {
                                        console.error(
                                            "Error parsing addon_ids:",
                                            error
                                        );
                                        addonIdArray = [];
                                    }

                                    // Check if there's an actual discount:
                                    // (sale_price is defined && less than unit_price)
                                    const hasDiscount =
                                        product.sale_price &&
                                        parseFloat(product.sale_price) <
                                            parseFloat(product.unit_price);

                                    return (
                                        <div
                                            key={product.cart_id}
                                            className="dz-shop-card style-1 flex border border-[#0000001a] rounded-[10px] mb-5 overflow-hidden duration-500 hover:border-transparent hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] relative"
                                        >
                                            <div className="dz-media w-[100px] min-w-[100px]">
                                                <img
                                                    src={`https://console.pizzaportindia.com/${product.product_image_url}`}
                                                    className="h-full"
                                                    alt={product.product_name}
                                                />
                                            </div>

                                            <div className="dz-content sm:p-5 p-2 flex flex-col w-full">
                                                <div className="dz-head mb-4 flex items-center justify-between">
                                                    <h6 className="dz-name mb-0 flex items-center text-base">
                                                        <svg
                                                            className="mr-[10px]"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 18 18"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <rect
                                                                x="0.5"
                                                                y="0.5"
                                                                width="16"
                                                                height="16"
                                                                stroke="#0F8A65"
                                                            />
                                                            <circle
                                                                cx="8.5"
                                                                cy="8.5"
                                                                r="5.5"
                                                                fill="#0F8A65"
                                                            />
                                                        </svg>
                                                        <a
                                                            href={`/product-detail/${product.product_id}`}
                                                        >
                                                            {
                                                                product.product_name
                                                            }
                                                        </a>
                                                    </h6>

                                                    {/* Price Section */}
                                                    <h5 className="text-primary">
                                                        {hasDiscount ? (
                                                            // Discounted scenario
                                                            <>
                                                                ₹
                                                                <del
                                                                    style={{
                                                                        fontSize:
                                                                            "14px",
                                                                        marginLeft:
                                                                            "0px",
                                                                        color: "#727272",
                                                                    }}
                                                                >
                                                                    {product.unit_price *
                                                                        product.quantity}
                                                                </del>
                                                                <br />₹
                                                                {product.sale_price *
                                                                    product.quantity}
                                                            </>
                                                        ) : (
                                                            // No discount scenario
                                                            `₹${
                                                                product.unit_price *
                                                                product.quantity
                                                            }`
                                                        )}
                                                    </h5>
                                                </div>

                                                <div className="dz-body sm:flex block justify-between">
                                                    <ul className="dz-meta flex mx-[-10px]">
                                                        <li className="leading-[21px] mx-[10px] text-sm text-[#727272]">
                                                            <span className="text-primary font-medium">
                                                                {product.product_description
                                                                    ?.split(" ")
                                                                    .slice(
                                                                        0,
                                                                        10
                                                                    )
                                                                    .join(" ")}
                                                                ...
                                                            </span>
                                                            <br />
                                                            {Array.isArray(
                                                                addonIdArray
                                                            ) &&
                                                                addonIdArray.length >
                                                                    0 && (
                                                                    <>
                                                                        <hr
                                                                            style={{
                                                                                border: "1px solid #ccc",
                                                                                margin: "10px 0",
                                                                            }}
                                                                        />
                                                                        <span
                                                                            style={{
                                                                                color: "rgb(87, 153, 225)",
                                                                            }}
                                                                        >
                                                                            Your
                                                                            Customisation
                                                                        </span>
                                                                        <br />
                                                                        <span
                                                                            style={{
                                                                                color: "black",
                                                                            }}
                                                                        >
                                                                            Added
                                                                            Toppings:{" "}
                                                                            {
                                                                                product.addon_names
                                                                            }
                                                                        </span>
                                                                    </>
                                                                )}
                                                        </li>
                                                    </ul>
                                                    <div className="dz-body flex justify-between items-center">
                                                        <div className="input-group flex flex-col items-start w-full">
                                                            <h5
                                                                className="text-primary text-right"
                                                                style={{
                                                                    textAlign:
                                                                        "right",
                                                                    marginBottom:
                                                                        "0",
                                                                }}
                                                            >
                                                                {product.total_addon_price ? (
                                                                    <span
                                                                        style={{
                                                                            color: "red",
                                                                        }}
                                                                    >
                                                                        ₹
                                                                        {
                                                                            product.total_addon_price
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <span></span>
                                                                )}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No items in your cart.</p>
                            )}
                        </div>

                        {/* Sidebar: Cart Summary and Coupon */}
                        <div className="w-full lg:w-1/3 px-4">
                            <aside className="sticky top-24">
                                <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                                    <div className="flex justify-between items-center mb-6">
                                        <h5 className="text-xl font-semibold">
                                            Cart{" "}
                                            <span className="text-primary">
                                                ({countCart})
                                            </span>
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close text-xl font-black text-primary lg:hidden block"
                                            aria-label="Close"
                                        >
                                            <i className="la la-close"></i>
                                        </button>
                                    </div>

                                    {cartItems.length > 0 ? (
                                        <>
                                            {/* Cart Items Summary */}
                                            <div className="space-y-4">
                                                {cartItems.map((cartItem) => (
                                                    <div
                                                        key={
                                                            cartItem.cart_item_id
                                                        }
                                                        className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
                                                    >
                                                        {/* Product Details */}
                                                        <div className="flex items-center">
                                                            <img
                                                                src={
                                                                    cartItem.product_image_url
                                                                }
                                                                alt={
                                                                    cartItem.product_name
                                                                }
                                                                className="w-16 h-16 object-cover rounded-lg"
                                                            />
                                                            <div className="ml-3">
                                                                <h6 className="text-sm font-medium">
                                                                    {
                                                                        cartItem.product_name
                                                                    }
                                                                </h6>
                                                                {/* Quantity Input */}
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        value={
                                                                            cartItem.quantity
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleQuantityChange(
                                                                                cartItem.cart_id,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="w-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        aria-label={`Quantity of ${cartItem.product_name}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Total Price and Remove Button */}
                                                        <div className="flex items-center space-x-4">
                                                            {/* Total Price */}
                                                            <h5 className="text-primary font-semibold">
                                                                ₹
                                                                {(
                                                                    (cartItem.sale_price ||
                                                                        cartItem.unit_price) *
                                                                    cartItem.quantity
                                                                ).toFixed(2)}
                                                            </h5>

                                                            {/* Remove Button */}
                                                            <button
                                                                onClick={() =>
                                                                    handleRemoveItem(
                                                                        cartItem.cart_item_id
                                                                    )
                                                                }
                                                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                                                aria-label={`Remove ${cartItem.product_name} from cart`}
                                                            >
                                                                {/* Trash Can Icon using Font Awesome */}
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Coupon Code Input and Button */}
                                            <div className="mt-6">
                                                <h6 className="mb-2 text-lg font-semibold">
                                                    Apply Coupon
                                                </h6>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Coupon Code"
                                                        value={couponCode}
                                                        onChange={
                                                            handleCouponChange
                                                        }
                                                        className="flex-1 border border-gray-300 p-2 rounded-lg"
                                                    />
                                                    <button
                                                        onClick={
                                                            handleApplyCoupon
                                                        }
                                                        disabled={isApplying}
                                                        className={`px-6 py-2 rounded-lg text-white ${
                                                            isApplying
                                                                ? "bg-gray-400 text-xs"
                                                                : "bg-red-600"
                                                        }`}
                                                    >
                                                        {isApplying
                                                            ? "Applying"
                                                            : "Apply"}
                                                    </button>
                                                </div>

                                                {/* Coupon Message */}
                                                {couponMessage && (
                                                    <div className="mt-4">
                                                        <p
                                                            className={`text-sm p-2 rounded ${couponMessageStyle}`}
                                                        >
                                                            {couponMessage}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-center text-gray-500">
                                            No items in your cart.
                                        </p>
                                    )}

                                    {/* Bill Details */}
                                    <div className="mt-6">
                                        <h6 className="mb-4 text-lg font-semibold">
                                            Bill Details
                                        </h6>
                                        <table className="w-full">
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2 text-sm font-medium text-gray-700">
                                                        Addon Total
                                                    </td>
                                                    <td className="text-right text-primary font-semibold">
                                                        ₹{addonTotal}
                                                    </td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 text-sm font-medium text-gray-700">
                                                        Product Total
                                                    </td>
                                                    <td className="text-right text-primary font-semibold">
                                                        ₹{itemTotal}
                                                    </td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 text-sm font-medium text-gray-700">
                                                        Delivery Charges
                                                    </td>
                                                    <td className="text-right text-primary font-semibold">
                                                        ₹{deliveryCharge}
                                                    </td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 text-sm font-medium text-gray-700">
                                                        Convenience Charges
                                                    </td>
                                                    <td className="text-right text-primary font-semibold">
                                                        ₹{ConvenienceCharge}
                                                    </td>
                                                </tr>
                                                {CouponCodeAmount > 0 && (
                                                    <tr className="border-b">
                                                        <td className="py-2 text-sm font-medium text-gray-700">
                                                            Applied Coupon
                                                        </td>
                                                        <td className="text-right text-primary font-semibold">
                                                            -₹{CouponCodeAmount}
                                                        </td>
                                                    </tr>
                                                )}
                                                <tr className="border-t">
                                                    <td className="py-2 text-sm font-medium text-gray-700">
                                                        <h6>Total</h6>
                                                    </td>
                                                    <td className="text-right text-primary font-semibold">
                                                        ₹{totalAmount}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link
                                            href="/check-out"
                                            className="btn btn-primary w-full mt-4 py-3 rounded hover:bg-red-700 transition-colors duration-300"
                                        >
                                            Order Now{" "}
                                            <i className="fa-solid fa-arrow-right ml-2"></i>
                                        </Link>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Cart Section End --> */}
        </MainLayout>
    );
}

export default CartDetail;
