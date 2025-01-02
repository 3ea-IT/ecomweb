import React, { useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import { handleAddToCartClick } from "../utils/cart_model"; // same function as in Home.jsx
import { Link, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Menu(props) {
    // Destructure the data prop passed from the server
    const { data } = props;
    // Access Inertia's flash messages (if any)
    const { flash } = usePage().props;

    useEffect(() => {
        // Trigger success/error toast messages if available
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <MainLayout>
            {/* <!-- Banner  --> */}
            <section className="bg-[url('../images/banner/bnr3.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
                <div className="container table h-full relative z-[1] text-center">
                    <div className="dz-bnr-inr-entry align-middle table-cell">
                        <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
                            Our Menu
                        </h2>
                        {/* <!-- Breadcrumb Row --> */}
                        <nav aria-label="breadcrumb" className="breadcrumb-row">
                            <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal">
                                    <Link href="/" className="text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">
                                    Our Menu
                                </li>
                            </ul>
                        </nav>
                        {/* <!-- Breadcrumb Row End --> */}
                    </div>
                </div>
            </section>
            {/* <!-- Banner End --> */}

            {/* 
        ================================
        YOUR CATEGORY/FILTER SECTION
        (Optional: keep if you want filters)
        ================================
      */}

            {/* 
        ================================
        DYNAMIC MENU SECTION 
        Similar to SpecialMenu in Home.jsx
        ================================
      */}
            <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[70px] sm:pb-10 pb-5 overflow-hidden relative bg-white">
                <div className="container">
                    <div className="row">
                        {/* If data is loading or empty, handle that */}
                        {!data || data.length === 0 ? (
                            <div className="col-12">
                                <p>No Products Found</p>
                            </div>
                        ) : (
                            data.map((product) => (
                                <div
                                    key={product.product_id}
                                    className="lg:w-1/4 sm:w-1/2 w-full pl-[15px] pr-[15px] pb-[30px]"
                                >
                                    <div className="group rounded-lg menu-box box-hover text-center pt-10 px-5 pb-[30px] bg-white border border-grey-border hover:border-primary h-full flex duration-500 flex-col relative overflow-hidden z-[1]">
                                        <div className="w-[150px] min-w-[150px] h-[150px] mt-0 mx-auto mb-[10px] rounded-full border-[9px] border-white duration-500 z-[1]">
                                            <img
                                                src={`https://console.pizzaportindia.com/${product.main_image_url}`}
                                                alt={product.product_name}
                                                className="rounded-full group-hover:animate-spin"
                                            />
                                        </div>
                                        <div className="mt-auto">
                                            <h4 className="mb-2.5">
                                                <Link
                                                    href={`/product-detail/${product.product_id}`}
                                                >
                                                    {product.product_name}
                                                </Link>
                                            </h4>
                                            <p className="mb-2">
                                                {product.product_description
                                                    .split(" ")
                                                    .slice(0, 10)
                                                    .join(" ")}
                                                {product.product_description.split(
                                                    " "
                                                ).length > 10
                                                    ? "..."
                                                    : ""}
                                            </p>
                                            {/* MRP / Sale Price logic (same as SpecialMenu) */}
                                            <h5 className="text-primary">
                                                {product.base_sale_price ? (
                                                    <>
                                                        ₹
                                                        <del
                                                            style={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            {product.base_mrp}
                                                        </del>
                                                    </>
                                                ) : (
                                                    `₹${product.base_mrp}`
                                                )}
                                            </h5>
                                            {product.base_sale_price && (
                                                <h5 className="text-primary">
                                                    ₹{product.base_sale_price}
                                                </h5>
                                            )}

                                            {/* Add to Cart Button */}
                                            <button
                                                onClick={() =>
                                                    handleAddToCartClick(
                                                        product.product_id
                                                    )
                                                }
                                                className="btn btn-primary mt-[18px] bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Toast Container for showing success/error notifications */}
            <ToastContainer />
        </MainLayout>
    );
}

export default Menu;
