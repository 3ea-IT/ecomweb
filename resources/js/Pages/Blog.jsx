import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import { Calendar, Eye, Clock } from "lucide-react";

const BlogCard = ({ blog }) => (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
        <div className="aspect-[16/9] overflow-hidden">
            <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
        </div>
        <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-primary" />
                    <span>
                        {new Date(blog.published_at).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <Eye size={16} className="text-primary" />
                    <span>{blog.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={16} className="text-primary" />
                    <span>{blog.read_time} min read</span>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-2">{blog.brief}</p>

            <Link
                href={`/blogs/${blog.slug}`}
                className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
            >
                Read More <span className="ml-1">→</span>
            </Link>
        </div>
    </div>
);

export default function Blog({ blogs }) {
    return (
        <MainLayout>
            <div className="relative">
                {/* Hero Section */}
                <section
                    className="relative h-[300px] flex items-center justify-center bg-gradient-to-r from-primary to-primary/80 overflow-hidden mt-20"
                    style={{
                        backgroundImage:
                            "url(/assets/images/extras/blogs-cover.avif)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 text-center px-4">
                        <h1 className="text-5xl font-bold text-white mb-4">
                            Our Blog
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Discover our latest articles, tips, and stories
                            about food and hospitality
                        </p>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="py-16 px-4 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {blogs.data.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>

                    {/* Pagination - Add your pagination component here */}
                </section>
            </div>
        </MainLayout>
    );
}
