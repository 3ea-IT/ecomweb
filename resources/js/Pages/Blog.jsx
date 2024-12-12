import React from 'react'
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

function Blog() {
  return (
    <MainLayout>
        {/* <!-- Banner  --> */}
        <section className="bg-[url('../images/banner/bnr3.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0  pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
            <div className="container table h-full relative z-[1] text-center">
                <div className="dz-bnr-inr-entry align-middle table-cell">
                    <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">Our Blogs</h2>
                    {/* <!-- Breadcrumb Row --> */}
                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                        <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                            <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><Link href="/" className="text-white">Home</Link></li>
                            <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">Our Blogs</li>
                        </ul>
                    </nav>
                    {/* <!-- Breadcrumb Row End --> */}
                </div>
            </div>
        </section>
        {/* <!-- Banner End --> */}

        {/* <!-- Blog Section --> */}
        <section className="content-inner-1 sm:pt-[100px] pt-[50px] lg:pb-[100px] pb-[70px] relative bg-white">
            <div className="container">
                <div className="row loadmore-content">
                    <div className="lg:w-1/3 md:1/2 w-full px-[15px]">
                        <div className="overlay-shine rounded-lg overflow-hidden shadow-[0_15px_55px_rgba(34,34,34,0.1)] bg-white group mb-[30px]">
                            <div className="dz-media w-full h-full mb-0 relative overflow-hidden">
                                <a href="javascript:void(0);" className="block">
                                    <img src="/asset/images/blog/grid3/pic1.jpg" alt="/" className="block w-full group-hover:scale-110 duration-500" />
                                </a>
                            </div>
                            <div className="content flex-col flex p-[30px] max-xl:p-5 relative">
                                <div className="mb-2.5">
                                    <ul className="flex">
                                        <li className="inline-block relative text-[13px] mr-3">
                                            <a href="javascript:void(0);" className="text-sm font-medium text-bodycolor"><i className="flaticon-calendar-date text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i> 30 Nov 2024</a>
                                        </li>
                                        <li className="inline-block relative text-[13px] mr-3">
                                            <a href="javascript:void(0);" className="text-sm font-medium text-bodycolor"><i className="flaticon-chat-bubble text-base text-primary mr-[5px]"></i> 3.5K </a>
                                        </li>
                                    </ul>
                                </div>
                                <h5 className="mb-2">Paradise Taste of Dishes</h5>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have.</p>
                                <div>
                                    <Link href="/blogsDetail" className="py-3 px-6 text-sm font-medium relative inline-flex items-center justify-center rounded-md mt-[18px]  bg-primary border-primary text-white btn-hover-2">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 md:1/2 w-full px-[15px]">
                        <div className="overlay-shine rounded-lg overflow-hidden shadow-[0_15px_55px_rgba(34,34,34,0.1)] bg-white group mb-[30px]">
                            <div className="dz-media w-full h-full mb-0 relative overflow-hidden">
                                <a href="javascript:void(0);" className="block">
                                    <img src="/asset/images/blog/grid3/pic2.jpg" alt="/" className="block w-full group-hover:scale-110 duration-500" />
                                </a>
                            </div>
                            <div className="content flex-col flex p-[30px] max-xl:p-5 relative">
                                <div className="mb-2.5">
                                    <ul className="flex">
                                        <li className="inline-block relative text-[13px] mr-3">
                                            <a href="javascript:void(0);" className="text-sm font-medium text-bodycolor"><i className="flaticon-calendar-date text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i> 30 Nov 2024</a>
                                        </li>
                                        <li className="inline-block relative text-[13px] mr-3">
                                            <a href="javascript:void(0);" className="text-sm font-medium text-bodycolor"><i className="flaticon-chat-bubble text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i> 3.5K </a>
                                        </li>
                                    </ul>
                                </div>
                                <h5 className="mb-2">Taste of Paradise Dishes</h5>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have.</p>
                                <div>
                                    <Link href="/blogsDetail" className="py-3 px-6 text-sm font-medium relative inline-flex items-center justify-center rounded-md mt-[18px]  bg-primary border-primary text-white btn-hover-2">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 md:1/2 w-full px-[15px]">
                        <div className="overlay-shine rounded-lg overflow-hidden shadow-[0_15px_55px_rgba(34,34,34,0.1)] bg-white group mb-[30px]">
                            <div className="dz-media w-full h-full mb-0 relative overflow-hidden">
                                <a href="javascript:void(0);" className="block">
                                    <img src="/asset/images/blog/grid3/pic3.jpg" alt="/" className="block w-full group-hover:scale-110 duration-500" />
                                </a>
                            </div>
                            <div className="content flex-col flex p-[30px] max-xl:p-5 relative">
                                <div className="mb-2.5">
                                    <ul className="flex">
                                        <li className="inline-block relative text-[13px] mr-3">
                                            <a href="javascript:void(0);" className="text-sm font-medium text-bodycolor"><i className="flaticon-calendar-date text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i> 30 Nov 2024</a>
                                        </li>
                                        <li className="inline-block relative text-[13px] mr-3">
                                            <a href="javascript:void(0);" className="text-sm font-medium text-bodycolor"><i className="flaticon-chat-bubble text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i> 3.5K </a>
                                        </li>
                                    </ul>
                                </div>
                                <h5 className="mb-2">The Fork & Knife</h5>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have.</p>
                                <div>
                                    <Link href="/blogsDetail" className="py-3 px-6 text-sm font-medium relative inline-flex items-center justify-center rounded-md mt-[18px]  bg-primary border-primary text-white btn-hover-2">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- Blog Section --> */}
    </MainLayout>
  )
}

export default Blog
