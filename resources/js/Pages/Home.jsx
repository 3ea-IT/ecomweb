import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout"; // Assuming this layout exists
import { Link } from "@inertiajs/react";
import Header from "../Components/Header";
import CartDetail from "../Pages/CartDetail";

const SpecialMenu = ({ data, countCart }) => {
    const [cart, setCart] = useState([]); // State to store the cart

    const handleAddToCart = async (productId) => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/add-to-cart",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        product_id: productId,
                    }),
                }
            );

            // Check if the response is ok
            if (!response.ok) {
                // If response is not ok, get the error message from the response
                const data = await response.json();
                alert(data.error || "Could not update the cart.");
                throw new Error("Could not update the cart.");
            }

            // Handle successful response
            const data = await response.json();
            alert("Product added to cart!");
            // Optionally, update the cart state or UI here
            // Reload the page after showing the alert
            location.reload();
        } catch (error) {
            // Handle errors (network errors, JSON parsing errors, etc.)
            console.error("Error:", error);
            alert("Error: Could not update the cart. Please try again later.");
        }
    };

    return (
        <MainLayout>
            {/* Banner */}
            <div className="main-bnr-one overflow-hidden relative">
                <div className="slider-pagination 2xl:left-[50px] xl:left-0 max-xl:left-auto max-xl:right-[20px] z-[2]">
                    <div className="main-button-prev lg:block hidden mx-auto">
                        <i className="fa-solid fa-arrow-up"></i>
                    </div>
                    <div className="main-slider-pagination">
                        <span className="swiper-pagination-bullet">01</span>
                        <span className="swiper-pagination-bullet">02</span>
                        <span className="swiper-pagination-bullet">03</span>
                    </div>
                    <div className="main-button-next lg:block hidden mx-auto">
                        <i className="fa-solid fa-arrow-down"></i>
                    </div>
                </div>
                <div className="main-slider-1 overflow-hidden z-[1]">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="banner-inner lg:pt-0 md:pt-[110px] pt-[110px] overflow-hidden">
                                <div className="container h-full">
                                    <div className="row items-center md:justify-between justify-center h-full">
                                        <div className="md:w-7/12 px-[15px]">
                                            <div className="banner-content md:mb-[60px] mb-0">
                                                <span className="font-medium md:text-xl text-base text-[var(--secondary-dark)] mb-[10px] block">
                                                    High Quality Test Station
                                                </span>
                                                <h1 className="font-lobster mb-2.5 text-black2">
                                                    Choosing The
                                                    <br />
                                                    Best{" "}
                                                    <span className="text-primary">
                                                        Quality Food
                                                    </span>
                                                </h1>
                                                <p className="max-w-[500px] lg:text-lg sm:text-base text-sm leading-[27px]">
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit,
                                                    sed do eiusmod tempor
                                                    incididunt ut labore et
                                                    dolore magna aliqua.
                                                </p>
                                                <div className="banner-btn flex items-center lg:mt-10 mt-[25px] gap-[30px]">
                                                    <a
                                                        href="contact-us.html"
                                                        className="btn btn-primary btn-md btn-hover-1"
                                                    >
                                                        <span>
                                                            Book a Table
                                                        </span>
                                                    </a>
                                                    <a
                                                        href="about-us.html"
                                                        className="btn btn-outline text-primary btn-md btn-hover-1"
                                                    >
                                                        <span>View More</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-5/12 px-[15px]">
                                            <div className="banner-media">
                                                <img
                                                    src="/asset/images/main-slider/slider1/pic1.png"
                                                    alt="Main Slider 1"
                                                    className="xl:w-full lg:w-[450px] md:w-[100%] sm:w-[250px] w-[250px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img
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
                                />
                            </div>
                        </div>
                        {/* Repeat for additional slides */}
                    </div>
                </div>
                <div className="container relative z-[1]">
                    <div className="main-thumb1-area swiper-btn-lr">
                        <div className="swiper main-thumb1 w-[612px] h-auto overflow-hidden">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="food-card flex items-center">
                                        <div className="dz-media w-[80px] min-w-[80px] rounded-md relative overflow-hidden">
                                            <img
                                                src="/asset/images/main-slider/slider1/thumb/pic1.jpg"
                                                alt="Thumbnail 1"
                                            />
                                        </div>
                                        <div className="dz-content ml-[15px]">
                                            <h5 className="mb-1">Breakfast</h5>
                                            <p>
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Repeat for additional thumbnails */}
                            </div>
                        </div>
                        <div className="thumb-button-prev btn-prev-1 top-[50%] absolute translate-y-[-50%] h-[80px] rounded-md w-[27px] leading-[80px] text-center text-[#222222] text-sm duration-500 hover:bg-primary hover:text-white bg-[#2222221a] left-0 right-auto">
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        <div className="thumb-button-next btn-next-1 top-[50%] absolute translate-y-[-50%] h-[80px] rounded-md w-[27px] leading-[80px] text-center text-[#222222] text-sm duration-500 hover:bg-primary hover:text-white bg-[#2222221a] right-0">
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End */}

            {/* Special Menu Start */}
            <section className="lg:pt-[100px] pt-[50px] lg:pb-[70px] pb-[40px] bg-white relative overflow-hidden section-wrapper-2">
                <div className="container">
                    <div className="2xl:mb-[50px] mb-[25px] relative mx-auto text-center">
                        <h2 className="font-lobster">Special Menu</h2>
                    </div>
                    <div className="row">
                        {data.map((product) => (
                            <div
                                key={product.id}
                                className="lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px]"
                            >
                                <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                    <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="rounded-full group-hover:animate-spin"
                                        />
                                    </div>
                                    <div className="mt-auto">
                                        <h4 className="mb-2.5">
                                            <a
                                                href={`/product-detail/${product.id}`}
                                            >
                                                {product.name}
                                            </a>
                                        </h4>
                                        <p className="mb-2">
                                            {product.description}
                                        </p>
                                        <h5 className="text-primary">
                                            ${product.price}
                                        </h5>
                                        <button
                                            className="btn btn-primary btn-hover-2 mt-[18px]"
                                            onClick={() =>
                                                handleAddToCart(product.id)
                                            }
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
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

            {/* <!-- Quality Service Start --> */}
            <section className="bg-light relative section-wrapper-3  after:content-[''] after:h-[200px] after:w-full after:bg-white after:absolute after:bottom-0 after:left-0 after:z-[0] sm:py-[100px] py-[50px]">
                <div className="container">
                    <div className="2xl:mb-[50px] mb-[25px] relative mx-auto text-center">
                        <h2 className="font-lobster">Quality Service's</h2>
                    </div>
                    <div className="icon-wrapper1 bg-white rounded-[15px] relative z-[1]">
                        <div className="row">
                            <div className="lg:w-1/4 sm:w-1/2 w-full px-[15px]">
                                <div className="bg-[url('../images/gallery/grid/pic1.jpg')] icon-box-wrapper group text-center">
                                    <div className="inner-content relative z-[1]">
                                        <div className="mb-[10px]">
                                            <i className="flaticon-restaurant text-7xl text-yellow"></i>
                                        </div>
                                        <div className="icon-content overflow-hidden text-center">
                                            <h5 className="mb-2">Restaurant</h5>
                                            <p className="sm:text-base text-[15px] group-hover:text-white">
                                                Lorem ipsum dolor sit amet,
                                                dipiscing elit, sed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 sm:w-1/2 w-full px-[15px]">
                                <div className="bg-[url('../images/gallery/grid/pic2.jpg')] icon-box-wrapper group text-center">
                                    <div className="inner-content relative z-[1]">
                                        <div className="mb-[10px]">
                                            <i className="flaticon-martini text-7xl text-yellow"></i>
                                        </div>
                                        <div className="icon-content overflow-hidden text-center">
                                            <h5 className="mb-2">Bar</h5>
                                            <p className="sm:text-base text-[15px] group-hover:text-white">
                                                Lorem ipsum dolor sit amet,
                                                dipiscing elit, sed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 sm:w-1/2 w-full px-[15px]">
                                <div className="bg-[url('../images/gallery/grid/pic3.jpg')] icon-box-wrapper group text-center">
                                    <div className="inner-content relative z-[1]">
                                        <div className="mb-[10px]">
                                            <i className="flaticon-coffee-cup text-7xl text-yellow"></i>
                                        </div>
                                        <div className="icon-content overflow-hidden text-center">
                                            <h5 className="mb-2">Cafe</h5>
                                            <p className="sm:text-base text-[15px] group-hover:text-white">
                                                Lorem ipsum dolor sit amet,
                                                dipiscing elit, sed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 sm:w-1/2 w-full px-[15px]">
                                <div className="bg-[url('../images/gallery/grid/pic4.jpg')] icon-box-wrapper group text-center">
                                    <div className="inner-content relative z-[1]">
                                        <div className="mb-[10px]">
                                            <i className="flaticon-cake text-7xl text-yellow"></i>
                                        </div>
                                        <div className="icon-content overflow-hidden text-center">
                                            <h5 className="mb-2">Dessert</h5>
                                            <p className="sm:text-base text-[15px] group-hover:text-white">
                                                Lorem ipsum dolor sit amet,
                                                dipiscing elit, sed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    src="/asset/images/background/pic3.png"
                    alt=""
                    className="2xl:left-[20px] 2xl:top-[20px] absolute 2xl:block hidden"
                />
            </section>
            {/* <!-- Quality Service End--> */}

            {/* <!-- Testimonial's Start  --> */}
            <section class="sm:py-[100px] py-[40px] bg-white relative overflow-hidden">
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
                                                    There are many variations of
                                                    passages of Lorem Ipsum
                                                    available, but the majority
                                                    have suffered alteration in
                                                    some form, by injected
                                                    humour, or randomised words
                                                    which don't look even
                                                    slightly believable. If you
                                                    are going to use a passage
                                                    of Lorem Ipsum, you need to
                                                    be sure there isn't anything
                                                    embarrassing hidden in the
                                                    middle of text.
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    John Doe
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
                                                    There are many variations of
                                                    passages of Lorem Ipsum
                                                    available, but the majority
                                                    have suffered alteration in
                                                    some form, by injected
                                                    humour, or randomised words
                                                    which don't look even
                                                    slightly believable. If you
                                                    are going to use a passage
                                                    of Lorem Ipsum, you need to
                                                    be sure there isn't anything
                                                    embarrassing hidden in the
                                                    middle of text.
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    Jolly Roy
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
                                                    There are many variations of
                                                    passages of Lorem Ipsum
                                                    available, but the majority
                                                    have suffered alteration in
                                                    some form, by injected
                                                    humour, or randomised words
                                                    which don't look even
                                                    slightly believable. If you
                                                    are going to use a passage
                                                    of Lorem Ipsum, you need to
                                                    be sure there isn't anything
                                                    embarrassing hidden in the
                                                    middle of text.
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    Thomas Hed
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
                                                    There are many variations of
                                                    passages of Lorem Ipsum
                                                    available, but the majority
                                                    have suffered alteration in
                                                    some form, by injected
                                                    humour, or randomised words
                                                    which don't look even
                                                    slightly believable. If you
                                                    are going to use a passage
                                                    of Lorem Ipsum, you need to
                                                    be sure there isn't anything
                                                    embarrassing hidden in the
                                                    middle of text.
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    Kally Mint
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
                                                    There are many variations of
                                                    passages of Lorem Ipsum
                                                    available, but the majority
                                                    have suffered alteration in
                                                    some form, by injected
                                                    humour, or randomised words
                                                    which don't look even
                                                    slightly believable. If you
                                                    are going to use a passage
                                                    of Lorem Ipsum, you need to
                                                    be sure there isn't anything
                                                    embarrassing hidden in the
                                                    middle of text.
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    Ronny Joy
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
                                                    There are many variations of
                                                    passages of Lorem Ipsum
                                                    available, but the majority
                                                    have suffered alteration in
                                                    some form, by injected
                                                    humour, or randomised words
                                                    which don't look even
                                                    slightly believable. If you
                                                    are going to use a passage
                                                    of Lorem Ipsum, you need to
                                                    be sure there isn't anything
                                                    embarrassing hidden in the
                                                    middle of text.
                                                </p>
                                            </div>
                                            <div class="testimonial-info pl-[15px] lg:mt-[60px] max-2lg:mt-[40px] relative z-[1] after:content-[''] after:bg-[var(--secondary)] after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 class="testimonial-name font-bold leading-[32px] text-white">
                                                    Dolly kom
                                                </h5>
                                                <span class="testimonial-position text-white leading-[21px] text-sm block">
                                                    Food Expert
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
            </section>
            {/* <!--  Testimonial's End --> */}

            {/* News & Blog Section */}
            <section className="content-inner sm:pb-[100px] pb-[40px] relative overflow-hidden">
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

            {/* Map Iframe Section */}
            <div className="map-iframe style-1 relative">
                <iframe
                    className="w-full lg:h-[400px] sm:h-[350px] h-[300px] mb-[-10px]"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d244934.17139458598!2d75.27787773507539!3d25.125368923263647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1678086292169!5m2!1sen!2sin"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            {/* Map Iframe Section End */}
        </MainLayout>
    );
};

// Home Component
const Home = (props) => {
    useEffect(() => {
        console.log("Props:", props); // Log props for debugging
    }, [props]);

    const { data } = props;

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <MainLayout>
            <SpecialMenu data={data} />{" "}
            {/* Pass the data prop to SpecialMenu */}
        </MainLayout>
    );
};
export default Home;
