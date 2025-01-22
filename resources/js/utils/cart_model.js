// resources/js/utils/cart_model.js

import axios from "axios"; // Ensure axios is installed via npm
import Swal from "sweetalert2"; // Ensure sweetalert2 is installed via npm
import { toast } from "react-toastify"; // Ensure react-toastify is installed via npm
import { Inertia } from "@inertiajs/inertia";

// Set the base URL to your API
axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Ensure this matches your API routes

// Set default headers
axios.defaults.headers.common["Accept"] = "application/json";

// Add a request interceptor to attach the Authorization token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access
            toast.error("Session expired. Please log in again.");
            // Remove token and user data
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            // Redirect to home page where login modal can be triggered
            Inertia.visit("/");
        } else if (
            error.response &&
            error.response.data &&
            error.response.data.error
        ) {
            toast.error(error.response.data.error);
        } else {
            toast.error("An unexpected error occurred.");
        }
        return Promise.reject(error);
    }
);

// Add new function to handle localStorage cart
export const getGuestCart = () => {
    const cart = localStorage.getItem("guestCart");
    return cart ? JSON.parse(cart) : [];
};

export const updateGuestCart = (cart) => {
    localStorage.setItem("guestCart", JSON.stringify(cart));
};

export const mergeGuestCart = async () => {
    try {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        if (guestCart.length === 0) return;

        // Track successful merges to remove from guest cart
        const successfulMerges = [];

        for (const item of guestCart) {
            try {
                // Extract addon_ids from the stored addon_ids array or string
                let addonIds = [];
                if (item.addon_ids) {
                    // Handle both string and array formats
                    if (typeof item.addon_ids === "string") {
                        addonIds = item.addon_ids
                            .split(",")
                            .map((id) => parseInt(id.trim()));
                    } else if (Array.isArray(item.addon_ids)) {
                        addonIds = item.addon_ids;
                    }
                }

                // Prepare payload matching your CartController expectations
                const payload = {
                    product_id: item.product_id,
                    variation_id: item.variation_id || null,
                    addon_ids: addonIds,
                    quantity: item.quantity,
                };

                // Make request to add item to cart
                await axios.post("/cart/add", payload);

                // Mark this item for removal from guest cart
                successfulMerges.push(item.cart_item_id);
            } catch (error) {
                console.error(
                    `Failed to merge cart item ${item.product_id}:`,
                    error
                );
                // Continue with next item even if this one fails
            }
        }

        // Remove successfully merged items from guest cart
        if (successfulMerges.length > 0) {
            const remainingItems = guestCart.filter(
                (item) => !successfulMerges.includes(item.cart_item_id)
            );

            if (remainingItems.length === 0) {
                // All items merged successfully, clear guest cart
                localStorage.removeItem("guestCart");
            } else {
                // Update guest cart with remaining items
                localStorage.setItem(
                    "guestCart",
                    JSON.stringify(remainingItems)
                );
            }
        }

        return true;
    } catch (error) {
        console.error("Error merging guest cart:", error);
        return false;
    }
};
/**
 * Function to handle "Add to Cart" click event
 * @param {number} productId - The ID of the product to add to cart
 */
export const handleAddToCartClick = async (
    productId,
    setDrawer1OpenFromParent
) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        try {
            // Fetch product details
            const response = await axios.get(`/products/${productId}`);
            const product = response.data.data;
            console.log("Fetched Product:", product);
            // Instead of showing login prompt, open cart modal for guest
            OpenCart("", product, true);
        } catch (error) {
            console.error("Error fetching product details:", error);
            toast.error(
                error.response?.data?.error ||
                    "Failed to fetch product details."
            );
        }
        return;
    }

    // Existing logged-in user flow
    try {
        const response = await axios.get(`/products/${productId}`);
        const product = response.data.data;
        console.log("Fetched Product:", product);
        OpenCart("", product, false);
    } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error(
            error.response?.data?.error || "Failed to fetch product details."
        );
    }
};

