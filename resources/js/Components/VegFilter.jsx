import React from "react";
import { useState } from "react";

const VegFilter = ({ onChange }) => {
    const [isVegOnly, setIsVegOnly] = useState(false);

    const handleToggle = () => {
        const newValue = !isVegOnly;
        setIsVegOnly(newValue);
        onChange(newValue);
    };

    return (
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2">
                <div
                    className={`w-4 h-4 rounded-full border-2 ${
                        isVegOnly
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300"
                    } flex items-center justify-center`}
                >
                    {isVegOnly && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                </div>
                <span className="text-sm font-medium text-gray-700">
                    Veg Only
                </span>
            </div>
            <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none
          ${isVegOnly ? "bg-green-500" : "bg-gray-300"}`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-300
            ${isVegOnly ? "translate-x-6" : "translate-x-1"}`}
                />
            </button>
        </div>
    );
};

export default VegFilter;
