import React from 'react'
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

function ProductDetail() {
  return (
            <MainLayout>
                {/* <!-- Banner  --> */}
                <section className="bg-[url('../images/banner/bnr3.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0  pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                    <div className="container table h-full relative z-[1] text-center">
                        <div className="dz-bnr-inr-entry align-middle table-cell">
                            <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">Product Detail</h2>
                            {/* <!-- Breadcrumb Row --> */}
                            <nav aria-label="breadcrumb" className="breadcrumb-row">
                                <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                    <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><Link href="/" className="text-white">Home</Link></li>
                                    <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">Product Detail</li>
                                </ul>
                            </nav>
                            {/* <!-- Breadcrumb Row End --> */}
                        </div>
                    </div>
                </section>
                {/* <!-- Product Detail Section --> */}
                <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[100px] pb-[50px] relative bg-white overflow-hidden">
                  <div className="container">
                      <div className="row product-detail">
                          <div className="lg:w-1/3 md:w-5/12 w-full px-[15px]">
                              <div className="detail-media rounded-[10px] overflow-hidden w-full mb-[30px]">
                                  <img src="/asset/images/modal/pic1.jpg" alt="/" className="h-full w-full object-cover" />
                              </div>
                          </div>
                          <div className="lg:w-8/12 md:w-7/12 w-full px-[15px]">
                              <div className="detail-info relative">
                                  <span className="badge mb-[10px] p-[2px] font-medium text-sm leading-5 text-[#666666] flex items-center rounded-[10px]">
                                      <svg className="mr-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <rect x="0.5" y="0.5" width="16" height="16" stroke="#0F8A65" />
                                          <circle cx="8.5" cy="8.5" r="5.5" fill="#0F8A65" />
                                      </svg>
                                      Pure veg
                                  </span>
                                  <div className="dz-head">
                                      <h2 className="mb-2 lg:text-4xl sm:text-[2rem] text-[1.75rem] font-semibold">Double Patty Veg Burger</h2>
                                      <div className="rating text-sm leading-[21px]">
                                          <i className="fa-solid fa-star text-[var(--secondary-dark)]"></i>
                                          <span className="text-bodycolor"><strong className="font-medium">4.5</strong> - 20 Reviews</span>
                                      </div>
                                  </div>
                                  <p className="text-[15px] mt-5 mb-4">
                                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                  </p>
                                  <ul className="detail-list flex my-[25px]">
                                      <li className="mr-[45px] text-[15px] font-medium leading-[22px] text-bodycolor">
                                          Price
                                          <span className="text-primary flex text-xl font-semibold leading-[30px] mt-[5px]">$20.00</span>
                                      </li>
                                      <li className="mr-[45px] text-[15px] font-medium leading-[22px] text-bodycolor">
                                          Quantity
                                          <div className="input-group mt-[5px] flex flex-wrap items-stretch h-[31px] relative w-[105px] min-w-[105px]">
                                              <input type="number" step="1" defaultValue="1" name="quantity" className="quantity-field" />
                                              <span className="flex justify-between p-[2px] absolute w-full">
                                                  <input type="button" value="-" className="button-minus" data-field="quantity" />
                                                  <input type="button" value="+" className="button-plus" data-field="quantity" />
                                              </span>
                                          </div>
                                      </li>
                                  </ul>
                                  <h6 className="mb-2">Add On</h6>
                                  <ul className="add-product flex flex-wrap mx-[-5px] mb-[30px] w-full">
                                      {["French Fries", "Extra Cheese", "Coca Cola", "Choco Lava"].map((item, index) => (
                                          <li key={index} className="p-[5px] sm:w-[50%] w-full">
                                              <div className="mini-modal inline-flex p-[10px] w-full rounded-[10px] items-center border border-[#2222221a]">
                                                  <div className="dz-media w-[45px] min-w-[45px] h-[45px] rounded-md relative overflow-hidden">
                                                      <img src={`/asset/images/modal/mini/pic${index + 1}.jpg`} alt="/" className="w-full h-auto" />
                                                  </div>
                                                  <div className="dz-content ml-[15px] flex justify-between w-full">
                                                      <p className="font-medium text-black2 text-base">{item}</p>
                                                      <div className="form-check search-content block">
                                                          <input className="form-check-input appearance-none rounded-[0.5em] w-6 h-6 border-2 border-primary" type="checkbox" />
                                                      </div>
                                                  </div>
                                              </div>
                                          </li>
                                      ))}
                                  </ul>
                                  <div className="lg:flex justify-between">
                                      <ul className="modal-btn-group sm:flex block mx-[-7px]">
                                          <li className="mx-[7px] lg:mb-0 mb-[10px]">
                                              <a href="shop-cart.html" className="btn shadow-none btn-primary btn-hover-1">
                                                  <span>Add To Cart <i className="flaticon-shopping-bag-1 text-xl ml-[10px] inline-flex"></i></span>
                                              </a>
                                          </li>
                                          <li className="mx-[7px] lg:mb-0 mb-[10px]">
                                              <a href="shop-checkout.html" className="btn shadow-none btn-outline-secondary btn-hover-1 text-yellow">
                                                  <span>Buy Now <i className="flaticon-shopping-cart text-xl ml-[10px] inline-flex"></i></span>
                                              </a>
                                          </li>
                                      </ul>
                                      <ul className="avatar-list avatar-list-stacked flex">
                                          {[1, 2, 3, 4, 5].map((num, index) => (
                                              <li key={index} className="avatar inline-block relative duration-300 hover:z-[1] mr-[-17px]">
                                                  <img src={`/asset/images/testimonial/small/pic${num}.jpg`} alt="" className="object-cover rounded-full h-[2.735rem] w-[2.735rem] border-2 border-white" />
                                              </li>
                                          ))}
                                          <li className="avatar inline-block relative duration-300 hover:z-[1]">
                                              <span className="bg-primary h-[2.735rem] w-[2.735rem] leading-[2.735rem] text-center inline-block text-xs rounded-full text-white">150+</span>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </section>

                <div className="pt-0 lg:pb-[100px] sm:pb-10 pb-5 relative bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="w-full px-[15px]">
                                <ul className="nav nav-tabs tabs-style-1 flex flex-wrap mb-[30px] border-b-2 border-[#EAEAEA]">
                                    <li className="nav-item mr-[3px] mb-[-1px] rounded-ss-md rounded-se-md overflow-hidden">
                                        <button className="nav-link border-2 border-transparent px-4 py-2 block active web-design-1" href="#web-design-1">
                                            <i className="icon-globe"></i>
                                            <span className="hidden md:inline-block ml-[10px]">Description</span>
                                        </button>
                                    </li>
                                    <li className="nav-item mr-[3px] mb-[-1px] rounded-ss-md rounded-se-md overflow-hidden">
                                        <button className="nav-link border-2 border-transparent px-4 py-2 block graphic-design-1" href="#graphic-design-1">
                                            <i className="icon-image"></i>
                                            <span className="hidden md:inline-block ml-[10px]">Additional Information</span>
                                        </button>
                                    </li>
                                    <li className="nav-item mr-[3px] mb-[-1px] rounded-ss-md rounded-se-md overflow-hidden">
                                        <button className="nav-link border-2 border-transparent px-4 py-2 block developement-1" href="#developement-1">
                                            <i className="icon-settings"></i>
                                            <span className="hidden md:inline-block ml-[10px]">Product Review</span>
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div id="web-design-1" className="tab-pane duration-500 active">
                                        <p className="mb-[10px] lg:text-base text-[15px]">
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't hidden in the middle of text.
                                        </p>
                                        <p className="lg:text-base text-[15px] mb-4">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </p>
                                        <ul className="list-check primary">
                                            <li className="relative lg:text-base text-[15px] py-[6px] pr-[5px] pl-[30px] text-bodycolor">
                                                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and
                                            </li>
                                            <li className="relative lg:text-base text-[15px] py-[6px] pr-[5px] pl-[30px] text-bodycolor">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                            </li>
                                        </ul>
                                    </div>
                                    <div id="graphic-design-1" className="tab-pane duration-500" style={{ display: 'none' }}>
                                        <table className="mb-5 border border-[#00000020] align-middle w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Cheese Burger</td>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Small, Medium & Large</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Toppings</td>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Onion, Tomato, Olives</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Rating</td>
                                                    <td className="p-[15px] font-medium text-yellow border border-[#00000020]">
                                                        <span className="rating-bx">
                                                            <i className="fas fa-star text-yellow"></i>
                                                            <i className="fas fa-star text-yellow"></i>
                                                            <i className="fas fa-star text-yellow"></i>
                                                            <i className="fas fa-star text-yellow"></i>
                                                            <i className="far fa-star text-yellow"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Shipping Charges</td>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Free Shipping</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Add More</td>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Coke, Cheese, Choco lava</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Delivery Time</td>
                                                    <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">30 mins</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="developement-1" className="tab-pane duration-500" style={{ display: 'none' }}>
                                        <div className="comments-area" id="comments">
                                            <ul className="comment-list md:mb-[60px] mb-10">
                                                {[
                                                    {
                                                        name: "Monsur Rahman Lito",
                                                        rating: 2,
                                                        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                                                        imgSrc: "/asset/images/testimonial/mini/pic1.jpg"
                                                    },
                                                    {
                                                        name: "Jake Johnson",
                                                        rating: 3,
                                                        comment: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                                                        imgSrc: "/asset/images/testimonial/mini/pic2.jpg"
                                                    },
                                                    {
                                                        name: "John Doe",
                                                        rating: 4,
                                                        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                                                        imgSrc: "/asset/images/testimonial/mini/pic3.jpg"
                                                    }
                                                ].map((review, index) => (
                                                    <li className="comment" key={index}>
                                                        <div className="comment-body relative min-h-[95px] border-b border-[#2222221a] md:pl-[100px] pl-[75px] md:pb-[30px] pb-[15px] md:mb-[30px] mb-5">
                                                            <div className="comment-author vcard">
                                                                <img className="md:h-[80px] h-[60px] md:w-[80px] w-[60px] rounded-full left-0 absolute" src={review.imgSrc} alt="/" />
                                                                <cite className="not-italic text-base font-semibold mb-2 block">{review.name}</cite>
                                                            </div>
                                                            <div className="star-rating mb-[10px] text-sm" data-rating={review.rating}>
                                                                {[...Array(5)].map((_, starIndex) => (
                                                                    <i key={starIndex} className={starIndex < review.rating ? "fas fa-star text-yellow" : "far fa-star text-yellow"}></i>
                                                                ))}
                                                            </div>
                                                            <p>{review.comment}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="comment-respond style-1" id="respond">
                                            <h3 className="widget-title xl:mb-[30px] mb-5 pb-3 relative text-2xl" id="reply-title">Add a review</h3>
                                            <form className="flex flex-wrap mx-[-10px]" id="commentform" method="post">
                                                <p className="mb-[30px] px-[10px] sm:w-[50%] w-full comment-form-author">
                                                    <label className="hidden" htmlFor="author">Name <span className="required">*</span></label>
                                                    <input type="text" className="h-[60px] py-[15px] bg-[#f3f4f6] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] border-2 border-[#f3f4f6] focus:border-primary focus:bg-white duration-500" name="dzName" placeholder="Author" id="author" />
                                                </p>
                                                <p className="mb-[30px] px-[10px] sm:w-[50%] w-full comment-form-email">
                                                    <label className="hidden" htmlFor="email">Email <span className="required">*</span></label>
                                                    <input type="text" className="h-[60px] py-[15px] bg-[#f3f4f6] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] border-2 border-[#f3f4f6] focus:border-primary focus:bg-white duration-500" placeholder="Email" name="dzEmail" id="email" />
                                                </p>
                                                <div className="comment-form-rating flex text-bodycolor px-[10px]">
                                                    <label className="pull-left mr-[10px] mb-5">Your Rating</label>
                                                    <div className="rating-widget">
                                                        <div className="rating-stars">
                                                            <ul id="stars">
                                                                {[...Array(5)].map((_, index) => (
                                                                    <li className="star inline-block" title={["Poor", "Fair", "Good", "Excellent", "WOW!!!"][index]} data-value={index + 1} key={index}>
                                                                        <i className="fas fa-star fa-fw text-sm text-[#ccc]"></i>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="comment-form-comment mb-5 px-[10px] w-full">
                                                    <label className="hidden" htmlFor="comment">Comment</label>
                                                    <textarea rows="10" name="comment" placeholder="Type Review Here" id="comment" className="resize-none h-[120px] py-[15px] bg-[#f3f4f6] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] border-2 border-[#f3f4f6] focus:border-primary focus:bg-white duration-500"></textarea>
                                                </p>
                                                <p className="form-submit mb-5 px-[10px] w-full">
                                                    <button type="submit" className="btn btn-primary btn-hover-2" id="submit">Submit Now</button>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="pt-0 lg:pb-[100px] pb-[70px] relative bg-white overflow-hidden">
                    <div className="container">
                        <div className="mb-[50px] max-xl:mb-[30px] relative mx-auto text-center">
                            <h2 className="font-lobster">Special Menu</h2>
                        </div>
                        <div className="swiper-btn-lr">
                            <div className="swiper portfolio-swiper">
                                <div className="swiper-wrapper p-b5">
                                    <div className="swiper-slide">
                                        <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1] active">
                                            <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                                <img src="/asset/images/gallery/small/pic1.jpg" alt="" className="rounded-full relative group-hover:animate-spin" />
                                            </div>
                                            <div className="mt-auto">
                                                <h4 className="mb-2.5">
                                                    <a href="product-detail.html">
                                                        Pizza
                                                    </a>
                                                </h4>
                                                <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                                <h5 className="text-primary">$55.00</h5>
                                                <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1] active">
                                            <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                                <img src="/asset/images/gallery/small/pic2.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                            </div>
                                            <div className="mt-auto">
                                                <h4 className="mb-2.5">
                                                    <a href="product-detail.html">
                                                        Rice
                                                    </a>
                                                </h4>
                                                <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                                <h5 className="text-primary">$50.00</h5>
                                                <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1] active">
                                            <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                                <img src="/asset/images/gallery/small/pic3.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                            </div>
                                            <div className="mt-auto">
                                                <h4 className="mb-2.5">
                                                    <a href="product-detail.html">
                                                        Green Salad
                                                    </a>
                                                </h4>
                                                <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                                <h5 className="text-primary">$45.00</h5>
                                                <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                            <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                                <img src="/asset/images/gallery/small/pic9.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                            </div>
                                            <div className="mt-auto">
                                                <h4 className="mb-2.5">
                                                    <a href="product-detail.html">
                                                        Aloo Sticks
                                                    </a>
                                                </h4>
                                                <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                                <h5 className="text-primary">$36.00</h5>
                                                <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                            <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                                <img src="/asset/images/gallery/small/pic4.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                            </div>
                                            <div className="mt-auto">
                                                <h4 className="mb-2.5">
                                                    <a href="product-detail.html">
                                                        Pasta
                                                    </a>
                                                </h4>
                                                <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                                <h5 className="text-primary">$35.00</h5>
                                                <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                            <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                                <img src="/asset/images/gallery/small/pic5.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                            </div>
                                            <div className="mt-auto">
                                                <h4 className="mb-2.5">
                                                    <a href="product-detail.html">
                                                        Momose
                                                    </a>
                                                </h4>
                                                <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                                <h5 className="text-primary">$25.00</h5>
                                                <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                            <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                                <img src="/asset/images/gallery/small/pic6.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                            </div>
                                            <div className="mt-auto">
                                                <h4 className="mb-2.5">
                                                    <a href="product-detail.html">
                                                        Panner
                                                    </a>
                                                </h4>
                                                <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                                <h5 className="text-primary">$60.00</h5>
                                                <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                            <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                                <img src="/asset/images/gallery/small/pic7.jpg" alt="" className="rounded-full group-hover:animate-spin" />
                                            </div>
                                            <div className="mt-auto">
                                                <h4 className="mb-2.5">
                                                    <a href="product-detail.html">
                                                        Macrony
                                                    </a>
                                                </h4>
                                                <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                                                <h5 className="text-primary">$22.00</h5>
                                                <a href="shop-cart.html" className="btn btn-primary mt-[18px] btn-hover-2">Add To Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            {/* <!-- Product Detail Section --> */}
            </MainLayout>
  )
}

export default ProductDetail
