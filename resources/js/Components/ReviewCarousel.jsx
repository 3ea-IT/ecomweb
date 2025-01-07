import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const ReviewCarousel = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex(
                (prev) => (prev - 1 + reviews.length) % reviews.length
            );
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

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

    return (
        <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-lobster text-4xl text-white mb-4">
                        Customer Reviews
                    </h2>
                    <div className="w-24 h-1 bg-red-500 mx-auto"></div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Reviews Carousel */}
                    <div className="overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-lg shadow-2xl">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${
                                    currentIndex * 100
                                }%)`,
                            }}
                        >
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="w-full flex-shrink-0 p-8 flex flex-col md:flex-row items-center gap-8"
                                >
                                    {/* Review Screenshot */}
                                    <div className="md:w-1/2">
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl -rotate-6 scale-105 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                                                <img
                                                    src={review.reviewer_image}
                                                    alt={`Review by ${review.reviewer_name}`}
                                                    className="w-full h-auto"
                                                />
                                                <div
                                                    className={`absolute top-4 right-4 p-2 rounded-lg ${getPlatformColor(
                                                        review.platform
                                                    )} shadow-lg`}
                                                >
                                                    <img
                                                        src={
                                                            review.platform_icon
                                                        }
                                                        alt={review.platform}
                                                        className="w-6 h-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review Content */}
                                    <div className="md:w-1/2 relative">
                                        <Quote className="absolute top-0 left-0 w-12 h-12 text-gray-400/30 -translate-x-6 -translate-y-6" />
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <h4 className="font-semibold text-xl text-white">
                                                    {review.reviewer_name}
                                                </h4>
                                                <div className="flex items-center gap-1">
                                                    {Array.from({
                                                        length: 5,
                                                    }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-5 h-5 ${
                                                                i <
                                                                review.rating
                                                                    ? "text-yellow-400 fill-current"
                                                                    : "text-gray-600"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-300 text-lg leading-relaxed italic">
                                                {review.review_text}
                                            </p>
                                        </div>
                                        <Quote className="absolute bottom-0 right-0 w-12 h-12 text-gray-400/30 translate-x-6 translate-y-6 rotate-180" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 gap-2">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all ${
                                    currentIndex === index
                                        ? "bg-red-500 w-8"
                                        : "bg-gray-600 w-2 hover:bg-gray-500"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewCarousel;
