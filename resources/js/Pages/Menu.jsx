import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Search, Menu as MenuIcon, ChevronRight } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import {
    getGuestCart,
    updateGuestCart,
    handleAddToCartClick as showModalAddToCart,
} from "../utils/cart_model";
import OrderTypeToggle from "../Components/OrderTypeToggle";
import MobileVegToggle from "../Components/MobileVegToggle";
import ProductImageModal from "../Components/ProductImageModal";

function Menu({ categories, setDrawer1Open }) {
    const [activeCategory, setActiveCategory] = useState("bestselling");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { flash } = usePage().props;
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // [* ADDED *] State to toggle Veg-only filter
    const [vegOnly, setVegOnly] = useState(false);

    // cart state
    const [cartItems, setCartItems] = useState([]);

    // Hard-coded best-selling product IDs
    const bestSellingIds = [165, 135, 179, 50, 203, 30, 290, 231];

    // Sort categories alphabetically
    const sortedCategories = [...categories].sort((a, b) =>
        a.category_name.localeCompare(b.category_name)
    );

    // Flatten all products for search
    const allProducts = categories.flatMap((cat) =>
        cat.products.map((product) => ({
            ...product,
            category_name: cat.category_name,
        }))
    );

    // Get best selling products
    const bestSellingProducts = allProducts.filter((product) =>
        bestSellingIds.includes(product.product_id)
    );

    // -----------------------------------------------------------------------
    // Fetch cart on mount (either for guest or for logged-in user)
    // -----------------------------------------------------------------------
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            fetchUserCart(userId);
        } else {
            const guestCart = getGuestCart();
            setCartItems(guestCart);
        }
    }, []);

    // Helper to fetch user cart
    const fetchUserCart = async (userId) => {
        try {
            const { data } = await axios.get("/cart-items", {
                params: { user_id: userId },
            });
            setCartItems(data.CartList || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load cart items");
        }
    };

    // Flash messages
    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    // Intersection Observer to highlight active category in sidebar
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px",
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveCategory(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        // Observe bestselling section
        const bestSellingSection = document.getElementById("bestselling");
        if (bestSellingSection) observer.observe(bestSellingSection);

        sortedCategories.forEach((category) => {
            const section = document.getElementById(
                category.category_id.toString()
            );
            if (section) observer.observe(section);
        });

        const handleScroll = () => {
            const sidebar = document.getElementById("category-sidebar");
            if (sidebar) {
                const sidebarBottom = sidebar.getBoundingClientRect().bottom;
                const pageBottom = window.innerHeight;
                setHasReachedEnd(sidebarBottom <= pageBottom);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [categories]);

    // -----------------------------------------------------------------------
    // Search Handling — we will also apply Veg filtering in the render
    // -----------------------------------------------------------------------
    useEffect(() => {
        // We keep the full search result in filteredProducts
        const filtered = allProducts.filter((product) => {
            // Basic search check
            const matchesName = product.product_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesDesc = product.product_description
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

            return matchesName || matchesDesc;
        });

        setFilteredProducts(filtered);
    }, [searchTerm]);

    // Categories for sidebar
    const sidebarCategories = [
        {
            id: "bestselling",
            name: "BEST SELLING",
            iconClass: "flaticon-crown",
        },
        ...sortedCategories.map((cat) => ({
            id: cat.category_id.toString(),
            name: cat.category_name.toUpperCase(),
            iconClass: "flaticon-food",
        })),
    ];

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        setIsMobileMenuOpen(false);
        setSearchTerm("");
        setIsSearching(false);

        const section = document.getElementById(categoryId);
        if (section) {
            const offset = 100;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setIsSearching(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // -----------------------------------------------------------------------
    // Cart functions: direct add, increment/decrement
    // -----------------------------------------------------------------------
    const handleDirectAdd = async (product) => {
        const userId = localStorage.getItem("userId");
        if (!product) return;

        try {
            if (!userId) {
                // Guest
                const guestCart = getGuestCart();
                const existingItem = guestCart.find(
                    (item) =>
                        item.product_id === product.product_id &&
                        !item.variation_id &&
                        (!item.addon_ids || item.addon_ids.length === 0)
                );
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    const newItem = {
                        cart_item_id: Date.now(),
                        product_id: product.product_id,
                        product_name: product.product_name,
                        product_description: product.product_description,
                        product_image_url: product.main_image_url,
                        variation_id: null,
                        variation_name: null,
                        addon_ids: [],
                        addon_names: "",
                        quantity: 1,
                        unit_price: product.base_sale_price || product.base_mrp,
                        sale_price: product.base_sale_price || product.base_mrp,
                        total_addon_price: 0,
                        gst: 0,
                    };
                    guestCart.push(newItem);
                }

                updateGuestCart(guestCart);
                setCartItems([...guestCart]);
                window.dispatchEvent(new Event("cart-updated"));
            } else {
                // Logged in
                const payload = {
                    product_id: product.product_id,
                    quantity: 1,
                };
                await axios.post("/cart/add", payload);
                fetchUserCart(userId);
                window.dispatchEvent(new Event("cart-updated"));
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add to cart.");
        }
    };

    const handleChangeQuantity = async (product, action) => {
        if (!product) return;
        const userId = localStorage.getItem("userId");

        if (!userId) {
            // Guest logic
            const guestCart = getGuestCart();
            const cartIndex = guestCart.findIndex(
                (item) =>
                    item.product_id === product.product_id &&
                    !item.variation_id &&
                    (!item.addon_ids || item.addon_ids.length === 0)
            );
            if (cartIndex >= 0) {
                if (action === "increase") {
                    guestCart[cartIndex].quantity += 1;
                } else if (action === "decrease") {
                    guestCart[cartIndex].quantity -= 1;
                    if (guestCart[cartIndex].quantity <= 0) {
                        guestCart.splice(cartIndex, 1);
                    }
                }
                updateGuestCart(guestCart);
                setCartItems([...guestCart]);
                window.dispatchEvent(new Event("cart-updated"));
            }
        } else {
            // Logged in
            try {
                if (action === "increase") {
                    await axios.post("/cart/add", {
                        product_id: product.product_id,
                        quantity: 1,
                    });
                } else {
                    // "Decrease" => send quantity -1
                    await axios.post("/cart/add", {
                        product_id: product.product_id,
                        quantity: -1,
                    });
                }
                fetchUserCart(userId);
                window.dispatchEvent(new Event("cart-updated"));
            } catch (error) {
                toast.error("Failed to update quantity.");
            }
        }
    };

    // -----------------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------------
    return (
        <MainLayout>
            <ToastContainer />

            {/* Mobile Bottom Bar */}
            <div className="block lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 flex items-center justify-between px-4 py-2">
                <div className="relative flex-1 mx-2">
                    <input
                        type="text"
                        placeholder="Search for dishes..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Search
                        className="absolute right-3 top-2.5 text-gray-400"
                        size={20}
                    />
                </div>

                {/* Veg Toggle for Mobile */}
                <div className="mr-2">
                    <MobileVegToggle
                        isVegOnly={vegOnly}
                        onToggle={() => setVegOnly(!vegOnly)}
                    />
                </div>

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
                >
                    <MenuIcon size={24} />
                </button>
            </div>

            <style>{`
                @media (max-width: 1023px) {
                    .progress-wrap.active-progress {
                        display: none;
                    }
                }
            `}</style>

            {/* Mobile Categories Dropdown */}
            {isMobileMenuOpen && (
                <div className="block lg:hidden fixed bottom-16 right-4 bg-white rounded-lg shadow-xl w-64 max-h-[70vh] overflow-y-auto z-50">
                    <ul className="py-2">
                        {sidebarCategories.map((cat) => (
                            <li key={cat.id} className="px-2">
                                <button
                                    className={`
                                        flex items-center w-full px-3 py-2 rounded
                                        ${
                                            activeCategory === cat.id
                                                ? "bg-red-600 text-white"
                                                : "bg-white text-black hover:text-red-600"
                                        }
                                        transition-all duration-300
                                    `}
                                    onClick={() => handleCategoryClick(cat.id)}
                                >
                                    <i
                                        className={`${cat.iconClass} text-[25px] mr-3`}
                                    />
                                    {cat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <style>
                {`
                    :root {
                        --header-height: 80px;
                    }
                    
                    .search-bar-sticky {
                        top: calc(var(--header-height));
                        padding-top: 10px;
                    }
                    
                    .sidebar-sticky {
                        top: calc(var(--header-height) + 1.3rem);
                    }
                `}
            </style>

            <section className="relative bg-white pt-[calc(var(--header-height)+1rem)]">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row relative">
                        {/* Desktop Sidebar */}
                        <div
                            id="category-sidebar"
                            className="hidden lg:block w-64 fixed left-[max(0px,calc(50%-680px))] top-36"
                        >
                            <style jsx>{`
                                /* Custom scrollbar styles */
                                .thin-scrollbar::-webkit-scrollbar {
                                    width: 1px;
                                }
                                .thin-scrollbar::-webkit-scrollbar-track {
                                    background: transparent;
                                }
                                .thin-scrollbar::-webkit-scrollbar-thumb {
                                    background: rgb(252, 165, 165);
                                }
                                .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                                    background: rgb(248, 113, 113);
                                }
                            `}</style>
                            <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100">
                                <div className="max-h-[550px] overflow-y-auto thin-scrollbar">
                                    <div className="px-4 pb-4 sticky top-0 bg-gray-50 z-10">
                                        <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">
                                            Menu Categories
                                        </h3>
                                    </div>
                                    <ul className="space-y-2 px-3 mb-4">
                                        {sidebarCategories.map((cat) => (
                                            <li key={cat.id}>
                                                <button
                                                    className={`
                                                        flex items-center w-full px-4 py-3 rounded-xl
                                                        ${
                                                            activeCategory ===
                                                            cat.id
                                                                ? "bg-red-600 text-white shadow-md transform scale-105"
                                                                : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600"
                                                        }
                                                        transition-all duration-300 hover:shadow-md
                                                    `}
                                                    onClick={() =>
                                                        handleCategoryClick(
                                                            cat.id
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center flex-1">
                                                        <i
                                                            className={`${cat.iconClass} text-[20px] mr-3`}
                                                        />
                                                        <span className="text-sm font-semibold">
                                                            {cat.name}
                                                        </span>
                                                    </div>
                                                    <ChevronRight
                                                        className={`ml-2 transition-transform duration-200 ${
                                                            activeCategory ===
                                                            cat.id
                                                                ? "text-white transform rotate-90"
                                                                : "text-gray-400"
                                                        }`}
                                                        size={16}
                                                    />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:ml-56 w-full p-4">
                            {/* Desktop Search + Toggles */}
                            <div className="hidden lg:block sticky top-20 z-40 bg-white pb-4">
                                <div className="relative max-w-4xl">
                                    <div className="flex items-center w-full pt-8">
                                        {/* Search box */}
                                        <div className="relative w-1/2">
                                            <input
                                                type="text"
                                                placeholder="Search for dishes..."
                                                value={searchTerm}
                                                onChange={handleSearch}
                                                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
                                            />
                                            <Search
                                                className="absolute right-3 top-3.5 text-gray-400"
                                                size={20}
                                            />
                                        </div>

                                        {/* Existing OrderTypeToggle */}
                                        <div className="ml-4">
                                            <OrderTypeToggle />
                                        </div>

                                        {/* [* ADDED *] Veg-only Toggle */}
                                        <div className="ml-4 flex items-center space-x-2">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={vegOnly}
                                                    onChange={() =>
                                                        setVegOnly(!vegOnly)
                                                    }
                                                />
                                                <div
                                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer
                                                peer-checked:bg-red-600 peer-checked:after:translate-x-full
                                                after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                                                after:bg-white after:border-gray-300 after:border after:rounded-full
                                                after:h-5 after:w-5 after:transition-all"
                                                ></div>
                                            </label>
                                            <span className="text-sm font-medium text-gray-700">
                                                Veg Only
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* If searching => show search results, else show best-selling & categories */}
                            {isSearching && searchTerm ? (
                                <div className="mt-6">
                                    <h2 className="text-2xl font-bold mb-6">
                                        Search Results
                                    </h2>

                                    {/*
                                      Apply the Veg filter to filteredProducts
                                    */}
                                    {filteredProducts.filter((product) => {
                                        if (!vegOnly) return true;
                                        // parse the tag (if JSON)
                                        try {
                                            const tags = product.tag
                                                ? JSON.parse(product.tag)
                                                : [];
                                            return tags.includes("Veg");
                                        } catch {
                                            // If not JSON, fallback:
                                            return product.tag?.includes("Veg");
                                        }
                                    }).length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {filteredProducts
                                                .filter((product) => {
                                                    if (!vegOnly) return true;
                                                    // parse the tag (if JSON)
                                                    try {
                                                        const tags = product.tag
                                                            ? JSON.parse(
                                                                  product.tag
                                                              )
                                                            : [];
                                                        return tags.includes(
                                                            "Veg"
                                                        );
                                                    } catch {
                                                        return product.tag?.includes(
                                                            "Veg"
                                                        );
                                                    }
                                                })
                                                .map((product) => (
                                                    <ProductCard
                                                        key={`search-${product.product_id}`}
                                                        product={product}
                                                        setDrawer1Open={
                                                            setDrawer1Open
                                                        }
                                                        cartItems={cartItems}
                                                        handleDirectAdd={
                                                            handleDirectAdd
                                                        }
                                                        handleChangeQuantity={
                                                            handleChangeQuantity
                                                        }
                                                    />
                                                ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 bg-gray-50 rounded-xl">
                                            <p className="text-gray-500">
                                                No items found matching your
                                                search
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {/* Best selling section */}
                                    <div
                                        id="bestselling"
                                        className="mt-6 scroll-mt-16"
                                    >
                                        <h2 className="text-2xl font-bold mb-6">
                                            Best Selling Items
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {bestSellingProducts
                                                .filter((product) => {
                                                    if (!vegOnly) return true;
                                                    // parse the tag (if JSON)
                                                    try {
                                                        const tags = product.tag
                                                            ? JSON.parse(
                                                                  product.tag
                                                              )
                                                            : [];
                                                        return tags.includes(
                                                            "Veg"
                                                        );
                                                    } catch {
                                                        return product.tag?.includes(
                                                            "Veg"
                                                        );
                                                    }
                                                })
                                                .map((product) => (
                                                    <ProductCard
                                                        key={`bestselling-${product.product_id}`}
                                                        product={product}
                                                        setDrawer1Open={
                                                            setDrawer1Open
                                                        }
                                                        cartItems={cartItems}
                                                        handleDirectAdd={
                                                            handleDirectAdd
                                                        }
                                                        handleChangeQuantity={
                                                            handleChangeQuantity
                                                        }
                                                    />
                                                ))}
                                        </div>
                                    </div>

                                    {/* Category sections */}
                                    {sortedCategories.map((category) => (
                                        <div
                                            key={category.category_id}
                                            id={category.category_id.toString()}
                                            className="mt-12 scroll-mt-16"
                                        >
                                            <h2 className="text-2xl font-bold mb-6">
                                                {category.category_name}
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                                {category.products
                                                    .filter((product) => {
                                                        if (!vegOnly)
                                                            return true;
                                                        // parse the tag (if JSON)
                                                        try {
                                                            const tags =
                                                                product.tag
                                                                    ? JSON.parse(
                                                                          product.tag
                                                                      )
                                                                    : [];
                                                            return tags.includes(
                                                                "Veg"
                                                            );
                                                        } catch {
                                                            return product.tag?.includes(
                                                                "Veg"
                                                            );
                                                        }
                                                    })
                                                    .map((product) => (
                                                        <ProductCard
                                                            key={
                                                                product.product_id
                                                            }
                                                            product={product}
                                                            setDrawer1Open={
                                                                setDrawer1Open
                                                            }
                                                            cartItems={
                                                                cartItems
                                                            }
                                                            handleDirectAdd={
                                                                handleDirectAdd
                                                            }
                                                            handleChangeQuantity={
                                                                handleChangeQuantity
                                                            }
                                                        />
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

//vegnonveg
const VegNonVegIndicator = ({ isVeg }) => {
    return (
        <div className="min-w-[18px] h-[18px] border border-gray-200 rounded flex items-center justify-center p-0.5 ml-2">
            <span
                className={`w-2.5 h-2.5 rounded-full ${
                    isVeg ? "bg-green-600" : "bg-red-600"
                }`}
            ></span>
        </div>
    );
};

// -----------------------------------------------------------------------
// Product Card
// -----------------------------------------------------------------------
const ProductCard = ({
    product,
    setDrawer1Open,
    cartItems,
    handleDirectAdd,
    handleChangeQuantity,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const hasVariations = product.variations && product.variations.length > 0;
    const hasAddons = product.addons && product.addons.length > 0;
    const hasVariationsOrAddons = hasVariations || hasAddons;

    const description = product.product_description || "";
    const charLimit = 105;
    const shortDescription =
        description.length > charLimit
            ? description.substring(0, charLimit) + "..."
            : description;
    const hasLongDescription = description.length > charLimit;

    // Parse the product.tag column (assuming it might be JSON string like ["Veg"])
    let tags = [];
    try {
        tags = product.tag ? JSON.parse(product.tag) : [];
    } catch {
        // fallback if not JSON
        tags = product.tag ? [product.tag] : [];
    }
    const isVeg = tags.includes("Veg");

    // For the little colored dot
    const vegNonVegDot = <VegNonVegIndicator isVeg={isVeg} />;

    const totalQuantity = cartItems
        .filter(
            (item) => String(item.product_id) === String(product.product_id)
        )
        .reduce((acc, item) => acc + item.quantity, 0);

    const imageUrl = `https://console.pizzaportindia.com/${product.main_image_url}`;

    // Customizable Label Component
    const CustomizableLabel = ({ isMobile }) => (
        <div
            className={`absolute ${
                isMobile ? "top-1 left-1" : "top-2 right-2"
            } bg-white/90 backdrop-blur-sm ${
                isMobile ? "px-1.5 py-0.5" : "px-2 py-1"
            } rounded-full shadow-md z-10`}
        >
            <span
                className={`${
                    isMobile ? "text-[10px]" : "text-xs"
                } font-medium text-red-600 flex items-center`}
            >
                <svg
                    className={`${isMobile ? "w-2 h-2" : "w-3 h-3"} mr-1`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-2.207 2.207L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Customizable
            </span>
        </div>
    );

    const handleReadMore = (e) => {
        e.preventDefault();
        setIsExpanded(true);
    };

    const handleModalAddToCart = async () => {
        try {
            showModalAddToCart(
                product.product_id,
                setDrawer1Open,
                async (guestCart) => {
                    const userId = localStorage.getItem("userId");
                    if (!userId) {
                        if (Array.isArray(guestCart)) {
                            setCartItems(guestCart);
                        }
                    } else {
                        await fetchUserCart(userId);
                    }
                }
            );
        } catch (error) {
            console.error("Error in handleModalAddToCart:", error);
        }
    };

    const fetchUserCart = async (userId) => {
        try {
            const { data } = await axios.get("/cart-items", {
                params: { user_id: userId },
            });
            setCartItems(data.CartList || []);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <ProductImageModal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                imageUrl={imageUrl}
                productName={product.product_name}
            />

            <div className="group bg-white border border-gray-200 hover:border-red-500 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full relative">
                {/* Mobile Layout */}
                <div className="lg:hidden flex relative">
                    {hasVariationsOrAddons && (
                        <CustomizableLabel isMobile={true} />
                    )}
                    <div
                        className="w-1/3 aspect-square cursor-pointer relative overflow-hidden"
                        onClick={() => setIsImageModalOpen(true)}
                    >
                        <img
                            src={imageUrl}
                            alt={product.product_name}
                            className="w-full h-full object-cover transition duration-300 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                    </div>
                    <div className="w-2/3 p-3 flex flex-col">
                        <h4 className="font-semibold text-sm line-clamp-2 mb-1 flex items-start">
                            <span className="flex-1">
                                <Link
                                    href={`/product-detail/${product.product_id}`}
                                >
                                    {product.product_name}
                                </Link>
                            </span>
                            <div className="min-w-[18px] h-[18px] border border-gray-200 rounded flex items-center justify-center p-0.5 ml-2">
                                <span
                                    className={`w-2.5 h-2.5 rounded-full ${
                                        isVeg ? "bg-green-600" : "bg-red-600"
                                    }`}
                                ></span>
                            </div>
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                            {shortDescription}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                            <div className="text-sm">
                                {product.base_sale_price &&
                                parseFloat(product.base_sale_price) <
                                    parseFloat(product.base_mrp) ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 line-through">
                                            ₹{product.base_mrp}
                                        </span>
                                        <span className="text-red-600 font-semibold">
                                            ₹{product.base_sale_price}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-red-600 font-semibold">
                                        ₹{product.base_mrp}
                                    </span>
                                )}
                            </div>
                            {totalQuantity > 0 ? (
                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            handleChangeQuantity(
                                                product,
                                                "decrease"
                                            )
                                        }
                                        className="bg-gray-100 w-7 h-7 flex items-center justify-center rounded-l"
                                    >
                                        -
                                    </button>
                                    <div className="w-7 h-7 flex items-center justify-center border-t border-b border-gray-200">
                                        {totalQuantity}
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (hasVariationsOrAddons) {
                                                handleModalAddToCart();
                                            } else {
                                                handleChangeQuantity(
                                                    product,
                                                    "increase"
                                                );
                                            }
                                        }}
                                        className="bg-gray-100 w-7 h-7 flex items-center justify-center rounded-r"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        if (hasVariationsOrAddons) {
                                            handleModalAddToCart();
                                        } else {
                                            handleDirectAdd(product);
                                        }
                                    }}
                                    className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition duration-200"
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex flex-col h-full relative">
                    {hasVariationsOrAddons && (
                        <CustomizableLabel isMobile={false} />
                    )}
                    <div
                        className="aspect-[4/3] overflow-hidden cursor-pointer relative"
                        onClick={() => setIsImageModalOpen(true)}
                    >
                        <img
                            src={imageUrl}
                            alt={product.product_name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                        {/* [* ADDED smaller text-lg or text-sm + Veg/NonVeg icon *] */}
                        <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-red-600 flex items-start">
                            <span className="flex-1">
                                <Link
                                    href={`/product-detail/${product.product_id}`}
                                >
                                    {product.product_name}
                                </Link>
                            </span>
                            {vegNonVegDot}
                        </h4>
                        <div className="text-xs text-gray-600 mb-auto">
                            {isExpanded ? (
                                description
                            ) : (
                                <>
                                    {shortDescription}
                                    {hasLongDescription && (
                                        <button
                                            onClick={handleReadMore}
                                            className="text-red-600 ml-1 hover:underline text-xs font-medium"
                                        >
                                            Read more →
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="px-4 pb-4 mt-auto border-t border-gray-100 pt-3">
                        <div className="flex items-center justify-between">
                            <div>
                                {product.base_sale_price &&
                                parseFloat(product.base_sale_price) <
                                    parseFloat(product.base_mrp) ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 line-through text-sm">
                                            ₹{product.base_mrp}
                                        </span>
                                        <span className="text-red-600 font-semibold text-lg">
                                            ₹{product.base_sale_price}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-red-600 font-semibold text-lg">
                                        ₹{product.base_mrp}
                                    </span>
                                )}
                            </div>
                            {totalQuantity > 0 ? (
                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            handleChangeQuantity(
                                                product,
                                                "decrease"
                                            )
                                        }
                                        className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-l-md hover:bg-gray-200"
                                    >
                                        -
                                    </button>
                                    <div className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-200">
                                        {totalQuantity}
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (hasVariationsOrAddons) {
                                                handleModalAddToCart();
                                            } else {
                                                handleChangeQuantity(
                                                    product,
                                                    "increase"
                                                );
                                            }
                                        }}
                                        className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-r-md hover:bg-gray-200"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        if (hasVariationsOrAddons) {
                                            handleModalAddToCart();
                                        } else {
                                            handleDirectAdd(product);
                                        }
                                    }}
                                    className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition duration-200"
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
