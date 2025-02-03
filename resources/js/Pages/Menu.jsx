import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Search, Menu as MenuIcon } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import {
    getGuestCart,
    updateGuestCart,
    handleAddToCartClick as showModalAddToCart,
} from "../utils/cart_model";

function Menu({ categories, setDrawer1Open }) {
    const [activeCategory, setActiveCategory] = useState("bestselling");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { flash } = usePage().props;
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // New: cart state
    const [cartItems, setCartItems] = useState([]); // This will hold the array of cart items

    // Specific product IDs for best selling items (from IndexController)
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

    // --------------------------------
    // 1A) On mount, fetch the cart
    // --------------------------------
    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (userId) {
            // Logged in: fetch from server
            fetchUserCart(userId);
        } else {
            // Guest: read from localStorage
            const guestCart = getGuestCart();
            setCartItems(guestCart);
        }
    }, []);

    // Helper function to fetch user cart
    const fetchUserCart = async (userId) => {
        try {
            const { data } = await axios.get("/cart-items", {
                params: { user_id: userId },
            });

            // The response structure is:
            // {
            //   countCart: <number>,
            //   CartList: [ ... array of items ... ]
            // }
            setCartItems(data.CartList || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load cart items");
        }
    };

    // --------------------------------
    // 1B) React to success/error flashes
    // --------------------------------
    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    // --------------------------------
    // Intersection Observer for category highlighting
    // --------------------------------
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

    // --------------------------------
    // 1C) Search handling
    // --------------------------------
    useEffect(() => {
        const filtered = allProducts.filter(
            (product) =>
                product.product_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                product.product_description
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm]);

    // Sidebar categories
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

    // --------------------------------
    // 1D) Handler: Direct add to cart (no modal)
    // --------------------------------
    const handleDirectAdd = async (product) => {
        const userId = localStorage.getItem("userId");

        if (!product) return;

        try {
            // If user is not logged in, handle guest cart
            if (!userId) {
                const guestCart = getGuestCart();
                // We only add if the EXACT configuration doesn't already exist
                // For "no variations/addons" => variation_id = null, addon_ids = []
                const existingItem = guestCart.find((item) => {
                    return (
                        item.product_id === product.product_id &&
                        !item.variation_id && // null or undefined
                        (!item.addon_ids || item.addon_ids.length === 0)
                    );
                });

                if (existingItem) {
                    // Already in cart, increment
                    existingItem.quantity += 1;
                } else {
                    // Create new cart item
                    const newItem = {
                        cart_item_id: Date.now(), // or any unique ID
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
                setCartItems([...guestCart]); // re-render
                toast.success("Item added to cart!");
            } else {
                // Logged in user => call the /cart/add endpoint
                const payload = {
                    product_id: product.product_id,
                    quantity: 1,
                };

                await axios.post("/cart/add", payload);
                toast.success("Item added to cart!");
                // Re-fetch user’s cart so the local UI is updated
                fetchUserCart(userId);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add to cart.");
        }
    };

    // --------------------------------
    // 1E) Handler: Increment/Decrement
    // --------------------------------
    const handleChangeQuantity = async (product, action) => {
        if (!product) return;

        const userId = localStorage.getItem("userId");

        if (!userId) {
            // Guest logic
            const guestCart = getGuestCart();

            // Find the item (variation=null, no addons)
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
                        // remove item if quantity is 0
                        guestCart.splice(cartIndex, 1);
                    }
                }
                updateGuestCart(guestCart);
                setCartItems([...guestCart]); // re-render
            }
        } else {
            // Logged in => call a new route or reuse /cart/add with quantity +1?
            // Usually you'd have an endpoint like /cart/updateQuantity or similar
            // We'll do a simple approach: if "increase", call /cart/add? If "decrease", custom endpoint
            if (action === "increase") {
                try {
                    await axios.post("/cart/add", {
                        product_id: product.product_id,
                        quantity: 1,
                    });
                    toast.success("Quantity updated!");
                    fetchUserCart(userId);
                } catch (error) {
                    toast.error("Failed to increase quantity.");
                }
            } else {
                // decrease
                // Either you have a dedicated endpoint, e.g. /cartItem/{cart_item_id}/decrement
                // or build your own logic. For demo, let's assume you have /cart/removeOne
                try {
                    await axios.post("/cart/add", {
                        product_id: product.product_id,
                        quantity: -1, // or your API can handle negative quantity as a decrement
                    });
                    toast.success("Quantity updated!");
                    fetchUserCart(userId);
                } catch (error) {
                    toast.error("Failed to decrease quantity.");
                }
            }
        }
    };

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

            {/* Main Content Area */}
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
                <div className="container mx-auto px-4">
                    <div className="py-6">
                        <div className="flex flex-col lg:flex-row relative gap-6">
                            {/* Desktop Sidebar */}
                            <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
                                <div
                                    id="category-sidebar"
                                    className={`
                                        ${
                                            hasReachedEnd
                                                ? "fixed sidebar-sticky"
                                                : "relative"
                                        }
                                        w-[270px] bg-gray-50 p-4 rounded-xl
                                        max-h-[calc(100vh-var(--header-height)-2rem)] overflow-y-auto
                                        transition-all duration-300 shadow-md
                                        border border-gray-100
                                    `}
                                >
                                    <ul className="space-y-2">
                                        {sidebarCategories.map((cat) => (
                                            <li key={cat.id}>
                                                <button
                                                    className={`
                                                        flex items-center w-full px-4 py-3 rounded-lg
                                                        ${
                                                            activeCategory ===
                                                            cat.id
                                                                ? "bg-red-600 text-white shadow-md transform scale-105"
                                                                : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600"
                                                        }
                                                        transition-all duration-300 ease-in-out
                                                    `}
                                                    onClick={() =>
                                                        handleCategoryClick(
                                                            cat.id
                                                        )
                                                    }
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
                            </div>

                            {/* Main Content */}
                            <div className="lg:w-3/4 xl:w-4/5 w-full">
                                {/* Desktop Search Bar */}
                                <div className="hidden lg:block sticky search-bar-sticky z-40 mb-8 bg-white pb-2.5">
                                    <div className="relative max-w-xl ml-auto">
                                        <input
                                            type="text"
                                            placeholder="Search for dishes..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200
                                                     focus:outline-none focus:ring-2 focus:ring-red-500
                                                     shadow-sm"
                                        />
                                        <Search
                                            className="absolute right-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                    </div>
                                </div>

                                {/* Content Sections */}
                                {isSearching && searchTerm ? (
                                    <section
                                        className="mb-8"
                                        id="searchResults"
                                    >
                                        <h2 className="text-2xl font-bold mb-6">
                                            Search Results
                                        </h2>
                                        {filteredProducts.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                {filteredProducts.map(
                                                    (product) => (
                                                        <ProductCard
                                                            key={`search-${product.product_id}`}
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
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 bg-gray-50 rounded-xl">
                                                <p className="text-gray-500 text-lg">
                                                    No items found matching your
                                                    search
                                                </p>
                                            </div>
                                        )}
                                    </section>
                                ) : (
                                    <>
                                        {/* Best selling section */}
                                        <section
                                            id="bestselling"
                                            className="mb-12"
                                        >
                                            <h2 className="text-2xl font-bold mb-6">
                                                Best Selling Items
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                {bestSellingProducts.map(
                                                    (product) => (
                                                        <ProductCard
                                                            key={`bestselling-${product.product_id}`}
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
                                                    )
                                                )}
                                            </div>
                                        </section>

                                        {/* Category sections */}
                                        {sortedCategories.map((category) => (
                                            <section
                                                key={category.category_id}
                                                id={category.category_id.toString()}
                                                className="mb-12"
                                            >
                                                <h2 className="text-2xl font-bold mb-6">
                                                    {category.category_name}
                                                </h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                    {category.products.map(
                                                        (product) => (
                                                            <ProductCard
                                                                key={
                                                                    product.product_id
                                                                }
                                                                product={
                                                                    product
                                                                }
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
                                                        )
                                                    )}
                                                </div>
                                            </section>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

const ProductCard = ({
    product,
    setDrawer1Open,
    cartItems,
    handleDirectAdd,
    handleChangeQuantity,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

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

    const totalQuantity = cartItems
        .filter(
            (item) => String(item.product_id) === String(product.product_id)
        )
        .reduce((acc, item) => acc + item.quantity, 0);

    const handleReadMore = (e) => {
        e.preventDefault();
        setIsExpanded(true);
    };

    const handleModalAddToCart = async () => {
        const userId = localStorage.getItem("userId");
        try {
            showModalAddToCart(
                product.product_id,
                setDrawer1Open,
                async (guestCart) => {
                    if (!userId) {
                        if (Array.isArray(guestCart)) {
                            setCartItems(guestCart);
                        }
                    } else {
                        fetchUserCart(userId);
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
        <div className="group rounded-lg bg-white border border-gray-200 hover:border-red-500 h-full flex duration-500 flex-col relative overflow-hidden shadow-sm hover:shadow-xl">
            {/* Product Image */}
            <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                    src={`https://console.pizzaportindia.com/${product.main_image_url}`}
                    alt={product.product_name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Product Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h4 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-red-600">
                    <Link href={`/product-detail/${product.product_id}`}>
                        {product.product_name}
                    </Link>
                </h4>

                {/* Description with Read More */}
                <div className="text-gray-600 text-xs mb-3 flex-grow">
                    {isExpanded ? (
                        description
                    ) : (
                        <>
                            {shortDescription}
                            {hasLongDescription && (
                                <button
                                    onClick={handleReadMore}
                                    className="text-red-600 ml-1 hover:underline font-medium"
                                >
                                    Read more →
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Bottom row: Price + Add or - total + */}
                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                        {/* Price display */}
                        <div>
                            {product.base_sale_price &&
                            parseFloat(product.base_sale_price) <
                                parseFloat(product.base_mrp) ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 line-through text-sm">
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

                        {/* Quantity Controls */}
                        {totalQuantity > 0 ? (
                            <div className="flex items-center">
                                <button
                                    onClick={() =>
                                        handleChangeQuantity(
                                            product,
                                            "decrease"
                                        )
                                    }
                                    className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-l-md"
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
                                    className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-r-md"
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
                                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition duration-200"
                            >
                                Add
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
