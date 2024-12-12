import React from 'react'
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

function Outlets() {
  return (
            <MainLayout>
                {/* <!-- Banner  --> */}
                <section className="bg-[url('../images/banner/bnr3.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0  pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                    <div className="container table h-full relative z-[1] text-center">
                        <div className="dz-bnr-inr-entry align-middle table-cell">
                            <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">Outlets</h2>
                            {/* <!-- Breadcrumb Row --> */}
                            <nav aria-label="breadcrumb" className="breadcrumb-row">
                                <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                    <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><Link href="/" className="text-white">Home</Link></li>
                                    <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">Outlets</li>
                                </ul>
                            </nav>
                            {/* <!-- Breadcrumb Row End --> */}
                        </div>
                    </div>
                </section>
                {/* <!-- Banner End --> */}

                {/* <!-- Outlets Section --> */}
                    <section className="content-inner-1 sm:pt-[100px] pt-[50px] lg:pb-[100px] pb-[70px] relative bg-white">
                        <div className="container">
                            <div className="row loadmore-content">
                                <div className="lg:w-1/2 md:w-1/3 sm:w-1/2 w-full px-[15px]">
                                    <div className="overlay-shine rounded-lg overflow-hidden shadow-[0_15px_55px_rgba(34,34,34,0.1)] bg-white group mb-[30px]">
                                        <div className="dz-media w-full h-full mb-0 relative overflow-hidden">
                                            <a href="javascript:void(0);" className="block">
                                                <img src="/asset/images/blog/grid3/pic1.jpg" alt="/" className="block w-full group-hover:scale-110 duration-500" />
                                            </a>
                                        </div>
                                        <div className="content flex-col flex p-[30px] max-xl:p-5 relative">
                                            <h5 className="mb-2">Paradise Taste of Dishes</h5>
                                            <div className="mb-2.5">
                                                <ul className="flex">
                                                    <li className="inline-block relative text-[13px] mr-3">
                                                        <a href="javascript:void(0);" className="text-sm font-medium text-bodycolor"><i className="flaticon-calendar-date text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i>Opening Time - 11:00 AM - 12 Midnight</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mb-2.5">
                                                <ul className="flex">
                                                    <li className="inline-block relative text-[13px] mr-3">
                                                        <a href="javascript:void(0);" className="text-sm font-medium text-bodycolor"><i className="flaticon-calendar-date text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i>5 Kapoorthla Complex, Sector A, Novelty Cinema Road (behind Indian oil Building), Aliganj, Lucknow, UP-226024</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="flex justify-between mt-[18px]">
                                                <a href="blog-standard.html" className="py-3 px-6 text-sm font-medium inline-flex items-center justify-center rounded-md bg-primary border-primary text-white btn-hover-2">
                                                    Get Directions
                                                </a>
                                                <Link href="/outletsDetail" className="py-3 px-6 text-sm font-medium inline-flex items-center justify-center rounded-md bg-primary border-primary text-white btn-hover-2">Know More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 md:w-1/3 sm:w-1/2 w-full px-[15px]">
                                    <div className="overlay-shine rounded-lg overflow-hidden shadow-[0_15px_55px_rgba(34,34,34,0.1)] bg-white group mb-[30px]">
                                        <div className="dz-media w-full h-full mb-0 relative overflow-hidden">
                                            <a href="javascript:void(0);" className="block">
                                                <img src="/asset/images/blog/grid3/pic1.jpg" alt="/" className="block w-full group-hover:scale-110 duration-500" />
                                            </a>
                                        </div>
                                        <div className="content flex-col flex p-[30px] max-xl:p-5 relative">
                                            <h5 className="mb-2">Paradise Taste of Dishes</h5>
                                            <div className="mb-2.5">
                                                <ul className="flex">
                                                    <li className="inline-block relative text-[13px] mr-3">
                                                        <a href="javascript:void(0);" className="text-sm font-medium text-bodycolor"><i className="flaticon-calendar-date text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i>Opening Time - 11:00 AM - 12 Midnight</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mb-2.5">
                                                <ul className="flex">
                                                    <li className="inline-block relative text-[13px] mr-3">
                                                        <a href="javascript:void(0);" className="text-sm font-medium text-bodycolor"><i className="flaticon-calendar-date text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i>5 Kapoorthla Complex, Sector A, Novelty Cinema Road (behind Indian oil Building), Aliganj, Lucknow, UP-226024</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="flex justify-between mt-[18px]">
                                                <a href="blog-standard.html" className="py-3 px-6 text-sm font-medium inline-flex items-center justify-center rounded-md bg-primary border-primary text-white btn-hover-2">
                                                    Get Directions
                                                </a>
                                                <Link href="/outletsDetail" className="py-3 px-6 text-sm font-medium inline-flex items-center justify-center rounded-md bg-primary border-primary text-white btn-hover-2">Know More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Client Reviews  */}
                                <h4 class="widget-title xl:mb-[30px] mb-5 pb-3 relative">Client Reviews</h4>
                                <div className="w-full px-[15px] lg:mb-[60px] mb-[30px]">
                                    <div className="testimonial-2 flex lg:flex-row flex-col bg-white relative">
                                        <div className="dz-media rounded-lg xl:w-[570px] xl:min-w-[570px] lg:w-[450px] lg:min-w-[450px] w-full relative overflow-hidden">
                                            <img src="/asset/images/testimonial/large/pic1.jpg" alt="/" className="max-xl:h-full object-cover" />
                                        </div>
                                        <div className="testimonial-1 lg:pt-5 lg:pb-[30px] lg:pl-[30px] py-5 relative w-full flex flex-col">
                                            <div className="testimonial-text relative my-[15px] text-base">
                                                <p className="xl:text-[18px] text-base leading-[32px] font-medium text-[#222222]">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                                            </div>
                                            <div className="testimonial-info pl-[15px] mt-auto relative z-[1] after:content-[''] after:bg-primary after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 className="testimonial-name font-bold leading-[32px] lg:text-[25px] text-lg">Carry Mint</h5>
                                                <span className="testimonial-position leading-[21px] text-sm block text-primary">Food Expert</span>
                                            </div>
                                            <i className="flaticon-right-quote quote absolute lg:right-[35px] right-5 bottom-[15px] xl:text-[102px] lg:text-[85px] text-[65px] text-primary inline-flex items-center"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-[15px] lg:mb-[60px] mb-[30px]">
                                    <div className="testimonial-2 flex lg:flex-row flex-col-reverse bg-white relative">
                                        <div className="testimonial-1 lg:pt-5 lg:pb-[30px] lg:pr-[30px] py-5 relative w-full flex flex-col">
                                            <div className="testimonial-text relative my-[15px] text-base">
                                                <p className="xl:text-[18px] text-base leading-[32px] font-medium text-[#222222]">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                                            </div>
                                            <div className="testimonial-info pl-[15px] mt-auto relative z-[1] after:content-[''] after:bg-primary after:rounded after:h-[5px] after:w-[50px] after:absolute after:top-[25px] after:left-[-22px] after:rotate-90">
                                                <h5 className="testimonial-name font-bold leading-[32px] lg:text-[25px] text-lg">John Doe</h5>
                                                <span className="testimonial-position leading-[21px] text-sm block text-primary">Food Expert</span>
                                            </div>
                                            <i className="flaticon-right-quote quote absolute lg:right-[35px] right-5 bottom-[15px] xl:text-[102px] lg:text-[85px] text-[65px] text-primary inline-flex items-center"></i>
                                        </div>
                                        <div className="dz-media rounded-lg xl:w-[570px] xl:min-w-[570px] lg:w-[450px] lg:min-w-[450px] w-full relative overflow-hidden">
                                            <img src="/asset/images/testimonial/large/pic2.jpg" alt="/" className="max-xl:h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                                 {/* Client Reviews  */}
                            </div>
                        </div>
                    </section>
                {/* <!-- Outlets Section --> */}
            </MainLayout>
  )
}

export default Outlets
