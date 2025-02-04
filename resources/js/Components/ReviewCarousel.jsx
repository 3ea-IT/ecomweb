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
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, []);

    const getPlatformColor = (platform) => {
        switch (platform.toLowerCase()) {
            case "google":
                return "bg-blue-500";
            case "zomato":
                return "bg-white-500";
            case "swiggy":
                return "bg-orange-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <section className="py-12 sm:py-20 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="font-lobster text-4xl sm:text-5xl text-white mb-6 relative inline-block">
                        Customer Reviews
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                    </h2>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-16 z-10 p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20 group"
                    >
                        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-16 z-10 p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20 group"
                    >
                        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Review Cards */}
                    <div className="rounded-2xl bg-gray-800/50 backdrop-blur-lg shadow-2xl overflow-hidden">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-700 ease-in-out transform ${
                                    currentIndex === index
                                        ? "opacity-100 translate-x-0 relative"
                                        : "opacity-0 translate-x-full absolute inset-0"
                                }`}
                            >
                                <div className="p-6 sm:p-10">
                                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                                        {/* Image Section */}
                                        <div className="w-full lg:w-2/5">
                                            <div className="relative group transform transition-transform duration-500 hover:scale-105">
                                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl -rotate-6 scale-105 opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                                                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                                                    <img
                                                        src={
                                                            review.reviewer_image
                                                        }
                                                        alt={`Review by ${review.reviewer_name}`}
                                                        className="w-full h-auto object-cover"
                                                    />
                                                    <div
                                                        className={`absolute top-4 right-4 p-2.5 rounded-xl ${getPlatformColor(
                                                            review.platform
                                                        )} shadow-lg transform transition-transform duration-500 hover:scale-110`}
                                                    >
                                                        <img
                                                            src={
                                                                review.platform_icon
                                                            }
                                                            alt={
                                                                review.platform
                                                            }
                                                            className="w-6 h-6 sm:w-8 sm:h-8"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="w-full lg:w-3/5 relative px-4 sm:px-6">
                                            <Quote className="absolute top-0 rotate-180 left-0 w-12 h-12 text-gray-400/20 -translate-x-6 -translate-y-6" />
                                            <div className="space-y-6">
                                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                                    <h4 className="font-semibold text-2xl text-white">
                                                        {review.reviewer_name}
                                                    </h4>
                                                    <div className="flex items-center gap-1">
                                                        {Array.from({
                                                            length: 5,
                                                        }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                                                    i <
                                                                    review.rating
                                                                        ? "text-yellow-400 fill-current"
                                                                        : "text-gray-600"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-300 text-lg sm:text-xl leading-relaxed italic">
                                                    {review.review_text}
                                                </p>
                                            </div>
                                            <Quote className="absolute bottom-0 right-0 w-12 h-12 text-gray-400/20 translate-x-6 translate-y-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 gap-3">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`transition-all duration-300 rounded-full ${
                                    currentIndex === index
                                        ? "bg-gradient-to-r from-red-500 to-orange-500 w-8 h-2"
                                        : "bg-gray-600 w-2 h-2 hover:bg-gray-500"
                                }`}
                            />
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-12 text-center">
                        <a
                            href="/reviews"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-full hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            See All Reviews
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewCarousel;
