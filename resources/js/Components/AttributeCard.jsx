// resources/js/Components/AttributeCard.jsx

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
// import { FaTimes } from "react-icons/fa";
import axios from "../axios"; // Correct path to axios
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const AttributeCard = ({ isOpen, onClose, product }) => {
    const [variations, setVariations] = useState([]);
    const [addons, setAddons] = useState([]);
    const [selectedVariation, setSelectedVariation] = useState("");
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && product) {
            fetchAttributes();
        }
        // Reset selections when modal closes
        if (!isOpen) {
            setSelectedVariation("");
            setSelectedAddons([]);
            setQuantity(1);
            setVariations([]);
            setAddons([]);
        }
    }, [isOpen, product]);

    const fetchAttributes = async () => {
        setIsLoading(true);
        try {
            // Fetch variations
            const variationResponse = await axios.get(
                `/products/${product.product_id}/variations`
            );
            setVariations(variationResponse.data);

            // Fetch add-ons
            const addonResponse = await axios.get(
                `/products/${product.product_id}/addons`
            );
            setAddons(addonResponse.data);
        } catch (error) {
            console.error("Error fetching attributes:", error);
            toast.error("Failed to load product attributes. Please try again.");
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddonChange = (addonId) => {
        setSelectedAddons((prev) =>
            prev.includes(addonId)
                ? prev.filter((id) => id !== addonId)
                : [...prev, addonId]
        );
    };

    const handleAddToCart = async () => {
        // Validation
        if (variations.length > 0 && !selectedVariation) {
            toast.error("Please select a variation.");
            return;
        }

        if (quantity < 1) {
            toast.error("Quantity must be at least 1.");
            return;
        }

        try {
            const payload = {
                product_id: product.product_id,
                quantity,
                variation_id: selectedVariation || null,
                addon_ids: selectedAddons.length > 0 ? selectedAddons : null,
            };

            const response = await axios.post("/cart/add", payload);

            toast.success("Product added to cart successfully!");
            onClose();
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error(
                error.response?.data?.error || "Failed to add product to cart."
            );
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <Dialog.Panel className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-full overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    {/* <FaTimes size={20} /> */}
                </button>

                {/* Product Details */}
                <div className="text-center mb-6">
                    <img
                        src={
                            product.main_image_url.startsWith("http")
                                ? product.main_image_url
                                : `/${product.main_image_url}`
                        }
                        alt={product.product_name}
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {product.product_name}
                    </h2>
                </div>

                {/* Variations */}
                {variations.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-2 text-gray-700">
                            Select Variation
                        </h3>
                        <select
                            value={selectedVariation}
                            onChange={(e) =>
                                setSelectedVariation(e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                            <option value="">-- Select --</option>
                            {variations.map((variation) => (
                                <option
                                    key={variation.variation_id}
                                    value={variation.variation_id}
                                >
                                    {variation.variation_name} (₹
                                    {variation.base_sp})
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Add-ons */}
                {addons.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-2 text-gray-700">
                            Select Add-ons
                        </h3>
                        <div className="flex flex-col space-y-2">
                            {addons.map((addon) => (
                                <label
                                    key={addon.product_id}
                                    className="flex items-center space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={addon.product_id}
                                        checked={selectedAddons.includes(
                                            addon.product_id
                                        )}
                                        onChange={() =>
                                            handleAddonChange(addon.product_id)
                                        }
                                        className="form-checkbox h-5 w-5 text-red-600"
                                    />
                                    <span className="text-gray-700">
                                        {addon.product_name} (+₹
                                        {addon.base_sale_price})
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quantity */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
                >
                    Add to Cart
                </button>

                {/* Loading Indicator */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                        <svg
                            className="animate-spin h-10 w-10 text-red-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                    </div>
                )}
            </Dialog.Panel>
        </Dialog>
    );
};

// Define PropTypes outside the component function
AttributeCard.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.shape({
        product_id: PropTypes.number.isRequired,
        product_name: PropTypes.string.isRequired,
        main_image_url: PropTypes.string.isRequired,
    }).isRequired,
};

export default AttributeCard;
