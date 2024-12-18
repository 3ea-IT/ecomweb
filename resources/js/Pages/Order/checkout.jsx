import React, { useState } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import axios from 'axios'; // or use fetch if preferred

function checkout({ countCart, CartList = [], data = [], UserData = [] }) {

    const [cartItems, setCartItems] = useState(CartList);

    const [paymentMethod, setPaymentMethod] = useState("");

    const handlePaymentChange = (e) => {
      setPaymentMethod(e.target.value);
    };

      const deliveryCharge = 5.00; // example delivery charge
      const taxCharge = 3.00; // example tax charge
      const couponAmount = 18.00; // Coupon discount

      const calculateTotal = () => {
        const total = cartItems.reduce((sum, cartItem) => {
          return sum + cartItem.product_price * cartItem.qty;
        }, 0);
        return parseFloat(total.toFixed(2));
      };

      const itemTotal = calculateTotal();
      const totalAmount = (itemTotal + deliveryCharge + taxCharge - couponAmount).toFixed(2);


      const handleAddToOrder = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
          const userId = document.getElementById("UserID").value;
          const addressId = document.getElementById("AddressID").value;

          // Collect order details from form inputs and state
          const payload = {
            user_id: userId,
            shipping_address_id: addressId,
            shipping_charges: deliveryCharge,
            tax_amount: taxCharge,
            coupon_amount: couponAmount,
            total_amount: totalAmount,
            payment_method: paymentMethod,
            order_number:"3445",
            order_status: "Pending",
            card_number: paymentMethod === "card" ? formData.cardNumber : null,
            expiry_date: paymentMethod === "card" ? formData.expiryDate : null,
            cvv: paymentMethod === "card" ? formData.cvv : null,
          };

          const response = await fetch("http://localhost:8000/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const data = await response.json();
            alert(data.error || "Could not place the order.");
            throw new Error("Failed to place the order.");
          }

          const data = await response.json();
          alert("Order placed successfully!");
          // Optionally, clear the form or navigate to an order summary page
        } catch (error) {
          console.error("Error:", error);
          alert("Error: Could not place the order. Please try again later.");
        }
      };


  return (
    <MainLayout>
      {/* <!-- Banner Section --> */}
      <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
        <div className="container table h-full relative z-[1] text-center">
          <div className="dz-bnr-inr-entry align-middle table-cell">
            <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">Shop Cart</h2>
            <nav aria-label="breadcrumb" className="breadcrumb-row">
              <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><Link href="/" className="text-white">Home</Link></li>
                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">Shop Cart</li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      {/* <!-- Banner End --> */}

      {/* <!-- Cart Section --> */}
    <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[100px] sm:pb-10 pb-5 relative bg-white">
        <div className="container">

            <div className="dz-divider bg-gray-dark icon-center my-12 relative h-[1px] bg-[#d3d3d3]">
                <i className="fa fa-circle bg-white text-primary absolute left-[50%] text-center top-[-8px] block"></i>
            </div>
            <div className="row">
                <div className="lg:w-1/2 w-full px-[15px]">
                    <div className="widget">
                        <h4 className="widget-title xl:mb-[30px] mb-5 pb-3 relative">Your Order</h4>
                        <table className="mb-5 border border-[#00000020] align-middle w-full">
                            <thead className="text-center">
                                <tr className="border-b border-[#00000020]">
                                    <th className="bg-[#222] p-[15px] text-base font-semibold text-white">IMAGE</th>
                                    <th className="bg-[#222] p-[15px] text-base font-semibold text-white">PRODUCT NAME</th>
                                    <th className="bg-[#222] p-[15px] text-base font-semibold text-white">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cartItems.length > 0 ? (
                              cartItems.map((cartItem) => (
                                <tr>
                                    <td className="p-[15px] font-medium border border-[#00000020] product-item-img"><img src={cartItem.product_image_url} alt={cartItem.product_name} className="w-[100px] rounded-md" /></td>
                                    <td className="p-[15px] font-medium border border-[#00000020] text-bodycolor">{cartItem.product_name}</td>
                                    <td className="p-[15px] font-medium border border-[#00000020] text-bodycolor">{(cartItem.product_price * cartItem.qty).toFixed(2)}</td>
                                </tr>
                                 ))
                                ) : (
                                <p>No items in your cart.</p>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full px-[15px]">

                <form className="shop-form widget" onSubmit={handleAddToOrder}>

                    <input type="hidden" name="UserID" id="UserID" value="1" />
                    <input type="hidden" name="AddressID" id="AddressID" value="10" />

                    <h4 className="widget-title xl:mb-[30px] mb-5 pb-3 relative">Order Total</h4>
                    <table className="mb-5 border border-[#00000020] align-middle w-full">
                      <tbody>
                        <tr>
                          <td className="p-[15px] font-medium text-bodycolor border border-[#00000020] ">Order Subtotal</td>
                          <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">{itemTotal}</td>
                        </tr>
                        <tr>
                          <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Shipping</td>
                          <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">{deliveryCharge}</td>
                        </tr>
                        <tr>
                          <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Govt Taxes & Other Charges</td>
                          <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">{taxCharge}</td>
                        </tr>
                        <tr>
                          <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Coupon</td>
                          <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">{couponAmount}</td>
                        </tr>
                        <tr>
                          <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">Total</td>
                          <td className="p-[15px] font-medium text-bodycolor border border-[#00000020]">{totalAmount}</td>
                        </tr>
                      </tbody>
                    </table>

                    <h4 className="widget-title xl:mb-[30px] mb-5 pb-3 relative">Payment Method</h4>
                    <div className="form-group mb-5 inline-block w-full">
                      <select
                        className="form-select nice-select after:border-black2 after:h-2 after:w-2 after:right-5 after:top-[60%]"
                        value={paymentMethod}
                        onChange={handlePaymentChange}
                        required
                      >
                        <option value="">Payment Method</option>
                        <option value="cod">Cash on Delivery</option>
                        <option value="card">Credit / Debit / ATM Card</option>
                      </select>
                    </div>

                    {paymentMethod === "card" && (
                      <>
                        <div className="form-group mb-5">
                          <input
                            name="cardNumber"
                            type="text"
                            className="h-[50px] py-[10px] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] focus:border-primary duration-500"
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="row">
                          <div className="form-group md:w-1/2 w-full px-[15px] mb-5">
                            <input
                              name="expiryDate"
                              required
                              type="text"
                              className="h-[50px] py-[10px] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] focus:border-primary duration-500"
                              placeholder="MM / YY"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group md:w-1/2 w-full px-[15px] mb-5">
                            <input
                              name="cvv"
                              required
                              type="text"
                              className="h-[50px] py-[10px] px-5 w-full text-[15px] rounded-[6px] placeholder:text-[#666666] focus:border-primary duration-500"
                              placeholder="CVV"
                              value={formData.cvv}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="form-group">
                      <button
                        className="btn bg-[#F3F3F3] gap-[10px] mb-4 shadow-none duration-700 btn-hover-2 btn-gray hover:bg-primary"
                        type="submit"
                      >
                        Place Order Now
                      </button>
                    </div>
                  </form>

                </div>
            </div>
        </div>
    </section>
    {/* <!-- cart Section --> */}

    </MainLayout>
  );
}

export default checkout;
