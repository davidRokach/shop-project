import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { TbCurrencyShekel } from "react-icons/tb";
import { DEFAULT_IMAGE } from "../../constant/url";
import useCart from "../../hooks/useCart";
import useUser from "../../hooks/useUser";

const ProductItem = ({ item }) => {
  const {nav} = useUser();
  // const [image, setImage] = useState(item.image);

  const { addToCart } = useCart();
  return (
    // <div className="w-72 mx-auto bg-amber-100 text-black opacity-95 shadow-xl mt-5 hover:shadow-2xl hover:scale-[105%] duration-300 border border-black rounded-xl">
    //   <img
    //     src={image}
    //     alt={item.name}
    //     onError={() => setImage(DEFAULT_IMAGE)}
    //     className="rounded-t-xl border-b-2 border-gray-500 w-[286px] h-[190.656px]"
    //   />
    //   <div className="card-body p-2 gap-6 h-56 max-h-full">
    //     <div className="card-title">
    //       <h5>{item.name}</h5>
    //     </div>
    //     <p>{item.info}</p>
    //     <div
    //       onClick={() => addToCart(item._id, "increase")}
    //       className="card-actions flex justify-between align-bottom"
    //     >
    //       <button className="btn btn-ghost btn-circle">
    //         <BsCartPlus className="text-xl" />
    //       </button>
    //       <NavLink
    //         className="btn bg-amber-500 border-amber-500 hover:bg-slate-600 hover:text-white text-base"
    //         to={`singleProduct/${item._id}`}
    //       >
    //         <p className="flex items-center">
    //           <span>
    //             <TbCurrencyShekel />
    //           </span>
    //           {item.price}
    //         </p>
    //       </NavLink>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="wsk-cp-product">
        <div className="wsk-cp-img" onClick={() => nav(`singleProduct/${item._id}`)}>
          <img src={item.image} alt={item.image} className="cursor-pointer" />
        </div>
        <div className="wsk-cp-text">
          <div className="category">
            <span>{item.category}</span>
          </div>
          <div className="title-product" onClick={() => nav(`singleProduct/${item._id}`)}>
            <h3 className="cursor-pointer">{item.name}</h3>
          </div>
          <div className="description-prod" onClick={() => nav(`singleProduct/${item._id}`)}>
            <p className="cursor-pointer">{item.info}</p>
          </div>
          <div className="card-footer">
            <div className="wcf-left">
              <span className="price">
                <p className="flex items-center">
                  <span>
                    <TbCurrencyShekel />
                  </span>
                  {item.price}
                </p>
              </span>
            </div>
            <div
              className="wcf-right"
              onClick={() => addToCart(item._id, "increase")}
            >
              <button
                className="btn btn-sm btn-outline btn-circle hover:btn-warning "
              >
                <BsCartPlus className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
