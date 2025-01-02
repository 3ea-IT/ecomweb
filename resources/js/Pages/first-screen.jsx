import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia"; // Inertia for page navigation
import { Link } from "@inertiajs/inertia-react"; // Import Link for navigation

const FirstScreen = () => {
    const [selectionMade, setSelectionMade] = useState(false); // State to track if selection is made

    // Function to handle the selection of "Dine" or "Takeaway"
    const handleSelection = (option) => {
        const currentTime = new Date().getTime(); // Get current timestamp
        const expirationTime = currentTime + 86400000; // Add 1 day (24 hours in milliseconds)

        // Save the selection and expiration time in localStorage
        localStorage.setItem("userSelection", option);
        localStorage.setItem("selectionExpiration", expirationTime);

        // Automatically redirect to home when "Dine" or "Takeaway" is clicked
        if (option === "dine" || option === "takeaway") {
            window.location.href = "http://127.0.0.1:8000/home";
        } else if (option === "dotpay") {
            // Redirect to Dotpay URL when "Dotpay" is clicked
            window.location.href = "https://pizzaportandcafe.dotpe.in/";
        }

        setSelectionMade(true); // Mark the selection as made
    };

    // Check if a saved selection exists in localStorage and if it has expired
    useEffect(() => {
        const savedSelection = localStorage.getItem("userSelection");
        const savedExpiration = localStorage.getItem("selectionExpiration");
        const currentTime = new Date().getTime();

        if (
            savedSelection &&
            savedExpiration &&
            currentTime < savedExpiration
        ) {
            // If the selection exists and has not expired, skip the first screen and go to the home page
            setSelectionMade(true); // Skip the selection process
            window.location.href = "http://127.0.0.1:8000/home"; // Automatically navigate to the home page
        }
    }, []);

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
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
                        </div>
                    </div>
                </div>
            </header>

            <div className="first-screen">
                {/* Header */}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <header className="header text-center">
                    <h1 className="text-3xl font-bold">Pizzaport & Cafe</h1>
                </header>

                {/* Tabs: Dine, Takeaway, Dotpay */}
                {!selectionMade && (
                    <div className="tabs mt-6 flex justify-center">
                        <button
                            onClick={() => handleSelection("dine")}
                            className="tab px-4 py-2 bg-gray-200 text-black border border-gray-300 rounded-md mx-2"
                        >
                            Dine
                        </button>
                        <button
                            onClick={() => handleSelection("takeaway")}
                            className="tab px-4 py-2 bg-gray-200 text-black border border-gray-300 rounded-md mx-2"
                        >
                            Takeaway
                        </button>
                        <button
                            onClick={() => handleSelection("dotpay")}
                            className="tab px-4 py-2 bg-gray-200 text-black border border-gray-300 rounded-md mx-2"
                        >
                            Delivery
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FirstScreen;
