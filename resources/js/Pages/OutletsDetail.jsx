import React from 'react'
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

function OutletsDetail() {
  return (
    <MainLayout>
        {/* <!-- Banner  --> */}
        <section className="bg-[url('../images/banner/bnr3.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0  pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
            <div className="container table h-full relative z-[1] text-center">
                <div className="dz-bnr-inr-entry align-middle table-cell">
                    <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">Outlet Details</h2>
                    {/* <!-- Breadcrumb Row --> */}
                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                        <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                            <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><Link href="/" className="text-white">Home</Link></li>
                            <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">Outlet Details</li>
                        </ul>
                    </nav>
                    {/* <!-- Breadcrumb Row End --> */}
                </div>
            </div>
        </section>
        {/* <!-- Banner End --> */}

        {/* Blog Detail */}
            <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[70px] sm:pb-10 pb-5 relative">
            <div className="min-container max-w-[53.125rem] px-[0.938rem] mx-auto">
                <div className="row">
                <div className="w-full px-[15px]">
                    <div className="dz-card blog-half blog-single max-w-full w-full relative mb-[3.75rem]">
                    <div className="dz-media text-center relative overflow-hidden rounded-[10px]">
                        <img src="/asset/images/blog/detail/pic1.jpg" alt="/" className="w-full h-auto" />
                    </div>
                    <div className="dz-info pt-[25px]">
                        <h1 className="lg:text-[2.625rem] sm:text-4xl text-[2rem] font-semibold mb-2 leading-[1.3]">Restaurant Has The Answer</h1>
                        <div className="dz-meta mb-5">
                        <ul>
                            <li className="mb-[5px] mr-[30px] text-[15px] font-medium relative inline-block dz-user">
                            <a href="#" className="text-sm font-medium text-bodycolor">
                                <i className="flaticon-user text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i> By <span className="text-primary">KK Sharma</span>
                            </a>
                            </li>
                            <li className="mb-[5px] mr-[30px] text-[15px] font-medium relative inline-block">
                            <a href="#" className="text-sm font-medium text-bodycolor">
                                <i className="flaticon-calendar-date text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i> 26 Jan 2024
                            </a>
                            </li>
                            <li className="mb-[5px] mr-[30px] text-[15px] font-medium relative inline-block dz-comment">
                            <a href="#" className="text-sm font-medium text-bodycolor">
                                <i className="flaticon-chat-bubble text-xs text-primary mr-[5px] translate-y-[1px] scale-150"></i> 2.5K
                            </a>
                            </li>
                        </ul>
                        </div>
                        <div className="dz-post-text">
                        <p className="text-base mb-4 leading-[1.7]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <p className="text-base mb-4 leading-[1.7]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <ul className="pl-[1.5rem] mb-[1.5rem] list-disc text-bodycolor">
                            <li className="text-base p-2">A wonderful serenity has taken possession.</li>
                            <li className="text-base p-2">Of my entire soul, like these sweet mornings of spring which.</li>
                            <li className="text-base p-2">I enjoy with my whole heart.</li>
                            <li className="text-base p-2">This spot, which was created For the bliss of souls like mine.</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        {/* Blog Detail End */}

    </MainLayout>
  )
}

export default OutletsDetail
