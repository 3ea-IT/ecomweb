import React from "react";
import { Link } from "@inertiajs/react";

function Footer() {
    const showAlert = (e) => {
        e.preventDefault();
        alert("Coming Soon!");
    };

    return (
        <section className="relative bg-gradient-to-b from-gray-900 to-black">
            <div className="xl:pt-20 md:pt-16 pt-12 lg:pb-10 md:pb-5 pb-0 relative z-[2]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        {/* Contact Information */}
                        <div className="xl:w-1/4 lg:w-1/3 sm:w-1/2 w-full px-4">
                            <div className="mb-8">
                                <h5 className="text-2xl font-bold text-white mb-6 pb-2 border-b-2 border-primary inline-block">
                                    Contact
                                </h5>
                                <ul className="space-y-6">
                                    <li className="flex items-start space-x-4 group">
                                        <i className="flaticon-placeholder text-primary text-2xl transform group-hover:scale-110 transition-transform duration-300"></i>
                                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                                            5, Kapoorthla Complex, Novelty
                                            Cinema Road, behind Indian oil
                                            Building, Kapoorthla, Sector A,
                                            Aliganj, Lucknow, Uttar Pradesh
                                            226024
                                        </p>
                                    </li>
                                    <li className="flex items-start space-x-4 group">
                                        <i className="flaticon-telephone text-primary text-2xl transform group-hover:scale-110 transition-transform duration-300"></i>
                                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                                            +91 9839334430
                                            <br />
                                            05224238357
                                        </p>
                                    </li>
                                    <li className="flex items-start space-x-4 group">
                                        <i className="flaticon-email-1 text-primary text-2xl transform group-hover:scale-110 transition-transform duration-300"></i>
                                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                                            order@pizzaportindia.com
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Our Links */}
                        <div className="xl:w-3/12 lg:w-2/12 sm:w-6/12 w-full px-4">
                            <div className="mb-8">
                                <h5 className="text-2xl font-bold text-white mb-6 pb-2 border-b-2 border-primary inline-block">
                                    Our Links
                                </h5>
                                <ul className="space-y-3">
                                    {[
                                        "Home",
                                        "Outlets",
                                        "Menu",
                                        "Reviews",
                                        "About Us",
                                        "Blog",
                                    ].map((item) => (
                                        <li key={item}>
                                            <Link
                                                href={`/${item
                                                    .toLowerCase()
                                                    .replace(" ", "-")}`}
                                                className="text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 inline-block"
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Help Center */}
                        <div className="xl:w-3/12 lg:w-3/12 sm:w-6/12 w-full px-4">
                            <div className="mb-8">
                                <h5 className="text-2xl font-bold text-white mb-6 pb-2 border-b-2 border-primary inline-block">
                                    Help Center
                                </h5>
                                <ul className="space-y-3">
                                    {[
                                        { name: "Shop", path: "/outlets" },
                                        {
                                            name: "Testimonials",
                                            path: "/reviews",
                                        },
                                        {
                                            name: "Contact Us",
                                            path: "/contact",
                                        },
                                    ].map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.path}
                                                className="text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 inline-block"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="container mx-auto px-4">
                <div className="border-t border-gray-800 py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500 mb-4 lg:mb-0">
                            Copyright 2024 All rights reserved.
                        </p>
                        <ul className="flex flex-wrap justify-center gap-4">
                            {[
                                "Privacy Policy",
                                "Terms Of Use",
                                "Refund Policy",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`/${item
                                            .toLowerCase()
                                            .replace(/ /g, "-")}`}
                                        className="text-gray-500 text-sm hover:text-white transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Powered By Section */}
            <div className="container mx-auto px-4">
                <div className="border-t border-gray-800 py-4">
                    <div className="text-center md:text-right">
                        <span className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
                            Powered By 3EA
                        </span>
                    </div>
                </div>
            </div>

            {/* Background Images */}
            <img
                src="/asset/images/background/pic5.png"
                alt=""
                className="absolute bottom-[10px] left-0 max-2xl:hidden animate-dz opacity-30 hover:opacity-50 transition-opacity duration-300"
            />
            <img
                src="/asset/images/background/pic6.png"
                alt=""
                className="absolute top-[15px] right-[10px] max-2xl:hidden animate-dz opacity-30 hover:opacity-50 transition-opacity duration-300"
            />
        </section>
    );
}

export default Footer;
