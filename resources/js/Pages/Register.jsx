// resources/js/Pages/Register.jsx

import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { CheckCircle, X } from "lucide-react";

function Register() {
    const autocompleteInitialized = useRef(false);
    const { googleMapsApiKey, flash } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(false);

    // Watch for flash messages from the backend
    useEffect(() => {
        if (flash.message) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash.message]);

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
        drop_landmark: "",
        drop_lat: "",
        drop_lng: "",
    });

    useEffect(() => {
        if (!googleMapsApiKey || autocompleteInitialized.current) {
            return;
        }

        const loadGoogleMapsScript = () => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
            script.async = true;
            script.defer = true;

            // Add onload and onerror handlers
            script.onload = () => {
                if (window.google && window.google.maps) {
                    initAutocomplete();
                } else {
                    console.error(
                        "Google Maps API loaded, but 'google.maps' is not available."
                    );
                }
            };

            script.onerror = () => {
                console.error("Failed to load Google Maps API script.");
            };

            document.head.appendChild(script);
        };

        const initAutocomplete = () => {
            const input = document.getElementById("address_line_1");
            if (!input) {
                console.error("Address input field not found.");
                return;
            }

            const autocomplete = new google.maps.places.Autocomplete(input, {
                types: ["address"],
                fields: ["address_components", "formatted_address", "geometry"],
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                if (!place.geometry) {
                    console.error("No place details available.");
                    return;
                }

                const addressData = {
                    street_number: "",
                    route: "",
                    subpremise: "",
                    city: "",
                    state: "",
                    country: "",
                    postal_code: "",
                };

                place.address_components.forEach((component) => {
                    const type = component.types[0];
                    switch (type) {
                        case "street_number":
                            addressData.street_number = component.long_name;
                            break;
                        case "route":
                            addressData.route = component.long_name;
                            break;
                        case "subpremise":
                            addressData.subpremise = component.long_name;
                            break;
                        case "locality":
                            addressData.city = component.long_name;
                            break;
                        case "administrative_area_level_1":
                            addressData.state = component.long_name;
                            break;
                        case "country":
                            addressData.country = component.long_name;
                            break;
                        case "postal_code":
                            addressData.postal_code = component.long_name;
                            break;
                    }
                });

                const address_line_1 =
                    `${addressData.street_number} ${addressData.route}`.trim();
                const address_line_2 = addressData.subpremise
                    ? `Unit ${addressData.subpremise}`
                    : "";

                setData((prevData) => ({
                    ...prevData,
                    address_line_1,
                    address_line_2,
                    city: addressData.city || "",
                    state: addressData.state || "",
                    country: addressData.country || "",
                    postal_code: addressData.postal_code || "",
                    drop_lat: place.geometry.location.lat(),
                    drop_lng: place.geometry.location.lng(),
                }));
            });

            autocompleteInitialized.current = true;
        };

        loadGoogleMapsScript();

        return () => {
            const script = document.querySelector(
                `script[src*="maps.googleapis.com/maps/api"]`
            );
            if (script) {
                script.remove();
            }
            autocompleteInitialized.current = false;
        };
    }, [googleMapsApiKey]);

    // Handle phone number input with validation
    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d{0,10}$/.test(inputValue)) {
            setData("phone", inputValue);
        }
    };

    // Add success notification handling
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/register");
    };

    const showNotification = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000); // Hide after 5 seconds
    };

    return (
        <MainLayout>
            {showSuccess && (
                <div
                    className="fixed top-4 right-4 z-50 max-w-md bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4"
                    role="alert"
                >
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <CheckCircle
                                className="h-6 w-6 text-green-500"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                                Registration Successful!
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {flash.message ||
                                    "Your account has been created successfully."}
                            </p>
                        </div>
                        <div className="ml-auto pl-3">
                            <div className="-mx-1.5 -my-1.5">
                                <button
                                    type="button"
                                    className="inline-flex rounded-md p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none"
                                    onClick={() => setShowSuccess(false)}
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <X className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                                                id="address_line_1"
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

                                    <div className="w-full mb-[30px] px-[15px]">
                                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                                            <input
                                                type="text"
                                                placeholder="Landmark (Optional)"
                                                value={data.drop_landmark}
                                                onChange={(e) =>
                                                    setData(
                                                        "drop_landmark",
                                                        e.target.value
                                                    )
                                                }
                                                className="bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full"
                                            />
                                        </div>
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
