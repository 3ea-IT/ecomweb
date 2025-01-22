import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";
import { handleAddToCartClick } from "../utils/cart_model";
import { toast, ToastContainer } from "react-toastify";
import { Search, Menu as MenuIcon } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

function Menu({ categories, setDrawer1Open }) {
    const [activeCategory, setActiveCategory] = useState("bestselling");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { flash } = usePage().props;
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

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

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }

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
    }, [flash, categories]);

    // Search functionality
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
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </section>

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

const ProductCard = ({ product, setDrawer1Open }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const description = product.product_description || "";
    const shortDescription = description.split(" ").slice(0, 10).join(" ");
    const hasLongDescription = description.split(" ").length > 10;

    const handleReadMore = (e) => {
        e.preventDefault();
        handleAddToCartClick(product.product_id, setDrawer1Open);
    };

    return (
        <div className="group rounded-lg bg-white border border-gray-200 hover:border-red-500 h-full flex duration-500 flex-col relative overflow-hidden shadow-sm hover:shadow-xl">
            <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                    src={`https://console.pizzaportindia.com/${product.main_image_url}`}
                    alt={product.product_name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h4 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-red-600">
                    <Link href={`/product-detail/${product.product_id}`}>
                        {product.product_name}
                    </Link>
                </h4>

                <p className="text-gray-600 text-sm mb-3 flex-grow">
                    {shortDescription}
                    {hasLongDescription && (
                        <button
                            onClick={handleReadMore}
                            className="text-red-600 ml-1 hover:underline font-medium"
                        >
                            Read more →
                        </button>
                    )}
                </p>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
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
                        <button
                            onClick={() =>
                                handleAddToCartClick(
                                    product.product_id,
                                    setDrawer1Open
                                )
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition duration-200"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
