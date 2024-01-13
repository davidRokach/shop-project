import React, { useEffect, useState } from "react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useDeleteProductMutation } from "../../../redux/feature/productApi";
import { DEFAULT_IMAGE } from "../../../constant/url";

const ProductItem = ({ item, index, refetch }) => {
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
  let page = JSON.parse(localStorage.getItem("page"));
  return (
    <>
      <tr className="hover">
        <td>{page >= 2 ? (page-1) * 12 +(index + 1) : index + 1}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={image}
                  alt={item.name}
                  onError={() => setImage(DEFAULT_IMAGE)}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{item.name}</div>
              <div className="text-sm opacity-50">{item.company}</div>
            </div>
          </div>
        </td>
        <td>
          {item.category}
          <br />
        </td>
        <td>{item.price}</td>
        <td className=" flex items-center">
          {item.quantity}-
          <br />
          <input
            type="checkbox"
            className="checkbox"
            checked={item.inStock}
            disabled
          />
        </td>
        <td>
          <p>
            <span className=" font-bold">created:</span>
            {formatDateString(item.created_at)}
          </p>
          <p>
            <span className=" font-bold">updated:</span>
            {formatDateString(item.updated_at)}
          </p>
        </td>
        <th className=" flex gap-3">
          <NavLink
            to={`/admin/editProduct/${item._id}`}
            className="btn text-xl"
          >
            <HiPencilAlt />
          </NavLink>
          <button onClick={() => deleteFunc(item._id)} className="btn text-xl">
            <HiTrash />
          </button>
        </th>
      </tr>
    </>
  );
};

export default ProductItem;
