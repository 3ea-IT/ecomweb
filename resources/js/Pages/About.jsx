import React from 'react'
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

function About() {
  return (
            <MainLayout>
                {/* <!-- Banner  --> */}
                <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0  pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                    <div className="container table h-full relative z-[1] text-center">
                        <div className="dz-bnr-inr-entry align-middle table-cell">
                            <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">About Us</h2>
                            {/* <!-- Breadcrumb Row --> */}
                            <nav aria-label="breadcrumb" className="breadcrumb-row">
                                <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                    <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><Link href="/" className="text-white">Home</Link></li>
                                    <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">About Us</li>
                                </ul>
                            </nav>
                            {/* <!-- Breadcrumb Row End --> */}
                        </div>
                    </div>
                </section>
                {/* <!-- Banner End --> */}

                {/* <!-- Visit Restaurant --> */}
                <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] overflow-hidden pb-0">
                    <div className="container">
                        <div className="2xl:mb-[50px] mb-[35px] relative mx-auto text-center">
                            <h2 className="font-lobster max-xl:leading-[50px]">We Invite you to Visit Our Restaurant</h2>
                            <p className="max-w-[815px] m-auto lg:text-base text-sm lg:leading-[1.6rem]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="row">
                            <div className="w-full px-[15px]">
                                <div className="about-media dz-media relative overflow-hidden rounded-[10px]">
                                    <img src="/asset/images/background/pic11.jpg" alt="/" className="lg:h-[430px] sm:h-[380px] h-[300px]" />
                                    <a className="video video-btn popup-youtube absolute top-[50%] left-[50%] 2xl:w-[87px] md:w-[70px] w-[55px] 2xl:h-[87px] md:h-[70px] h-[55px] bg-primary text-white rounded-full 2xl:text-2xl md:text-lg text-base flex items-center justify-center translate-x-[-50%]  translate-y-[-50%] duration-500 hover:scale-125" href="https://www.youtube.com/watch?v=XJb1G9iRoL4">
                                        <i className="fa-solid fa-play"></i>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Visit Restaurant --> */}

                {/* <!-- Service Section --> */}
                <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] overflow-hidden lg:pb-[70px] sm:pb-10 pb-5">
                    <div className="container">
                        <div className="2xl:mb-[50px] mb-[35px] relative mx-auto text-center">
                            <h2 className="font-lobster max-xl:leading-[50px]">What We Do</h2>
                        </div>
                        <div className="row">
                            <div className="lg:w-1/4 sm:w-1/2 w-full mb-[30px] px-[15px]">
                                <div className="icon-bx-wraper style-3 rounded-[10px] bg-[#2222220d] text-center h-full py-[30px] px-3 border-[2px] border-transparent flex flex-col duration-500 hover:bg-white hover:border-primary hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] hover:translate-y-[-10px]">
                                    <div className="icon-bx w-[95px] h-[95px] rounded-full bg-primary mx-auto mb-5 flex items-center justify-center">
                                        <div className="icon-cell">
                                            <i className="flaticon-vegetable text-[50px] text-white leading-[50px]"></i>
                                        </div>
                                    </div>
                                    <div className="icon-content">
                                        <h5 className="mb-2"><a href="service-detail.html">Fresh Products</a></h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and </p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 sm:w-1/2 w-full mb-[30px] px-[15px]">
                                <div className="icon-bx-wraper style-3 rounded-[10px] bg-[#2222220d] text-center h-full py-[30px] px-3 border-[2px] border-transparent flex flex-col duration-500 hover:bg-white hover:border-primary hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] hover:translate-y-[-10px]">
                                    <div className="icon-bx w-[95px] h-[95px] rounded-full bg-primary mx-auto mb-5 flex items-center justify-center">
                                        <div className="icon-cell">
                                            <i className="flaticon-chef-hat text-[50px] text-white leading-[50px]"></i>
                                        </div>
                                    </div>
                                    <div className="icon-content">
                                        <h5 className="mb-2"><a href="service-detail.html">Skilled Chefs</a></h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and </p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 sm:w-1/2 w-full mb-[30px] px-[15px]">
                                <div className="icon-bx-wraper style-3 rounded-[10px] bg-[#2222220d] text-center h-full py-[30px] px-3 border-[2px] border-transparent flex flex-col duration-500 hover:bg-white hover:border-primary hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] hover:translate-y-[-10px]">
                                    <div className="icon-bx w-[95px] h-[95px] rounded-full bg-primary mx-auto mb-5 flex items-center justify-center">
                                        <div className="icon-cell">
                                            <i className="flaticon-cocktail text-[50px] text-white leading-[50px]"></i>
                                        </div>
                                    </div>
                                    <div className="icon-content">
                                        <h5 className="mb-2"><a href="service-detail.html">Best Bar</a></h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and </p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 sm:w-1/2 w-full mb-[30px] px-[15px]">
                                <div className="icon-bx-wraper style-3 rounded-[10px] bg-[#2222220d] text-center h-full py-[30px] px-3 border-[2px] border-transparent flex flex-col duration-500 hover:bg-white hover:border-primary hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] hover:translate-y-[-10px]">
                                    <div className="icon-bx w-[95px] h-[95px] rounded-full bg-primary mx-auto mb-5 flex items-center justify-center">
                                        <div className="icon-cell">
                                            <i className="flaticon-cuisine text-[50px] text-white leading-[50px]"></i>
                                        </div>
                                    </div>
                                    <div className="icon-content">
                                        <h5 className="mb-2"><a href="service-detail.html">Vegan Cuisine</a></h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Service Section --> */}

            </MainLayout>
  )
}

export default About