/**
 * Function to open the cart modal with variations and add-ons
 * @param {string} title - Title of the modal
 * @param {object} product - Product data
 */
export const OpenCart = (title, product, isGuest = false) => {
    const {
        product_id,
        product_name,
        product_description,
        main_image_url,
        variations,
        addons,
        base_sale_price,
        base_mrp,
    } = product;

    const content = `
        <div class="flex flex-col w-full">
            <!-- Image Container -->
            <div class="mb-3 w-full">
                <img 
                    src="${
                        main_image_url.startsWith("http")
                            ? main_image_url
                            : "https://console.pizzaportindia.com/" +
                              main_image_url
                    }" 
                    alt="${product_name}" 
                    class="w-full h-full object-cover"
                >
            </div>
            
            <!-- Scrollable Content -->
            <div class="overflow-y-auto px-3 pb-20 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none]" style="max-height: calc(100vh - 180px);">
                <!-- Product Details -->
                <div class="mb-3">
                    <h3 class="text-base font-bold mb-1">${product_name}</h3>
                    <p class="text-xs text-gray-600">${
                        product_description || ""
                    }</p>
                </div>
                
                <!-- Size Selection -->
                ${
                    variations && variations.length > 0
                        ? `
                    <div class="mb-3">
                        <h4 class="text-xs font-semibold text-gray-700 mb-2 text-left">Change Size</h4>
                        <div class="space-y-2">
                            ${variations
                                .map(
                                    (variation, index) => `
                                <label class="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer">
                                    <div class="flex items-center">
                                        <input type="radio" name="variation" value="${
                                            variation.variation_id
                                        }" 
                                            ${index === 0 ? "checked" : ""} 
                                            class="w-3 h-3 text-red-600 border-gray-300 focus:ring-red-500">
                                        <span class="ml-2 text-xs">${
                                            variation.variation_name
                                        }</span>
                                    </div>
                                    <span class="text-xs font-semibold">₹${
                                        variation.base_sp
                                    }</span>
                                </label>
                            `
                                )
                                .join("")}
                        </div>
                    </div>
                `
                        : ""
                }
                
                <!-- Add Extra -->
                ${
                    addons && addons.length > 0
                        ? `
                    <div class="mb-3">
                        <h4 class="text-xs font-semibold text-gray-700 mb-2 text-left">Make it EXTRA yummy</h4>
                        <div class="space-y-2">
                            ${addons
                                .map(
                                    (addon) => `
                                <label class="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer">
                                    <div class="flex items-center">
                                        <input type="checkbox" id="addon-${addon.product_id}" value="${addon.product_id}" 
                                            class="w-3 h-3 text-red-600 border-gray-300 rounded focus:ring-red-500">
                                        <span class="ml-2 text-xs">${addon.product_name}</span>
                                    </div>
                                    <span class="text-xs font-semibold">+₹${addon.base_sale_price}</span>
                                </label>
                            `
                                )
                                .join("")}
                        </div>
                    </div>
                `
                        : ""
                }
                
                <!-- Quantity -->
                <div class="mb-4">
                    <h4 class="text-xs font-semibold text-gray-700 mb-2 text-left">Quantity</h4>
                    <div class="flex items-center space-x-2">
                        <div class="flex items-center border rounded-lg">
                            <button type="button" onclick="document.getElementById('quantity').stepDown()" 
                                class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg text-sm">
                                -
                            </button>
                            <input type="number" id="quantity" min="1" value="1" 
                                class="w-10 text-center border-none focus:ring-0 text-sm" readonly>
                            <button type="button" onclick="document.getElementById('quantity').stepUp()" 
                                class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg text-sm">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            /* Updated comprehensive scrollbar hiding styles */
            .no-scrollbar::-webkit-scrollbar {
                display: none;
                width: 0;
                background: transparent;
            }
            
            .no-scrollbar {
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
            }
            
            /* Ensure no scrollbar in all contexts */
            * {
                scrollbar-width: none !important;
            }
            
            *::-webkit-scrollbar {
                display: none;
                width: 0;
                background: transparent;
            }
        </style>
    `;

    Swal.fire({
        html: content,
        showCancelButton: true,
        confirmButtonColor: "#ee2737",
        cancelButtonColor: "#374151",
        confirmButtonText: "Add",
        cancelButtonText: "Cancel",
        focusConfirm: false,
        width: window.innerWidth < 640 ? "100%" : "400px",
        padding: 0,
        showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
        },
        customClass: {
            popup: "!m-0 rounded-t-lg !h-[90vh] fixed bottom-0",
            confirmButton:
                "bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-red-700",
            cancelButton:
                "bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700",
            actions:
                "fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-end gap-2",
            container: "!m-0 !p-0",
            htmlContainer: "!m-0 !p-0",
        },
        willOpen: (popup) => {
            const actions = popup.querySelector(".swal2-actions");
            const container = popup.querySelector(".swal2-html-container");
            const content = popup.querySelector(".overflow-y-auto");

            if (actions) {
                actions.style.position = "fixed";
                actions.style.bottom = "0";
                actions.style.backgroundColor = "white";
                actions.style.zIndex = "10";
                actions.style.margin = "0";
                actions.style.width = "100%";
            }
            if (container) {
                container.style.marginTop = "0";
                container.style.padding = "0";
            }
            if (content) {
                content.style.msOverflowStyle = "none";
                content.style.scrollbarWidth = "none";
            }
        },
        preConfirm: () => {
            const variation = document.querySelector(
                'input[name="variation"]:checked'
            )?.value;
            const quantity =
                parseInt(document.getElementById("quantity")?.value, 10) || 1;
            const addon_ids = Array.from(
                document.querySelectorAll('input[type="checkbox"]:checked')
            ).map((el) => parseInt(el.value, 10));

            if (variations && variations.length > 0 && !variation) {
                Swal.showValidationMessage("Please select a size");
                return false;
            }

            if (quantity < 1) {
                Swal.showValidationMessage("Please select a valid quantity");
                return false;
            }

            return { variation_id: variation, addon_ids, quantity };
        },
    }).then((result) => {
        if (result.isConfirmed) {
            const { variation_id, addon_ids, quantity } = result.value;

            if (isGuest) {
                // Handle guest cart
                const guestCart = getGuestCart();

                // Find selected variation and addons
                const selectedVariation = variations.find(
                    (v) => v.variation_id === variation_id
                );
                const selectedAddons = addons.filter((addon) =>
                    addon_ids.includes(addon.product_id)
                );

                const cartItem = {
                    cart_item_id: Date.now(), // Unique identifier
                    product_id,
                    product_name,
                    product_description,
                    product_image_url: main_image_url,
                    variation_id,
                    variation_name: selectedVariation?.variation_name,
                    addon_ids,
                    addon_names: selectedAddons
                        .map((a) => a.product_name)
                        .join(", "),
                    quantity,
                    unit_price: selectedVariation?.base_sp || base_sale_price,
                    sale_price: selectedVariation?.base_sp || base_sale_price,
                    total_addon_price: selectedAddons.reduce(
                        (sum, addon) => sum + addon.base_sale_price,
                        0
                    ),
                    gst: 0, // Add appropriate GST calculation if needed
                };

                guestCart.push(cartItem);
                updateGuestCart(guestCart);

                Swal.fire({
                    icon: "success",
                    title: "Added to cart!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                // Existing logged-in user flow
                axios
                    .post("/cart/add", {
                        product_id,
                        variation_id,
                        addon_ids,
                        quantity,
                    })
                    .then((response) => {
                        Swal.fire({
                            icon: "success",
                            title: "Added to cart!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((error) => {
                        console.error("Error adding to cart:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text:
                                error.response?.data?.error ||
                                "Failed to add to cart",
                        });
                    });
            }
        }
    });
};
