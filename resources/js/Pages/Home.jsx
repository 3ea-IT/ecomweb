import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { handleAddToCartClick } from "../utils/cart_model"; // Correct path to cart_model.js
import { usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { Link } from "@inertiajs/react";
import ReviewCarousel from "../Components/ReviewCarousel";
import OffersCarousel from "../Components/OffersCarousel";

const SpecialMenu = ({ data, reviews }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        console.log("Received Product Data:", data); // Debugging
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash, data]);

    return (
        <>
            {/* Banner */}
            <div className="main-bnr-one overflow-hidden relative mt-12">
                <div className="main-slider-1 overflow-hidden z-[1]">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="banner-inner lg:pt-0 md:pt-[110px] pt-[110px] overflow-hidden">
                                <div className="container h-full">
                                    <div className="row items-center md:justify-between justify-center h-full">
                                        <div className="md:w-7/12 px-[15px]">
                                            <div className="banner-content md:mb-[60px] mb-0">
                                                <span className="font-medium md:text-xl text-base text-[var(--secondary-dark)] mb-[10px] block">
                                                    A STORY OF THE BEST
                                                    RESTAURANT
                                                </span>
                                                <h1 className="font-lobster text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4">
                                                    Pizzaport{" "}
                                                    <span className="font-serif font-bold">
                                                        &{" "}
                                                    </span>
                                                    <span>Cafe</span>
                                                </h1>
                                                <p className="max-w-[500px] lg:text-lg sm:text-base text-sm leading-[27px]">
                                                    Pizzaport & Cafe was
                                                    conceptualised in 2000 and
                                                    is currently in Lucknow and
                                                    Andheri(W) Mumbai. The
                                                    restaurant is known for
                                                    delivering the best Pan
                                                    Asian and Continental
                                                    cuisine, which tastes divine
                                                    with every bite, in addition
                                                    to pizza. Since we only work
                                                    with the most reputable
                                                    vendors, the ingredients we
                                                    utilise to make oufr
                                                    toppings are always fresh
                                                    and delectable. We’re driven
                                                    to be the best at creating
                                                    innovative recipes.
                                                </p>
                                                <div className="banner-btn flex items-center lg:mt-10 mt-[25px] gap-[30px]">
                                                    <Link
                                                        href="/menu"
                                                        className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                                    >
                                                        <span className="font-medium">
                                                            Explore Menu
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="banner-btn flex items-center lg:mt-7 mt-[25px] gap-[30px]">
                                                    <Link
                                                        href="#reviews"
                                                        className="inline-flex items-center px-8 py-3 rounded-full bg-[#FE9F10] text-white hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                                    >
                                                        <span className="font-medium">
                                                            Reviews
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-5/12 px-[15px]">
                                            <div className="banner-media">
                                                <img
                                                    src="/assets/images/extras/burger_main.png"
                                                    alt="Main Slider 1"
                                                    className="xl:w-[600px] lg:w-[500px] md:w-[100%] sm:w-[350px] w-[300px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <img
                                    src="/asset/images/main-slider/slider1/img3.png"
                                    className="img1"
                                    alt="Background 1"
                                />
                                <img
                                    src="/asset/images/main-slider/slider1/img1.png"
                                    className="img2"
                                    alt="Background 2"
                                />
                                <img
                                    src="/asset/images/main-slider/slider1/img2.png"
                                    className="img3 animate-motion"
                                    alt="Background 3"
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End */}

            <OffersCarousel />

            {/* Special Menu Start */}
            <section className="lg:pt-[50px] pt-[25px] lg:pb-[70px] pb-[40px] bg-white relative overflow-hidden section-wrapper-2">
                <div className="container">
                    <div className="2xl:mb-[50px] mb-[25px] relative mx-auto text-center">
                        <h2 className="font-lobster">Best Selling Items</h2>
                    </div>

                    {/* Product Grid */}
                    <div className="row">
                        {data.map((product) => {
                            // If you want the "short description" + "read more" logic from menu.jsx:
                            const description =
                                product.product_description || "";
                            const shortDescription = description
                                .split(" ")
                                .slice(0, 10)
                                .join(" ");
                            const hasLongDescription =
                                description.split(" ").length > 10;

                            return (
                                <div
                                    key={product.product_id}
                                    className="lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px]"
                                >
                                    {/* 
                                        BELOW is the same card styling from menu.jsx (ProductCard).
                                        We are simply pasting the same classNames and layout 
                                        so it looks identical to how it does on the Menu page.
                                    */}
                                    <div className="group rounded-lg bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden shadow-sm hover:shadow-lg">
                                        {/* Image Container */}
                                        <div className="w-full aspect-[4/3] overflow-hidden">
                                            <img
                                                src={`https://console.pizzaportindia.com/${product.main_image_url}`}
                                                alt={product.product_name}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>

                                        {/* Content Container */}
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h4 className="text-lg font-semibold mb-2 line-clamp-2">
                                                <Link
                                                    href={`/product-detail/${product.product_id}`}
                                                >
                                                    {product.product_name}
                                                </Link>
                                            </h4>

                                            <p className="text-gray-600 text-sm mb-3 flex-grow">
                                                {shortDescription}
                                                {hasLongDescription && (
                                                    <button
                                                        onClick={() =>
                                                            handleAddToCartClick(
                                                                product.product_id
                                                            )
                                                        }
                                                        className="text-primary ml-1 hover:underline"
                                                    >
                                                        Read more →
                                                    </button>
                                                )}
                                            </p>

                                            {/* Price Display */}
                                            <div className="mt-auto">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        {product.base_sale_price &&
                                                        parseFloat(
                                                            product.base_sale_price
                                                        ) <
                                                            parseFloat(
                                                                product.base_mrp
                                                            ) ? (
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400 line-through text-sm">
                                                                    ₹
                                                                    {
                                                                        product.base_mrp
                                                                    }
                                                                </span>
                                                                <span className="text-primary font-semibold">
                                                                    ₹
                                                                    {
                                                                        product.base_sale_price
                                                                    }
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-primary font-semibold">
                                                                ₹
                                                                {
                                                                    product.base_mrp
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleAddToCartClick(
                                                                product.product_id
                                                            )
                                                        }
                                                        className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition duration-200"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End of Product Card */}
                                </div>
                            );
                        })}
                    </div>

                    {/* Explore More Section */}
                    <div className="flex justify-center mt-8 mb-4">
                        <Link
                            href="/menu"
                            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition duration-300 ease-out border-2 border-red-600 rounded-full shadow-md text-xl hover:scale-105"
                        >
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-600 group-hover:translate-x-0 ease">
                                <i className="fa-solid fa-pizza-slice mr-2"></i>
                                Explore Full Menu
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-red-600 transition-all duration-300 transform group-hover:translate-x-full ease">
                                Explore Full Menu
                                <i className="fa-solid fa-arrow-right ml-2"></i>
                            </span>
                            <span className="relative invisible" id="reviews">
                                Explore Full Menu
                            </span>
                        </Link>
                    </div>
                </div>
                <img
                    src="/asset/images/background/pic2.png"
                    alt=""
                    className="bg1 bottom-0 left-[-275px] absolute max-2xl:hidden animate-move"
                />
                <img
                    src="/asset/images/background/pic3.png"
                    alt=""
                    className="bg2 right-[40px] max-2xl:right-0 top-[100px] max-2xl:top-[28px] absolute 2xl:block hidden"
                />
            </section>
            {/* Special Menu End */}

            {/* <!-- Testimonial's Start  --> */}
            {/* <section
                id="testimonials"
                class="sm:py-[100px] py-[40px] bg-white relative overflow-hidden"
            >
                <div class="container">
                    <div class="2xl:mb-[50px] mb-[25px] relative mx-auto text-center">
                        <h2 class="font-lobster">Customer's Comment</h2>
                    </div>
                    <div class="row mx-0">
                        <div class="lg:w-7/12 w-full">
                            <div class="swiper testimonial-one-thumb w-full">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <img
                                            src="/asset/images/testimonial/small/pic1.jpg"
                                            alt="/"
                                        />
                                    </div>
                                    <div class="swiper-slide">
                                        <img
                                            src="/asset/images/testimonial/small/pic2.jpg"
                                            alt="/"
                                        />
                                    </div>
                                    <div class="swiper-slide">
                                        <img
                                            src="/asset/images/testimonial/small/pic3.jpg"
                                            alt="/"
                                        />
                                    </div>
                                    <div class="swiper-slide">
                                        <img
                                            src="/asset/images/testimonial/small/pic4.jpg"
                                            alt="/"
                                        />
                                    </div>
                                    <div class="swiper-slide">
                                        <img
                                            src="/asset/images/testimonial/small/pic5.jpg"
                                            alt="/"
                                        />
                                    </div>
                                    <div class="swiper-slide">
                                        <img
                                            src="/asset/images/testimonial/small/pic6.jpg"
                                            alt="/"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="lg:w-5/12 w-full">
                            <div class="swiper testimonial-one-swiper h-100">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <div class="testimonial-1 bg-primary relative lg:py-[35px] lg:px-10 py-[25px] px-[15px] h-full lg:rounded-se-[10px] rounded-ee-[10px] rounded-se-none lg:rounded-es-none rounded-es-[10px] flex flex-col">
                                            <div class="testimonial-text relative mb-[10px]">
                                                <p class="lg:text-[18px] max-2lg:text-[16px] text-base text-white leading-[1.8]">
                                                    I have been eating pizza
                                                    since 2014 or maybe way
                                                    before that . One of the
                                                    best pizzas in town . I
                                                    recently visited and tried
                                                    their famous Indiana Pizza
                                                    ,Chilli Paneer and Fried
                                                    Rice . Pizza is a must try
                                                    at this place
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    Abhishekh Pandey
                                                </h5>
                                                <span class="testimonial-position text-white leading-[21px] text-sm block">
                                                    Google
                                                </span>
                                            </div>
                                            <i class="flaticon-right-quote quote absolute lg:right-[35px] right-5 bottom-[5px] lg:text-[140px] text-[85px] text-[var(--secondary)] inline-flex items-center"></i>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="testimonial-1 bg-primary relative lg:py-[35px] lg:px-10 py-[25px] px-[15px] h-full lg:rounded-se-[10px] rounded-ee-[10px] rounded-se-none lg:rounded-es-none rounded-es-[10px] flex flex-col">
                                            <div class="testimonial-text relative mb-[10px]">
                                                <p class="lg:text-[18px] max-2lg:text-[16px] text-base text-white leading-[1.8]">
                                                    The most scrumptious &
                                                    delicious Chinese food in
                                                    town. I don't think anyone
                                                    will have a negative review
                                                    about Pizza port & its
                                                    food."
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    the dailydelish
                                                </h5>
                                                <span class="testimonial-position text-white leading-[21px] text-sm block">
                                                    Food Expert
                                                </span>
                                            </div>
                                            <i class="flaticon-right-quote quote absolute lg:right-[35px] right-5 bottom-[5px] lg:text-[140px] text-[85px] text-[var(--secondary)] inline-flex items-center"></i>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="testimonial-1 bg-primary relative lg:py-[35px] lg:px-10 py-[25px] px-[15px] h-full lg:rounded-se-[10px] rounded-ee-[10px] rounded-se-none lg:rounded-es-none rounded-es-[10px] flex flex-col">
                                            <div class="testimonial-text relative mb-[10px]">
                                                <p class="lg:text-[18px] max-2lg:text-[16px] text-base text-white leading-[1.8]">
                                                    "Quiet good place for
                                                    foodies. Pizza is very
                                                    delicious, specially Dallas
                                                    pizza. Love the noodles as
                                                    well. Quality food. Love the
                                                    place."
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    CoreVoice.. Suryanshu
                                                </h5>
                                                <span class="testimonial-position text-white leading-[21px] text-sm block">
                                                    Google
                                                </span>
                                            </div>
                                            <i class="flaticon-right-quote quote absolute lg:right-[35px] right-5 bottom-[5px] lg:text-[140px] text-[85px] text-[var(--secondary)] inline-flex items-center"></i>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="testimonial-1 bg-primary relative lg:py-[35px] lg:px-10 py-[25px] px-[15px] h-full lg:rounded-se-[10px] rounded-ee-[10px] rounded-se-none lg:rounded-es-none rounded-es-[10px] flex flex-col">
                                            <div class="testimonial-text relative mb-[10px]">
                                                <p class="lg:text-[18px] max-2lg:text-[16px] text-base text-white leading-[1.8]">
                                                    "This review is for everyone
                                                    who lives in Lucknow or is
                                                    visiting it. We went to this
                                                    place & tried their Pizzas,
                                                    it was excellent!"
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    Mohini W
                                                </h5>
                                                <span class="testimonial-position text-white leading-[21px] text-sm block">
                                                    Swiggy
                                                </span>
                                            </div>
                                            <i class="flaticon-right-quote quote absolute lg:right-[35px] right-5 bottom-[5px] lg:text-[140px] text-[85px] text-[var(--secondary)] inline-flex items-center"></i>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="testimonial-1 bg-primary relative lg:py-[35px] lg:px-10 py-[25px] px-[15px] h-full lg:rounded-se-[10px] rounded-ee-[10px] rounded-se-none lg:rounded-es-none rounded-es-[10px] flex flex-col">
                                            <div class="testimonial-text relative mb-[10px]">
                                                <p class="lg:text-[18px] max-2lg:text-[16px] text-base text-white leading-[1.8]">
                                                    "They serve the best taste
                                                    of each and every food which
                                                    they had in their list and
                                                    their service is superfast,
                                                    they are the best in
                                                    Lucknow:)"
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    Prince Singh
                                                </h5>
                                                <span class="testimonial-position text-white leading-[21px] text-sm block">
                                                    Google
                                                </span>
                                            </div>
                                            <i class="flaticon-right-quote quote absolute lg:right-[35px] right-5 bottom-[5px] lg:text-[140px] text-[85px] text-[var(--secondary)] inline-flex items-center"></i>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="testimonial-1 bg-primary relative lg:py-[35px] lg:px-10 py-[25px] px-[15px] h-full lg:rounded-se-[10px] rounded-ee-[10px] rounded-se-none lg:rounded-es-none rounded-es-[10px] flex flex-col">
                                            <div class="testimonial-text relative mb-[10px]">
                                                <p class="lg:text-[18px] max-2lg:text-[16px] text-base text-white leading-[1.8]">
                                                    "one of my favourite place
                                                    for pizza since
                                                    childhood...it is best place
                                                    wid calm ambience...n their
                                                    pizza(indiana) is my all tym
                                                    favourite".
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    Bhavya Srivastava
                                                </h5>
                                                <span class="testimonial-position text-white leading-[21px] text-sm block">
                                                    Zomato
                                                </span>
                                            </div>
                                            <i class="flaticon-right-quote quote absolute lg:right-[35px] right-5 bottom-[5px] lg:text-[140px] text-[85px] text-[var(--secondary)] inline-flex items-center"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    src="/asset/images/background/pic2.png"
                    alt=""
                    class="bottom-0 right-[-355px] absolute 2xl:block hidden animate-move"
                />
            </section> */}
            {/* <!--  Testimonial's End --> */}

            {/* <!-- Reviews --> */}
            <ReviewCarousel reviews={reviews} />
            {/* <!-- Reviews End --> */}

            {/* News & Blog Section */}
            <section className="content-inner sm:pb-[100px] pb-[40px] relative overflow-hidden hidden">
                <div className="container">
                    <div className="2xl:mb-[50px] mb-[25px] relative mx-auto text-center">
                        <h2 className="font-lobster">News & Blog</h2>
                    </div>
                    <div className="swiper swiper-visible blog-swiper overflow-visible">
                        <div className="swiper-wrapper">
                            {/* Blog Slide 1 */}
                            <div className="swiper-slide">
                                <div className="slide-box">
                                    <div className="card rela overlay-shine rounded-lg overflow-hidden shadow-[0_15px_55px_rgba(34,34,34,0.1)] sm:flex w-full bg-white group">
                                        <div className="dz-media sm:min-w-[240px] sm:w-[240px] w-full sm:h-auto h-[250px] mb-0 relative overflow-hidden">
                                            <a
                                                href="javascript:void(0);"
                                                className="block h-full"
                                            >
                                                <img
                                                    src="/asset/images/blog/grid/pic1.jpg"
                                                    alt="Blog Image 1"
                                                    className="h-full object-cover w-full group-hover:scale-110 duration-500"
                                                />
                                            </a>
                                        </div>
                                        <div className="content flex-col flex py-[25px] px-[30px] relative">
                                            <div className="mb-2.5">
                                                <ul className="flex items-center">
                                                    <li className="inline-block relative text-[13px] mr-3">
                                                        <a
                                                            className="text-inherit"
                                                            href="javascript:void(0);"
                                                        >
                                                            <i className="flaticon-calendar-date text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i>{" "}
                                                            30 Nov 2024
                                                        </a>
                                                    </li>
                                                    <li className="inline-block relative text-[13px] mr-3">
                                                        <a
                                                            className="text-inherit"
                                                            href="javascript:void(0);"
                                                        >
                                                            <i className="flaticon-chat-bubble text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i>{" "}
                                                            3.5K
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <h5 className="mb-2">
                                                <a href="blog-standard.html">
                                                    Taste of Paradise Dishes
                                                </a>
                                            </h5>
                                            <p>
                                                There are many variations of
                                                passages of Lorem Ipsum
                                                available, but the majority
                                                have.
                                            </p>
                                            <div>
                                                <a
                                                    href="blog-standard.html"
                                                    className="py-3 px-6 text-sm font-medium relative inline-flex items-center justify-center rounded-md mt-[18px] bg-primary border-primary text-white btn-hover-2"
                                                >
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Blog Slide 2 */}
                            <div className="swiper-slide">
                                <div className="slide-box">
                                    <div className="card rela overlay-shine overflow-hidden rounded-lg shadow-[0_15px_55px_rgba(34,34,34,0.1)] sm:flex bg-white group">
                                        <div className="dz-media sm:min-w-[240px] sm:w-[240px] w-full sm:h-auto h-[250px] mb-0 relative overflow-hidden">
                                            <a
                                                href="javascript:void(0);"
                                                className="block h-full"
                                            >
                                                <img
                                                    src="/asset/images/blog/grid/pic2.jpg"
                                                    alt="Blog Image 2"
                                                    className="h-full object-cover w-full group-hover:scale-110 duration-500"
                                                />
                                            </a>
                                        </div>
                                        <div className="content flex-col flex py-[25px] px-[30px] relative">
                                            <div className="mb-2.5">
                                                <ul className="flex items-center">
                                                    <li className="inline-block relative text-[13px] mr-3">
                                                        <a
                                                            className="text-inherit"
                                                            href="javascript:void(0);"
                                                        >
                                                            <i className="flaticon-calendar-date text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i>{" "}
                                                            30 Nov 2024
                                                        </a>
                                                    </li>
                                                    <li className="inline-block relative text-[13px] mr-3">
                                                        <a
                                                            className="text-inherit"
                                                            href="javascript:void(0);"
                                                        >
                                                            <i className="flaticon-chat-bubble text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i>{" "}
                                                            3.5K
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <h5 className="mb-2">
                                                <a href="blog-standard.html">
                                                    The Fork & Knife
                                                </a>
                                            </h5>
                                            <p>
                                                There are many variations of
                                                passages of Lorem Ipsum
                                                available, but the majority
                                                have.
                                            </p>
                                            <div>
                                                <a
                                                    href="blog-standard.html"
                                                    className="py-3 px-6 text-sm font-medium relative inline-flex items-center justify-center rounded-md mt-[18px] bg-primary border-primary text-white btn-hover-2"
                                                >
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Add additional slides as needed */}
                        </div>
                        <div className="swiper-nav">
                            <div className="swiper-button-prev blog-button-prev group hover:before:animate-spin">
                                <i className="fa-solid fa-arrow-left text-white group-hover:text-primary relative"></i>
                            </div>
                            <div className="swiper-button-next blog-button-next group hover:before:animate-spin">
                                <i className="fa-solid fa-arrow-right text-white group-hover:text-primary relative"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* News & Blog Section End */}

            <section className="relative py-16 bg-[url('/assets/images/extras/reservation-bg.png')] bg-cover bg-center bg-no-repeat">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70"></div>

                {/* Content Container */}
                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h2 className="font-lobster text-4xl md:text-5xl lg:text-6xl mb-4">
                            Reserve Your Special Moments
                        </h2>
                        <p className="text-lg md:text-xl mb-8 text-gray-200">
                            Create unforgettable memories at Pizzaport & Cafe.
                            Perfect for birthdays, anniversaries, or any
                            celebration.
                        </p>
                        <Link
                            href="/reservations"
                            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <span className="mr-2">Book Now</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                    <div className="relative h-16">
                        <div
                            className="absolute bottom-0 left-0 w-[200%] h-20 bg-white"
                            style={{
                                clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
                                opacity: "0.1",
                            }}
                        ></div>
                    </div>
                </div>
            </section>

            {/* Map Iframe Section */}
            <div className="relative p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                {/* Title Section */}
                <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                    Find Us Here
                </h3>

                {/* Map Wrapper */}
                <div className="relative overflow-hidden rounded-xl">
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 transform translate-y-full hover:translate-y-0 transition-transform duration-300">
                        <h4 className="font-semibold text-lg">
                            Pizzaport & Cafe
                        </h4>
                        <p className="text-sm opacity-90">
                            Best dining experience in town
                        </p>
                        <div className="mt-2 text-sm space-y-1">
                            <p className="flex items-center gap-2">
                                <span className="w-4">📍</span> Location Address
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="w-4">📞</span> +1234567890
                            </p>
                        </div>
                    </div>

                    {/* Map iframe */}
                    <iframe
                        className="w-full lg:h-[400px] sm:h-[350px] h-[300px] transition-all duration-300 hover:brightness-105"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.656913465935!2d80.94247997527054!3d26.88263937666514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd7fd5e8d487%3A0x5c3761f18a185ba3!2sPizzaport%20%26%20Cafe!5e0!3m2!1sen!2sin!4v1734323022706!5m2!1sen!2sin"
                        width="400"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            {/* Map Iframe Section End */}

            <ToastContainer />
        </>
    );
};

