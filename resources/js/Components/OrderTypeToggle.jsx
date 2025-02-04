import React, { useState, useEffect } from "react";
import { MapPin, UtensilsCrossed, Bike, Search } from "lucide-react";

const OrderTypeToggle = () => {
    const [selectedType, setSelectedType] = useState(() => {
        return localStorage.getItem("orderType") || "DineIn";
    });

    useEffect(() => {
        localStorage.setItem("orderType", selectedType);
    }, [selectedType]);

    const orderTypes = [
        { id: "DineIn", label: "Dine In", icon: UtensilsCrossed },
        { id: "Takeaway", label: "Takeaway", icon: MapPin },
        { id: "Delivery", label: "Delivery", icon: Bike },
    ];

    return (
        <>
            {/* Desktop Version - Now positioned on the right */}
            <div
                className="hidden lg:flex items-center space-x-3 absolute"
                style={{ top: "2rem", right: "-11rem" }}
            >
                {orderTypes.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setSelectedType(id)}
                        className={`
                          flex items-center px-6 py-3 rounded-lg transition-all duration-300
                          ${
                              selectedType === id
                                  ? "bg-red-600 text-white shadow-lg transform scale-105"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }
                        `}
                    >
                        <Icon
                            size={20}
                            className={`mr-2 ${
                                selectedType === id ? "animate-bounce" : ""
                            }`}
                        />
                        <span className="font-medium">{label}</span>
                    </button>
                ))}
            </div>

            {/* Mobile Version - Now in the center of bottom bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 px-4 py-3">
                <div className="flex justify-between items-center mb-2">
                    {orderTypes.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setSelectedType(id)}
                            className={`
                              flex flex-col items-center justify-center px-4 py-1 rounded-lg transition-all duration-300
                              ${
                                  selectedType === id
                                      ? "bg-red-600 text-white transform scale-105"
                                      : "bg-gray-100 text-gray-700"
                              }
                              min-w-[80px]
                            `}
                        >
                            <Icon
                                size={18}
                                className={`mb-1 ${
                                    selectedType === id ? "animate-bounce" : ""
                                }`}
                            />
                            <span className="text-xs font-medium whitespace-nowrap">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search bar moved below order type toggle */}
                <div className="relative flex-1 mx-2">
                    <input
                        type="text"
                        placeholder="Search for dishes..."
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Search
                        className="absolute right-3 top-2.5 text-gray-400"
                        size={20}
                    />
                </div>
            </div>
        </>
    );
};

export default OrderTypeToggle;
