import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartModal = ({ product, onClose, onAddToCart }) => {
    const [selectedVariation, setSelectedVariation] = useState("");
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [basePrice, setBasePrice] = useState(
        product.base_sale_price || product.base_mrp
    );
    const [totalPrice, setTotalPrice] = useState(basePrice);

    // Calculate total price whenever selection changes
    useEffect(() => {
        let total = basePrice * quantity;

        // Add variation price if selected
        if (selectedVariation) {
            const variation = product.variations?.find(
                (v) => v.variation_id === parseInt(selectedVariation)
            );
            if (variation) {
                total = (variation.base_sp || variation.base_mrp) * quantity;
            }
        }

        // Add addon prices
        if (selectedAddons.length > 0 && product.addons) {
            const addonTotal = selectedAddons.reduce((sum, addonId) => {
                const addon = product.addons.find(
                    (a) => a.product_id === parseInt(addonId)
                );
                return (
                    sum + (addon ? addon.base_sale_price || addon.base_mrp : 0)
                );
            }, 0);
            total += addonTotal * quantity;
        }

        setTotalPrice(total);
    }, [selectedVariation, selectedAddons, quantity, basePrice]);

    const handleVariationChange = (e) => {
        setSelectedVariation(e.target.value);
    };

    const handleAddonToggle = (addonId) => {
        setSelectedAddons((prev) => {
            if (prev.includes(addonId)) {
                return prev.filter((id) => id !== addonId);
            } else {
                return [...prev, addonId];
            }
        });
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        // Validate if variation is required but not selected
        if (product.variations?.length > 0 && !selectedVariation) {
            toast.error("Please select a variation");
            return;
        }

        const cartItem = {
            product_id: product.product_id,
            variation_id: selectedVariation || null,
            addon_ids: selectedAddons,
            quantity: quantity,
        };

        onAddToCart(cartItem);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Add to Cart
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Product Image and Name */}
                <div className="flex items-center space-x-4 mb-6">
                    <img
                        src={
                            product.main_image_url.startsWith("http")
                                ? product.main_image_url
                                : `/${product.main_image_url}`
                        }
                        alt={product.product_name}
                        className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                            {product.product_name}
                        </h3>
                        <p className="text-gray-600">
                            {product.base_sale_price
                                ? `₹${product.base_sale_price}`
                                : `₹${product.base_mrp}`}
                        </p>
                    </div>
                </div>

                {/* Variations Section */}
                {product.variations?.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-gray-800">
                            Select Size
                        </h4>
                        <div className="space-y-2">
                            {product.variations.map((variation) => (
                                <label
                                    key={variation.variation_id}
                                    className="flex items-center space-x-3"
                                >
                                    <input
                                        type="radio"
                                        name="variation"
                                        value={variation.variation_id}
                                        checked={
                                            selectedVariation ===
                                            variation.variation_id.toString()
                                        }
                                        onChange={handleVariationChange}
                                        className="form-radio text-[#ee2737]"
                                    />
                                    <span className="text-gray-700">
                                        {variation.variation_name}
                                    </span>
                                    <span className="text-gray-600">
                                        ₹
                                        {variation.base_sp ||
                                            variation.base_mrp}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add-ons Section */}
                {product.addons?.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-gray-800">
                            Add Extra Toppings
                        </h4>
                        <div className="space-y-2">
                            {product.addons.map((addon) => (
                                <label
                                    key={addon.product_id}
                                    className="flex items-center space-x-3"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedAddons.includes(
                                            addon.product_id.toString()
                                        )}
                                        onChange={() =>
                                            handleAddonToggle(
                                                addon.product_id.toString()
                                            )
                                        }
                                        className="form-checkbox text-[#ee2737]"
                                    />
                                    <span className="text-gray-700">
                                        {addon.product_name}
                                    </span>
                                    <span className="text-gray-600">
                                        +₹
                                        {addon.base_sale_price ||
                                            addon.base_mrp}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quantity Section */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-semibold text-gray-800">
                        Quantity
                    </span>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#ee2737] text-gray-600 hover:text-[#ee2737]"
                        >
                            -
                        </button>
                        <span className="text-lg font-medium w-8 text-center">
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#ee2737] text-gray-600 hover:text-[#ee2737]"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-gray-800">
                        Total
                    </span>
                    <span className="text-xl font-bold text-[#ee2737]">
                        ₹{totalPrice.toFixed(2)}
                    </span>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#ee2737] text-white py-3 rounded-lg font-semibold hover:bg-[#d41f2d] transition duration-200"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default CartModal;
