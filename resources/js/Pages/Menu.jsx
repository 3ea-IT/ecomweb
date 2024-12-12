import React from 'react'
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

function Menu() {
  return (
    <MainLayout>
        {/* <!-- Banner  --> */}
        <section className="bg-[url('../images/banner/bnr3.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0  pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
            <div className="container table h-full relative z-[1] text-center">
                <div className="dz-bnr-inr-entry align-middle table-cell">
                    <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">Our Menu</h2>
                    {/* <!-- Breadcrumb Row --> */}
                    <nav aria-label="breadcrumb" className="breadcrumb-row">
                        <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                            <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><Link href="/" className="text-white">Home</Link></li>
                            <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">Our Menu</li>
                        </ul>
                    </nav>
                    {/* <!-- Breadcrumb Row End --> */}
                </div>
            </div>
        </section>
        {/* <!-- Banner End --> */}

        {/* <!-- our Menu--> */}
        <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[70px] sm:pb-10 pb-5 overflow-hidden relative bg-white">
            <div className="container">
                <div className="row justify-between">
                    <div className="xl:w-10/12 lg:w-9/12 w-full px-[15px]">
                        <div className="site-filters lg:mb-10 mb-[30px] sm:text-left text-center">
                            <ul className="filters style-1">
                                <li data-filter=".All" className="btn lg:py-2 lg:px-[15px] p-2 lg:mr-[10px] mr-[5px] duration-500 active">
                                    <a href="javascript:void(0);" className="flex items-center lg:text-[15px] text-[13px] overflow-hidden"><span className="mb-0"><i className="flaticon-fast-food text-[25px]  lg:mr-[10px] mr-[5px]"></i></span>ALL</a>
                                </li>
                                <li data-filter=".drink" className="btn lg:py-2 lg:px-[15px] p-2 lg:mr-[10px] mr-[5px]">
                                    <a href="javascript:void(0);" className="flex items-center lg:text-[15px] text-[13px] overflow-hidden"><span className="mb-0"><i className="flaticon-cocktail text-[25px]  lg:mr-[10px] mr-[5px]"></i></span>COLD DRINK</a>
                                </li>
                                <li data-filter=".pizza" className="btn lg:py-2 lg:px-[15px] p-2 lg:mr-[10px] mr-[5px]">
                                    <a href="javascript:void(0);" className="flex items-center lg:text-[15px] text-[13px] overflow-hidden"><span className="mb-0"><i className="flaticon-pizza-slice text-[25px]  lg:mr-[10px] mr-[5px]"></i></span>PIZZA</a>
                                </li>
                                <li data-filter=".salad" className="btn lg:py-2 lg:px-[15px] p-2 lg:mr-[10px] mr-[5px] duration-500">
                                    <a href="javascript:void(0);" className="flex items-center lg:text-[15px] text-[13px] overflow-hidden"><span className="mb-0"><i className="flaticon-salad text-[25px]  lg:mr-[10px] mr-[5px]"></i></span>SALAD</a>
                                </li>
                                <li data-filter=".sweet" className="btn lg:py-2 lg:px-[15px] p-2 lg:mr-[10px] mr-[5px] duration-500">
                                    <a href="javascript:void(0);" className="flex items-center lg:text-[15px] text-[13px] overflow-hidden"><span className="mb-0"><i className="flaticon-cupcake text-[25px]  lg:mr-[10px] mr-[5px]"></i></span>SWEETS</a>
                                </li>
                                <li data-filter=".spicy" className="btn lg:py-2 lg:px-[15px] p-2 lg:mr-[10px] mr-[5px] duration-500">
                                    <a href="javascript:void(0);" className="flex items-center lg:text-[15px] text-[13px] overflow-hidden"><span className="mb-0"><i className="flaticon-chili-pepper text-[25px]  lg:mr-[10px] mr-[5px]"></i></span>SPICY</a>
                                </li>
                                <li data-filter=".burger" className="btn lg:py-2 lg:px-[15px] p-2 lg:mr-[10px] mr-[5px] duration-500">
                                    <a href="javascript:void(0);" className="flex items-center lg:text-[15px] text-[13px] overflow-hidden"><span className="mb-0"><i className="flaticon-hamburger-1 text-[25px]  lg:mr-[10px] mr-[5px]"></i></span>BURGER</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="xl:w-2/12 lg:w-1/4 w-full px-[15px] lg:text-right lg:block flex justify-between items-center mb-[30px]">
                        <strong className="filter-item-show text-bodycolor font-medium lg:hidden block">51,740 items</strong>
                        {/* <a href="#offcanvasFilter" id="filter-button" className="btn btn-primary filter-btn btn-hover-2">
                            Filter <span><i className="icon-filter ml-[5px] text-xl"></i></span>
                        </a> */}
                    </div>
                </div>
                <div className="clearfix" id="lightgallery">
                    <ul id="masonry" className="row dlab-gallery-listing gallery">
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All pizza spicy">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1] active">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic1.jpg" alt="" className="rounded-full relative group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Pizza</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$55.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All salad burger">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1] active">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic2.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Rice</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$50.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All drink sweet">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1] active">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic3.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Green Salad</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$45.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All pizza burger">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic4.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Pasta</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$35.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All drink spicy">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic5.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Momose</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$25.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All drink sweet">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic6.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Panner</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$60.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All salad burger">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic7.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Macrony</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$22.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All drink salad">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic8.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Curry Rice</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$30.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All drink burger">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic9.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Aloo Sticks</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$36.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All sweet spicy">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic10.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Fry Fish</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$90.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All pizza burger">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic11.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Veg Soup</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$28.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                        <li className="card-container lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px] All drink sweet spicy">
                            <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                    <img src="/asset/images/gallery/small/pic12.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                </div>
                                <div className="mt-auto">
                                    <h4 className="mb-2.5">
                                        <Link href="/productDetail">Noodles</Link>
                                    </h4>
                                    <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                    <h5 className="text-primary">$40.00</h5>
                                    <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="offcanvas offcanvas-end filter-category-sidebar fixed top-0 translate-x-full z-[999] h-screen overflow-y-auto bg-white dark:bg-gray-800 xl:w-[510px] sm:w-[400px] w-[325px] pt-[50px] px-[30px] pb-5 max-md:p-5 max-md:pt-[50px] duration-500" id="offcanvasFilter" >
                    <button type="button" className="btn-close style-1 text-2xl leading-7 absolute left-[10px] top-[10px] p-0"><i className="la la-close"></i></button>
                    <div className="offcanvas-body">
                        <div className="widget mb-[30px]">
                            <div className="widget-title xl:mb-[30px] mb-5 pb-3 relative">
                                <h4 className="text-xl">Refine By Categories</h4>
                            </div>
                            <div className="category-check-list flex flex-wrap mb-[10px] w-full">
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-01" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-01">
                                        Pizza
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-02" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-02">
                                        Hamburger
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-03" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-03">
                                        Cold Drink
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-04" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-04">
                                        Sandwich
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-05" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-05">
                                        Muffin
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-06" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-06">
                                        Burrito
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-07" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-07">
                                        Taco
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-08" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-08">
                                        Hot Dog
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-09" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-09">
                                        Noodles
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-10" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-10">
                                        Macrony
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-11" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-11">
                                        Cheese Pasta
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-12" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-12">
                                        Fish Fry
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-13" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-13">
                                        Cold Coffee
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-14" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-14">
                                        Manchurian
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-15" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-15">
                                        Dosa
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-16" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-16">
                                        Momos
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-17" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-17">
                                        Soup
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-18" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-18">
                                        Chicken Burger
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-19" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-19">
                                        Beverages
                                    </label>
                                </div>
                                <div className="form-check mb-[10px] block w-[50%] min-h-[1.5rem]">
                                    <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-20" />
                                    <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-20">
                                        Lemon Lime Soda
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="widget mb-[30px]">
                            <div className="widget-title xl:mb-[30px] mb-5 pb-3 relative">
                                <h4 className="text-xl">Near Me</h4>
                            </div>
                            <div className="form-check mb-[10px] block min-h-[1.5rem]">
                                <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-21" />
                                <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-21">
                                    Ortus Restaurant
                                </label>
                            </div>
                            <div className="form-check mb-[10px] block min-h-[1.5rem]">
                                <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-22" />
                                <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-22">
                                    Amar Punjabi Restaurant
                                </label>
                            </div>
                            <div className="form-check mb-[10px] block min-h-[1.5rem]">
                                <input className="form-check-input w-[15px] h-[15px] rounded border border-[#2222224d] float-left appearance-none p-[6px]" type="checkbox" value="" id="productCheckBox-23" />
                                <label className="form-check-label ml-[15px] md:text-[15px] text-[13px] inline-block text-bodycolor" for="productCheckBox-23">
                                    Other
                                </label>
                            </div>
                        </div>
                        <div className="widget rating-filter mb-[30px]">
                            <div className="widget-title xl:mb-[30px] mb-5 pb-3 relative">
                                <h4 className="text-xl">Rating</h4>
                            </div>
                            <ul>
                                <li className="inline-block mr-2"><span className="font-medium">5 Star</span></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                            </ul>
                            <ul>
                                <li className="inline-block mr-2"><span className="font-medium">4 Star</span></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                            </ul>
                            <ul>
                                <li className="inline-block mr-2"><span className="font-medium">3 Star</span></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                            </ul>
                            <ul>
                                <li className="inline-block mr-2"><span className="font-medium">2 Star</span></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                            </ul>
                            <ul>
                                <li className="inline-block mr-2"><span className="font-medium">1 Star</span></li>
                                <li className="inline-block"><i className="icon-star-on text-[var(--secondary-dark)]"></i></li>
                            </ul>
                        </div>
                        <div className="widget mb-[30px]">
                            <div className="widget-title xl:mb-[30px] mb-5 pb-3 relative">
                                <h4 className="text-xl">Price Range</h4>
                            </div>
                            <div className="range-slider style-1 pt-[45px]">
                                <div id="slider-tooltips"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- our Menu--> */}
    </MainLayout>
  )
}

export default Menu
