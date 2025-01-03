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
        toast.error("Please login to add items to cart", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        console.log("xyz", setDrawer1OpenFromParent);
        // Add a small delay to ensure the toast is visible before opening the drawer
        if (
            setDrawer1OpenFromParent &&
            typeof setDrawer1OpenFromParent === "function"
        ) {
            console.log("Opening Drawer from Parent");
            setDrawer1OpenFromParent(true);
        }

        return;
    }

    try {
        // Rest of your existing code for handling logged-in users
        const response = await axios.get(`/products/${productId}`);
        const product = response.data.data;
        console.log("Fetched Product:", product);
        OpenCart("Add to Cart", product);
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
export const OpenCart = (title, product) => {
    // Destructure product details
    const {
        product_id,
        product_name,
        main_image_url,
        variations,
        addons,
        base_sale_price,
        base_mrp,
    } = product;

    console.log("Product in OpenCart:", product); // Existing debugging

    // Construct HTML content for the modal
    const content = `
        <div class="flex flex-col items-center space-y-4">
            <img src="${
                main_image_url.startsWith("http")
                    ? main_image_url
                    : "https://console.pizzaportindia.com/" + main_image_url
            }" alt="${product_name}" class="w-32 h-32 object-cover rounded-full mb-4">
            <h3 class="text-xl font-semibold mb-2">${product_name}</h3>
            
            ${
                variations && variations.length > 0
                    ? `
            <div class="mb-4 w-full">
                <label for="variation" class="block text-gray-700 mb-1">Select Variation:</label>
                <select id="variation" class="w-full px-3 py-2 border rounded">
                    <option value="">-- Select --</option>
                    ${variations
                        .map(
                            (variation) =>
                                `<option value="${variation.variation_id}">${variation.variation_name} - ₹${variation.base_sp}</option>`
                        )
                        .join("")}
                </select>
            </div>
            `
                    : ""
            }
            
            ${
                addons && addons.length > 0
                    ? `
            <div class="mb-4 w-full">
                <label class="block text-gray-700 mb-1">Select Add-ons:</label>
                ${addons
                    .map(
                        (addon) => `
                            <div class="flex items-center mb-1">
                                <input type="checkbox" id="addon-${addon.product_id}" value="${addon.product_id}" class="addon-checkbox mr-2">
                                <label for="addon-${addon.product_id}" class="text-gray-700">${addon.product_name} (+₹${addon.base_sale_price})</label>
                            </div>
                        `
                    )
                    .join("")}
            </div>
            `
                    : ""
            }
            
            <div class="mb-4 w-full">
                <label for="quantity" class="block text-gray-700 mb-1">Quantity:</label>
                <input type="number" id="quantity" min="1" value="1" class="w-full px-3 py-2 border rounded">
            </div>
        </div>
    `;

    console.log("Constructed Content for Swal:", content); // New debugging

    Swal.fire({
        title: title,
        html: content,
        showCancelButton: true,
        confirmButtonColor: "#ee2737", // Primary color
        cancelButtonColor: "#d33",
        confirmButtonText: "Add to Cart",
        focusConfirm: false,
        showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
        },
        customClass: {
            popup: "bg-white text-black",
            title: "text-[#ee2737]",
            confirmButton: "bg-[#ee2737] text-white",
            cancelButton: "bg-gray-500 text-white",
        },
        preConfirm: () => {
            const variation = document.getElementById("variation")?.value;
            const quantity =
                parseInt(document.getElementById("quantity")?.value, 10) || 1;
            const addonElements = document.querySelectorAll(
                ".addon-checkbox:checked"
            );
            const addon_ids = Array.from(addonElements).map((el) =>
                parseInt(el.value, 10)
            );

            // Validation
            if (variations && variations.length > 0 && !variation) {
                Swal.showValidationMessage("Please select a variation.");
                return false;
            }

            if (quantity < 1) {
                Swal.showValidationMessage("Quantity must be at least 1.");
                return false;
            }

            return { variation_id: variation, addon_ids, quantity };
        },
    }).then((result) => {
        if (result.isConfirmed) {
            const { variation_id, addon_ids, quantity } = result.value;
            console.log("Adding to Cart:", {
                product_id,
                variation_id,
                addon_ids,
                quantity,
            });
            // Handle the add to cart logic here, such as sending an API request
            axios
                .post("/cart/add", {
                    product_id,
                    variation_id,
                    addon_ids,
                    quantity,
                })
                .then((response) => {
                    Swal.fire(
                        "Added!",
                        "Product has been added to your cart.",
                        "success"
                    );
                    // Optionally, update the cart count or other UI elements
                })
                .catch((error) => {
                    console.error("Error adding to cart:", error);
                    Swal.fire(
                        "Error!",
                        error.response?.data?.error ||
                            "Failed to add product to cart.",
                        "error"
                    );
                });
        }
    });
};
