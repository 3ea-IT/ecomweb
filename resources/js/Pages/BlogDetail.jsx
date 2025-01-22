import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import { Calendar, Eye, Clock, Share2 } from "lucide-react";

const SocialShare = ({ url, title }) => (
    <div className="flex items-center gap-3">
        <span className="font-medium text-gray-700">Share:</span>
        <button
            onClick={() =>
                window.open(
                    `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
                    "_blank"
                )
            }
            className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
        >
            <i className="fab fa-twitter"></i>
        </button>
        <button
            onClick={() =>
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                    "_blank"
                )
            }
            className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
        >
            <i className="fab fa-facebook-f"></i>
        </button>
        <button
            onClick={() =>
                window.open(
                    `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
                    "_blank"
                )
            }
            className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
        >
            <i className="fab fa-linkedin-in"></i>
        </button>
    </div>
);

const RelatedPost = ({ blog }) => (
    <div className="group flex gap-4 items-start">
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
        </div>
        <div>
            <h4 className="font-medium group-hover:text-primary transition-colors">
                <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {blog.brief}
            </p>
        </div>
    </div>
);

export default function BlogDetail({ blog, relatedBlogs }) {
    return (
        <MainLayout>
            <article className="max-w-4xl mx-auto px-4 py-12 mt-20">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6 leading-none">
                        {blog.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-primary" />
                            <span>
                                {new Date(
                                    blog.published_at
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={18} className="text-primary" />
                            <span>{blog.views} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-primary" />
                            <span>{blog.read_time} min read</span>
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                <div className="aspect-[21/9] rounded-xl overflow-hidden mb-12">
                    <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div
                    className="prose prose-lg max-w-none mb-12"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Share */}
                <div className="border-t border-b py-6 mb-12">
                    <SocialShare
                        url={window.location.href}
                        title={blog.title}
                    />
                </div>

                {/* Related Posts */}
                {relatedBlogs.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6">
                            Related Articles
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {relatedBlogs.map((relatedBlog) => (
                                <RelatedPost
                                    key={relatedBlog.id}
                                    blog={relatedBlog}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </MainLayout>
    );
}
