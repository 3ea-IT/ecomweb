import React, { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";

function Checkout({ CartList = [] }) {
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState(CartList);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    // Fetch user's addresses
    useEffect(() => {
        const fetchAddresses = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/user-addresses`,
                    {
                        params: { user_id: userId },
                    }
                );
                setAddresses(response.data);
                // Set default address if available
                const defaultAddress = response.data.find(
                    (addr) => addr.is_default === 1
                );
                if (defaultAddress) {
                    setSelectedAddress(defaultAddress.address_id);
                }
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };

        fetchAddresses();
    }, []);

    // Calculate all amount of product
    const calculateTotal = () => {
        return cartItems
            .reduce((total, cartItem) => {
                const price = cartItem.sale_price || cartItem.unit_price;
                return total + price * cartItem.quantity;
            }, 0)
            .toFixed(2);
    };

    // Calculate all amount of the addon product
    const AddoncalculateTotal = () => {
        return cartItems
            .reduce((AddonTotal, cartItem) => {
                const AddonPrice = cartItem.total_addon_price || 0; // Ensure addon price defaults to 0
                return AddonTotal + AddonPrice;
            }, 0)
            .toFixed(2);
    };

    // Calculate all GST amount
    const GstcalculateTotal = () => {
        const totalGst = cartItems.reduce((totalGst, cartItem) => {
            const price = cartItem.sale_price || cartItem.unit_price; // Use sale price if available
            const itemTotal = price * cartItem.quantity;
            // Calculate GST for the item
            const gstPercentage = cartItem.gst || 0; // Default GST to 0 if not provided
            const itemGst = (itemTotal * gstPercentage) / 100;
            return totalGst + itemGst; // Accumulate total GST
        }, 0);
        return Math.round(totalGst); // Return the rounded total GST
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

    const deliveryCharge = 0.0; // Example delivery charge
    const ConvenienceCharge = 0.0; // Example Convenience Charge
    const CouponCodeAmount = parseFloat(CouponCalculateTotal());
    const totalGst = parseFloat(GstcalculateTotal());
    const itemTotal = parseFloat(calculateTotal()); // Convert string to number
    const addonTotal = parseFloat(AddoncalculateTotal()); // Convert string to number
    const totalAmount = (
        itemTotal +
        addonTotal +
        totalGst +
        deliveryCharge +
        ConvenienceCharge -
        CouponCodeAmount
    ).toFixed(2);

    const handleAddToOrder = async (e) => {
        e.preventDefault();

        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        if (!selectedAddress) {
            alert("Please select or add a delivery address.");
            return;
        }

        if (paymentMethod === "cod") {
            const orderId = await createOrder();
            if (orderId) {
                alert("Order placed successfully!");
                setLoading(false);
                window.location.href = "/";
            }
        } else if (paymentMethod === "card") {
            const orderId = await createOrder();
            if (orderId) {
                initiateRazorpay(orderId);
            }
        }
    };

    const createOrder = async () => {
        setLoading(true);
        const UserID = localStorage.getItem("userId");
        const OrderType = localStorage.getItem("orderType");

        try {
            const payload = {
                user_id: UserID,
                OrderType: OrderType,
                shipping_address_id: selectedAddress,
                shipping_charges: deliveryCharge,
                tax_amount: totalGst,
                coupon_amount: CouponCodeAmount,
                total_amount: totalAmount,
                payment_method: paymentMethod,
                order_status: "Pending",
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/orders`,
                payload
            );

            if (response.status === 201) {
                return response.data.order_id;
            } else {
                alert(response.data.message || "Failed to place the order.");
                return null;
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Could not create the order. Please try again.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const initiateRazorpay = async (orderId) => {
        setLoading(true);

        try {
            // Create Razorpay order
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/create-razorpay-order`,
                {
                    amount: totalAmount * 100, // Amount in paise
                    order_id: orderId,
                }
            );

            const { razorpay_order_id } = response.data;

            // Razorpay Checkout Options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: totalAmount * 100,
                currency: "INR",
                name: "Pizza Port",
                description: "Order Payment",
                order_id: razorpay_order_id,
                handler: async function (response) {
                    // Confirm payment
                    const paymentPayload = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    await confirmPayment(paymentPayload);
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error initiating Razorpay:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const confirmPayment = async (paymentPayload) => {
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/confirm-payment`,
                paymentPayload
            );

            if (
                response.status === 200 &&
                response.data.message ===
                    "Payment verified and order updated successfully."
            ) {
                // If the payment is successful, show success message
                alert("Payment Successful!");
                window.location.href = "/";
            } else {
                // If for some reason the backend fails, show an error message
                alert("Payment confirmation failed. Please contact support.");
            }
        } catch (error) {
            // In case of an error, show an error message
            console.error("Error confirming payment:", error);
            alert("Payment confirmation failed. Please contact support.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            const UserID = localStorage.getItem("userId"); // Fetch userId from localStorage
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
                            user_id: UserID, // Send userId as a query parameter
                        },
                    }
                );

                setCartItems(response.data.CartList);
            } catch (error) {
                console.error("Error fetching cart items:", error.message);
                alert("Failed to fetch cart data.");
            }
        };

        fetchCartItems();
    }, []);

    const fetchOrderData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/check-out`,
                {
                    headers: {
                        Accept: "application/json",
                        // Include the sanctum token if you've stored it
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching order data:", error.message);
            if (error.response?.status === 401) {
                // Redirect to login if unauthorized
                window.location.href = "/login";
            }
        }
    };

    fetchOrderData();

    return (
        <MainLayout>
            {/* <!-- Banner Section --> */}
            <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
                            Shop Cart
                        </h2>
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
                    </div>
                </div>
            </section>
            {/* <!-- Banner End --> */}

            {/* <!-- Cart Section --> */}
            <section className="py-8 sm:py-12 lg:py-[100px] relative bg-white">
                <div className="container px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Order Summary */}
                        <div className="w-full">
                            <div className="widget">
                                <h4 className="widget-title text-xl sm:text-2xl mb-4 pb-3 relative">
                                    Your Order
                                </h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-[#00000020]">
                                        <thead className="text-center">
                                            <tr className="border-b border-[#00000020]">
                                                <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                    IMAGE
                                                </th>
                                                <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                    PRODUCT NAME
                                                </th>
                                                <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                    QUANTITY
                                                </th>
                                                <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                    TOTAL
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.length > 0 ? (
                                                cartItems.map(
                                                    (cartItem, index) => {
                                                        let addonIdArray = [];
                                                        try {
                                                            addonIdArray =
                                                                typeof cartItem.addon_ids ===
                                                                "string"
                                                                    ? JSON.parse(
                                                                          cartItem.addon_ids
                                                                      )
                                                                    : cartItem.addon_ids;
                                                        } catch (error) {
                                                            console.error(
                                                                "Error parsing addon_ids:",
                                                                error
                                                            );
                                                            addonIdArray = [];
                                                        }

                                                        return (
                                                            <tr key={index}>
                                                                <td className="p-[15px] font-medium border border-[#00000020] product-item-img">
                                                                    <img
                                                                        src={`https://console.pizzaportindia.com/${cartItem.product_image_url}`}
                                                                        alt={
                                                                            cartItem.product_name
                                                                        }
                                                                        className="w-[100px] rounded-md"
                                                                    />
                                                                </td>
                                                                <td className="p-[15px] font-medium border border-[#00000020] text-bodycolor">
                                                                    {
                                                                        cartItem.product_name
                                                                    }
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
                                                                                        color: "black",
                                                                                        fontSize:
                                                                                            "13px",
                                                                                    }}
                                                                                >
                                                                                    Added
                                                                                    Toppings:{" "}
                                                                                </span>
                                                                                <span
                                                                                    style={{
                                                                                        fontSize:
                                                                                            "13px",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        cartItem.addon_names
                                                                                    }
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                </td>
                                                                <td className="p-[15px] font-medium border border-[#00000020] text-bodycolor">
                                                                    {
                                                                        cartItem.quantity
                                                                    }
                                                                </td>
                                                                <td className="p-[15px] font-medium border border-[#00000020] text-bodycolor">
                                                                    {cartItem.sale_price ? (
                                                                        <>
                                                                            ₹
                                                                            {cartItem.sale_price *
                                                                                cartItem.quantity}
                                                                        </>
                                                                    ) : (
                                                                        `₹${
                                                                            cartItem.unit_price *
                                                                            cartItem.quantity
                                                                        }`
                                                                    )}
                                                                    <br />
                                                                    {cartItem.total_addon_price >
                                                                    0 ? (
                                                                        <>
                                                                            <span
                                                                                style={{
                                                                                    color: "#727272",
                                                                                    fontSize:
                                                                                        "10px",
                                                                                }}
                                                                            >
                                                                                Add-ons:
                                                                            </span>
                                                                            ₹
                                                                            {
                                                                                cartItem.total_addon_price
                                                                            }
                                                                        </>
                                                                    ) : (
                                                                        <span
                                                                            style={{
                                                                                color: "#727272",
                                                                                fontSize:
                                                                                    "14px",
                                                                            }}
                                                                        ></span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="4"
                                                        className="text-center p-[15px] font-medium text-bodycolor"
                                                    >
                                                        No items in your cart.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Form */}
                        <div className="w-full">
                            <form
                                className="shop-form widget"
                                onSubmit={handleAddToOrder}
                            >
                                {/* <h4 className="widget-title text-xl sm:text-2xl mb-4 pb-3 relative">
                                    Delivery Address
                                </h4>

                                <div className="mb-6">
                                    {addresses.map((address) => (
                                        <div
                                            key={address.address_id}
                                            className="border rounded-lg p-4 mb-3 cursor-pointer hover:border-primary"
                                            onClick={() =>
                                                setSelectedAddress(
                                                    address.address_id
                                                )
                                            }
                                            style={{
                                                borderColor:
                                                    selectedAddress ===
                                                    address.address_id
                                                        ? "#ff0000"
                                                        : "#e5e7eb",
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    checked={
                                                        selectedAddress ===
                                                        address.address_id
                                                    }
                                                    onChange={() =>
                                                        setSelectedAddress(
                                                            address.address_id
                                                        )
                                                    }
                                                    className="w-4 h-4 text-primary"
                                                />
                                                <div>
                                                    <p className="font-medium">
                                                        {address.full_name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {address.address_line_1}
                                                        {address.address_line_2 &&
                                                            `, ${address.address_line_2}`}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {address.city},{" "}
                                                        {address.state}{" "}
                                                        {address.postal_code}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {address.phone_number}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>


                                <AddressSection
                                    onAddressAdded={(newAddress) => {
                                        setAddresses((prev) => [
                                            ...prev,
                                            newAddress,
                                        ]);
                                        setSelectedAddress(
                                            newAddress.address_id
                                        );
                                    }}
                                /> */}

                                {/* Payment Method */}
                                <h4 className="widget-title text-xl sm:text-2xl mt-8 mb-4 pb-3 relative">
                                    Payment Method
                                </h4>
                                <div className="form-group pb-5 w-full">
                                    <select
                                        className="form-control w-full p-3 border rounded-lg"
                                        value={paymentMethod}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Payment Method
                                        </option>
                                        {/* <option value="cod">
                                            Cash on Delivery
                                        </option> */}
                                        <option value="card">
                                            Online Payment
                                        </option>
                                    </select>
                                </div>

                                {/* Place Order Button */}
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary w-full py-3 rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors"
                                    >
                                        {loading
                                            ? "Processing..."
                                            : "Place Order Now"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- cart Section --> */}
        </MainLayout>
    );
}

