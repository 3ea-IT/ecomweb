import React from 'react'
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

const CartDetail = () => {

  return (
            <MainLayout>
                {/* <!-- Banner  --> */}
                <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0  pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                    <div className="container table h-full relative z-[1] text-center">
                        <div className="dz-bnr-inr-entry align-middle table-cell">
                            <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">Shop Cart</h2>
                            {/* <!-- Breadcrumb Row --> */}
                            <nav aria-label="breadcrumb" className="breadcrumb-row">
                                <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                    <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><Link href="/" className="text-white">Home</Link></li>
                                    <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">Shop Cart</li>
                                </ul>
                            </nav>
                            {/* <!-- Breadcrumb Row End --> */}
                        </div>
                    </div>
                </section>
                {/* <!-- Banner End --> */}

                    {/* <!-- Search Section --> */}
                    <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[100px] sm:pb-10 pb-5 relative bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="lg:w-2/3 w-full px-[15px]">
                                <div className="flex justify-between items-center">
                                    <h5 className="lg:mb-[15px] mb-5">Related Products</h5>
                                    <a href="#offcanvasFilter" id="filter-button2" className="btn btn-primary filter-btn lg:hidden block mb-[15px] py-[5px] px-[18px] text-white">
                                        Filter
                                    </a>
                                </div>
                                <div className="dz-shop-card style-1 flex border border-[#0000001a] rounded-[10px] mb-5 overflow-hidden duration-500 hover:border-transparent hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] relative">
                                    <div className="dz-media w-[100px] min-w-[100px]">
                                        <img src="/asset/images/shop/pic1.jpg" alt="/" className="h-full" />
                                    </div>
                                    <div className="dz-content sm:p-5 p-2 flex flex-col w-full">
                                        <div className="dz-head mb-4 flex items-center justify-between">
                                            <h6 className="dz-name mb-0 flex items-center text-base">
                                                <svg className="mr-[10px]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="16" height="16" stroke="#0F8A65"/>
                                                <circle cx="8.5" cy="8.5" r="5.5" fill="#0F8A65"/>
                                                </svg>
                                                <a href="product-detail.html">Double Patty Burger</a>
                                            </h6>
                                            <div className="rate bg-[#FE9F10] text-white rounded-[5px] py-[2px] px-[5px] font-medium text-[13px] leading-[18px] inline-block sm:static absolute bottom-[10px] right-3">
                                                <i className="fa-solid fa-star"></i> 4.5
                                            </div>
                                        </div>
                                        <div className="dz-body sm:flex block justify-between">
                                            <ul className="dz-meta flex mx-[-10px]">
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]">By <span className="text-primary font-medium"> Burger Farm</span></li>
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]"><i className="flaticon-scooter mr-1 text-xl text-primary"></i> 30 min</li>
                                            </ul>
                                            <p className="mb-0"><span className="text-primary font-weight-500">$15.00</span> For a one</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dz-shop-card style-1 flex border border-[#0000001a] rounded-[10px] mb-5 overflow-hidden duration-500 hover:border-transparent hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] relative">
                                    <div className="dz-media w-[100px] min-w-[100px]">
                                        <img src="/asset/images/shop/pic2.jpg" alt="/" className="h-full" />
                                    </div>
                                    <div className="dz-content sm:p-5 p-2 flex flex-col w-full">
                                        <div className="dz-head mb-4 flex items-center justify-between">
                                            <h6 className="dz-name mb-0 flex items-center text-base">
                                                <svg className="mr-[10px]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="16" height="16" stroke="#0F8A65"/>
                                                <circle cx="8.5" cy="8.5" r="5.5" fill="#0F8A65"/>
                                                </svg>
                                                <a href="product-detail.html">Chicken Patty Burger</a>
                                            </h6>
                                            <div className="rate bg-[#FE9F10] text-white rounded-[5px] py-[2px] px-[5px] font-medium text-[13px] leading-[18px] inline-block sm:static absolute bottom-[10px] right-3">
                                                <i className="fa-solid fa-star"></i> 4.5
                                            </div>
                                        </div>
                                        <div className="dz-body sm:flex block justify-between">
                                            <ul className="dz-meta flex mx-[-10px]">
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]">By <span className="text-primary font-medium"> Burger Farm</span></li>
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]"><i className="flaticon-scooter mr-1 text-xl text-primary"></i> 20 min</li>
                                            </ul>
                                            <p className="mb-0"><span className="text-primary font-weight-500">$10.00</span> For a one</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dz-shop-card style-1 flex border border-[#0000001a] rounded-[10px] mb-5 overflow-hidden duration-500 hover:border-transparent hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] relative">
                                    <div className="dz-media w-[100px] min-w-[100px]">
                                        <img src="/asset/images/shop/pic3.jpg" alt="/" className="h-full" />
                                    </div>
                                    <div className="dz-content sm:p-5 p-2 flex flex-col w-full">
                                        <div className="dz-head mb-4 flex items-center justify-between">
                                            <h6 className="dz-name mb-0 flex items-center text-base">
                                                <svg className="mr-[10px]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="16" height="16" stroke="#0F8A65"/>
                                                <circle cx="8.5" cy="8.5" r="5.5" fill="#0F8A65"/>
                                                </svg>
                                                <a href="product-detail.html">Veg Cripsy Burger</a>
                                            </h6>
                                            <div className="rate bg-[#FE9F10] text-white rounded-[5px] py-[2px] px-[5px] font-medium text-[13px] leading-[18px] inline-block sm:static absolute bottom-[10px] right-3">
                                                <i className="fa-solid fa-star"></i> 4.5
                                            </div>
                                        </div>
                                        <div className="dz-body sm:flex block justify-between">
                                            <ul className="dz-meta flex mx-[-10px]">
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]">By <span className="text-primary font-medium"> Burger Farm</span></li>
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]"><i className="flaticon-scooter mr-1 text-xl text-primary"></i> 40 min</li>
                                            </ul>
                                            <p className="mb-0"><span className="text-primary font-weight-500">$25.00</span> For a one</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dz-shop-card style-1 flex border border-[#0000001a] rounded-[10px] mb-5 overflow-hidden duration-500 hover:border-transparent hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] relative">
                                    <div className="dz-media w-[100px] min-w-[100px]">
                                        <img src="/asset/images/shop/pic4.jpg" alt="/" className="h-full" />
                                    </div>
                                    <div className="dz-content sm:p-5 p-2 flex flex-col w-full">
                                        <div className="dz-head mb-4 flex items-center justify-between">
                                            <h6 className="dz-name mb-0 flex items-center text-base">
                                                <svg className="mr-[10px]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="16" height="16" stroke="#0F8A65"/>
                                                <circle cx="8.5" cy="8.5" r="5.5" fill="#0F8A65"/>
                                                </svg>
                                                <a href="product-detail.html">Aloo Tikki Burger</a>
                                            </h6>
                                            <div className="rate bg-[#FE9F10] text-white rounded-[5px] py-[2px] px-[5px] font-medium text-[13px] leading-[18px] inline-block sm:static absolute bottom-[10px] right-3">
                                                <i className="fa-solid fa-star"></i> 4.5
                                            </div>
                                        </div>
                                        <div className="dz-body sm:flex block justify-between">
                                            <ul className="dz-meta flex mx-[-10px]">
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]">By <span className="text-primary font-medium"> Burger Farm</span></li>
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]"><i className="flaticon-scooter mr-1 text-xl text-primary"></i> 15 min</li>
                                            </ul>
                                            <p className="mb-0"><span className="text-primary font-weight-500">$05.00</span> For a one</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dz-shop-card style-1 flex border border-[#0000001a] rounded-[10px] mb-5 overflow-hidden duration-500 hover:border-transparent hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] relative">
                                    <div className="dz-media w-[100px] min-w-[100px]">
                                        <img src="/asset/images/shop/pic1.jpg" alt="/" className="h-full" />
                                    </div>
                                    <div className="dz-content sm:p-5 p-2 flex flex-col w-full">
                                        <div className="dz-head mb-4 flex items-center justify-between">
                                            <h6 className="dz-name mb-0 flex items-center text-base">
                                                <svg className="mr-[10px]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="16" height="16" stroke="#0F8A65"/>
                                                <circle cx="8.5" cy="8.5" r="5.5" fill="#0F8A65"/>
                                                </svg>
                                                <a href="product-detail.html">Pure Veg Burger</a>
                                            </h6>
                                            <div className="rate bg-[#FE9F10] text-white rounded-[5px] py-[2px] px-[5px] font-medium text-[13px] leading-[18px] inline-block sm:static absolute bottom-[10px] right-3">
                                                <i className="fa-solid fa-star"></i> 4.5
                                            </div>
                                        </div>
                                        <div className="dz-body sm:flex block justify-between">
                                            <ul className="dz-meta flex mx-[-10px]">
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]">By <span className="text-primary font-medium"> Burger Farm</span></li>
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]"><i className="flaticon-scooter mr-1 text-xl text-primary"></i> 55 min</li>
                                            </ul>
                                            <p className="mb-0"><span className="text-primary font-weight-500">$35.00</span> For a one</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dz-shop-card style-1 flex border border-[#0000001a] rounded-[10px] mb-5 overflow-hidden duration-500 hover:border-transparent hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] relative">
                                    <div className="dz-media w-[100px] min-w-[100px]">
                                        <img src="/asset/images/shop/pic2.jpg" alt="/" className="h-full" />
                                    </div>
                                    <div className="dz-content sm:p-5 p-2 flex flex-col w-full">
                                        <div className="dz-head mb-4 flex items-center justify-between">
                                            <h6 className="dz-name mb-0 flex items-center text-base">
                                                <svg className="mr-[10px]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="16" height="16" stroke="#0F8A65"/>
                                                <circle cx="8.5" cy="8.5" r="5.5" fill="#0F8A65"/>
                                                </svg>
                                                <a href="product-detail.html">Chicken Burger</a>
                                            </h6>
                                            <div className="rate bg-[#FE9F10] text-white rounded-[5px] py-[2px] px-[5px] font-medium text-[13px] leading-[18px] inline-block sm:static absolute bottom-[10px] right-3">
                                                <i className="fa-solid fa-star"></i> 4.5
                                            </div>
                                        </div>
                                        <div className="dz-body sm:flex block justify-between">
                                            <ul className="dz-meta flex mx-[-10px]">
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]">By <span className="text-primary font-medium"> Burger Farm</span></li>
                                                <li className="leading-[21px] mx-[10px] text-sm text-[#727272]"><i className="flaticon-scooter mr-1 text-xl text-primary"></i> 25 min</li>
                                            </ul>
                                            <p className="mb-0"><span className="text-primary font-weight-500">$45.00</span> For a one</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/3 w-full px-[15px] mb-[30px]">
                                <aside className="lg:sticky pl-5 max-xl:pl-0 pb-[1px] top-[100px]">
                                    <div className="shop-filter style-1">
                                        <div className="flex justify-between">
                                            <div className="widget-title xl:mb-[30px] mb-5 pb-3 text-lg relative">
                                                <h5 className="">Cart <span className="text-primary">(03)</span></h5>
                                            </div>
                                            <a href="javascript:void(0);" className="btn-close style-1 text-xl font-black text-primary p-0 lg:hidden block"><i className="la la-close font-black"></i></a>
                                        </div>
                                        <div className="cart-item flex items-center border-b border-[#2222221a] pb-[15px] mb-[15px]">
                                            <div className="dz-media w-[80px] min-w-[80px] h-[80px] overflow-hidden rounded-[10px] relative">
                                                <img src="/asset/images/shop/pic1.jpg" alt="/" />
                                            </div>
                                            <div className="dz-content ml-[15px] w-full">
                                                <div className="dz-head mb-[10px] flex items-center justify-between">
                                                    <h6 className="text-base">Double Patty Burger</h6>
                                                    <a href="javascript:void(0);" className="text-black2"><i className="fa-solid fa-xmark text-danger"></i></a>
                                                </div>
                                                <div className="dz-body flex items-center justify-between">
                                                    <div className="input-group mt-[5px] flex flex-wrap items-stretch h-[31px] relative w-[105px] min-w-[105px]">
                                                        <input type="number" step="1" value="1" name="quantity" className="quantity-field" />
                                                        <span className="flex justify-between p-[2px] absolute w-full">
                                                            <input type="button" value="-" className="button-minus" data-field="quantity" />
                                                            <input type="button" value="+" className="button-plus" data-field="quantity" />
                                                        </span>
                                                    </div>
                                                    <h5 className="price text-primary mb-0">$14.20</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cart-item flex items-center border-b border-[#2222221a] pb-[15px] mb-[15px]">
                                            <div className="dz-media w-[80px] min-w-[80px] h-[80px] overflow-hidden rounded-[10px] relative">
                                                <img src="/asset/images/shop/pic2.jpg" alt="/" />
                                            </div>
                                            <div className="dz-content ml-[15px] w-full">
                                                <div className="dz-head mb-[10px] flex items-center justify-between">
                                                    <h6 className="text-base">All Combo</h6>
                                                    <a href="javascript:void(0);" className="text-black2"><i className="fa-solid fa-xmark text-danger"></i></a>
                                                </div>
                                                <div className="dz-body flex items-center justify-between">
                                                    <div className="input-group mt-[5px] flex flex-wrap items-stretch h-[31px] relative w-[105px] min-w-[105px]">
                                                        <input type="number" step="1" value="1" name="quantity" className="quantity-field" />
                                                        <span className="flex justify-between p-[2px] absolute w-full">
                                                            <input type="button" value="-" className="button-minus" data-field="quantity" />
                                                            <input type="button" value="+" className="button-plus" data-field="quantity" />
                                                        </span>
                                                    </div>
                                                    <h5 className="price text-primary mb-0">$50.20</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cart-item flex items-center border-b border-[#2222221a] pb-[15px] mb-[15px]">
                                            <div className="dz-media w-[80px] min-w-[80px] h-[80px] overflow-hidden rounded-[10px] relative">
                                                <img src="/asset/images/shop/pic3.jpg" alt="/" />
                                            </div>
                                            <div className="dz-content ml-[15px] w-full">
                                                <div className="dz-head mb-[10px] flex items-center justify-between">
                                                    <h6 className="text-base">Veg And crispy Burger</h6>
                                                    <a href="javascript:void(0);" className="text-black2"><i className="fa-solid fa-xmark text-danger"></i></a>
                                                </div>
                                                <div className="dz-body flex items-center justify-between">
                                                    <div className="input-group mt-[5px] flex flex-wrap items-stretch h-[31px] relative w-[105px] min-w-[105px]">
                                                        <input type="number" step="1" value="1" name="quantity" className="quantity-field" />
                                                        <span className="flex justify-between p-[2px] absolute w-full">
                                                            <input type="button" value="-" className="button-minus" data-field="quantity" />
                                                            <input type="button" value="+" className="button-plus" data-field="quantity" />
                                                        </span>
                                                    </div>
                                                    <h5 className="price text-primary mb-0">$25.20</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order-detail mt-10">
                                            <h6 className="mb-2">Bill Details</h6>
                                            <table className="mb-[25px] w-full border-collapse">
                                                <tbody>
                                                    <tr>
                                                        <td className="py-[6px] font-medium text-sm leading-[21px] text-bodycolor">Item Total</td>
                                                        <td className="price text-primary font-semibold text-base leading-6 text-right">$55.00</td>
                                                    </tr>
                                                    <tr className="charges border-b border-dashed border-[#22222233]">
                                                        <td className="pt-[6px] pb-[15px] font-medium text-sm leading-[21px] text-bodycolor">Delivery Charges</td>
                                                        <td className="price pt-[6px] pb-[15px] text-primary font-semibold text-base leading-6 text-right">$5.00</td>
                                                    </tr>
                                                    <tr className="tax border-b-2 border-[#22222233]">
                                                        <td className="pt-[6px] pb-[15px] font-medium text-sm leading-[21px] text-bodycolor">Govt Taxes & Other Charges</td>
                                                        <td className="price pt-[6px] pb-[15px] text-primary font-semibold text-base leading-6 text-right">$3.50</td>
                                                    </tr>
                                                    <tr className="total">
                                                        <td className="py-[6px] font-medium text-sm leading-[21px] text-bodycolor"><h6>Total</h6></td>
                                                        <td className="price text-primary font-semibold text-base leading-6 text-right">$63.50</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <a href="shop-checkout.html" className="btn btn-primary block text-center btn-md w-full btn-hover-1"><span className="z-[2] relative block">Order Now <i className="fa-solid fa-arrow-right ml-[10px]"></i></span></a>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Search Section --> */}

            </MainLayout>
  )
}
export default CartDetail
