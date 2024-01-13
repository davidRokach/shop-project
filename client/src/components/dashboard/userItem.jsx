import React, { useEffect } from "react";
import { DEFAULT_IMAGE } from "../../constant/url";
import { HiStatusOnline } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { HiTrash } from "react-icons/hi";
import { useDeleteUserMutation } from "../../redux/feature/userApi";


const UserItem = ({ item, index, refetch }) => {

  const [triggerDelete, resultDelete] = useDeleteUserMutation();

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  };

  useEffect(()=> {
    if(resultDelete.isSuccess){
        refetch()
    }
  },[resultDelete.isSuccess])
  return (
    <>
      <tr className="hover">
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={item.profileImage}
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
          {item.email}
          <br />
        </td>
        <td>
          <HiStatusOnline
            className={
              item.isOnline
                ? "text-green-600 text-4xl hover:scale-110"
                : "text-red-600 text-4xl hover:scale-110"
            }
          />
        </td>
        <td>{item.role}</td>
        <td>
          <p>
            <span className="font-bold">created:</span>
            {formatDateString(item.created_at)}
          </p>
          <p>
            <span className="font-bold">updated:</span>
            {formatDateString(item.updated_at)}
          </p>
        </td>
        <th className=" flex gap-3">
          <button
            className="btn btn-outline hover:bg-red-600 text-2xl"
            onClick={() => triggerDelete(item._id)}
          >
            <HiTrash />
          </button>
        </th>
      </tr>
    </>
  );
};

export default UserItem;
