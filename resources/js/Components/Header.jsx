import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Download, User, History, LogOut, ChevronDown } from "lucide-react";
import {
    getGuestCart,
    updateGuestCart,
    mergeGuestCart,
} from "../utils/cart_model";
import axios from "axios";
function Header({ isDrawer1Open, setDrawer1Open }) {
    const { cartCount, auth } = usePage().props;
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    // const [isDrawer1Open, setDrawer1Open] = useState(false);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem("user"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserID] = useState(null);
    const [localCartCount, setLocalCartCount] = useState(0);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".user-dropdown")) {
                setShowUserDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDrawerOpen = (value) => {
        setDrawer1Open(value);
    };

    // Existing functions remain unchanged
    const fetchCartCount = async () => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/cart-count/${userId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setLocalCartCount(data.count);
                }
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        } else {
            // Fallback: sum the quantity in localStorage guestCart
            const guestCart = getGuestCart();
            const totalQty = guestCart.reduce(
                (acc, item) => acc + (item.quantity || 0),
                0
            );
            setLocalCartCount(totalQty);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedUserId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("authToken");
        if (storedUser && storedToken) {
            setIsLoggedIn(true);
            setUser(storedUser);
            setUserName(storedUser);
            setUserID(storedUserId);
        }
    }, []);

    useEffect(() => {
        fetchCartCount();
        // Listen for custom "cart-updated" event and fetch cart count immediately
        const handleCartUpdated = () => {
            fetchCartCount();
        };
        window.addEventListener("cart-updated", handleCartUpdated);

        const interval = setInterval(fetchCartCount, 30000);
        return () => {
            window.removeEventListener("cart-updated", handleCartUpdated);
            clearInterval(interval);
        };
    }, [isLoggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // 1) CSRF
            await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
                method: "GET",
                credentials: "include",
            });

            // 2) POST login
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/UserLogin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ email, password }),
                }
            );

            if (!response.ok) {
                const text = await response.text();
                console.error("Response Error:", text);
                throw new Error("Failed to sign in");
            }

            const result = await response.json();

            // 3) If success
            if (result.token) {
                localStorage.setItem("authToken", result.token);
            }

            if (result.user && result.user.name) {
                // Store user info in localStorage
                localStorage.setItem("user", result.user.name);
                localStorage.setItem("userId", result.user.LogId);
                setUser(result.user.name);
                setUserID(result.user.LogId);
                setIsLoggedIn(true);
                setUserName(result.user.name);
            }

            // 4) Merge guest cart with user's cart
            await mergeGuestCart();

            // 5) Refresh the cart count, close drawer, reload
            await fetchCartCount();
            setDrawer1Open(false);
            window.location.reload();
        } catch (error) {
            setError(error.message);
            console.error("Login Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogoutConfirm = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        setUserName(null);
        setUser(null);
        setUserID(null);
        setShowLogoutDialog(false);
        window.location.reload();
    };

    return (
        <>
            <header className="site-header main-bar-wraper fixed top-0 left-0 w-full z-[999] bg-white shadow-md">
                <div className="main-bar">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16 md:h-20">
                            {/* Logo with hanging effect */}
                            <div className="relative -mb-8 z-[1000]">
                                <Link href="/">
                                    <div
                                        className={`relative transform hover:-translate-y-1 transition-transform duration-300 ease-in-out ${
                                            scrolled ? "pt-4" : ""
                                        }`}
                                    >
                                        <img
                                            src="/asset/image/Logo-4.png"
                                            alt="Pizza Port Cafe Logo"
                                            className="w-24 h-24 md:w-32 md:h-32 drop-shadow-xl"
                                        />
                                    </div>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                                <Link
                                    href="/"
                                    className="hover:text-primary transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/menu"
                                    className="relative group px-6 py-2 rounded-full bg-emerald-600 text-white font-medium transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                                >
                                    <span className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                    <span className="relative flex items-center space-x-2">
                                        <i className="flaticon-pizza-slice animate-pulse"></i>
                                        <span>Order Online</span>
                                    </span>
                                </Link>
                                <Link
                                    href="/reservations"
                                    className="hover:text-primary transition-colors"
                                >
                                    Book Your Table
                                </Link>
                                <Link
                                    href="/reservations"
                                    className="hover:text-primary transition-colors"
                                >
                                    Plan Event
                                </Link>

                                {/* Creative Download App Button */}
                                <a
                                    href="#"
                                    className="relative group px-6 py-2 rounded-full bg-[#EE2737] text-white font-medium transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                                >
                                    <span className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                    <span className="relative flex items-center space-x-2">
                                        <Download className="w-4 h-4 animate-bounce" />
                                        <span>Download App</span>
                                    </span>
                                </a>
                            </nav>

                            {/* User Actions */}
                            <div className="flex items-center space-x-2 md:space-x-4">
                                {/* User Profile Section */}
                                {userName ? (
                                    <div className="relative user-dropdown">
                                        <button
                                            onClick={() =>
                                                setShowUserDropdown(
                                                    !showUserDropdown
                                                )
                                            }
                                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-[#EE2737] text-white flex items-center justify-center">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <span className="hidden md:inline font-medium">
                                                {userName}
                                            </span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {showUserDropdown && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                                                <Link
                                                    href="/OrderHistory"
                                                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                                >
                                                    <History className="w-4 h-4" />
                                                    <span>Order History</span>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setShowUserDropdown(
                                                            false
                                                        );
                                                        setShowLogoutDialog(
                                                            true
                                                        );
                                                    }}
                                                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors w-full"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        className="p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors"
                                        onClick={() => setDrawer1Open(true)}
                                    >
                                        <User className="w-6 h-6" />
                                    </button>
                                )}

                                {/* Cart Button */}
                                <Link href="/ShopCart" className="relative">
                                    <button className="p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors">
                                        <i className="flaticon-shopping-bag-1 text-lg md:text-xl"></i>
                                        {(cartCount > 0 ||
                                            localCartCount > 0) && (
                                            <span className="absolute -top-1 -right-1 bg-[#EE2737] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                {cartCount || localCartCount}
                                            </span>
                                        )}
                                    </button>
                                </Link>

                                {/* Mobile Menu Button */}
                                <button
                                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 md:w-10 md:h-10 rounded-md bg-[#EE2737] text-white"
                                    onClick={() =>
                                        setMobileMenuOpen(!isMobileMenuOpen)
                                    }
                                >
                                    <div className="w-5 h-3 md:w-6 md:h-4 relative flex flex-col justify-between">
                                        <span
                                            className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                                                isMobileMenuOpen
                                                    ? "absolute top-1/2 -translate-y-1/2 rotate-45"
                                                    : ""
                                            }`}
                                        ></span>
                                        <span
                                            className={`block w-full h-0.5 bg-white transition-opacity duration-300 ${
                                                isMobileMenuOpen
                                                    ? "opacity-0"
                                                    : ""
                                            }`}
                                        ></span>
                                        <span
                                            className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                                                isMobileMenuOpen
                                                    ? "absolute top-1/2 -translate-y-1/2 -rotate-45"
                                                    : ""
                                            }`}
                                        ></span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                <div
                    className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[1000] transition-opacity duration-300 ${
                        isMobileMenuOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }`}
                >
                    <div
                        className={`w-64 h-full bg-white transform transition-transform duration-300 ${
                            isMobileMenuOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }`}
                    >
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">Menu</h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-2xl">&times;</span>
                                </button>
                            </div>

                            {/* Mobile User Info with Order History */}
                            {userName && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-[#EE2737] text-white flex items-center justify-center">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">
                                                {userName}
                                            </span>
                                        </div>
                                        <Link
                                            href="/OrderHistory"
                                            className="flex items-center space-x-2 text-gray-600 hover:text-[#EE2737] transition-colors"
                                        >
                                            <History className="w-4 h-4" />
                                            <span>Order History</span>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                setShowLogoutDialog(true)
                                            }
                                            className="flex items-center space-x-2 text-gray-600 hover:text-[#EE2737] transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <nav className="space-y-4">
                                <Link
                                    href="/"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Home
                                </Link>
                                {/* <Link
                                    href="/outlets"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Outlets
                                </Link> */}
                                <Link
                                    href="/menu"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Order Online
                                </Link>
                                {/* {isLoggedIn && (
                                    <Link
                                        href="/OrderHistory"
                                        className="block py-2 hover:text-primary transition-colors"
                                    >
                                        Orders
                                    </Link>
                                )} */}
                                {/* <Link
                                    href="/reviews"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Reviews
                                </Link>
                                <Link
                                    href="/blogs"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Blogs
                                </Link> */}
                                <Link
                                    href="/reservations"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Book Your Table
                                </Link>
                                <a
                                    href="#"
                                    className="flex items-center space-x-2 px-4 py-2 bg-[#EE2737] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download App</span>
                                </a>
                            </nav>

                            <div className="mt-8 border-t pt-4">
                                <div className="flex space-x-4">
                                    <a
                                        href="https://www.facebook.com/Pizza-Port-107753144824113"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a
                                        href="https://twitter.com/PizzaPortcafe"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/pizzaportcafe/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@pizzaportcafe2000/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rest of the components (Login Drawer and Logout Dialog) remain unchanged */}
                {/* Login Drawer */}
                {isDrawer1Open && (
                    <div
                        className="fixed inset-0 z-[1001] bg-black bg-opacity-50"
                        id="login-drawer"
                    >
                        <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white transform transition-transform duration-300 ease-in-out">
                            <div className="h-full overflow-y-auto">
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 transition-colors"
                                    onClick={() => setDrawer1Open(false)}
                                >
                                    &times;
                                </button>
                                <div className="p-6 lg:p-8">
                                    <div className="text-center mb-8">
                                        <h4 className="text-2xl font-bold mb-2">
                                            Welcome Back
                                        </h4>
                                        <p className="text-gray font-semibold">
                                            LOGIN
                                        </p>
                                    </div>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label
                                                htmlFor="dzEmail"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Email*
                                            </label>
                                            <input
                                                name="dzEmail"
                                                id="dzEmail"
                                                required
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="Enter Your Email"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="dzPassword"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Password*
                                            </label>
                                            <input
                                                name="dzPassword"
                                                id="dzPassword"
                                                required
                                                type="password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="Enter Your Password"
                                            />
                                        </div>
                                        {error && (
                                            <p className="text-red-500 text-sm">
                                                {error}
                                            </p>
                                        )}
                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Signing In...
                                                </span>
                                            ) : (
                                                "Sign In"
                                            )}
                                        </button>
                                    </form>
                                    <p className="text-center mt-6 text-gray-600">
                                        Not registered?{" "}
                                        <a
                                            href="/register"
                                            className="text-primary font-medium hover:underline"
                                        >
                                            Register here
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Logout Confirmation Dialog */}
                {showLogoutDialog && (
                    <div className="fixed inset-0 z-[1002] overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                                onClick={() => setShowLogoutDialog(false)}
                            ></div>

                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <i className="fa fa-sign-out text-red-600"></i>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 className="text-lg font-semibold leading-6 text-gray-900">
                                                Confirm Logout
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to
                                                    logout? You'll need to sign
                                                    in again to access your
                                                    account.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={handleLogoutConfirm}
                                    >
                                        Logout
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() =>
                                            setShowLogoutDialog(false)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;
