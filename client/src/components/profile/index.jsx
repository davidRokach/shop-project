import React from "react";
import { useDeleteUserMutation } from "../../redux/feature/userApi";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const { user, logoutFunc, nav } = useUser();

  const [triggerDelete, resultDelete] = useDeleteUserMutation();

  const deleteUserFunc = async () => {
    await triggerDelete(user._id);
    logoutFunc("/");
  };
  return (
    <div className="p-16 profileBackground h-screen">
      <div className="p-8 bg-gray-400 shadow mt-24 opacity-[92%] border rounded-box">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p
                className={`font-bold text-xl ${
                  user?.isOnline ? "text-green-700" : "text-red-700"
                }`}
              >
                {user?.isOnline ? "online" : "ofline"}
              </p>
              <p className="text-black">State</p>
            </div>
            <div>
              <p className="font-bold text-white text-xl">
                {user?.favorite.length}
              </p>
              <p className="text-black">Favorite</p>
            </div>
            <div>
              <p className="font-bold text-white text-xl">
                {user?.shopCart.cart.length}
              </p>
              <p className="text-black">Cart</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img className="rounded-full h-auto" src={user?.profileImage} alt="" />
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button
              onClick={() => nav("/user/editProfile")}
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-blue-800 hover:border-blue-900 py-2 px-4 uppercase rounded shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Edit
            </button>
            <button
              onClick={deleteUserFunc}
              className="btn bg-red-600 hover:bg-red-700 text-white border-red-800 hover:border-red-900 py-2 px-4 uppercase rounded shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-white">{user?.name}</h1>
          <p className="font-light text-black mt-3">{user?.email}</p>
          <p className="mt-8 text-black">Role - {user?.role}</p>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <h5 className="text-center text-white text-lg underline underline-offset-4">
            User creation date:
          </h5>
          <p className="text-black text-center font-light lg:px-16">
            Date:{user?.created_at.substring(0, 10)} | Time:
            {user?.created_at.substring(11, 19)}
          </p>
          <button onClick={() => nav("/user/editAddress")} className=" text-blue-700 py-2 px-4 font-medium mt-4 btn">
            Edit Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
