import React, { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";

function Checkout() {
    // 1. State Hooks
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countCart, setCountCart] = useState(0);
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("");

    // 2. Effect Hook to Fetch Cart Items
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/cart-items`
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

    // 3. Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleDecrease = async (cartItemId) => {
        try {
            const response = await updateQuantityInDatabase(
                cartItemId,
                "decrease"
            );
            if (response.cartItem) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.cart_item_id === response.cartItem.cart_item_id
                            ? response.cartItem
                            : item
                    )
                );
                setCountCart((prevCount) => prevCount - 1);
            }
        } catch (error) {
            console.error("Error decreasing quantity:", error.message);
            alert("Failed to decrease quantity.");
        }
    };

    const handleIncrease = async (cartItemId) => {
        try {
            const response = await updateQuantityInDatabase(
                cartItemId,
                "increase"
            );
            if (response.cartItem) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.cart_item_id === response.cartItem.cart_item_id
                            ? response.cartItem
                            : item
                    )
                );
                setCountCart((prevCount) => prevCount + 1);
            }
        } catch (error) {
            console.error("Error increasing quantity:", error.message);
            alert("Failed to increase quantity.");
        }
    };

    const updateQuantityInDatabase = async (cartItemId, action) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/update-quantity/${cartItemId}`,
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

    const handleRemoveItem = async (cartItemId) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this item?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/remove-item`,
                { cart_item_id: cartItemId }
            );

            if (response.data.success) {
                setCartItems((prevItems) =>
                    prevItems.filter((item) => item.cart_item_id !== cartItemId)
                );
                setCountCart((prevCount) => prevCount - 1);
                alert("Item removed successfully!");
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

    const handleAddToOrder = async (e) => {
        e.preventDefault();

        try {
            // Retrieve user and address information securely
            const userId = localStorage.getItem("userId"); // Ensure this is securely managed
            const addressId = localStorage.getItem("addressId"); // Assume you store addressId in localStorage

            if (!userId || !addressId) {
                alert("User is not logged in or address is not selected.");
                return;
            }

            // Construct the payload
            const subtotal = parseFloat(calculateSubtotal());
            const addonTotal = parseFloat(calculateAddonTotal());
            const tax = calculateTotalGST();
            const total = parseFloat(
                (subtotal + addonTotal + tax + 30.0).toFixed(2)
            );

            const payload = {
                // 'user_id' is handled by the backend via authentication
                shipping_address_id: parseInt(addressId, 10),
                billing_address_id: parseInt(addressId, 10), // Assuming same as shipping address
                shipping_charges: 30.0, // deliveryCharge
                tax_amount: tax,
                discount_amount: 0.0, // Adjust based on future promo code implementation
                coupon_amount: 0.0, // Adjust based on future promo code implementation
                subtotal_amount: subtotal,
                total_amount: total,
                payment_method: paymentMethod,
                // payment details
                card_number:
                    paymentMethod === "card" ? formData.cardNumber : null,
                expiry_date:
                    paymentMethod === "card" ? formData.expiryDate : null,
                cvv: paymentMethod === "card" ? formData.cvv : null,
            };

            // Send the POST request to place the order
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/orders`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`, // Include auth token
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (response.status === 201) {
                alert("Order placed successfully!");
                // Optionally, redirect to an order confirmation page
                window.location.href = "/"; // Redirect to home or another page
            } else {
                alert(response.data.message || "Could not place the order.");
            }
        } catch (error) {
            console.error(
                "Error placing order:",
                error.response || error.message
            );
            alert("Error: Could not place the order. Please try again later.");
        }
    };

    // 4. Calculate Totals
    const calculateSubtotal = () => {
        return cartItems
            .reduce((total, cartItem) => {
                const price = cartItem.sale_price || cartItem.unit_price;
                return total + price * cartItem.quantity;
            }, 0)
            .toFixed(2);
    };

    const calculateAddonTotal = () => {
        return cartItems
            .reduce((AddonTotal, cartItem) => {
                const AddonPrice = cartItem.total_addon_price || 0;
                return AddonTotal + AddonPrice;
            }, 0)
            .toFixed(2);
    };

    const calculateTotalGST = () => {
        const totalGst = cartItems.reduce((totalGst, cartItem) => {
            const price = cartItem.sale_price || cartItem.unit_price;
            const itemTotal = price * cartItem.quantity;

            const gstPercentage = cartItem.gst || 0;
            const itemGst = (itemTotal * gstPercentage) / 100;

            return totalGst + itemGst;
        }, 0);

        return Math.round(totalGst);
    };

    // 5. Define Totals for Rendering
    const subtotalAmount = parseFloat(calculateSubtotal());
    const addonTotal = parseFloat(calculateAddonTotal());
    const taxCharge = calculateTotalGST();
    const deliveryCharge = 30.0; // Example delivery charge
    const totalAmount = (
        subtotalAmount +
        addonTotal +
        taxCharge +
        deliveryCharge
    ).toFixed(2);
    const couponAmount = 0.0; // Initialize couponAmount

    if (loading) {
        return <p>Loading cart items...</p>;
    }

    return (
        <MainLayout>
            {/* <!-- Banner Section --> */}
            <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
                            Checkout
                        </h2>
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal">
                                    <Link href="/" className="text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">
                                    Checkout
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            {/* <!-- Banner End --> */}

            {/* <!-- Checkout Section --> */}
            <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[100px] sm:pb-10 pb-5 relative bg-white">
                <div className="container">
                    <div className="dz-divider bg-gray-dark icon-center my-12 relative h-[1px] bg-[#d3d3d3]">
                        <i className="fa fa-circle bg-white text-primary absolute left-[50%] text-center top-[-8px] block"></i>
                    </div>
                    <div className="row">
                        <div className="lg:w-1/2 w-full px-[15px]">
                            <div className="widget">
                                <h4 className="widget-title xl:mb-[30px] mb-5 pb-3 relative">
                                    Your Order
                                </h4>
                                <table className="mb-5 border border-[#00000020] align-middle w-full">
                                    <thead className="text-center">
                                        <tr className="border-b border-[#00000020]">
                                            <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                IMAGE
                                            </th>
                                            <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                PRODUCT NAME
                                            </th>
                                            <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                TOTAL
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.length > 0 ? (
                                            cartItems.map((cartItem) => (
                                                <tr key={cartItem.cart_item_id}>
                                                    <td className="p-[15px] font-medium border border-[#00000020] product-item-img">
                                                        <img
                                                            src={
                                                                cartItem.product_image_url
                                                            }
                                                            alt={
                                                                cartItem.product_name
                                                            }
                                                            className="w-[100px] rounded-md"
                                                        />
                                                    </td>
                                                    <td className="p-[15px] font-medium border border-[#00000020] text-bodycolor">
                                                        {cartItem.product_name}
                                                    </td>
                                                    <td className="p-[15px] font-medium border border-[#00000020] text-bodycolor">
                                                        ₹
                                                        {(
                                                            cartItem.discounted_price *
                                                            cartItem.quantity
                                                        ).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="3"
                                                    className="p-[15px] text-center"
                                                >
                                                    No items in your cart.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full px-[15px]">
                            <form
                                className="shop-form widget"
                                onSubmit={handleAddToOrder}
                            >
                                <h4 className="widget-title xl:mb-[30px] mb-5 pb-3 relative">
                                    Order Total
                                </h4>
                                <table className="mb-5 border border-[#00000020] align-middle w-full">
                                    <tbody>
                                        <tr>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020] ">
                                                Addon Total
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                ₹{addonTotal}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                Product Total
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                ₹{subtotalAmount}
                                            </td>
                                        </tr>
                                        <tr className="charges border-b border-dashed border-[#22222233]">
                                            <td className="pt-[6px] pb-[15px] font-medium text-sm leading-[21px] text-bodycolor">
                                                Delivery Charges
                                            </td>
                                            <td className="price pt-[6px] pb-[15px] text-primary font-semibold text-base leading-6 text-right">
                                                ₹{deliveryCharge.toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr className="tax border-b-2 border-[#22222233]">
                                            <td className="pt-[6px] pb-[15px] font-medium text-sm leading-[21px] text-bodycolor">
                                                Govt Taxes & Other Charges
                                            </td>
                                            <td className="price pt-[6px] pb-[15px] text-primary font-semibold text-base leading-6 text-right">
                                                ₹{taxCharge}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                Coupon
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                ₹{couponAmount}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                Total
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                ₹{totalAmount}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Payment Method Section */}
                                <h4 className="widget-title xl:mb-[30px] mb-5 pb-3 relative">
                                    Payment Method
                                </h4>
                                <div className="form-group mb-5 inline-block w-full">
                                    <select
                                        className="form-select nice-select after:border-black2 after:h-2 after:w-2 after:right-5 after:top-[60%]"
                                        value={paymentMethod}
                                        onChange={handlePaymentChange}
                                        required
                                    >
                                        <option value="">Payment Method</option>
                                        <option value="cod">
                                            Cash on Delivery
                                        </option>
                                        <option value="card">
                                            Credit / Debit / ATM Card
                                        </option>
                                    </select>
                                </div>

                                {paymentMethod === "card" && (
                                    <>
                                        <div className="form-group mb-5">
                                            <input
                                                name="cardNumber"
                                                type="text"
                                                className="h-[50px] py-[10px] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] focus:border-primary duration-500"
                                                placeholder="Card Number"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="form-group md:w-1/2 w-full px-[15px] mb-5">
                                                <input
                                                    name="expiryDate"
                                                    type="text"
                                                    className="h-[50px] py-[10px] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] focus:border-primary duration-500"
                                                    placeholder="MM / YY"
                                                    value={formData.expiryDate}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group md:w-1/2 w-full px-[15px] mb-5">
                                                <input
                                                    name="cvv"
                                                    type="text"
                                                    className="h-[50px] py-[10px] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] focus:border-primary duration-500"
                                                    placeholder="CVV"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="form-group">
                                    <button
                                        className="btn bg-[#F3F3F3] gap-[10px] mb-4 shadow-none duration-700 btn-hover-2 btn-gray hover:bg-primary"
                                        type="submit"
                                    >
                                        Place Order Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Checkout Section --> */}
        </MainLayout>
    );
}

export default Checkout;
