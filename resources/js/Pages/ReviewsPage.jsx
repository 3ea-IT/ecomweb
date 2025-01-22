import React, { useState } from "react";
import { Star, CheckCircle } from "lucide-react";
import MainLayout from "../Layouts/MainLayout";

const ReviewsPage = ({ reviews }) => {
    const [selectedPlatform, setSelectedPlatform] = useState("all");
    const [selectedImage, setSelectedImage] = useState(null);

    const platforms = [
        { name: "all", label: "All Reviews" },
        { name: "google", label: "Google" },
        { name: "zomato", label: "Zomato" },
        { name: "swiggy", label: "Swiggy" },
    ];

    const getPlatformColor = (platform) => {
        switch (platform.toLowerCase()) {
            case "google":
                return "bg-blue-500";
            case "zomato":
                return "bg-red-500";
            case "swiggy":
                return "bg-orange-500";
            default:
                return "bg-gray-500";
        }
    };

    const filteredReviews = reviews.data.filter((review) => {
        return (
            selectedPlatform === "all" ||
            review.platform.toLowerCase() === selectedPlatform
        );
    });

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <div className="relative bg-gray-900 text-white mt-14">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20"></div>
                        <div
                            className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_rgb(255_255_255_/_0.15)_1px,_transparent_0)]"
                            style={{ backgroundSize: "24px 24px" }}
                        ></div>
                    </div>

                    <div className="relative container mx-auto px-4 py-20">
                        <h1 className="text-5xl font-bold mb-4 text-center">
                            Our Customer Reviews
                        </h1>
                        <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">
                            See what our customers are saying about their
                            experiences with us
                        </p>
                    </div>
                </div>

                {/* Updated Filters Section - Horizontal Scroll */}
                <div className="sticky top-16 bg-white/90 backdrop-blur-lg border-b z-20 shadow-sm">
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex gap-3 min-w-max">
                                {platforms.map((platform) => (
                                    <button
                                        key={platform.name}
                                        onClick={() =>
                                            setSelectedPlatform(platform.name)
                                        }
                                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                                            ${
                                                selectedPlatform ===
                                                platform.name
                                                    ? "bg-gray-900 text-white shadow-md"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {platform.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredReviews.map((review, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div
                                    className="relative h-48 bg-gray-100 overflow-hidden cursor-pointer"
                                    onClick={() =>
                                        openImageModal(review.reviewer_image)
                                    }
                                >
                                    <div className="h-full w-full transition-transform duration-300 transform group-hover:scale-110">
                                        <img
                                            src={review.reviewer_image}
                                            alt={`Review by ${review.reviewer_name}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div
                                        className={`absolute top-4 right-4 p-2 rounded-lg ${getPlatformColor(
                                            review.platform
                                        )} shadow-lg`}
                                    >
                                        <img
                                            src={review.platform_icon}
                                            alt={review.platform}
                                            className="w-6 h-6"
                                        />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-lg">
                                            {review.reviewer_name}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            i < review.rating
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-300"
                                                        }`}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 line-clamp-4">
                                        {review.review_text}
                                    </p>

                                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            {new Date(
                                                review.created_at
                                            ).toLocaleDateString()}
                                        </div>
                                        {review.is_featured && (
                                            <div className="flex items-center gap-1 text-sm text-green-600">
                                                <CheckCircle className="w-4 h-4" />
                                                Featured Review
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {reviews.links && (
                        <div className="mt-12 flex justify-center gap-2 flex-wrap">
                            {reviews.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        (window.location.href = link.url)
                                    }
                                    disabled={!link.url}
                                    className={`px-4 py-2 rounded-lg transition-all ${
                                        link.active
                                            ? "bg-gray-900 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    } ${
                                        !link.url &&
                                        "opacity-50 cursor-not-allowed"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal/Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
                    <div className="relative max-w-4xl w-full max-h-full overflow-auto">
                        <img
                            src={selectedImage}
                            alt="Full View"
                            className="mx-auto rounded-lg shadow-lg"
                        />
                        <button
                            onClick={closeImageModal}
                            className="absolute top-2 right-2 text-white bg-black/50 p-2 rounded-full hover:bg-black"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default ReviewsPage;
