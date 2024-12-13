// resources/js/Pages/Register.jsx

import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link, useForm, usePage } from "@inertiajs/react";

function Register() {
    const { flash = {} } = usePage().props; // Provide default empty object

    // Initialize form state using Inertia's useForm hook
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
    });

    // Handle phone number input with validation
    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d{0,10}$/.test(inputValue)) {
            setData("phone", inputValue);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <MainLayout>
            {/* Banner Section */}
            <section
                className="relative z-[1] pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] bg-cover bg-center overflow-hidden"
                style={{
                    backgroundImage: "url('asset/images/banner/bnr1.jpg')",
                }}
            >
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
                            Register
                        </h2>
                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb bg-primary shadow-lg rounded-lg py-3 px-6 m-0 inline-block">
                                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal">
                                    <Link href="/" className="text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">
                                    Register
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="content-inner-1 lg:pt-[100px] sm:pt-[70px] pt-[50px] pb-10 relative overflow-hidden section-wrapper-6">
                <div
                    className="container sm:rounded-[10px] rounded-none bg-black2 z-[1] contact-area bg-parallax"
                    style={{
                        backgroundImage:
                            "url('asset/images/background/pic13.png')",
                        backgroundAttachment: "fixed",
                    }}
                >
                    <div className="row items-center">
                        <div className="lg:w-12/12 md:w-full mb-[30px] px-[15px]">
                            <div className="contact-head mb-[30px]">
                                <h4
                                    className="title mb-2 text-white"
                                    style={{ color: "red" }}
                                >
                                    Register here
                                </h4>
                                <p className="text-white mb-4 opacity-75 sm:text-base text-sm">
                                    Please fill out the form below to create an
                                    account.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* First Name */}
                                    <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="text"
                                                required
                                                placeholder="First Name"
                                                value={data.first_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "first_name",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.first_name
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.first_name && (
                                            <span className="text-red-500 text-sm">
                                                {errors.first_name}
                                            </span>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Last Name"
                                                value={data.last_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "last_name",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.last_name
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.last_name && (
                                            <span className="text-red-500 text-sm">
                                                {errors.last_name}
                                            </span>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="email"
                                                required
                                                placeholder="Enter Email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.email
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.email && (
                                            <span className="text-red-500 text-sm">
                                                {errors.email}
                                            </span>
                                        )}
                                    </div>

                                    {/* Phone Number */}
                                    <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Enter Phone Number"
                                                value={data.phone}
                                                onChange={handlePhoneChange}
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.phone
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <span className="text-red-500 text-sm">
                                                {errors.phone}
                                            </span>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="password"
                                                required
                                                placeholder="Password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.password
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.password && (
                                            <span className="text-red-500 text-sm">
                                                {errors.password}
                                            </span>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="password"
                                                required
                                                placeholder="Confirm Password"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.password_confirmation
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.password_confirmation && (
                                            <span className="text-red-500 text-sm">
                                                {errors.password_confirmation}
                                            </span>
                                        )}
                                    </div>

                                    {/* Address Line 1 */}
                                    <div className="w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Address Line 1"
                                                value={data.address_line_1}
                                                onChange={(e) =>
                                                    setData(
                                                        "address_line_1",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.address_line_1
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.address_line_1 && (
                                            <span className="text-red-500 text-sm">
                                                {errors.address_line_1}
                                            </span>
                                        )}
                                    </div>

                                    {/* Address Line 2 */}
                                    <div className="w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="text"
                                                placeholder="Address Line 2"
                                                value={data.address_line_2}
                                                onChange={(e) =>
                                                    setData(
                                                        "address_line_2",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.address_line_2
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.address_line_2 && (
                                            <span className="text-red-500 text-sm">
                                                {errors.address_line_2}
                                            </span>
                                        )}
                                    </div>

                                    {/* City */}
                                    <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="text"
                                                required
                                                placeholder="City"
                                                value={data.city}
                                                onChange={(e) =>
                                                    setData(
                                                        "city",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.city
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.city && (
                                            <span className="text-red-500 text-sm">
                                                {errors.city}
                                            </span>
                                        )}
                                    </div>

                                    {/* State */}
                                    <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="text"
                                                required
                                                placeholder="State"
                                                value={data.state}
                                                onChange={(e) =>
                                                    setData(
                                                        "state",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.state
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.state && (
                                            <span className="text-red-500 text-sm">
                                                {errors.state}
                                            </span>
                                        )}
                                    </div>

                                    {/* Country */}
                                    <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Country"
                                                value={data.country}
                                                onChange={(e) =>
                                                    setData(
                                                        "country",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.country
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.country && (
                                            <span className="text-red-500 text-sm">
                                                {errors.country}
                                            </span>
                                        )}
                                    </div>

                                    {/* Zip Code */}
                                    <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Zip Code"
                                                value={data.postal_code}
                                                onChange={(e) =>
                                                    setData(
                                                        "postal_code",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full ${
                                                    errors.postal_code
                                                        ? "border-b border-red-500"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                        {errors.postal_code && (
                                            <span className="text-red-500 text-sm">
                                                {errors.postal_code}
                                            </span>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="w-full px-[15px]">
                                        <button
                                            type="submit"
                                            className={`py-[10px] px-[30px] mt-4 bg-primary text-white rounded-md text-sm font-medium flex items-center justify-center ${
                                                processing
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            disabled={processing}
                                        >
                                            {processing && (
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-3 text-white"
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
                                                        d="M4 12a8 8 0 018-8v8H4z"
                                                    ></path>
                                                </svg>
                                            )}
                                            {processing
                                                ? "Submitting..."
                                                : "Submit"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default Register;
