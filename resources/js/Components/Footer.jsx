import React from "react";
import { Link } from "@inertiajs/react";

function Footer() {

    const showAlert = (e) => {
        e.preventDefault(); // Prevents default link behavior (like page jump for "#")
        alert("Coming Soon!");
    };

    return (
        <section className="site-footer style-1 bg-black2 relative">
            <div className="xl:pt-[85px] md:pt-[80px] pt-[60px] lg:pb-10 md:pb-5 pb-0 relative z-[2]">
                <div className="container">
                    <div className="row">
                        <div className="xl:w-1/4 lg:w-1/3 sm:w-1/2 w-full px-[15px]">
                            <div className=" sm:mb-[30px] mb-2.5">
                                <h5 className="footer-title lg:mb-[30px] mb-5 text-white lg:text-2xl text-xl uppercase font-semibold">
                                    Contact
                                </h5>
                                <ul>
                                    <li className="relative mb-[25px] pl-10">
                                        <i className="flaticon-placeholder absolute text-3xl leading-[30px] left-0 top-[5px] text-primary w-[30px] h-[30px]"></i>
                                        <p className="text-[#CCCCCC] tracking-wide leading-6">
                                        5, Kapoorthla Complex, Novelty Cinema Road, behind Indian oil Building, Kapoorthla, Sector A, Aliganj, Lucknow, Uttar Pradesh 226024
                                        </p>
                                    </li>
                                    <li className="relative mb-[25px] pl-10">
                                        <i className="flaticon-telephone absolute text-3xl leading-[30px] left-0 top-[5px] text-primary w-[30px] h-[30px]"></i>
                                        <p className="text-[#CCCCCC] tracking-wide leading-6">
                                            +91 9839334430
                                            <br />
                                            05224238357
                                        </p>
                                    </li>
                                    <li className="relative mb-[25px] pl-10">
                                        <i className="flaticon-email-1 absolute text-3xl leading-[30px] left-0 top-[5px] text-primary w-[30px] h-[30px]"></i>
                                        <p className="text-[#CCCCCC] tracking-wide leading-6">
                                        order@pizzaportindia.com

                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="xl:w-3/12 lg:w-2/12 sm:w-6/12 w-full px-[15px]">
                            <div className="widget widget_services mb-[30px]">
                                <h5 className="footer-title mb-[30px] xl:text-2xl text-xl font-semibold text-white uppercase leading-[1.1]">
                                    Our Links
                                </h5>
                                <ul>
                                    <li>
                                        <Link href="/">
                                            <span>Home</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/outlets">
                                            <span>Outlets</span>
                                        </Link>
                                    </li>


                                    <li>
                                        <Link href="/about">
                                            <span>About Us</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/menu">
                                            <span>Menu</span>
                                        </Link>
                                    </li>


                                    <li>
                                        <Link href="/blogs">
                                            <span>Blog</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="xl:w-3/12 lg:w-3/12 sm:w-6/12 w-full px-[15px]">
                            <div className="widget widget_services mb-[30px]">
                                <h5 className="footer-title mb-[30px] xl:text-2xl text-xl font-semibold text-white uppercase leading-[1.1]">
                                    Our Services
                                </h5>
                                <ul>
                                    <li onClick={showAlert} style={{ cursor: "pointer" }}>
                                        <Link href="#">
                                            <span>Strategy & Research</span>
                                        </Link>
                                    </li>
                                    <li onClick={showAlert} style={{ cursor: "pointer" }}>
                                        <Link href="#">
                                            <span>Fast Delivery</span>
                                        </Link>
                                    </li>

                                    <li onClick={showAlert} style={{ cursor: "pointer" }}>
                                        <Link href="#">
                                            <span>Pickup In Store</span>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="xl:w-3/12 lg:w-3/12 sm:w-6/12 w-full px-[15px]">
                            <div className="widget widget_services mb-[30px]">
                                <h5 className="footer-title mb-[30px] xl:text-2xl text-xl font-semibold text-white uppercase leading-[1.1]">
                                    Help Center
                                </h5>
                                <ul>

                                    <li>
                                        <Link href="/outlets">
                                            <span>Shop</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="#testimonials">
                                            <span>Testimonials</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <span>Contact Us</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
  

            <div class="container">
			<div class="footer-bottom py-5 border-t border-[#ffffff1a] relative z-[1]">
				<div class="lg:flex lg:justify-between">
					<div class="lg:w-1/2 px-[15px] lg:text-left text-center">
                    <p className="text-sm text-[#999999]">
                                    Copyright 2024 All rights reserved.
                                </p>
					</div>
					<div class="lg:w-1/2 px-[15px]">
						<ul class="footer-link mx-[-15px] lg:text-right text-center">
							<li class="inline-block sm:px-[15px] px-[5px] relative"><a href="/privacy-policy" class="text-[#666666] sm:text-sm text-[13px] tracking-[0.01em] font-normal">Privacy Policy</a></li>
							<li class="inline-block sm:px-[15px] px-[5px] relative"><a href="/terms-of-use" class="text-[#666666] sm:text-sm text-[13px] tracking-[0.01em] font-normal">Terms Of Use</a></li>
							<li class="inline-block sm:px-[15px] px-[5px] relative"><a href="/refund-policy" class="text-[#666666] sm:text-sm text-[13px] tracking-[0.01em] font-normal">Refund Policy</a></li>
						</ul>
					</div>
				</div>
            </div>
        </div>


                <div className="container">
                    <div className="footer-bottom relative py-5 border-t border-[#ffffff1a]">
                        <div className="row">
                            
                            <div className="md:w-1/2 w-full md:text-right text-center px-[15px] md:mt-0 mt-[15px]">
                                <span className="text-sm text-[#999999]">
                                Powered By 3EA
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            <img
                src="/asset/images/background/pic5.png"
                alt=""
                className="bg1 bottom-[10px] left-0 absolute max-2xl:hidden animate-dz"
            />
            <img
                src="/asset/images/background/pic6.png"
                alt=""
                className="top-[15px] right-[10px] absolute max-2xl:hidden animate-dz"
            />
        </section>
    );
}

export default Footer;