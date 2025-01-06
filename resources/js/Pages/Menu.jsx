import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";
import { handleAddToCartClick } from "../utils/cart_model";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Menu({ categories, setDrawer1Open }) {
    const [activeCategory, setActiveCategory] = useState("all");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { flash } = usePage().props;
    const [hasReachedEnd, setHasReachedEnd] = useState(false);

    useEffect(() => {
        // Handle flash messages
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }

        // Set up intersection observer for category sections
        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px", // Trigger when section is in the middle of viewport
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

        // Observe all category sections including "all" section
        const allSection = document.getElementById("all");
        if (allSection) observer.observe(allSection);

        categories.forEach((category) => {
            const section = document.getElementById(
                category.category_id.toString()
            );
            if (section) observer.observe(section);
        });

        // Handle sidebar scrolling
        const handleScroll = () => {
            const sidebar = document.getElementById("category-sidebar");
            if (sidebar) {
                const sidebarBottom = sidebar.getBoundingClientRect().bottom;
                const pageBottom = window.innerHeight;
                setHasReachedEnd(sidebarBottom <= pageBottom);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [flash, categories]);

    const sidebarCategories = [
        { id: "all", name: "ALL", iconClass: "flaticon-fast-food" },
        ...categories.map((cat) => ({
            id: cat.category_id.toString(),
            name: cat.category_name.toUpperCase(),
            iconClass: "flaticon-food",
        })),
    ];

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        setIsMobileMenuOpen(false);

        const section = document.getElementById(categoryId);
        if (section) {
            // Add offset to account for any fixed headers
            const offset = 100; // Adjust this value based on your header height
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <MainLayout>
            <ToastContainer />
            {/* Banner */}
            {/* <section className="bg-[url('../images/banner/bnr3.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
                            Our Menu
                        </h2>
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal">
                                    <Link href="/" className="text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">
                                    Our Menu
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section> */}
            {/* Banner End */}

            {/* Menu Section */}
            <section className="relative bg-white">
                <br />
                {/* Mobile Category Selector - Bottom of screen */}
                <div className="md:hidden fixed bottom-4 left-4 z-50">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
                    >
                        <i className="flaticon-fast-food text-2xl"></i>
                    </button>

                    {/* Mobile Categories Dropdown (showing upwards) */}
                    {isMobileMenuOpen && (
                        <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl w-64 max-h-[70vh] overflow-y-auto">
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
                                            onClick={() =>
                                                handleCategoryClick(cat.id)
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
                    )}
                </div>

                {/* Main Content Area */}
                <div className="container">
                    <div className="pt-[110px] pb-[70px]">
                        <div className="flex flex-row relative">
                            {/* Desktop Sidebar with dynamic positioning */}
                            <div className="hidden md:block md:w-3/12 lg:w-3/12">
                                <style>
                                    {`
                                        #category-sidebar::-webkit-scrollbar {
                                            width: 4px; /* Adjust the width of the scrollbar */
                                        }
                                        #category-sidebar::-webkit-scrollbar-thumb {
                                            background-color: rgba(0, 0, 0, 0.5); /* Adjust the color of the scrollbar thumb */
                                            border-radius: 10px; /* Adjust the roundness of the scrollbar thumb */
                                        }
                                        #category-sidebar::-webkit-scrollbar-track {
                                            background-color: rgba(0, 0, 0, 0.1); /* Adjust the color of the scrollbar track */
                                        }
                                    `}
                                </style>
                                <div
                                    id="category-sidebar"
                                    className={`${
                                        hasReachedEnd
                                            ? "fixed top-[110px]"
                                            : "relative"
                                    } w-[270px] bg-gray-50 p-2 rounded-lg max-h-[calc(100vh-140px)] overflow-y-auto transition-all duration-300 shadow-2xl`}
                                    style={{
                                        marginLeft: "-30px",
                                        // scrollbarWidth: "thin", // For Firefox
                                    }}
                                >
                                    <ul className="space-y-2">
                                        {sidebarCategories.map((cat) => (
                                            <li key={cat.id}>
                                                <button
                                                    className={`
                                                                flex items-center w-full px-3 py-2 rounded
                                                                ${
                                                                    activeCategory ===
                                                                    cat.id
                                                                        ? "bg-red-600 text-white"
                                                                        : "bg-white text-black hover:text-red-600"
                                                                }
                                                                transition-all duration-300
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
                            <div className="md:w-9/12 lg:w-9/12 w-full md:pl-8">
                                {/* All Products Section */}
                                <section id="all" className="mb-8">
                                    <h2 className="text-2xl font-bold mb-6">
                                        All Items
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categories.flatMap((cat) =>
                                            cat.products.map((product) => (
                                                <ProductCard
                                                    key={`all-${product.product_id}`}
                                                    product={product}
                                                    setDrawer1Open={
                                                        setDrawer1Open
                                                    }
                                                />
                                            ))
                                        )}
                                    </div>
                                </section>

                                {/* Category-specific sections */}
                                {categories.map((category) => (
                                    <section
                                        key={category.category_id}
                                        id={category.category_id.toString()}
                                        className="mb-8"
                                    >
                                        <h2 className="text-2xl font-bold mb-6">
                                            {category.category_name}
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {category.products.map(
                                                (product) => (
                                                    <ProductCard
                                                        key={product.product_id}
                                                        product={product}
                                                        setDrawer1Open={
                                                            setDrawer1Open
                                                        } // Make sure to receive this prop
                                                    />
                                                )
                                            )}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

// ProductCard Component
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
        <div className="group rounded-lg bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden shadow-sm hover:shadow-lg">
            {/* Image Container */}
            <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                    src={`https://console.pizzaportindia.com/${product.main_image_url}`}
                    alt={product.product_name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-grow">
                <h4 className="text-lg font-semibold mb-2 line-clamp-2">
                    <Link href={`/product-detail/${product.product_id}`}>
                        {product.product_name}
                    </Link>
                </h4>

                <p className="text-gray-600 text-sm mb-3 flex-grow">
                    {shortDescription}
                    {hasLongDescription && (
                        <button
                            onClick={handleReadMore}
                            className="text-primary ml-1 hover:underline font-bold"
                        >
                            Read more →
                        </button>
                    )}
                </p>

                {/* Price Display */}
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
                                    <span className="text-primary font-semibold">
                                        ₹{product.base_sale_price}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-primary font-semibold">
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
