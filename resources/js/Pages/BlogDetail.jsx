import React from 'react'
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

function BlogDetail() {
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
                        <div className="dz-post-text pb-[5px]">
                        <p className="text-base mb-4 leading-[1.7]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <blockquote className="wp-block-quote style-1 text-primary xl:pt-5 md:pt-[25px] md:pr-[2rem] md:pb-5 md:pl-7 p-5 shadow-[0px_15px_50px_rgba(34,34,34,0.15)] my-[2.5rem] rounded-[10px] relative">
                            <i className="flaticon-right-quote quotes absolute right-5 left-auto bottom-[17px] top-auto text-[64px] text-primary md:inline-flex hidden"></i>
                            <p className="xl:text-[22px] md:text-lg text-base xl:leading-[35px] leading-[22px] text-black2 mb-4">
                            Create An Information Architecture That’s Easy To Use Way Precise Usability Considerations For Partially,
                            </p>
                            <cite className="relative font-semibold text-primary not-italic text-base">Ronald M. Spino</cite>
                        </blockquote>
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

                    <div className="dz-share-post flex flex-wrap items-center justify-between py-[10px] border-y border-[#2222221a]">
                        <div className="post-tags mx-[-3px]">
                        <h6 className="text-sm mb-0 mr-[10px] inline">Tags:</h6>
                        {["Pizza Veronese", "Chicken", "Pizza", "Burger", "Sandwich"].map(tag => (
                            <a key={tag} href="product-detail.html" className="inline-block p-[3px] text-sm relative m-[3px] text-bodycolor duration-500 hover:text-primary">
                            {tag}
                            </a>
                        ))}
                        </div>
                        <div className="dz-social-icon flex items-center">
                        <ul className="mx-[-5px]">
                            {["facebook-f", "twitter", "instagram", "linkedin-in"].map((icon, index) => (
                            <li key={index} className="inline-block px-[5px]">
                                <a target="_blank" rel="noopener noreferrer" className="btn-social btn-sm text-primary border-0 text-sm" href={`https://www.${icon}.com/`}>
                                <i className={`fab fa-${icon}`}></i>
                                </a>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                    </div>

                    <div className="max-w-full" id="comment-list">
                    <div className="comments-area" id="comments">
                        <h4 className="widget-title text-[1.25rem] xl:mb-[30px] mb-5 pb-3 relative">Comments (03)</h4>
                        <div className="clearfix">
                        <ul className="comment-list md:mb-[60px] mb-10">
                            {[
                            { name: "Monsur Rahman Lito", imgSrc: "pic1.jpg", comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
                            { name: "Jake Johnson", imgSrc: "pic2.jpg", comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
                            { name: "John Doe", imgSrc: "pic3.jpg", comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." }
                            ].map((comment, index) => (
                            <li key={index} className="comment">
                                <div className="comment-body relative border-b border-[#2222221a] md:pb-[30px] pb-[15px] md:pl-[100px] pl-[75px] md:mb-[30px] mb-5 min-h-[95px]">
                                <div className="comment-author vcard">
                                    <img className="avatar photo absolute left-0 md:h-[80px] h-[60px] md:w-[80px] w-[60px] rounded-full" src={`/asset/images/testimonial/mini/${comment.imgSrc}`} alt="/" />
                                    <cite className="fn md:text-base text-lg mb-2 not-italic font-semibold">{comment.name}</cite>
                                </div>
                                <p className="text-[15px] leading-[1.7]">{comment.comment}</p>
                                <div className="reply">
                                    <a href="#" className="comment-reply-link absolute text-sm top-[-3px] right-0 inline-block font-medium border-b-2 border-primary text-primary">Reply</a>
                                </div>
                                </div>
                            </li>
                            ))}
                        </ul>

                        {/* Comment Form */}
                        <div className="comment-respond style-1" id="respond">
                            <h4 className="widget-title text-[1.25rem] xl:mb-[30px] mb-5 pb-3 relative" id="reply-title">
                            Good Comments
                            <small><a style={{ display: "none" }} href="#" id="cancel-comment-reply-link" rel="nofollow">Cancel reply</a></small>
                            </h4>
                            <form className="mx-[-10px] flex flex-wrap" id="commentform" method="post">
                            <p className="px-[10px] mb-5 sm:w-[50%] w-full comment-form-author">
                                <input className="h-[60px] py-[15px] bg-[#f3f4f6] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] border-2 border-[#f3f4f6] focus:border-primary focus:bg-white duration-500 outline-none" type="text" name="dzName" placeholder="Author" id="author" />
                            </p>
                            <p className="px-[10px] mb-5 sm:w-[50%] w-full comment-form-email">
                                <input className="h-[60px] py-[15px] bg-[#f3f4f6] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] border-2 border-[#f3f4f6] focus:border-primary focus:bg-white duration-500 outline-none" type="text" placeholder="Email" name="dzEmail" id="email" />
                            </p>
                            <p className="px-[10px] mb-5 w-full comment-form-comment">
                                <textarea rows="8" name="comment" placeholder="Type Comment Here" id="comment" className="resize-none h-[120px] py-[15px] bg-[#f3f4f6] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] border-2 border-[#f3f4f6] focus:border-primary focus:bg-white duration-500 outline-none"></textarea>
                            </p>
                            <p className="form-submit mb-5 px-[10px] w-[50%]">
                                <button type="submit" className="btn btn-primary btn-hover-1" id="submit"><span>Submit Now</span></button>
                            </p>
                            </form>
                        </div>
                        {/* Comment Form End */}
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

export default BlogDetail
