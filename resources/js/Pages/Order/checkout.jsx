import React, { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import MainLayout from "../../Layouts/MainLayout";
import axios from "axios";

// Simple summary component
const OrderSummary = ({ cartItems }) => {
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.sale_price || item.unit_price;
            return total + price * item.quantity;
        }, 0);
    };

    const calculateAddonTotal = () => {
        return cartItems.reduce(
            (total, item) => total + (item.total_addon_price || 0),
            0
        );
    };

    const calculateGST = () => {
        return cartItems.reduce((total, item) => {
            const price = item.sale_price || item.unit_price;
            const itemTotal = price * item.quantity;
            const gstPercentage = item.gst || 0;
            return total + (itemTotal * gstPercentage) / 100;
        }, 0);
    };

    const calculateDiscount = () => {
        let totalDiscount = 0;
        const processedCoupons = new Set();

        cartItems.forEach((item) => {
            if (
                item.applied_coupon_id &&
                !processedCoupons.has(item.applied_coupon_id)
            ) {
                totalDiscount += parseFloat(item.cou_discount_value || 0);
                processedCoupons.add(item.applied_coupon_id);
            }
        });
        return totalDiscount;
    };

    const subtotal = calculateSubtotal();
    const addonTotal = calculateAddonTotal();
    const gstTotal = calculateGST();
    const discount = calculateDiscount();
    const finalTotal = subtotal + addonTotal + gstTotal - discount;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {addonTotal > 0 && (
                    <div className="flex justify-between text-gray-600">
                        <span>Add-ons Total</span>
                        <span>₹{addonTotal.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between text-gray-600">
                    <span>GST</span>
                    <span>₹{gstTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount Applied</span>
                        <span>-₹{discount.toFixed(2)}</span>
                    </div>
                )}
                <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{finalTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------

const Checkout = ({ CartList = [] }) => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const [cartItems, setCartItems] = useState(CartList);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");

    // 1) Get Google Maps key from Inertia page props
    const { googleMapsApiKey } = usePage().props;
    const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);

    // Form state for "Add New Address"
    const [addressForm, setAddressForm] = useState({
        full_name: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        phone_number: "",
        drop_landmark: "",
        drop_lat: null,
        drop_lng: null,
        is_default: false,
    });

    // We'll store a reference to the map + marker, if you want to manipulate them later
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    // For controlling whether we show the address section:
    const [orderType, setOrderType] = useState("");

    // ----------------------------------------------
    // A) LOAD GOOGLE MAPS SCRIPT ONCE
    // ----------------------------------------------
    useEffect(() => {
        if (!googleMapsApiKey) return; // No key => skip
        if (window.google && window.google.maps) {
            // Already loaded => just mark as loaded
            setGoogleScriptLoaded(true);
            return;
        }
        // If we haven't appended yet, do so now
        if (!googleScriptLoaded) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                setGoogleScriptLoaded(true);
            };
            document.body.appendChild(script);
        }
    }, [googleMapsApiKey, googleScriptLoaded]);

    // ----------------------------------------------
    // B) FETCHING DATA ON PAGE LOAD
    // ----------------------------------------------
    const fetchAddresses = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/user-addresses`,
                {
                    params: { user_id: userId },
                }
            );
            setAddresses(response.data);

            // Set default address if available
            const defaultAddress = response.data.find(
                (addr) => addr.is_default === 1
            );
            if (defaultAddress) {
                setSelectedAddress(defaultAddress.address_id);
            } else if (response.data.length) {
                setSelectedAddress(response.data[0].address_id);
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    const fetchCartItems = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User is not logged in. Please log in to view your cart.");
            return;
        }
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/cart-items`,
                {
                    params: { user_id: userId },
                }
            );
            if (response.data?.CartList) {
                setCartItems(response.data.CartList);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error.message);
            alert("Failed to fetch cart data.");
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setInitialLoading(true);
            try {
                await fetchCartItems();
                await fetchAddresses();
                const localOrderType = localStorage.getItem("orderType");
                setOrderType(localOrderType || "");
            } catch (error) {
                console.error("Error loading checkout data:", error);
            } finally {
                setInitialLoading(false);
            }
        };
        loadData();
    }, []);

    // ----------------------------------------------
    // C) PAYMENT LOGIC
    // ----------------------------------------------
    const calculateOrderTotals = () => {
        const processedCoupons = new Set();
        let subtotal = 0;
        let addonTotal = 0;
        let gstTotal = 0;
        let discountTotal = 0;

        cartItems.forEach((item) => {
            const price = item.sale_price || item.unit_price;
            subtotal += price * item.quantity;
            addonTotal += item.total_addon_price || 0;

            const itemTotal = price * item.quantity;
            const gstRate = item.gst || 0;
            gstTotal += (itemTotal * gstRate) / 100;

            if (
                item.applied_coupon_id &&
                !processedCoupons.has(item.applied_coupon_id)
            ) {
                discountTotal += parseFloat(item.cou_discount_value || 0);
                processedCoupons.add(item.applied_coupon_id);
            }
        });

        return {
            subtotal,
            addonTotal,
            gstTotal,
            discountTotal,
            finalTotal: subtotal + addonTotal + gstTotal - discountTotal,
        };
    };

    const handleAddToOrder = async (e) => {
        e.preventDefault();
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }
        if (orderType === "Delivery" && !selectedAddress) {
            alert("Please select or add a delivery address.");
            return;
        }

        setLoading(true);
        const userId = localStorage.getItem("userId");
        const OrderType = localStorage.getItem("orderType");

        try {
            const totals = calculateOrderTotals();
            const createOrderResp = await axios.post(
                `${import.meta.env.VITE_API_URL}/create-razorpay-order`,
                {
                    amount: Math.round(totals.finalTotal * 100), // in paise
                    total_amount: totals.finalTotal,
                    shipping_address_id: selectedAddress,
                    shipping_charges: 0,
                    tax_amount: totals.gstTotal,
                    coupon_amount: totals.discountTotal,
                    subtotal_amount: totals.subtotal,
                    payment_method: paymentMethod,
                    user_id: userId,
                    OrderType: OrderType,
                }
            );

            if (createOrderResp.data.razorpay_order_id) {
                const { razorpay_order_id } = createOrderResp.data;

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY,
                    amount: Math.round(totals.finalTotal * 100),
                    currency: "INR",
                    name: "Pizza Port",
                    description: "Order Payment",
                    order_id: razorpay_order_id,
                    handler: async function (response) {
                        try {
                            const verificationResponse = await axios.post(
                                `${
                                    import.meta.env.VITE_API_URL
                                }/confirm-payment`,
                                {
                                    razorpay_payment_id:
                                        response.razorpay_payment_id,
                                    razorpay_order_id:
                                        response.razorpay_order_id,
                                    razorpay_signature:
                                        response.razorpay_signature,
                                }
                            );

                            if (
                                verificationResponse.data.message ===
                                "Payment verified and order updated successfully."
                            ) {
                                alert("Order placed successfully!");
                                window.location.href = "/";
                            }
                        } catch (error) {
                            console.error(
                                "Payment verification failed:",
                                error
                            );
                            alert(
                                "Payment verification failed. Please contact support."
                            );
                        }
                    },
                    prefill: {
                        name: "Customer Name",
                        email: "customer@example.com",
                        contact: "9999999999",
                    },
                    theme: { color: "#3399cc" },
                };
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }
        } catch (error) {
            console.error("Error initiating payment:", error);
            alert("Could not initiate payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ----------------------------------------------
    // D) ADD NEW ADDRESS + MAP LOGIC
    // ----------------------------------------------
    const handleOpenAddressModal = () => {
        setShowAddressModal(true);
        // Reset form each time
        setAddressForm({
            full_name: "",
            address_line_1: "",
            address_line_2: "",
            city: "",
            state: "",
            country: "",
            postal_code: "",
            phone_number: "",
            drop_landmark: "",
            drop_lat: null,
            drop_lng: null,
            is_default: false,
        });
    };

    const handleCloseAddressModal = () => {
        setShowAddressModal(false);
    };

    // Initialize Map once the modal is open AND script is loaded
    useEffect(() => {
        if (showAddressModal && googleScriptLoaded) {
            initMap();
        }
    }, [showAddressModal, googleScriptLoaded]);

    // Add these console logs to your useEffect for script loading:
    useEffect(() => {
        console.log("Google Maps API Key:", googleMapsApiKey); // Will only show if key exists
        if (!googleMapsApiKey) {
            console.error("No Google Maps API key found");
            return;
        }

        if (window.google && window.google.maps) {
            console.log("Google Maps already loaded");
            setGoogleScriptLoaded(true);
            return;
        }

        if (!googleScriptLoaded) {
            console.log("Loading Google Maps script...");
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                console.log("Google Maps script loaded successfully");
                setGoogleScriptLoaded(true);
            };
            script.onerror = (error) => {
                console.error("Error loading Google Maps script:", error);
            };
            document.body.appendChild(script);
        }
    }, [googleMapsApiKey, googleScriptLoaded]);

    // Replace your existing initMap function with this updated version:
    const initMap = () => {
        console.log("Initializing map...");
        if (!window.google) {
            console.error("Google Maps not loaded yet");
            return;
        }

        const mapDiv = document.getElementById("addressMap");
        if (!mapDiv) {
            console.error("Map container not found");
            return;
        }

        // Ensure the map container has the correct styles
        mapDiv.style.width = "100%";
        mapDiv.style.height = "300px";
        mapDiv.style.position = "relative";

        // Create search input
        const searchInput = document.createElement("input");
        searchInput.setAttribute("type", "text");
        searchInput.setAttribute("placeholder", "Search for your location");
        searchInput.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        width: calc(100% - 60px);
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        font-size: 14px;
        z-index: 1;
        background: white;
    `;
        mapDiv.appendChild(searchInput);

        // Lucknow coordinates
        const lucknowCenter = { lat: 26.8467, lng: 80.9462 };

        try {
            const mapOptions = {
                center: lucknowCenter,
                zoom: 13,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
                zoomControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            };

            const mapObj = new google.maps.Map(mapDiv, mapOptions);
            setMap(mapObj);

            const markerObj = new google.maps.Marker({
                position: lucknowCenter,
                map: mapObj,
                draggable: true,
                animation: google.maps.Animation.DROP,
            });
            setMarker(markerObj);

            // Initialize the Places service
            const searchBox = new google.maps.places.SearchBox(searchInput);

            // Bias the SearchBox results towards current map's viewport
            mapObj.addListener("bounds_changed", () => {
                searchBox.setBounds(mapObj.getBounds());
            });

            // Listen for the event when a user selects a prediction
            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();

                if (places.length === 0) {
                    return;
                }

                const place = places[0];
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                // If the place has a geometry, then present it on a map
                if (place.geometry.viewport) {
                    mapObj.fitBounds(place.geometry.viewport);
                } else {
                    mapObj.setCenter(place.geometry.location);
                    mapObj.setZoom(17);
                }

                // Update marker position
                markerObj.setPosition(place.geometry.location);

                // Update form with new location details
                setAddressForm((prev) => ({
                    ...prev,
                    drop_lat: place.geometry.location.lat(),
                    drop_lng: place.geometry.location.lng(),
                    address_line_1:
                        place.formatted_address || prev.address_line_1,
                    city:
                        place.address_components?.find((c) =>
                            c.types.includes("locality")
                        )?.long_name || prev.city,
                    state:
                        place.address_components?.find((c) =>
                            c.types.includes("administrative_area_level_1")
                        )?.long_name || prev.state,
                    postal_code:
                        place.address_components?.find((c) =>
                            c.types.includes("postal_code")
                        )?.long_name || prev.postal_code,
                    country:
                        place.address_components?.find((c) =>
                            c.types.includes("country")
                        )?.long_name || prev.country,
                }));
            });

            // Update coordinates when marker is dragged
            markerObj.addListener("dragend", () => {
                const pos = markerObj.getPosition();
                if (!pos) return;

                // Update form with new coordinates
                setAddressForm((prev) => ({
                    ...prev,
                    drop_lat: pos.lat(),
                    drop_lng: pos.lng(),
                }));

                // Reverse geocode the coordinates to get address details
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: pos }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        const place = results[0];
                        setAddressForm((prev) => ({
                            ...prev,
                            address_line_1: place.formatted_address,
                            city:
                                place.address_components?.find((c) =>
                                    c.types.includes("locality")
                                )?.long_name || prev.city,
                            state:
                                place.address_components?.find((c) =>
                                    c.types.includes(
                                        "administrative_area_level_1"
                                    )
                                )?.long_name || prev.state,
                            postal_code:
                                place.address_components?.find((c) =>
                                    c.types.includes("postal_code")
                                )?.long_name || prev.postal_code,
                            country:
                                place.address_components?.find((c) =>
                                    c.types.includes("country")
                                )?.long_name || prev.country,
                        }));
                    }
                });
            });

            // Try to get user's current location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        mapObj.setCenter(pos);
                        markerObj.setPosition(pos);
                        setAddressForm((prev) => ({
                            ...prev,
                            drop_lat: pos.lat,
                            drop_lng: pos.lng,
                        }));
                    },
                    () => {
                        console.log(
                            "Geolocation failed. Using default center."
                        );
                    }
                );
            }
        } catch (error) {
            console.error("Error initializing map:", error);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("Please login first.");
                return;
            }
            const payload = { ...addressForm, user_id: userId };

            // Post to your user-addresses endpoint
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user-addresses`,
                payload
            );

            if (response.status === 201 || response.status === 200) {
                // Refresh address list
                await fetchAddresses();
                // Select the newly added address
                if (response.data?.address_id) {
                    setSelectedAddress(response.data.address_id);
                }
                setShowAddressModal(false);
            }
        } catch (error) {
            console.error("Error adding address:", error);
            alert("Failed to add address. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ----------------------------------------------
    // E) RENDER
    // ----------------------------------------------
    if (initialLoading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-screen">
                    {/* Simple Spinner */}
                    <svg
                        className="animate-spin h-12 w-12 text-red-500"
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
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* Banner Section */}
            <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
                            Checkout
                        </h2>
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal">
                                    <Link href="/" className="text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">
                                    Checkout
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            {/* Banner End */}

            {/* Checkout Section */}
            <section className="py-8 sm:py-12 lg:py-[100px] relative bg-white">
                <div className="container px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Cart Items */}
                        <div className="w-full">
                            <div className="widget">
                                <h4 className="widget-title text-xl sm:text-2xl mb-4 pb-3 relative">
                                    Your Order
                                </h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-[#00000020]">
                                        <thead className="text-center">
                                            <tr className="border-b border-[#00000020]">
                                                <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                    IMAGE
                                                </th>
                                                <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                    PRODUCT NAME
                                                </th>
                                                <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                    QUANTITY
                                                </th>
                                                <th className="bg-[#222] p-[15px] text-base font-semibold text-white">
                                                    TOTAL
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.length > 0 ? (
                                                cartItems.map(
                                                    (cartItem, index) => {
                                                        let addonIdArray = [];
                                                        try {
                                                            addonIdArray =
                                                                typeof cartItem.addon_ids ===
                                                                "string"
                                                                    ? JSON.parse(
                                                                          cartItem.addon_ids
                                                                      )
                                                                    : cartItem.addon_ids;
                                                        } catch (error) {
                                                            console.error(
                                                                "Error parsing addon_ids:",
                                                                error
                                                            );
                                                            addonIdArray = [];
                                                        }

                                                        const price =
                                                            cartItem.sale_price ||
                                                            cartItem.unit_price;
                                                        const itemTotal = (
                                                            price *
                                                            cartItem.quantity
                                                        ).toFixed(2);

                                                        return (
                                                            <tr key={index}>
                                                                <td className="p-[15px] font-medium border border-[#00000020] product-item-img">
                                                                    <img
                                                                        src={`https://console.pizzaportindia.com/${cartItem.product_image_url}`}
                                                                        alt={
                                                                            cartItem.product_name
                                                                        }
                                                                        className="w-[100px] rounded-md"
                                                                    />
                                                                </td>
                                                                <td className="p-[15px] font-medium border border-[#00000020] text-bodycolor">
                                                                    {
                                                                        cartItem.product_name
                                                                    }
                                                                    <br />
                                                                    {Array.isArray(
                                                                        addonIdArray
                                                                    ) &&
                                                                        addonIdArray.length >
                                                                            0 && (
                                                                            <>
                                                                                <hr
                                                                                    style={{
                                                                                        border: "1px solid #ccc",
                                                                                        margin: "10px 0",
                                                                                    }}
                                                                                />
                                                                                <span
                                                                                    style={{
                                                                                        color: "black",
                                                                                        fontSize:
                                                                                            "13px",
                                                                                    }}
                                                                                >
                                                                                    Added
                                                                                    Toppings:{" "}
                                                                                </span>
                                                                                <span
                                                                                    style={{
                                                                                        fontSize:
                                                                                            "13px",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        cartItem.addon_names
                                                                                    }
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                </td>
                                                                <td className="p-[15px] font-medium border border-[#00000020] text-bodycolor">
                                                                    {
                                                                        cartItem.quantity
                                                                    }
                                                                </td>
                                                                <td className="p-[15px] font-medium border border-[#00000020] text-bodycolor">
                                                                    ₹{itemTotal}
                                                                    <br />
                                                                    {cartItem.total_addon_price >
                                                                    0 ? (
                                                                        <>
                                                                            <span
                                                                                style={{
                                                                                    color: "#727272",
                                                                                    fontSize:
                                                                                        "10px",
                                                                                }}
                                                                            >
                                                                                Add-ons:
                                                                            </span>
                                                                            ₹
                                                                            {
                                                                                cartItem.total_addon_price
                                                                            }
                                                                        </>
                                                                    ) : null}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="4"
                                                        className="text-center p-[15px] font-medium text-bodycolor"
                                                    >
                                                        No items in your cart.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Order Summary Component */}
                            <OrderSummary cartItems={cartItems} />
                        </div>

                        {/* Right Column - Checkout Form */}
                        <div className="w-full">
                            <form
                                className="shop-form widget"
                                onSubmit={handleAddToOrder}
                            >
                                {/* Conditionally show address selection if orderType=Delivery */}
                                {orderType === "Delivery" && (
                                    <>
                                        <h4 className="widget-title text-xl sm:text-2xl mb-4 pb-3 relative">
                                            Delivery Address
                                        </h4>
                                        <div className="mb-6">
                                            {addresses.length > 0 ? (
                                                addresses.map((address) => (
                                                    <div
                                                        key={address.address_id}
                                                        className="border rounded-lg p-4 mb-3 cursor-pointer hover:border-primary"
                                                        onClick={() =>
                                                            setSelectedAddress(
                                                                address.address_id
                                                            )
                                                        }
                                                        style={{
                                                            borderColor:
                                                                selectedAddress ===
                                                                address.address_id
                                                                    ? "#ff0000"
                                                                    : "#e5e7eb",
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="radio"
                                                                name="address"
                                                                checked={
                                                                    selectedAddress ===
                                                                    address.address_id
                                                                }
                                                                onChange={() =>
                                                                    setSelectedAddress(
                                                                        address.address_id
                                                                    )
                                                                }
                                                                className="w-4 h-4 text-primary"
                                                            />
                                                            <div>
                                                                <p className="font-medium">
                                                                    {
                                                                        address.full_name
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {
                                                                        address.address_line_1
                                                                    }
                                                                    {address.address_line_2 &&
                                                                        `, ${address.address_line_2}`}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {
                                                                        address.city
                                                                    }
                                                                    ,{" "}
                                                                    {
                                                                        address.state
                                                                    }{" "}
                                                                    {
                                                                        address.postal_code
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {
                                                                        address.phone_number
                                                                    }
                                                                </p>
                                                                {address.drop_lat &&
                                                                    address.drop_lng && (
                                                                        <p className="text-xs text-gray-500">
                                                                            Lat:{" "}
                                                                            {
                                                                                address.drop_lat
                                                                            }
                                                                            ,
                                                                            Lng:{" "}
                                                                            {
                                                                                address.drop_lng
                                                                            }
                                                                        </p>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>
                                                    No saved addresses. Please
                                                    add one!
                                                </p>
                                            )}
                                            {/* Add new address button */}
                                            <button
                                                type="button"
                                                onClick={handleOpenAddressModal}
                                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                                            >
                                                Add New Address
                                            </button>
                                        </div>
                                    </>
                                )}

                                <h4 className="widget-title text-xl sm:text-2xl mb-4 pb-3 relative">
                                    Payment Method
                                </h4>
                                <div className="form-group pb-5 w-full">
                                    <select
                                        className="form-control w-full p-3 border rounded-lg"
                                        value={paymentMethod}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Payment Method
                                        </option>
                                        <option value="Razorpay">
                                            Online Payment
                                        </option>
                                    </select>
                                </div>

                                {/* Place Order Button */}
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary w-full py-3 rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors"
                                    >
                                        {loading
                                            ? "Processing..."
                                            : "Place Order Now"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Address Modal */}
            {showAddressModal && (
                // 1) Add a margin-top or a top offset to avoid going behind the header
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
                    style={{ marginTop: "80px" }} // or use a tailwind class like "mt-20"
                >
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={handleCloseAddressModal}
                    />
                    <div className="bg-white w-full max-w-2xl rounded-lg z-10 p-6 relative max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">
                            Add New Address
                        </h2>
                        <form
                            onSubmit={handleAddressSubmit}
                            className="space-y-4"
                        >
                            {/* -- Address fields -- */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={addressForm.full_name}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            full_name: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Address Line 1
                                </label>
                                <input
                                    type="text"
                                    value={addressForm.address_line_1}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            address_line_1: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Address Line 2
                                </label>
                                <input
                                    type="text"
                                    value={addressForm.address_line_2}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            address_line_2: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.city}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                city: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.state}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                state: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.country}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                country: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        value={addressForm.postal_code}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                postal_code: e.target.value,
                                            }))
                                        }
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    value={addressForm.phone_number}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            phone_number: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Drop Landmark
                                </label>
                                <input
                                    type="text"
                                    value={addressForm.drop_landmark}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            drop_landmark: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            {/* is_default checkbox */}
                            <div className="flex items-center space-x-2 mt-4">
                                <input
                                    type="checkbox"
                                    id="is_default"
                                    checked={addressForm.is_default}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            is_default: e.target.checked,
                                        }))
                                    }
                                    className="w-4 h-4"
                                />
                                <label htmlFor="is_default" className="text-sm">
                                    Set as default address
                                </label>
                            </div>

                            {/* Google Map Container */}
                            <div
                                className="mt-4 relative"
                                style={{ minHeight: "300px" }}
                            >
                                <label className="block text-sm font-medium mb-2">
                                    Map
                                </label>
                                <div
                                    id="addressMap"
                                    className="relative w-full h-[300px] border rounded-lg"
                                ></div>
                                {addressForm.drop_lat &&
                                    addressForm.drop_lng && (
                                        <p className="text-sm mt-1">
                                            Current Marker Position: (Lat:{" "}
                                            {addressForm.drop_lat}, Lng:{" "}
                                            {addressForm.drop_lng})
                                        </p>
                                    )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseAddressModal}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save Address"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default Checkout;
