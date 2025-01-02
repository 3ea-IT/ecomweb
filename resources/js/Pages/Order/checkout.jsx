import React, { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";

function Checkout({ CartList = [] }) {
    const [loading, setLoading] = useState(false); // Define the loading state
    const [cartItems, setCartItems] = useState(CartList);
    const [paymentMethod, setPaymentMethod] = useState("");

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

    // Sum all amount
    const couponAmount = 0.0; // Coupon discount
    const deliveryCharge = 30.0; // Example delivery charge
    const ConvenienceCharge = 15.0; // Example Convenience Charge
    const totalGst = parseFloat(GstcalculateTotal());
    const itemTotal = parseFloat(calculateTotal()); // Convert string to number
    const addonTotal = parseFloat(AddoncalculateTotal()); // Convert string to number
    const totalAmount = (
        itemTotal +
        addonTotal +
        totalGst +
        deliveryCharge +
        ConvenienceCharge
    ).toFixed(2);

    const handleAddToOrder = async (e) => {
        e.preventDefault();

        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        if (paymentMethod === "cod") {
            // Handle Cash on Delivery
            const orderId = await createOrder();
            if (orderId) {
                alert("Order placed successfully!");
                setLoading(false);
                window.location.href = "/";
            }
        } else if (paymentMethod === "card") {
            // Save order and initiate Razorpay payment
            const orderId = await createOrder();
            if (orderId) {
                initiateRazorpay(orderId);
            }
        }
    };

    const createOrder = async () => {
        setLoading(true);

        try {
            const payload = {
                user_id: "11",
                shipping_address_id: "9",
                shipping_charges: deliveryCharge,
                tax_amount: totalGst,
                coupon_amount: couponAmount,
                total_amount: totalAmount,
                payment_method: paymentMethod,
                order_status: "Pending", // Initial status
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/orders`,
                payload,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status === 201) {
                return response.data.order_id; // Return the order_id
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
                                                QUANTITY
                                            </th>
                                            <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                TOTAL
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.length > 0 ? (
                                            cartItems.map((cartItem, index) => {
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
                                                            {cartItem.quantity}
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
                                            })
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

                        <div className="lg:w-1/2 w-full px-[15px]">
                            <form
                                className="shop-form widget"
                                onSubmit={handleAddToOrder}
                            >
                                <input
                                    type="hidden"
                                    name="UserID"
                                    id="UserID"
                                    value="11"
                                />
                                <input
                                    type="hidden"
                                    name="AddressID"
                                    id="AddressID"
                                    value="9"
                                />

                                <h4 className="widget-title xl:mb-[30px] mb-5 pb-3 relative">
                                    Order Total
                                </h4>
                                <table className="mb-5 border border-[#00000020] align-middle w-full">
                                    <tbody>
                                        <tr>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                Order Subtotal
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                {itemTotal}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                Addon Total
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                {addonTotal}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                Shipping
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                {deliveryCharge}
                                            </td>
                                        </tr>
                                        <tr hidden>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                Govt Taxes & Other Charges
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                {totalGst}
                                            </td>
                                        </tr>
                                        <tr hidden>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                Coupon
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                {couponAmount}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                Convenience Charges
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                {ConvenienceCharge}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                Total
                                            </td>
                                            <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">
                                                {totalAmount}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

<AddressSection />
                            
                                <h4 className="widget-title xl:mb-[30px] mb-5 pb-3 relative">
                                    Payment Method
                                </h4>

                                <div className="form-group mb-5 inline-block w-full">
                                    <select
                                        className="form-control"
                                        value={paymentMethod}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Payment Method
                                        </option>
                                        <option value="cod">
                                            Cash on Delivery
                                        </option>
                                        <option value="card">
                                            Credit / Debit / ATM Card
                                        </option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary block text-center btn-md w-full"
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

function AddressSection() {
    // State to track whether modal is open or closed
    const [showModal, setShowModal] = useState(false);

    // State to store address form data
    const [addressForm, setAddressForm] = useState({
        full_name: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        phone_number: "",
    });

    // Toggle the modal
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission (replace with your desired logic, e.g. API call)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation or call an API here
        console.log("New address data:", addressForm);

        // Close the modal after submission (if desired)
        closeModal();
    };

    return (
        <div className="mt-6">
            <h5 className="xl:mb-[10px] pb-3 relative">Address:</h5>
            <button
                className="btn btn-primary px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={openModal}
            >
                Add New Address
            </button>
            <br />
            <br />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 mt-20">
                    {/* Background overlay */}
                    <div
                        className="absolute inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    />

                    {/* Modal content */}
                    <div className=" bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg z-10 p-6 relative">
                        <h2 className="text-xl font-semibold mb-4">
                            Add a New Address
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={addressForm.full_name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Address Line 1
                                </label>
                                <input
                                    type="text"
                                    name="address_line_1"
                                    value={addressForm.address_line_1}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Address Line 2
                                </label>
                                <input
                                    type="text"
                                    name="address_line_2"
                                    value={addressForm.address_line_2}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2"
                                />
                            </div>

                            <div className="flex space-x-2">
                                <div className="w-1/2">
                                    <label className="block mb-1 font-medium">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={addressForm.city}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block mb-1 font-medium">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={addressForm.state}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <div className="w-1/2">
                                    <label className="block mb-1 font-medium">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={addressForm.country}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block mb-1 font-medium">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="postal_code"
                                        value={addressForm.postal_code}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={addressForm.phone_number}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-2"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-400 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Save Address
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
