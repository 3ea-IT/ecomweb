import React from "react";

const MobileVegToggle = ({ isVegOnly, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="mr-3"
            aria-label="Toggle veg-only filter"
        >
            <div
                className={`
          relative w-14 h-6 rounded-full transition-colors duration-300 ease-in-out
          ${isVegOnly ? "bg-green-500" : "bg-gray-300"}
        `}
            >
                {/* Text "Veg" - positioned to the right side */}
                <span
                    className={`
          absolute right-2 text-[10px] font-medium leading-6 tracking-wide
          ${isVegOnly ? "text-white" : "text-gray-400"}
        `}
                >
                    Veg
                </span>

                {/* Sliding circle */}
                <div
                    className={`
            absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-sm
            transition-transform duration-300 ease-in-out
            ${isVegOnly ? "translate-x-8" : "translate-x-0"}
          `}
                />
            </div>
        </button>
    );
};

export default MobileVegToggle;
