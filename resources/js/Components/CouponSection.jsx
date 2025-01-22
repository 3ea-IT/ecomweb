import React, { useState, useEffect } from "react";
import { Tag, Badge, ChevronLeft, ChevronRight, Scissors } from "lucide-react";
import axios from "axios";

const CouponSection = ({ appliedCoupon }) => {
    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        fetchAvailableCoupons();
    }, [appliedCoupon]);

    const fetchAvailableCoupons = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/available-coupons`,
                {
                    params: { user_id: userId },
                }
            );

            setAvailableCoupons(response.data.coupons);
        } catch (error) {
            console.error("Error fetching coupons:", error);
            setAvailableCoupons([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyCoupon = async (coupon) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                setMessage({
                    type: "error",
                    text: "Please log in to apply coupons",
                });
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/apply-coupon`,
                {
                    coupon_code: coupon.coupon_code,
                    user_id: userId,
                }
            );

            if (response.data.success) {
                setMessage({
                    type: "success",
                    text: "Coupon applied successfully!",
                });
                // Optionally, you can trigger a refresh or update state here instead of reloading
                window.location.reload();
            } else {
                setMessage({
                    type: "error",
                    text: response.data.message || "Failed to apply coupon",
                });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: error.response?.data?.message || "Failed to apply coupon",
            });
        }
    };

    const scroll = (direction) => {
        const container = document.getElementById("coupons-container");
        const scrollAmount = 220; // Adjusted for smaller cards
        if (container) {
            const newPosition =
                direction === "right"
                    ? scrollPosition + scrollAmount
                    : scrollPosition - scrollAmount;
            container.scrollTo({
                left: newPosition,
                behavior: "smooth",
            });
            setScrollPosition(newPosition);
        }
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="mb-6 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold">
                            Available Offers
                        </h3>
                    </div>
                    {availableCoupons.length > 0 && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll("left")}
                                className="p-1.5 rounded-full hover:bg-gray-100 border"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="p-1.5 rounded-full hover:bg-gray-100 border"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4">
                {loading ? (
                    <div className="flex justify-center py-4">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : availableCoupons.length > 0 ? (
                    <div
                        id="coupons-container"
                        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
                        style={{
                            scrollBehavior: "smooth",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {availableCoupons.map((coupon) => (
                            <div
                                key={coupon.coupon_id}
                                className="min-w-[200px] sm:min-w-[220px] flex-none snap-center"
                            >
                                <div className="relative bg-white border rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300">
                                    {/* Coupon edge design */}
                                    <div className="absolute -left-2 top-1/2 -translate-y-1/2">
                                        <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
                                    </div>
                                    <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                                        <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
                                    </div>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full border-t border-dashed border-gray-200"></div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full border-t border-dashed border-gray-200"></div>

                                    {/* Coupon content */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
                                                {coupon.discount_type ===
                                                "Percentage"
                                                    ? "%"
                                                    : "FLAT"}
                                            </Badge>
                                            <Scissors className="w-4 h-4 text-gray-400" />
                                        </div>

                                        <div className="mb-3">
                                            <h4 className="font-bold text-xl text-primary mb-1">
                                                {coupon.discount_type ===
                                                "Percentage"
                                                    ? `${coupon.discount_value}% OFF`
                                                    : `₹${coupon.discount_value} OFF`}
                                            </h4>
                                            <div className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded inline-block">
                                                {coupon.coupon_code}
                                            </div>
                                        </div>

                                        {coupon.minimum_purchase_amount && (
                                            <p className="text-xs text-gray-600 mb-2">
                                                Min. order ₹
                                                {coupon.minimum_purchase_amount}
                                            </p>
                                        )}

                                        {coupon.end_date && (
                                            <p className="text-xs text-gray-500 mb-3">
                                                Valid till{" "}
                                                {formatDate(coupon.end_date)}
                                            </p>
                                        )}

                                        <button
                                            onClick={() =>
                                                handleApplyCoupon(coupon)
                                            }
                                            className="w-full px-3 py-1.5 text-xs font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
                                        >
                                            APPLY COUPON
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-4">
                        No offers available
                    </p>
                )}

                {message && (
                    <div
                        className={`p-3 rounded-md mt-4 ${
                            message.type === "success"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                        }`}
                    >
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CouponSection;