function AddressSection({ onAddressAdded }) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addressForm, setAddressForm] = useState({
        full_name: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        phone_number: "",
        is_default: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userId = localStorage.getItem("userId");
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user-addresses`,
                {
                    ...addressForm,
                    user_id: userId,
                }
            );

            if (response.status === 201) {
                onAddressAdded(response.data);
                setShowModal(false);
                setAddressForm({
                    full_name: "",
                    address_line_1: "",
                    address_line_2: "",
                    city: "",
                    state: "",
                    country: "",
                    postal_code: "",
                    phone_number: "",
                    is_default: false,
                });
            }
        } catch (error) {
            console.error("Error adding address:", error);
            alert("Failed to add address. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
                Add New Address
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setShowModal(false)}
                    />

                    <div className="bg-white w-full max-w-md rounded-lg z-10 p-6 relative max-h-[70vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">
                            Add New Address
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={addressForm.full_name}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            full_name: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Address Line 1
                                </label>
                                <input
                                    type="text"
                                    value={addressForm.address_line_1}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            address_line_1: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Address Line 2
                                </label>
                                <input
                                    type="text"
                                    value={addressForm.address_line_2}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            address_line_2: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.city}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                city: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.state}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                state: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.postal_code}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                postal_code: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                        required
                                        pattern="[0-9]*"
                                        maxLength="6"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.country}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                country: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={addressForm.phone_number}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            phone_number: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border rounded-md"
                                    required
                                    pattern="[0-9]*"
                                    maxLength="10"
                                />
                            </div>

                            <div className="flex items-center space-x-2 mt-4">
                                <input
                                    type="checkbox"
                                    id="is_default"
                                    checked={addressForm.is_default}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            is_default: e.target.checked,
                                        }))
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="is_default" className="text-sm">
                                    Set as default address
                                </label>
                            </div>

                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save Address"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Checkout;
