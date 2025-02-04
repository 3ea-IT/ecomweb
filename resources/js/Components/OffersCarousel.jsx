import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const OffersCarousel = ({ offers = [] }) => {
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Demo offers - replace with your actual offer images
    const demoOffers = [
        { id: 1, image: "/assets/images/offers/FirstOrder.jpeg" },
        { id: 2, image: "/assets/images/offers/FirstOrder.jpeg" },
        { id: 3, image: "/assets/images/offers/FirstOrder.jpeg" },
        { id: 4, image: "/assets/images/offers/FirstOrder.jpeg" },
        { id: 5, image: "/assets/images/offers/FirstOrder.jpeg" },
    ];

    // Triple the offers array for smooth infinite scrolling
    const extendedOffers = [...demoOffers, ...demoOffers, ...demoOffers];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || isHovered) return;

        // Set initial scroll position to the middle set of items
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;

        const scroll = () => {
            scrollContainer.scrollLeft += 8; // Increased speed

            // When we reach the end of the middle set, jump back to the start of it
            if (
                scrollContainer.scrollLeft >=
                (scrollContainer.scrollWidth * 2) / 3
            ) {
                scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
            }
        };

        const intervalId = setInterval(scroll, 20);

        return () => clearInterval(intervalId);
    }, [isHovered]);

    const handleManualScroll = (direction) => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollAmount = direction === "left" ? -484 : 484; // Width of one offer card
        scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section
            className="py-8 relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative max-w-[1400px] mx-auto">
                {/* Navigation Arrows */}
                <button
                    onClick={() => handleManualScroll("left")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                    aria-label="Previous offer"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <button
                    onClick={() => handleManualScroll("right")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                    aria-label="Next offer"
                >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>

                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

                {/* Scrolling Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-hidden px-4 scroll-smooth"
                >
                    {extendedOffers.map((offer, index) => (
                        <div
                            key={`${offer.id}-${index}`}
                            className="flex-none w-[484px] transition-transform duration-300 hover:scale-[1.02]"
                        >
                           <a href="/menu"><img
                                src={offer.image}
                                alt="Special Offer"
                                className="w-full h-[322.73px] object-cover rounded-lg shadow-md"
                            /></a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OffersCarousel;
