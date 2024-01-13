import React, { useRef } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import useCart from "../../hooks/useCart";
import { TbCurrencyShekel } from "react-icons/tb";

const CartItem = ({ item, amount }) => {
  const { addToCart, deleteItemFromCart } = useCart();
  const inputRef = useRef();
  const totalPrice = () => {
    return (item.price * amount).toFixed(2);
  };
  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-3/5 sm:w-2/5">
        {/* product */}
        <div className="sm:w-2/5">
          <img className="h-32 sm:h-24" src={item.image} alt={item.name} />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{item.name}</span>
          <span className="text-red-500 text-xs">{item.company}</span>
          <button
            onClick={() => deleteItemFromCart(item._id)}
            className="font-semibold hover:text-red-500 text-gray-500 text-xs text-left"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="join join-vertical lg:join-horizontal w-1/5 justify-center">
        <button
          onClick={() => addToCart(item._id, "decrease")}
          className="btn join-item"
        >
          <AiOutlineMinus className=" text-2xl" />
        </button>
        <input
          className="input w-14 text-center join-item"
          type="number"
          value={amount}
          ref={inputRef}
          onChange={() =>
            addToCart(item._id, "updateAmount", inputRef.current.value)
          }
        />
        <button
          onClick={() => addToCart(item._id, "increase")}
          className="btn join-item"
        >
          <AiOutlinePlus className=" text-2xl" />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-evenly w-1/5 sm:w-2/5 gap-10">
        <span className="text-center font-semibold text-sm">
          <h3 className="font-bold text-center text-gray-600 text-xs uppercase underline sm:hidden w-full">
            Price
          </h3>
          ₪{item.price.toFixed(2)}
        </span>
        <span className="text-center font-semibold text-sm">
          <h3 className="font-bold text-center text-gray-600 text-xs uppercase underline sm:hidden w-full">
            Total
          </h3>
          ₪{totalPrice()}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
