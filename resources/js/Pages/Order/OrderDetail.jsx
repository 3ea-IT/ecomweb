import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";
import { MapPin, CheckCircle, ArrowDownToLine, Heart } from "lucide-react";

function OrderDetail() {
    const { props } = usePage();
    const { order } = props;

    if (!order) {
        return (
            <MainLayout>
                <div className="container mx-auto p-6">
                    <h1 className="text-xl font-bold mb-4">Order Detail</h1>
                    <p>Order not found.</p>
                </div>
            </MainLayout>
        );
    }

    const getStatusColor = (status) => {
        const statusColors = {
            confirmed: "bg-blue-100 text-blue-800",
            preparing: "bg-yellow-100 text-yellow-800",
            shipped: "bg-purple-100 text-purple-800",
            delivered: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
            returned: "bg-gray-100 text-gray-800",
        };
        return statusColors[status] || "bg-gray-100 text-gray-600";
    };

    return (
        <MainLayout>
            <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
                            Order Detail
                        </h2>
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal">
                                    <Link href="/" className="text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">
                                    Order Detail
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            <div className="lg:max-w-4xl mx-auto px-4 py-8">
                {/* Order Status Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-6 h-6 text-gray-500" />
                            <div>
                                <h2 className="font-semibold text-lg mb-1">
                                    Delivered to
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {order.delivery_address}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 flex items-center space-x-3 mb-6">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <div>
                            <h3 className="font-medium text-green-800">
                                Order {order.order_status}
                            </h3>
                            <p className="text-sm text-green-600">
                                on {new Date(order.updated_at).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {order.discount_amount > 0 && (
                        <div className="bg-green-50 rounded-lg p-3 mb-6">
                            <p className="text-green-700 text-sm">
                                You've saved ₹{order.discount_amount} on this
                                order 🎉
                            </p>
                        </div>
                    )}
                </div>

                {/* Order Details Card */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold">
                                Order #{order.order_number}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleString()} |{" "}
                                {order.items.length} Items
                            </p>
                        </div>
                        <span
                            className={`px-4 py-2 rounded-full text-sm ${getStatusColor(
                                order.order_status
                            )}`}
                        >
                            {order.order_status}
                        </span>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4 mb-6">
                        {order.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center py-2"
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium">
                                        {item.quantity} x{" "}
                                        {item.product_name_snapshot}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        ₹{item.mrp} each
                                    </p>
                                </div>
                                <p className="font-medium">
                                    ₹{item.mrp * item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal_amount}</span>
                        </div>
                        {order.discount_amount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-₹{order.discount_amount}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-gray-600">
                            <span>Taxes & Charges</span>
                            <span>₹{order.tax_amount}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4">
                            <span>Grand Total</span>
                            <span>₹{order.total_amount}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            <ArrowDownToLine className="w-5 h-5" />
                            <span>Download Invoice</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            <Heart className="w-5 h-5" />
                            <span>Save as Favourite</span>
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default OrderDetail;
