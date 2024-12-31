import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

function Header() {
    const { cartCount, auth } = usePage().props;
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDrawer1Open, setDrawer1Open] = useState(false);
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
        const interval = setInterval(fetchCartCount, 30000);
        return () => clearInterval(interval);
    }, [isLoggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
                method: "GET",
                credentials: "include",
            });

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

            if (result.token) {
                localStorage.setItem("authToken", result.token);
            }

            if (result.user && result.user.name) {
                localStorage.setItem("user", result.user.name);
                localStorage.setItem("userId", result.user.LogId);
                setUser(result.user.name);
                setUserID(result.user.LogId);
                setIsLoggedIn(true);
                setUserName(result.user.name);
                await fetchCartCount();
            }

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
                            {/* Logo */}
                            <div className="w-[120px] md:w-[140px] lg:w-[180px]">
                                <Link href="/">
                                    <img
                                        src="/asset/image/Pizza-Port-Cafe-Logo.png"
                                        alt="Pizza Port Cafe Logo"
                                        className="w-16 h-16 md:w-20 md:h-20"
                                    />
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
                                    href="/outlets"
                                    className="hover:text-primary transition-colors"
                                >
                                    Outlets
                                </Link>
                                <Link
                                    href="/about"
                                    className="hover:text-primary transition-colors"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/menu"
                                    className="hover:text-primary transition-colors"
                                >
                                    Menu
                                </Link>
                                <Link
                                    href="/OrderHistory"
                                    className="hover:text-primary transition-colors"
                                >
                                    Orders
                                </Link>
                                <Link
                                    href="/blogs"
                                    className="hover:text-primary transition-colors"
                                >
                                    Blogs
                                </Link>
                                <Link
                                    href="/contact"
                                    className="hover:text-primary transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </nav>

                            {/* User Actions */}
                            <div className="flex items-center space-x-2 md:space-x-4">
                                {/* Modified to show login button on mobile */}
                                {userName ? (
                                    <div className="flex items-center space-x-2">
                                        <span className="hidden md:inline text-sm md:text-base font-medium">
                                            {userName}
                                        </span>
                                        <button
                                            className="p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors"
                                            onClick={() =>
                                                setShowLogoutDialog(true)
                                            }
                                        >
                                            <i className="fa fa-sign-out text-sm md:text-base"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors"
                                        onClick={() => setDrawer1Open(true)}
                                    >
                                        <i className="flaticon-user text-lg md:text-xl"></i>
                                    </button>
                                )}

                                <Link href="/ShopCart" className="relative">
                                    <button className="p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition-colors">
                                        <i className="flaticon-shopping-bag-1 text-lg md:text-xl"></i>
                                        {(cartCount > 0 ||
                                            localCartCount > 0) && (
                                            <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                {cartCount || localCartCount}
                                            </span>
                                        )}
                                    </button>
                                </Link>

                                <button
                                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 md:w-10 md:h-10 rounded-md bg-primary text-white"
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

                            {/* Mobile User Info */}
                            {userName ? (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            {userName}
                                        </span>
                                        <button
                                            onClick={() =>
                                                setShowLogoutDialog(true)
                                            }
                                            className="text-sm text-gray-600 hover:text-primary transition-colors"
                                        >
                                            <i className="fa fa-sign-out"></i>{" "}
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            setDrawer1Open(true);
                                        }}
                                        className="w-full text-center py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            )}

                            <nav className="space-y-4">
                                <Link
                                    href="/"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/outlets"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Outlets
                                </Link>
                                <Link
                                    href="/about"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/menu"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Menu
                                </Link>
                                <Link
                                    href="/OrderHistory"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Orders
                                </Link>
                                <Link
                                    href="/blogs"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Blogs
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block py-2 hover:text-primary transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </nav>

                            <div className="mt-8 border-t pt-4">
                                <div className="flex space-x-4">
                                    <a
                                        href="https://www.facebook.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rest of the components (Login Drawer and Logout Dialog) remain unchanged */}
                {/* Login Drawer */}
                {isDrawer1Open && (
                    <div className="fixed inset-0 z-[1001] bg-black bg-opacity-50">
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
                                        <h4 className="text-2xl font-semibold mb-2">
                                            Welcome Back
                                        </h4>
                                        <p className="text-gray-600">
                                            Join our 100% remote network of
                                            creators and freelancers.
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
