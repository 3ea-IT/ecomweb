import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/react";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "ALL", iconClass: "flaticon-fast-food" },
    { id: "drink", name: "COLD DRINK", iconClass: "flaticon-cocktail" },
    { id: "pizza", name: "PIZZA", iconClass: "flaticon-pizza-slice" },
    { id: "salad", name: "SALAD", iconClass: "flaticon-salad" },
    { id: "sweet", name: "SWEETS", iconClass: "flaticon-cupcake" },
    { id: "spicy", name: "SPICY", iconClass: "flaticon-chili-pepper" },
    { id: "burger", name: "BURGER", iconClass: "flaticon-hamburger-1" },
  ];

  // Scroll to the corresponding section on the right
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(categoryId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <MainLayout>
      {/* Banner */}
      <section className="bg-[url('../images/banner/bnr3.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
        <div className="container table h-full relative z-[1] text-center">
          <div className="dz-bnr-inr-entry align-middle table-cell">
            <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">
              Our Menu
            </h2>
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
          </div>
        </div>
      </section>
      {/* Banner End */}

      {/* Menu Section */}
      <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[70px] sm:pb-10 pb-5 overflow-hidden relative bg-white">
        <div className="container">
          <div className="row">
            {/* Left Sidebar (sticky) */}
            <div className="lg:w-3/12 md:w-4/12 w-full px-[15px]">
              <div className="bg-gray-50 p-4 rounded-lg mb-4 sticky top-[100px]">
                {/* ↑ This 'sticky top-[100px]' keeps this sidebar pinned  */}
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        className={`
                          flex items-center w-full px-3 py-2 rounded
                          ${
                            activeCategory === cat.id
                              ? "bg-red-600 text-white"
                              : "bg-white text-black hover:text-red-600"
                          }
                        `}
                        onClick={() => handleCategoryClick(cat.id)}
                      >
                        <i className={`${cat.iconClass} text-[25px] mr-3`} />
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column (scrolls normally) */}
            <div className="lg:w-9/12 md:w-8/12 w-full px-[15px]">
              {/* "All" section */}
              <section id="all" className="mb-[30px]">
                <h2 className="text-xl mb-4">All Items</h2>
                {/* Place your "all" items here */}
              </section>

              {/* Pizza */}
              <section id="pizza" className="mb-[30px]">
                <h2 className="text-xl mb-4">Pizza Section</h2>
                <div className="flex flex-wrap">
                  {/* Example item */}
                  <div className="lg:w-1/4 sm:w-1/2 w-full p-[15px]">
                    <div className="group rounded-lg menu-box border p-4 text-center">
                      <img
                        src="/asset/images/gallery/small/pic1.jpg"
                        alt="pizza"
                        className="rounded-full mx-auto mb-2 w-[100px] h-[100px]"
                      />
                      <h4>Pizza</h4>
                      <p>$55.00</p>
                      <button className="btn btn-primary mt-2">Add To Cart</button>
                    </div>
                  </div>
                  {/* ... more pizza items ... */}
                </div>
              </section>

              {/* Cold Drink */}
              <section id="drink" className="mb-[30px]">
                <h2 className="text-xl mb-4">Cold Drink Section</h2>
                <div className="flex flex-wrap">
                  {/* ... */}
                </div>
              </section>

              {/* Salad */}
              <section id="salad" className="mb-[30px]">
                <h2 className="text-xl mb-4">Salad Section</h2>
                <div className="flex flex-wrap">
                  {/* ... */}
                </div>
              </section>

              {/* Sweet */}
              <section id="sweet" className="mb-[30px]">
                <h2 className="text-xl mb-4">Sweet Section</h2>
                <div className="flex flex-wrap">
                  {/* ... */}
                </div>
              </section>

              {/* Spicy */}
              <section id="spicy" className="mb-[30px]">
                <h2 className="text-xl mb-4">Spicy Section</h2>
                <div className="flex flex-wrap">
                  {/* ... */}
                </div>
              </section>

              {/* Burger */}
              <section id="burger" className="mb-[30px]">
                <h2 className="text-xl mb-4">Burger Section</h2>
                <div className="flex flex-wrap">
                  {/* ... */}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Menu;
