import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

function Header() {
    const { countCart } = usePage().props;

    const [isDrawer1Open, setDrawer1Open] = useState(false);
    const [isDrawer2Open, setDrawer2Open] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Check localStorage for user info on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("authToken");
        if (storedUser && storedToken) {
            setIsLoggedIn(true);
            setUser(storedUser);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/UserLogin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || "Failed to sign in");
            }

            const result = await response.json();
            console.log("Login Successful:", result);

            if (result.token) {
                localStorage.setItem("authToken", result.token);
            }

            if (result.user && result.user.name) {
                localStorage.setItem("user", result.user.name);
                setUser(result.user.name);
                setIsLoggedIn(true);
            }

            // Close the login drawer upon successful login
            setDrawer1Open(false);
        } catch (error) {
            setError(error.message);
            console.error("Login Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    };

    return (
        <>
            <header className="site-header main-bar-wraper top-0 left-0 w-full z-[999]">
                <div className="main-bar">
                    <div className="container">
                        <div className="logo-header w-[180px] h-[64px] items-center relative flex float-left">
                            <Link href="/">
                                <img
                                    src="/asset/image/Pizza-Port-Cafe-Logo.png"
                                    alt="Pizza Port Cafe Logo"
                                    width="100"
                                />
                            </Link>
                        </div>

                        <button
                            className="togglebtn lg:hidden block bg-primary w-[45px] h-[45px] relative rounded-md float-right mt-2"
                            onClick={() => setDrawer1Open(!isDrawer1Open)}
                        >
                            <span className="bar1"></span>
                            <span className="bar2"></span>
                            <span className="bar3"></span>
                        </button>

                        <div
                            className="extra-nav float-right items-center h-[64px] lg:flex relative hidden pl-[60px]"
                            style={{ paddingTop: "8px" }}
                        >
                            <div className="extra-cell flex items-center">
                                <ul className="flex items-center gap-[10px]">
                                    {localStorage.getItem("user") !== null ? (
                                        <>
                                            <li>
                                                {localStorage.getItem("user")}{" "}
                                                {/* (Logged In) */}
                                            </li>
                                            <li>
                                                <button
                                                    className="bg-white text-[var(--title)] user-btn white-btn flex items-center justify-center w-[45px] h-[45px] rounded-md shadow-[0_10px_10px_0_rgba(0,0,0,0.1)]"
                                                    onClick={handleLogout}
                                                >
                                                   <span style={{ fontSize: '13.33px' }}>
                                                        <i className="fa fa-sign-out fa-xs"></i>
                                                    </span>
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <button
                                                className="bg-white text-[var(--title)] user-btn white-btn flex items-center justify-center w-[45px] h-[45px] rounded-md shadow-[0_10px_10px_0_rgba(0,0,0,0.1)]"
                                                onClick={() =>
                                                    setDrawer1Open(true)
                                                }
                                            >
                                                <i className="flaticon-user text-2xl inline-flex"></i>
                                            </button>
                                        </li>
                                    )}
                                    <li>
                                        <Link href="/ShopCart">
                                            <button className="cart-btn bg-white white-btn flex items-center justify-center w-[45px] h-[45px] rounded-md shadow-[0_10px_10px_0_rgba(0,0,0,0.1)]">
                                                <i className="flaticon-shopping-bag-1 text-2xl inline-flex ping-bag-1"></i>
                                                <span className="badge absolute top-[3px] right-[-6px] p-0 h-5 w-5 font-medium text-xs leading-5 bg-[#666666] text-white rounded-[10px]">
                                                    {countCart > 0
                                                        ? countCart
                                                        : 0}
                                                </span>
                                            </button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="header-nav lg:justify-end lg:flex-row flex-col lg:gap-0 gap-5 flex">
                            <ul className="nav navbar-nav navbar lg:flex items-center float-right">
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/outlets">Outlets</Link>
                                </li>
                                <li>
                                    <Link href="/about">About</Link>
                                </li>
                                <li>
                                    <Link href="/menu">Menu</Link>
                                </li>
                                <li>
                                    <Link href="/blogs">Blogs</Link>
                                </li>
                                <li>
                                    <Link href="/contact">Contact Us</Link>
                                </li>
                            </ul>
                            <div className="dz-social-icon">
                                <ul>
                                    <li>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fab fa-facebook-f"
                                            href="https://www.facebook.com/"
                                        ></a>
                                    </li>
                                    <li>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fab fa-twitter"
                                            href="https://twitter.com/"
                                        ></a>
                                    </li>
                                    <li>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fab fa-linkedin-in"
                                            href="https://www.linkedin.com/"
                                        ></a>
                                    </li>
                                    <li>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fab fa-instagram"
                                            href="https://www.instagram.com/"
                                        ></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Drawer 1 (Login Form) */}
            {isDrawer1Open && (
                <div className="fixed top-0 z-[999] h-screen w-screen bg-white dark:bg-gray-800">
                    <div className="p-0 overflow-y-auto">
                        <button
                            type="button"
                            className="btn-close hover:text-[#000]"
                            onClick={() => setDrawer1Open(false)}
                        >
                            &times;
                        </button>
                        <div className="py-[60px] px-[70px]">
                            <div className="login-head text-center">
                                <h4 className="text-[30px] mb-[10px]">
                                    Welcome Back
                                </h4>
                                <p className="mb-[35px] text-base">
                                    Join our 100% remote network of creators and
                                    freelancers.
                                </p>
                                <button
                                    name="submit"
                                    value="submit"
                                    type="submit"
                                    className="btn google-btn w-full block"
                                >
                                    Sign Up with Google
                                </button>
                                <h6 className="login-title">
                                    <span className="px-2.5">OR</span>
                                </h6>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-[18px]">
                                    <label
                                        htmlFor="dzEmail"
                                        className="form-lable mb-2"
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
                                        className="input-group flex relative border border-[#dddddd] w-full rounded-md py-2.5 px-5 focus:ring-primary"
                                        placeholder="Enter Your Email"
                                    />
                                </div>
                                <div className="mb-[30px]">
                                    <label
                                        htmlFor="dzPassword"
                                        className="form-lable mb-2"
                                    >
                                        Password*
                                    </label>
                                    <input
                                        name="dzPassword"
                                        id="dzPassword"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type="password"
                                        className="input-group flex relative border border-[#dddddd] w-full rounded-md py-2.5 px-5 focus:ring-primary"
                                        placeholder="Enter Your Password"
                                    />
                                </div>
                                {error && (
                                    <p style={{ color: "red" }}>{error}</p>
                                )}
                                <button
                                    name="submit"
                                    value="submit"
                                    type="submit"
                                    className="btn btn-primary w-full block"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing In..." : "Sign In"}
                                </button>
                            </form>
                            <p className="text-center mt-[30px] text-base">
                                Not registered?{" "}
                                <a
                                    id="register"
                                    className="register text-primary font-medium"
                                    href="#offcanvasLogin"
                                >
                                    Register here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Drawer 2 (Cart) */}
            {isDrawer2Open && (
                <div className="fixed top-0 z-[999] h-screen w-screen bg-white dark:bg-gray-800">
                    <div className="p-0 overflow-y-auto">
                        <button
                            type="button"
                            className="btn-close hover:text-[#000]"
                            onClick={() => setDrawer2Open(false)}
                        >
                            &times;
                        </button>
                        <div className="py-[60px] px-[70px]">
                            <h4 className="text-[30px] mb-[10px]">Your Cart</h4>
                            <ul className="cart-items">
                                <li className="flex justify-between mb-4">
                                    <span>Double Burger</span>
                                    <span>$28.00</span>
                                </li>
                                <li className="flex justify-between mb-4">
                                    <span>Cheese Burger</span>
                                    <span>$20.00</span>
                                </li>
                                <li className="flex justify-between mb-4">
                                    <span>Burger</span>
                                    <span>$15.00</span>
                                </li>
                            </ul>
                            <div className="flex justify-between mt-4">
                                <strong>Total:</strong>
                                <strong>$63.00</strong>
                            </div>
                            <div className="flex mt-6">
                                <button className="btn btn-primary w-full mr-2">
                                    View Cart
                                </button>
                                <button className="btn btn-outline w-full">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
