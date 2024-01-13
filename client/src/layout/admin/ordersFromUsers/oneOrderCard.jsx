import React from "react";
import { TbCurrencyShekel } from "react-icons/tb";
import { BsArchive } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const OneOrderCard = ({ item }) => {
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  };

  let amountOfProductsOrder = 0;
  item.items.map((item, i) => {
    amountOfProductsOrder += item.quantity;
  });
  return (
    <>
      <div className="wsk-cp-product">
        <div className="wsk-cp-img wsk-cp-img-user">
          <img
            src={item.user_id.profileImage}
            alt={item.user_id.name}
            className=""
          />
        </div>
        <div className="wsk-cp-text">
          <div className="title-product title-product-admin">
            <h3 className="">Name: {item.user_id.name}</h3>
            <h3 className=" text-sm opacity-50">Email: {item.user_id.email}</h3>
          </div>
          <div className="description-prod description-order-admin">
            <p className="">
              <span className="font-extrabold">Status: </span>
              <span
                className={
                  item.status == "Pending"
                    ? "text-orange-600"
                    : "text-green-400"
                }
              >
                {item.status}
              </span>
            </p>
            <p className=" flex items-center">
              <span className="font-extrabold">Shipping-Price: </span>
              <span>
                <TbCurrencyShekel />
              </span>
              {item.shipping_price}
            </p>
            <p className="">
              <span className="font-extrabold">Quantity: </span>
              {amountOfProductsOrder}-units
            </p>
            <p className="">
              <span className=" font-bold">created:</span>
              {formatDateString(item.created_at)}
            </p>
          </div>
          <div className="card-footer">
            <div className="wcf-left">
              <span className="price">
                <p className="flex items-center">
                  <span>
                    <TbCurrencyShekel />
                  </span>
                  {item.total_price}
                </p>
              </span>
            </div>
            <div
              className="wcf-right flex gap-1"
              //   onClick={() => addToCart(item._id, "increase")}
            >
              <NavLink
                // to={`/admin/editProduct/${item._id}`}
                className="btn btn-sm btn-outline btn-circle hover:bg-red-600 text-xl"
              >
                <BsArchive />
              </NavLink>
              <button
                // onClick={() => deleteFunc(item._id)}
                className="btn btn-sm btn-outline btn-circle hover:bg-green-600 text-xl"
              >
                <AiOutlineCheck />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneOrderCard;
