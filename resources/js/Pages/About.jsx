import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ReviewCarousel from '../Components/ReviewCarousel';

function About({ reviews }) {
  return (
    <MainLayout>
      {/* Banner Section */}
      <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
        <div className="container table h-full relative z-[1] text-center">
          <div className="dz-bnr-inr-entry align-middle table-cell">
            <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">About Us</h2>
            {/* Breadcrumb Row */}
            <nav aria-label="breadcrumb" className="breadcrumb-row">
              <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><Link href="/" className="text-white">Home</Link></li>
                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">About Us</li>
              </ul>
            </nav>
            {/* End Breadcrumb Row */}
          </div>
        </div>
      </section>
      {/* End Banner Section */}

      {/* Story Section Start */}
      <section className="relative py-20 overflow-hidden bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/assets/images/extras/burger_main.png" // Make sure this path is correct
                    alt="Restaurant Interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-4xl font-bold text-yellow-500">25+</p>
                  <p className="text-gray-600">Years of Excellence</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:w-1/2"
            >
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-yellow-500 tracking-wider uppercase">Our Journey</h3>
                <h2 className="text-4xl font-bold font-lobster text-gray-900">A Story of the Best Restaurant</h2>
                <h3 className="text-2xl font-semibold text-gray-800">Pizzaport & Cafe</h3>

                <p className="text-gray-600 leading-relaxed">
                  Pizzaport & Cafe was conceptualized in 2000 and is currently serving delicious cuisine in Lucknow and Andheri(W) Mumbai. The restaurant is known for delivering the best Pan Asian and Continental cuisine, which tastes divine with every bite, in addition to our signature pizzas.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Since we only work with the most reputable vendors, the ingredients we utilize to make our toppings are always fresh and delectable. We're driven to be the best at creating innovative recipes.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
                      <i className="flaticon-pizza text-2xl text-yellow-500"></i> {/* Ensure Flaticon is loaded */}
                    </div>
                    <div>
                      <h4 className="font-semibold">Premium Quality</h4>
                      <p className="text-sm text-gray-500">Fresh Ingredients</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
                      <i className="flaticon-restaurant text-2xl text-yellow-500"></i> {/* Ensure Flaticon is loaded */}
                    </div>
                    <div>
                      <h4 className="font-semibold">25+ Years</h4>
                      <p className="text-sm text-gray-500">Of Experience</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      {/* Story Section End */}

      {/* Quality Service Section */}
       {/* <!-- Quality Service Start --> */}
       <section className="bg-light relative section-wrapper-3  after:content-[''] after:h-[200px] after:w-full after:bg-white after:absolute after:bottom-0 after:left-0 after:z-[0] sm:py-[100px] py-[50px]">
                <div className="container">
                    <div className="2xl:mb-[50px] mb-[25px] relative mx-auto text-center">
                        <h2 className="font-lobster">Quality Services</h2>
                    </div>
                    <div className="icon-wrapper1 bg-white rounded-[15px] relative z-[1]">
                        <div className="row">
                            <div className="lg:w-1/4 sm:w-1/2 w-full px-[15px]">
                                <div className="bg-[url('../images/gallery/grid/pic1.jpg')] icon-box-wrapper group text-center">
                                    <div className="inner-content relative z-[1]">
                                        <div className="mb-[10px]">
                                            <i className="flaticon-pizza text-7xl text-yellow"></i>
                                        </div>
                                        <div className="icon-content overflow-hidden text-center">
                                            <h5 className="mb-2">
                                                American Pizzas
                                            </h5>
                                            <p className="sm:text-base text-[15px] group-hover:text-white">
                                                Savor the taste of tradition
                                                with our hand-crafted pizzas,
                                                made with the finest ingredients
                                                and a passion for perfection.
                                                Each bite promises a crispy
                                                crust, fresh toppings, and
                                                authentic flavors.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 sm:w-1/2 w-full px-[15px]">
                                <div className="bg-[url('../images/gallery/grid/pic2.jpg')] icon-box-wrapper group text-center">
                                    <div className="inner-content relative z-[1]">
                                        <div className="mb-[10px]">
                                            <i className="flaticon-restaurant text-7xl text-yellow"></i>
                                        </div>
                                        <div className="icon-content overflow-hidden text-center">
                                            <h5 className="mb-2">Pan Asian</h5>
                                            <p className="sm:text-base text-[15px] group-hover:text-white">
                                                Experience the vibrant and
                                                diverse flavors of Asia with our
                                                Pan-Asian cuisine, offering a
                                                fusion of bold spices, fresh
                                                ingredients, and traditional
                                                cooking techniques from across
                                                the region.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 sm:w-1/2 w-full px-[15px]">
                                <div className="bg-[url('../images/gallery/grid/pic3.jpg')] icon-box-wrapper group text-center">
                                    <div className="inner-content relative z-[1]">
                                        <div className="mb-[10px]">
                                            <i className="flaticon-burger text-7xl text-yellow"></i>
                                        </div>
                                        <div className="icon-content overflow-hidden text-center">
                                            <h5 className="mb-2">
                                                Burger & Sandwiches
                                            </h5>
                                            <p className="sm:text-base text-[15px] group-hover:text-white">
                                                Sink your teeth into our
                                                delicious burgers and
                                                sandwiches, made with premium
                                                ingredients and packed with
                                                mouthwatering flavors for the
                                                ultimate comfort food
                                                experience.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 sm:w-1/2 w-full px-[15px]">
                                <div className="bg-[url('../images/gallery/grid/pic4.jpg')] icon-box-wrapper group text-center">
                                    <div className="inner-content relative z-[1]">
                                        <div className="mb-[10px]">
                                            <i className="flaticon-martini text-7xl text-yellow"></i>
                                        </div>
                                        <div className="icon-content overflow-hidden text-center">
                                            <h5 className="mb-2">Beverages</h5>
                                            <p className="sm:text-base text-[15px] group-hover:text-white">
                                                Quench your thirst with our
                                                refreshing selection of
                                                beverages, from chilled soft
                                                drinks to handcrafted juices and
                                                signature mocktails, perfect for
                                                every occasion.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    src="/asset/images/background/pic3.png"
                    alt=""
                    className="2xl:left-[20px] 2xl:top-[20px] absolute 2xl:block hidden"
                />
            </section>
            {/* <!-- Quality Service End--> */}

        

      {/* End Quality Service Section */}
       {/* <!-- Reviews --> */}
       <ReviewCarousel reviews={reviews} />
            {/* <!-- Reviews End --> */}
    </MainLayout>
  );
}

export default About;
