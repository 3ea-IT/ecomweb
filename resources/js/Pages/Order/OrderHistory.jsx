import React, { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";

function OrderHistory() {
    const [orderHistory, setOrderHistory] = useState([]); // Initialize orderHistory as an empty array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderItems = async () => {
            const UserID = localStorage.getItem("userId"); // Fetch userId from localStorage
            if (!UserID) {
                alert(
                    "User is not logged in. Please log in to view your order history."
                );
                setLoading(false); // Set loading to false if not logged in
                return;
            }
    
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/order-items`,
                    {
                        params: { user_id: UserID },
                    }
                );
    
                // Check the response and set order history
                if (response.data && response.data.orders) {
                    // Reverse the orders so the newest is first
                    setOrderHistory(response.data.orders.reverse()); // Reverse the array
                } else {
                    setOrderHistory([]); // If no orders, set as empty array
                }
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error("Error fetching orders:", error.message);
                alert("Failed to fetch order data.");
                setLoading(false); // Set loading to false after error
            }
        };
    
        fetchOrderItems(); // Fetch order items on mount
    }, []); // Empty dependency array to run only once on mount

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching data
    }

    if (orderHistory.length === 0) {
        return <div>No orders found.</div>; // If no orders, show a message
    }

    return (
        <MainLayout>
            {/* Banner Section */}
            <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
                            Order History
                        </h2>
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal">
                                    <Link href="/" className="text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">
                                    Order History
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Order List Section */}
            <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[100px] sm:pb-10 pb-5 relative bg-white">
                <div className="container flex flex-col items-center">
                    {orderHistory.map((order) => (
                        <div
                            key={order.order_id}
                            className="bg-white border border-green-300 shadow-lg shadow-green-100 rounded-lg p-6 w-full max-w-2xl mb-6 transition-transform duration-300 hover:scale-105 hover:shadow-green-300"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="font-semibold">
                                        {order.order_number}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Order # {order.order_id}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            order.created_at
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 text-sm font-medium rounded-lg ${
                                        // status classes
                                        order.order_status === "confirmed"
                                            ? "bg-green-100 text-gray-600"
                                            : order.order_status === "shipped"
                                            ? "bg-green-100 text-gray-600"
                                            : order.order_status === "delivered"
                                            ? "bg-green-100 text-gray-600"
                                            : order.order_status === "cancelled"
                                            ? "bg-red-100 text-gray-600"
                                            : order.order_status === "returned"
                                            ? "bg-red-100 text-gray-600"
                                            : "bg-yellow-100 text-gray-600"
                                    }`}
                                >
                                    {order.order_status}
                                </span>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <ul className="mb-4">
                                {order.items &&
                                    order.items.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between text-sm mb-2"
                                        >
                                            <span>
                                                {item.product_name_snapshot}
                                            </span>
                                            <span>x {item.quantity}</span>
                                        </li>
                                    ))}
                            </ul>
                            <hr className="my-4 border-gray-300" />
                            <div className="text-right font-semibold text-lg text-gray-800">
                                Total: ₹{order.total_amount}
                            </div>

                            {/*  NEW: Link to the Order Detail Page  */}
                            <div className="text-right mt-4">
                                <Link
                                    href={`/orders/${order.order_id}`} // Our newly created route
                                    className="text-primary hover:text-primary-dark font-medium"
                                >
                                    View Details &raquo;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}

export default OrderHistory;
