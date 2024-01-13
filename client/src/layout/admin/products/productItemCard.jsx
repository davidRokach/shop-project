import React, { useEffect, useState } from "react";
import { useDeleteProductMutation } from "../../../redux/feature/productApi";
import useUser from "../../../hooks/useUser";
import { TbCurrencyShekel } from "react-icons/tb";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const ProductItemCard = ({ item, refetch }) => {
  const { nav } = useUser();
  const [image, setImage] = useState(item.image);

  const [triggerDelete, resultDelete] = useDeleteProductMutation();

  const deleteFunc = async (id) => {
    await triggerDelete(id);
    console.log(resultDelete);
  };

  useEffect(() => {
    if (resultDelete.isSuccess) {
      refetch();
    }
  }, [resultDelete.isSuccess, image]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  };
  return (
    <>
      <div className="wsk-cp-product">
        <div
          className="wsk-cp-img wsk-cp-img-user"
          onClick={() => nav(`singleProduct/${item._id}`)}
        >
          <img src={item.image} alt={item.image} className="cursor-pointer" />
        </div>
        <div className="wsk-cp-text">
          <div
            className="title-product title-product-admin"
            onClick={() => nav(`singleProduct/${item._id}`)}
          >
            <h3 className="cursor-pointer">Name: {item.name}</h3>
          </div>
          <div
            className="description-prod description-prod-admin"
            onClick={() => nav(`singleProduct/${item._id}`)}
          >
            <p className="cursor-pointer">
              <span className="font-extrabold">Category: </span>
              {item.category}
            </p>
            <p className="cursor-pointer">
              <span className="font-extrabold">Info: </span>
              {item.info}
            </p>
            <p className="cursor-pointer">
              <span className="font-extrabold">Quantity: </span>
              {item.quantity}
            </p>
            <p className="cursor-pointer">
              <span className=" font-bold">created:</span>
              {formatDateString(item.created_at)}
            </p>
            <p className="cursor-pointer">
              <span className=" font-bold">updated:</span>
              {formatDateString(item.updated_at)}
            </p>
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
              className="wcf-right flex gap-1"
              //   onClick={() => addToCart(item._id, "increase")}
            >
              <NavLink
                to={`/admin/editProduct/${item._id}`}
                className="btn btn-sm btn-outline btn-circle text-xl"
              >
                <HiPencilAlt />
              </NavLink>
              <button
                onClick={() => deleteFunc(item._id)}
                className="btn btn-sm btn-outline btn-circle text-xl"
              >
                <HiTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItemCard;
