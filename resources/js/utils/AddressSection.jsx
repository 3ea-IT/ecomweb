import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export function AddressSection({ onAddressAdded }) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // By default, set center to some location (e.g. city center)
    const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.209 }); // New Delhi as an example
    const [markerPosition, setMarkerPosition] = useState({
        lat: 28.6139,
        lng: 77.209,
    });

    // Basic address form
    const [addressForm, setAddressForm] = useState({
        full_name: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        phone_number: "",
        drop_lat: null, // will store pinned lat
        drop_lng: null, // will store pinned lng
        is_default: false,
    });

    // Load the Google Maps script
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        // Optionally, get user's current location to center the map
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                setMapCenter({ lat: latitude, lng: longitude });
                setMarkerPosition({ lat: latitude, lng: longitude });
            });
        }
    }, []);

    const handleMapClick = useCallback((e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setMarkerPosition({ lat, lng });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("No userId found in localStorage");
                setLoading(false);
                return;
            }

            // Include lat/lng in the payload
            const payload = {
                ...addressForm,
                user_id: userId,
                drop_lat: markerPosition.lat,
                drop_lng: markerPosition.lng,
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user-addresses`,
                payload
            );

            if (response.status === 201) {
                // Let parent know we have a new address
                onAddressAdded(response.data);

                // Clear & close
                setShowModal(false);
                setAddressForm({
                    full_name: "",
                    address_line_1: "",
                    address_line_2: "",
                    city: "",
                    state: "",
                    country: "",
                    postal_code: "",
                    phone_number: "",
                    drop_lat: null,
                    drop_lng: null,
                    is_default: false,
                });
            }
        } catch (error) {
            console.error("Error adding address:", error);
            alert("Failed to add address. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
                Add New Address
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setShowModal(false)}
                    />
                    {/* Modal content */}
                    <div className="bg-white w-full max-w-md rounded-lg z-10 p-6 relative max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">
                            Add New Address
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={addressForm.full_name}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            full_name: e.target.value,
                                        }))
                                    }
                                    required
                                />
                            </div>

                            {/* Address Line 1 */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Address Line 1
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={addressForm.address_line_1}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            address_line_1: e.target.value,
                                        }))
                                    }
                                    required
                                />
                            </div>

                            {/* Address Line 2 */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Address Line 2
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={addressForm.address_line_2}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            address_line_2: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            {/* City + State */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md"
                                        value={addressForm.city}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                city: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md"
                                        value={addressForm.state}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                state: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {/* Country + Postal Code */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md"
                                        value={addressForm.country}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                country: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md"
                                        value={addressForm.postal_code}
                                        onChange={(e) =>
                                            setAddressForm((prev) => ({
                                                ...prev,
                                                postal_code: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={addressForm.phone_number}
                                    onChange={(e) =>
                                        setAddressForm((prev) => ({
                                            ...prev,
                                            phone_number: e.target.value,
                                        }))
                                    }
                                    required
                                />
                            </div>

                            {/* Default Checkbox */}
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

                            {/* Google Map Section */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Pin your location
                                </label>
                                {isLoaded ? (
                                    <GoogleMap
                                        mapContainerStyle={{
                                            width: "100%",
                                            height: "300px",
                                        }}
                                        center={mapCenter}
                                        zoom={14}
                                        onClick={handleMapClick}
                                    >
                                        <Marker
                                            position={markerPosition}
                                            draggable={true}
                                            onDragEnd={(e) => {
                                                const lat = e.latLng.lat();
                                                const lng = e.latLng.lng();
                                                setMarkerPosition({
                                                    lat,
                                                    lng,
                                                });
                                            }}
                                        />
                                    </GoogleMap>
                                ) : (
                                    <p>Loading map...</p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
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
        </div>
    );
}
