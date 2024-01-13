import React from "react";
import {AiOutlineCheck} from "react-icons/ai";
import {BsArchive} from "react-icons/bs";

const OneOrder = ({ item, index }) => {
  console.log(item);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  };
  let amountOfProductsOrder = 0;
  item.items.map((item, i) => {
    amountOfProductsOrder += item.quantity;
  });
  return (
    <tr className="hover">
      <td>{index + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={item.user_id.profileImage} alt={item.user_id.name} />
            </div>
          </div>
          <div>
            <div className="font-bold">{item.user_id.name}</div>
            <div className="text-sm opacity-50">{item.user_id.email}</div>
          </div>
        </div>
      </td>
      <td
        className={
          item.status == "Pending" ? "text-orange-600" : "text-green-400"
        }
      >
        {item.status}
        <br />
      </td>
      <td>₪{item.total_price}</td>
      <td className=" flex items-center">
        {amountOfProductsOrder}-units
      </td>
      <td>
        <p>
          <span className=" font-bold">created:</span>
          {formatDateString(item.created_at)}
        </p>
      </td>
      <th className=" flex gap-3">
        {/* <NavLink to={`/admin/editProduct/${item._id}`} className="btn text-xl">
          <HiPencilAlt />
        </NavLink> */}
        <button onClick={() => deleteFunc(item._id)} className="btn text-xl hover:bg-red-600">
            <BsArchive/>
        </button>
        <button onClick={() => deleteFunc(item._id)} className="btn text-xl hover:bg-green-600">
            <AiOutlineCheck/>
        </button>
      </th>
    </tr>
  );
};

export default OneOrder;
