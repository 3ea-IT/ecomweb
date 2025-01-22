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
        <section className="py-8 sm:py-16 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 max-w-[320px] sm:max-w-none">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="font-lobster text-3xl sm:text-4xl text-white mb-4">
                        Customer Reviews
                    </h2>
                    <div className="w-16 sm:w-24 h-1 bg-red-500 mx-auto"></div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-12 z-10 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-12 z-10 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </button>

                    <div className="rounded-lg sm:rounded-2xl bg-gray-800/50 backdrop-blur-lg shadow-2xl">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className={`transition-opacity duration-500 ${
                                    currentIndex === index
                                        ? "opacity-100 relative"
                                        : "opacity-0 absolute inset-0"
                                }`}
                            >
                                <div className="p-4 sm:p-8">
                                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                                        <div className="w-full sm:w-1/2">
                                            <div className="relative group">
                                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg sm:rounded-2xl -rotate-6 scale-105 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                                <div className="relative bg-white rounded-lg sm:rounded-2xl overflow-hidden shadow-xl">
                                                    <img
                                                        src={
                                                            review.reviewer_image
                                                        }
                                                        alt={`Review by ${review.reviewer_name}`}
                                                        className="w-full h-auto"
                                                    />
                                                    <div
                                                        className={`absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 rounded-lg ${getPlatformColor(
                                                            review.platform
                                                        )} shadow-lg`}
                                                    >
                                                        <img
                                                            src={
                                                                review.platform_icon
                                                            }
                                                            alt={
                                                                review.platform
                                                            }
                                                            className="w-4 h-4 sm:w-6 sm:h-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2 relative px-2 sm:px-0">
                                            <Quote className="hidden sm:block absolute top-0 left-0 w-8 sm:w-12 h-8 sm:h-12 text-gray-400/30 -translate-x-4 sm:-translate-x-6 -translate-y-4 sm:-translate-y-6" />
                                            <div className="space-y-3 sm:space-y-6">
                                                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                                                    <h4 className="font-semibold text-lg sm:text-xl text-white text-center sm:text-left">
                                                        {review.reviewer_name}
                                                    </h4>
                                                    <div className="flex items-center gap-1">
                                                        {Array.from({
                                                            length: 5,
                                                        }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                                                    i <
                                                                    review.rating
                                                                        ? "text-yellow-400 fill-current"
                                                                        : "text-gray-600"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-300 text-base sm:text-lg leading-relaxed italic text-center sm:text-left">
                                                    {review.review_text}
                                                </p>
                                            </div>
                                            <Quote className="hidden sm:block absolute bottom-0 right-0 w-8 sm:w-12 h-8 sm:h-12 text-gray-400/30 translate-x-4 sm:translate-x-6 translate-y-4 sm:translate-y-6 rotate-180" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4 sm:mt-8 gap-2">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 sm:h-2 rounded-full transition-all ${
                                    currentIndex === index
                                        ? "bg-red-500 w-6 sm:w-8"
                                        : "bg-gray-600 w-2 hover:bg-gray-500"
                                }`}
                            />
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <a
                            href="/reviews"
                            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-full hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