const Home = (props) => {
    const { data } = props;
    const { reviews } = props;

    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        console.log("Props:", props); // Log props for debugging

        // Check if there's a saved orderType in localStorage
        const orderType = localStorage.getItem("orderType");
        // if (orderType) {
        //     setShowModal(false); // Hide the modal if an order type is already saved
        //     console.log("Saved Order Type:", orderType); // Optionally, log the saved order type
        // }
    }, [props]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const closeModal = (value) => {
        if (value === "Delivery") {
            // window.location.href = "https://pizzaportandcafe.dotpe.in/";
            localStorage.setItem("orderType", value);
            setShowModal(false);
        } else {
            localStorage.setItem("orderType", value);
            setShowModal(false);
        }
    };

    // Inline styles for the modal and overlay
    const modalStyles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            zIndex: 9999,
            display: showModal ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
        },
        content: {
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            width: "300px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        button: {
            backgroundColor: "#e63900",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        },
    };

    return (
        <MainLayout>
            {/* {showModal && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.content}>
                        <button
                            style={{
                                ...modalStyles.button,
                                width: "100%", // Make buttons full-width
                                marginBottom: "10px", // Space between buttons
                                padding: "10px", // Add padding for better visual appearance
                                textAlign: "center", // Ensure text is centered inside the button
                            }}
                            onClick={() => closeModal("DineIn")} // Pass value to closeModal
                            value="DineIn"
                        >
                            Dine in
                        </button>
                        <button
                            style={{
                                ...modalStyles.button,
                                width: "100%",
                                marginBottom: "10px",
                                padding: "10px",
                                textAlign: "center",
                            }}
                            onClick={() => closeModal("Takeaway")} // Pass value to closeModal
                            value="Takeaway"
                        >
                            Takeaway
                        </button>
                        <button
                            style={{
                                ...modalStyles.button,
                                width: "100%",
                                padding: "10px",
                                textAlign: "center",
                            }}
                            onClick={() => closeModal("Delivery")} // Pass value to closeModal
                        >
                            Delivery
                        </button>
                    </div>
                </div>
            )} */}
            <SpecialMenu data={data} reviews={reviews} />
        </MainLayout>
    );
};

export default Home;
