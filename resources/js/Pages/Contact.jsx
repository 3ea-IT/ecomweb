import React, { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';

function Contact() {
  return (
    <MainLayout>
          {/* <!-- Banner  --> */}
            <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed  relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0  pt-[50px] overflow-hidden lg:h-[450px] md:h-[400px] h-[320px] bg-cover bg-center">
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">Contact Us</h2>
                        {/* <!-- Breadcrumb Row --> */}
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><a href="index.html" className="text-white ">Home</a></li>
                                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">Contact Us</li>
                            </ul>
                        </nav>
                        {/* <!-- Breadcrumb Row End --> */}
                    </div>
                </div>
            </section>
            {/* <!-- Banner End --> */}

            {/* <!-- Location Section --> */}
            <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[80px] sm:pb-10 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="w-full px-[15px]">
                            <div className="team-detail relative md:flex block items-center overflow-hidden xl:mb-[55px] lg:mb-10 mb-5">
                                <div className="dz-media rounded-[10px] lg:w-[500px] md:w-[250px] w-full lg:min-w-[500px] md:min-w-[250px] min-w-full relative overflow-hidden">
                                    <img src="asset/images/outlets/Lucknow-Outlets.jpeg" alt="/" className="lg:h-auto md:h-[350px] h-full rounded-[10px]" />
                                </div>
                                <div className="dz-info w-full lg:ml-[50px] md:ml-[30px] mb-0 md:mt-0 mt-[30px]">
                                    <div className="head pb-[18px] mb-[15px] border-b-2 border-[#C6C6C6]">
                                        <h2 className="lg:mb-2 mb-0 xl:text-[50px] lg:text-[35px] text-[25px] font-semibold">Lucknow</h2>
                                        <span className="sub-title text-primary text-lg font-normal">Restaurant </span>
                                    </div>
                                    <p className="xl:text-lg lg:text-[15px] text-sm xl:w-[580px] w-full mb-5">5 Kapoorthla Complex, Sector A, Novelty Cinema Road (behind Indian oil Building), Aliganj, Lucknow, UP-226024</p>
                                    <ul className="team-info mb-[18px]">
                                        <li className="xl:text-lg text-base mb-2.5 font-normal text-bodycolor"><strong className="mr-[15px] font-normal text-black2">Email:</strong>order@pizzaportindia.com</li>
                                        <li className="xl:text-lg text-base mb-2.5 font-normal text-bodycolor"><strong className="mr-[15px] font-normal text-black2">Phone:</strong>+91 9839334430, 05224238357</li>
                                        <li className="xl:text-lg text-base mb-2.5 font-normal text-bodycolor"><strong className="mr-[15px] font-normal text-black2">Opening Hours:</strong>Monday - Sunday</li>
                                        <li className="xl:text-lg text-base mb-2.5 font-normal text-bodycolor"><strong className="mr-[15px] font-normal text-black2">Dining:</strong>11:00 AM - 12:00 AM</li>
                                        <li className="xl:text-lg text-base mb-2.5 font-normal text-bodycolor"><strong className="mr-[15px] font-normal text-black2">Delivery:</strong>11:00 AM - 12:00 AM</li>
                                    </ul>
                                    <div className="social-icon">
                                        <ul className="mr-[-20px] ml-[-5px]">
                                            <li className="inline-block px-[5px] mr-5"><a target="_blank" className="text-bodycolor lg:text-xl text-base" href="https://www.facebook.com/">
                                                <i className="fab fa-facebook-f"></i>
                                            </a></li>
                                            <li className="inline-block px-[5px] mr-5"><a target="_blank" className="text-bodycolor lg:text-xl text-base" href="https://twitter.com/">
                                                <i className="fab fa-twitter"></i>
                                            </a></li>
                                            <li className="inline-block px-[5px] mr-5"><a target="_blank" className="text-bodycolor lg:text-xl text-base" href="https://www.youtube.com/">
                                                <i className="fa-brands fa-youtube"></i>
                                            </a></li>
                                            <li className="inline-block px-[5px] mr-5"><a target="_blank" className="text-bodycolor lg:text-xl text-base" href="https://www.instagram.com/">
                                                <i className="fab fa-instagram"></i>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-[15px]">
                            <div className="team-detail relative md:flex block items-center overflow-hidden xl:mb-[55px] lg:mb-10 mb-5">
                                <div className="dz-media rounded-[10px] lg:w-[500px] md:w-[250px] w-full lg:min-w-[500px] md:min-w-[250px] min-w-full relative overflow-hidden">
                                    <img src="asset/images/outlets/Mumbai-Outlets.jpg" alt="/" className="lg:h-auto md:h-[350px] h-full rounded-[10px]" />
                                </div>
                                <div className="dz-info w-full lg:ml-[50px] md:ml-[30px] mb-0 md:mt-0 mt-[30px]">
                                    <div className="head pb-[18px] mb-[15px] border-b-2 border-[#C6C6C6]">
                                        <h2 className="lg:mb-2 mb-0 xl:text-[50px] lg:text-[35px] text-[25px] font-semibold">Mumbai</h2>
                                        <span className="sub-title text-primary text-lg font-normal">Restaurant</span>
                                    </div>
                                    <p className="xl:text-lg lg:text-[15px] text-sm xl:w-[580px] w-full mb-5">Pizzaport & Cafe, 6th Floor, Western Heights by Adani, J. P. Road, Andheri (W), Mumbai-400053</p>
                                    <ul className="team-info mb-[18px]">
                                        <li className="xl:text-lg text-base mb-2.5 font-normal text-bodycolor"><strong className="mr-[15px] font-normal text-black2">Email:</strong>order.mumbai@pizzaportindia.com</li>
                                        <li className="xl:text-lg text-base mb-2.5 font-normal text-bodycolor"><strong className="mr-[15px] font-normal text-black2">Phone:</strong>+91 9152224111</li>
                                        <li className="xl:text-lg text-base mb-2.5 font-normal text-bodycolor"><strong className="mr-[15px] font-normal text-black2">Opening Hours:</strong>Monday - Sunday</li>
                                        <li className="xl:text-lg text-base mb-2.5 font-normal text-bodycolor">11:00 AM - 11:00 PM</li>
                                        </ul>
                                    <div className="social-icon">
                                        <ul className="mr-[-20px] ml-[-5px]">
                                            <li className="inline-block px-[5px] mr-5"><a target="_blank" className="text-bodycolor lg:text-xl text-base" href="https://www.facebook.com/">
                                                <i className="fab fa-facebook-f"></i>
                                            </a></li>
                                            <li className="inline-block px-[5px] mr-5"><a target="_blank" className="text-bodycolor lg:text-xl text-base" href="https://twitter.com/">
                                                <i className="fab fa-twitter"></i>
                                            </a></li>
                                            <li className="inline-block px-[5px] mr-5"><a target="_blank" className="text-bodycolor lg:text-xl text-base" href="https://www.youtube.com/">
                                                <i className="fa-brands fa-youtube"></i>
                                            </a></li>
                                            <li className="inline-block px-[5px] mr-5"><a target="_blank" className="text-bodycolor lg:text-xl text-base" href="https://www.instagram.com/">
                                                <i className="fab fa-instagram"></i>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="team-bio mb-[55px]">
                                <h4 className="mb-2.5">Biography</h4>
                                <p className="mb-4 lg:text-base text-[15px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Location Section --> */}
    </MainLayout>
  );
}
export default Contact;
