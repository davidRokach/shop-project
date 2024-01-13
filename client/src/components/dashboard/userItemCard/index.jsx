import React, { useEffect } from "react";
import { useDeleteUserMutation } from "../../../redux/feature/userApi";
import { HiTrash } from "react-icons/hi";
import { HiStatusOnline } from "react-icons/hi";

const UserItemCard = ({ item, refetch }) => {
  const [triggerDelete, resultDelete] = useDeleteUserMutation();

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    if (resultDelete.isSuccess) {
      refetch();
    }
  }, [resultDelete.isSuccess]);
  return (
    <>
      <div className="wsk-cp-product">
        <div
          className="wsk-cp-img wsk-cp-img-user"
          onClick={() => nav(`singleProduct/${item._id}`)}
        >
          <img
            src={item.profileImage}
            alt={item.profileImage}
            
          />
        </div>
        <div className="wsk-cp-text">
          <div className="category">
            <span>
              <HiStatusOnline
                className={
                  item.isOnline
                    ? "text-green-600 text-4xl hover:scale-110"
                    : "text-red-600 text-4xl hover:scale-110"
                }
              />
            </span>
          </div>
          <div
            className="title-product"
            onClick={() => nav(`singleProduct/${item._id}`)}
          >
            <h3 >{item.name}</h3>
          </div>
          <div
            className="description-user"
            onClick={() => nav(`singleProduct/${item._id}`)}
          >
            <p >{item.email}</p>
            <p>
            <span className="font-bold">created:</span>
            {formatDateString(item.created_at)}
          </p>
          <p>
            <span className="font-bold">updated:</span>
            {formatDateString(item.updated_at)}
          </p>
          </div>
          <div className="card-footer">
            <div className="wcf-left">
              <span className="price">
                <p>{item.role}</p>
              </span>
            </div>
            <div className="wcf-right" onClick={() => triggerDelete(item._id)}>
              <button className="btn btn-sm btn-outline btn-circle  hover:bg-red-600">
                <HiTrash className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserItemCard;
