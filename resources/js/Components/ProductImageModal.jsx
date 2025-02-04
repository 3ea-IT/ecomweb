import React from "react";
import { X } from "lucide-react";

const ProductImageModal = ({ isOpen, onClose, imageUrl, productName }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-[90vw] md:max-w-[500px]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white hover:text-gray-200 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                    <div className="relative aspect-square">
                        <img
                            src={imageUrl}
                            alt={productName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 bg-white">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {productName}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductImageModal;
