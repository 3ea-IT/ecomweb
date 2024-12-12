import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

function Register() {
  return (
    <MainLayout>
      {/* Banner Section */}
      <section
        className="relative z-[1] pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('asset/images/banner/bnr1.jpg')" }}
      >
        <div className="container table h-full relative z-[1] text-center">
          <div className="dz-bnr-inr-entry align-middle table-cell">
            <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
              Register
            </h2>
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="breadcrumb-row">
              <ul className="breadcrumb bg-primary shadow-lg rounded-lg py-3 px-6 m-0 inline-block">
                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal">
                  <Link href="/" className="text-white">Home</Link>
                </li>
                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">
                  Register
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="content-inner-1 lg:pt-[100px] sm:pt-[70px] pt-[50px] pb-10 relative overflow-hidden section-wrapper-6">
        <div
          className="container sm:rounded-[10px] rounded-none bg-black2 z-[1] contact-area bg-parallax"
          style={{ backgroundImage: "url('asset/images/background/pic13.png')", backgroundAttachment: "fixed" }}
        >
          <div className="row items-center">
            {/* Form Section */}
            <div className="lg:w-12/12 md:w-full mb-[30px] px-[15px]">
              <div className="contact-head mb-[30px]">
                <h4 className="title mb-2 text-white" style={{color: 'red'}}>Register here</h4>
                <p className="text-white mb-4 opacity-75 sm:text-base text-sm">
                  Lorem Ipsum is that it has a more-or-less normal distribution
                  <br />
                  of letters, making it look like readable English.
                </p>
              </div>

              <form>
                    <div className="row">
                        {/* First Name */}
                        <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                            <input
                            type="text"
                            required
                            placeholder="First Name"
                            className="bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full"
                            />
                        </div>
                        </div>

                        {/* Last Name */}
                        <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                            <input
                            type="text"
                            required
                            placeholder="Last Name"
                            className="bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full"
                            />
                        </div>
                        </div>

                        {/* Email */}
                        <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                            <input
                            type="email"
                            required
                            placeholder="Enter Email"
                            className="bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full"
                            />
                        </div>
                        </div>

                        {/* Mobile Number */}
                        <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                            <input
                            type="text"
                            required
                            placeholder="Enter Mobile Number"
                            className="bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full"
                            />
                        </div>
                        </div>

                        {/* Address */}
                        <div className="w-full mb-[30px] px-[15px]">
                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                            <input
                            type="text"
                            required
                            placeholder="Enter Address"
                            className="bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full"
                            />
                        </div>
                        </div>

                        {/* City */}
                        <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                            <input
                            type="text"
                            required
                            placeholder="City"
                            className="bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full"
                            />
                        </div>
                        </div>

                        {/* State */}
                        <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                            <input
                            type="text"
                            required
                            placeholder="State"
                            className="bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full"
                            />
                        </div>
                        </div>

                        {/* Country */}
                        <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                            <input
                            type="text"
                            required
                            placeholder="Country"
                            className="bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full"
                            />
                        </div>
                        </div>

                        {/* Zip Code */}
                        <div className="md:w-1/3 w-full mb-[30px] px-[15px]">
                        <div className="relative flex items-center gap-2 w-full border-b border-white">
                            <input
                            type="text"
                            required
                            placeholder="Zip Code"
                            className="bg-transparent text-white placeholder:text-white border-0 outline-none focus:ring-0 text-lg w-full"
                            />
                        </div>
                        </div>

                        {/* Submit Button */}
                        <div className="w-full px-[15px]">
                        <button
                            type="submit"
                            className="py-[10px] px-[30px] mt-4 bg-primary text-white rounded-md text-sm font-medium"
                        >
                            Submit
                        </button>
                        </div>
                    </div>
                    </form>


            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Register;
