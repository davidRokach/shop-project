import React, { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import CartItem from "./cartItem";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useOrderCart from "../../hooks/useOrderCart";
import useUser from "../../hooks/useUser";

const Cart = () => {
  const { nav } = useUser();
  const { data, totalItems, totalPrice } = useCart();
  // console.log(data);
  const { makeOrder, resultOrder } = useOrderCart();
  const [selectedShipping, setSelectedShipping] = useState(
    "Standard shipping - ₪10.00"
  );
  const [shippingCost, setShippingCost] = useState(10);

  // Function to handle shipping option change
  const handleShippingChange = (e) => {
    setSelectedShipping(e.target.value);
  };
  useEffect(() => {
    // Calculate the shipping cost based on the selected option
    setShippingCost(selectedShipping.includes("Standard shipping") ? 10 : 20);
  }, [selectedShipping]);
  return (
    <>
      <div className=" max-w-md sm:container mx-auto mt-10 opacity-95">
        <div className="sm:flex  shadow-md my-10">
          <div className="sm:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{totalItems} Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-bold text-gray-600 text-xs uppercase w-2/5 underline">
                Product Details
              </h3>
              <h3 className="font-bold text-center text-gray-600 text-xs uppercase w-3/5 sm:w-1/5 underline">
                Quantity
              </h3>
              <div className="hidden sm:flex sm:flex-row sm:justify-evenly w-1/5 sm:w-2/5 gap-10">
                <h3 className="font-bold text-center text-gray-600 text-xs uppercase w-1/5 underline">
                  Price
                </h3>
                <h3 className="font-bold text-center text-gray-600 text-xs uppercase w-1/5 underline">
                  Total
                </h3>
              </div>
            </div>
            {data?.cart.map((item, i) => (
              <CartItem item={item._id} amount={item.amount} key={i} />
            ))}
            <NavLink
              to={-1}
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <FaLongArrowAltLeft className="text-xl me-1" />
              Continue Shopping
            </NavLink>
          </div>
          <div id="summary" className="sm:w-1/4 px-8 py-10 bg-slate-400 ">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {totalItems}
              </span>
              <span className="font-semibold text-sm">₪{totalPrice}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select
                onChange={handleShippingChange}
                className="block p-2 text-gray-600 w-full text-sm"
              >
                <option>Standard shipping - ₪10.00</option>
                <option>Fast shipping - ₪20.00</option>
              </select>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>₪{totalPrice + shippingCost}</span>
              </div>
              <button
                onClick={() => nav("payment")}
                className="bg-blue-500 font-semibold hover:bg-blue-600 py-3 text-sm text-white uppercase w-full mb-6"
              >
                Payment Method
              </button>
              <button
                onClick={() => makeOrder(data, shippingCost)}
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
              >
                Checkout
              </button>
              {resultOrder.isError && (
                <p className="mb-0 mt-6 text-red-600 font-bold relative bottom-4 underline">
                  {resultOrder?.error?.data?.err}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
