import React, { useState, useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import axios from 'axios';

function CartDetail() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countCart, setCountCart] = useState(0);

    const calculateTotal = () => {
        return cartItems
            .reduce((total, cartItem) => {
                const price = cartItem.sale_price || cartItem.unit_price;
                return total + price * cartItem.quantity;
            }, 0)
            .toFixed(2);
    };

  const AddoncalculateTotal = () => {
    return cartItems
      .reduce((AddonTotal, cartItem) => {
        const AddonPrice = cartItem.total_addon_price || 0;
        return AddonTotal + AddonPrice;
      }, 0)
      .toFixed(2);
  };

  const GstcalculateTotal = () => {
    const totalGst = cartItems.reduce((totalGst, cartItem) => {
      const price = cartItem.sale_price || cartItem.unit_price;
      const itemTotal = price * cartItem.quantity;
      const gstPercentage = cartItem.gst || 0;
      const itemGst = (itemTotal * gstPercentage) / 100;
      return totalGst + itemGst;
    }, 0);
    return Math.round(totalGst);
  };

  const deliveryCharge = 30.0;
  const ConvenienceCharge = 15.0;
  const totalGst = parseFloat(GstcalculateTotal());
  const itemTotal = parseFloat(calculateTotal());
  const addonTotal = parseFloat(AddoncalculateTotal());
  const totalAmount = (itemTotal + addonTotal + totalGst + deliveryCharge + ConvenienceCharge).toFixed(2);

    const handleDecrease = async (id) => {
        try {
            const response = await updateQuantityInDatabase(id, "decrease");
            if (response.cartItem) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id
                            ? { ...item, qty: response.cartItem.qty }
                            : item
                    )
                );
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error("Error decreasing quantity:", error.message);
        }
    };

    const handleIncrease = async (id) => {
        try {
            const response = await updateQuantityInDatabase(id, "increase");
            if (response.cartItem) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id
                            ? { ...item, qty: response.cartItem.qty }
                            : item
                    )
                );
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error("Error increasing quantity:", error.message);
        }
    };

  const updateQuantityInDatabase = async (productId, action) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/update-quantity/${productId}`,
        { action }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating quantity:', error.response || error.message);
      throw error;
    }
  };

  const handleRemoveItem = async (cart_item_id) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/remove-item`, { cart_item_id });
      if (response.data.success) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cart_item_id !== cart_item_id)
        );
      } else {
        alert(response.data.message || 'Failed to remove item. Please try again.');
      }
    } catch (error) {
      console.error('Error removing item:', error.message);
      alert('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const UserID = localStorage.getItem('userId'); // Fetch userId from localStorage
      if (!UserID) {
        alert("User is not logged in. Please log in to view your cart.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart-items`, {
          params: {
            user_id: UserID, // Send userId as a query parameter
          },
        });

                setCartItems(response.data.CartList);
                setCountCart(response.data.countCart);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart items:", error.message);
                alert("Failed to fetch cart data.");
                setLoading(false);
            }
        };

    fetchCartItems();
  }, []);

  return (
    <MainLayout>
      {/* <!-- Banner Section --> */}
      <section className="bg-[url('../images/banner/bnr1.jpg')] bg-fixed relative z-[1] after:content-[''] after:absolute after:z-[-1] after:bg-[#222222e6] after:opacity-100 after:w-full after:h-full after:top-0 after:left-0 pt-[50px] lg:h-[450px] sm:h-[400px] h-[300px] overflow-hidden bg-cover bg-center">
        <div className="container table h-full relative z-[1] text-center">
          <div className="dz-bnr-inr-entry align-middle table-cell">
            <h2 className="font-lobster text-white mb-5 2xl:text-[70px] md:text-[60px] text-[40px] leading-[1.2]">Shop Cart</h2>
            {/* <!-- Breadcrumb Row --> */}
            <nav aria-label="breadcrumb" className="breadcrumb-row">
              <ul className="breadcrumb bg-primary shadow-[0px_10px_20px_rgba(0,0,0,0.05)] rounded-[10px] inline-block lg:py-[13px] md:py-[10px] sm:py-[5px] py-[7px] lg:px-[30px] md:px-[18px] sm:px-5 px-3.5 m-0">
                <li className="breadcrumb-item p-0 inline-block text-[15px] font-normal"><Link href="/" className="text-white">Home</Link></li>
                <li className="breadcrumb-item text-white p-0 inline-block text-[15px] pl-2 font-normal active">Shop Cart</li>
              </ul>
            </nav>
            {/* <!-- Breadcrumb Row End --> */}
          </div>
        </div>
      </section>
      {/* <!-- Banner End --> */}

            {/* <!-- Search Section --> */}
            <section className="lg:pt-[100px] sm:pt-[70px] pt-[50px] lg:pb-[100px] sm:pb-10 pb-5 relative bg-white">
                <div className="container">
                    <div className="row">
                        <div className="lg:w-2/3 w-full px-[15px]">
                            <div className="flex justify-between items-center">
                                <h5 className="lg:mb-[15px] mb-5">
                                    ({countCart})Item you have selected
                                </h5>
                                <a
                                    href="#offcanvasFilter"
                                    id="filter-button2"
                                    className="btn btn-primary filter-btn lg:hidden block mb-[15px] py-[5px] px-[18px] text-white"
                                >
                                    Filter
                                </a>
                            </div>

                        {/* Cart List Section */}
                        {cartItems.length > 0 ? (
                          cartItems.map((product) => {
                            // Parse addon_ids if it's a string
                            let addonIdArray = [];
                            try {
                              addonIdArray = typeof product.addon_ids === "string"
                                ? JSON.parse(product.addon_ids)
                                : product.addon_ids;
                            } catch (error) {
                              console.error("Error parsing addon_ids:", error);
                              addonIdArray = [];
                            }

                                    return (
                                        <div
                                            key={product.cart_id}
                                            className="dz-shop-card style-1 flex border border-[#0000001a] rounded-[10px] mb-5 overflow-hidden duration-500 hover:border-transparent hover:shadow-[0px_15px_55px_rgba(34,34,34,0.15)] relative"
                                        >
                                            <div className="dz-media w-[100px] min-w-[100px]">
                                                <img
                                                    src={
                                                        product.product_image_url
                                                    }
                                                    className="h-full"
                                                    alt={product.product_name}
                                                />
                                            </div>
                                            <div className="dz-content sm:p-5 p-2 flex flex-col w-full">
                                                <div className="dz-head mb-4 flex items-center justify-between">
                                                    <h6 className="dz-name mb-0 flex items-center text-base">
                                                        <svg
                                                            className="mr-[10px]"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 18 18"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <rect
                                                                x="0.5"
                                                                y="0.5"
                                                                width="16"
                                                                height="16"
                                                                stroke="#0F8A65"
                                                            />
                                                            <circle
                                                                cx="8.5"
                                                                cy="8.5"
                                                                r="5.5"
                                                                fill="#0F8A65"
                                                            />
                                                        </svg>
                                                        <a
                                                            href={`/product-detail/${product.product_id}`}
                                                        >
                                                            {
                                                                product.product_name
                                                            }
                                                        </a>
                                                    </h6>
                                                    <h5 className="text-primary">
                                                        {product.sale_price ? (
                                                            <>
                                                                ₹
                                                                <del
                                                                    style={{
                                                                        fontSize:
                                                                            "14px",
                                                                        marginLeft:
                                                                            "0px",
                                                                        color: "#727272",
                                                                    }}
                                                                >
                                                                    {product.unit_price *
                                                                        product.quantity}
                                                                </del>
                                                                <br />₹
                                                                {product.sale_price *
                                                                    product.quantity}
                                                            </>
                                                        ) : (
                                                            `₹${
                                                                product.unit_price *
                                                                product.quantity
                                                            }`
                                                        )}
                                                    </h5>
                                                </div>
                                                <div className="dz-body sm:flex block justify-between">
                                                    <ul className="dz-meta flex mx-[-10px]">
                                                        <li className="leading-[21px] mx-[10px] text-sm text-[#727272]">
                                                            <span className="text-primary font-medium">
                                                                {product.product_description
                                                                    ?.split(" ")
                                                                    .slice(
                                                                        0,
                                                                        10
                                                                    )
                                                                    .join(" ")}
                                                                ...
                                                            </span>
                                                            <br />
                                                            {Array.isArray(
                                                                addonIdArray
                                                            ) &&
                                                                addonIdArray.length >
                                                                    0 && (
                                                                    <>
                                                                        <hr
                                                                            style={{
                                                                                border: "1px solid #ccc",
                                                                                margin: "10px 0",
                                                                            }}
                                                                        />
                                                                        <span
                                                                            style={{
                                                                                color: "rgb(87, 153, 225)",
                                                                            }}
                                                                        >
                                                                            Your
                                                                            Customisation
                                                                        </span>
                                                                        <br />
                                                                        <span
                                                                            style={{
                                                                                color: "black",
                                                                            }}
                                                                        >
                                                                            Added
                                                                            Toppings:{" "}
                                                                        </span>
                                                                        {
                                                                            product.addon_names
                                                                        }
                                                                    </>
                                                                )}
                                                        </li>
                                                    </ul>
                                                    <div className="dz-body flex justify-between items-center">
                                                        <div className="input-group flex flex-col items-start w-full">
                                                            <h5
                                                                className="text-primary text-right"
                                                                style={{
                                                                    textAlign:
                                                                        "right",
                                                                    marginBottom:
                                                                        "0",
                                                                }}
                                                            >
                                                                {product.total_addon_price ? (
                                                                    <>
                                                                        <span
                                                                            style={{
                                                                                color: "red",
                                                                            }}
                                                                        >
                                                                            ₹
                                                                            {
                                                                                product.total_addon_price
                                                                            }
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span></span>
                                                                )}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No items in your cart.</p>
                            )}
                        </div>

                <div className="lg:w-1/3 w-full px-[15px] mb-[30px]">
                    <aside className="lg:sticky pl-5 max-xl:pl-0 pb-[1px] top-[100px]">
                        <div className="shop-filter style-1">
                            <div className="flex justify-between">
                                <div className="widget-title xl:mb-[30px] mb-5 pb-3 text-lg relative">
                                    <h5 className="">Cart <span className="text-primary">({countCart})</span></h5>
                                </div>
                                <a href="javascript:void(0);" className="btn-close style-1 text-xl font-black text-primary p-0 lg:hidden block"><i className="la la-close font-black"></i></a>
                            </div>
                            {cartItems.length > 0 ? (
                              cartItems.map((cartItem) => (
                            <div className="cart-item flex items-center border-b border-[#2222221a] pb-[15px] mb-[15px]">
                                <div className="dz-media w-[80px] min-w-[80px] h-[80px] overflow-hidden rounded-[10px] relative">
                                    <img src={cartItem.product_image_url} alt={cartItem.product_name} />
                                </div>
                                <div className="dz-content ml-[15px] w-full">
                                    <div className="dz-head mb-[10px] flex items-center justify-between">
                                        <h6 className="text-base">{cartItem.product_name}</h6>
                                        <a href="javascript:void(0);" className="text-black2"   onClick={() => handleRemoveItem(cartItem.cart_item_id)}>
                                            <i className="fa-solid fa-xmark text-danger"></i>
                                        </a>
                                    </div>
                                    <div className="dz-body flex items-center justify-between">
                                        <div className="input-group mt-[5px] flex flex-wrap items-stretch h-[31px] relative w-[105px] min-w-[105px]">
                                            <input type="number" step="1" name="quantity" className="quantity-field"  value={cartItem.quantity} onChange={(e) => handleQuantityChange(cartItem.cart_id, e.target.value)} />
                                            <span className="flex justify-between p-[2px] absolute w-full">
                                              <input type="button" onClick={() => handleDecrease(cartItem.product_id)} value="-" className="button-minus" data-field="quantity" style={{ display: 'none' }} />
                                              <input type="button" onClick={() => handleIncrease(cartItem.product_id)} value="+" className="button-plus" data-field="quantity" style={{ display: 'none' }}  />
                                            </span>
                                          </div>
                                          <h5 className="price text-primary mb-0">
                                            {((cartItem.sale_price || cartItem.unit_price) * cartItem.quantity).toFixed(2)}
                                          </h5>

                                    </div>
                                </div>
                            </div>
                             ))
                            ) : (
                            <p>No items in your cart.</p>
                            )}
                            <div className="order-detail mt-5">

                                <h6 className="mb-2">Bill Details</h6>
                                <table className="mb-[25px] w-full border-collapse">
                                    <tbody>
                                        <tr>
                                            <td className="py-[6px] font-medium text-sm leading-[21px] text-bodycolor">Addon Total</td>
                                            <td className="price text-primary font-semibold text-base leading-6 text-right">{addonTotal}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-[6px] font-medium text-sm leading-[21px] text-bodycolor">Product Total</td>
                                            <td className="price text-primary font-semibold text-base leading-6 text-right">{itemTotal}</td>
                                        </tr>
                                        <tr className="charges border-b border-dashed border-[#22222233]">
                                            <td className="pt-[6px] pb-[15px] font-medium text-sm leading-[21px] text-bodycolor">Delivery Charges</td>
                                            <td className="price pt-[6px] pb-[15px] text-primary font-semibold text-base leading-6 text-right">{deliveryCharge}</td>
                                        </tr>
                                        <tr className="tax border-b-2 border-[#22222233]" hidden>
                                            <td className="pt-[6px] pb-[15px] font-medium text-sm leading-[21px] text-bodycolor">Govt Taxes & Other Charges</td>
                                            <td className="price pt-[6px] pb-[15px] text-primary font-semibold text-base leading-6 text-right">{totalGst}</td>
                                        </tr>
                                        <tr className="tax border-b-2 border-[#22222233]">
                                            <td className="pt-[6px] pb-[15px] font-medium text-sm leading-[21px] text-bodycolor">Convenience Charges</td>
                                            <td className="price pt-[6px] pb-[15px] text-primary font-semibold text-base leading-6 text-right">{ConvenienceCharge}</td>
                                        </tr>


                                        <tr className="total">
                                            <td className="py-[6px] font-medium text-sm leading-[21px] text-bodycolor"><h6>Total</h6></td>
                                            <td className="price text-primary font-semibold text-base leading-6 text-right">{totalAmount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link href="/check-out" className="btn btn-primary block text-center btn-md w-full btn-hover-1"><span className="z-[2] relative block">Order Now <i className="fa-solid fa-arrow-right ml-[10px]"></i></span></Link>
                            </div>
                        </div>
                    </aside>
                </div>

            </div>
        </div>
    </section>
	{/* <!-- Cart Section --> */}
    </MainLayout>
  );
}

export default CartDetail;
