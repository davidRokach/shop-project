import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEditUserMutation } from "../../redux/feature/userApi";
import useUser from "../../hooks/useUser";

const EditProfile = () => {
  const { updateUser, user, nav, stateOfGetUser } = useUser();

  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const {
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [triggerEdit, dataEdit] = useEditUserMutation();

  const onSub = async (bodyData) => {
    await triggerEdit({ id: user._id, body: bodyData });
  };

  const state = stateOfGetUser();

  useEffect(() => {
    if (dataEdit.isSuccess) {
      updateUser();
      dataEdit.reset();
    }
    if (state.isSuccess) {
      nav("/user/profile");
    }
  }, [dataEdit.isSuccess, state.isSuccess]);

  const changePassword = () => {
    nav("/user/editProfile/password");
  };

  // Your regular expression for image URLs
  const imageUrlRegex =
    /^(https?:\/\/)?[^\s/$.?#].[^\s]*\.(jpeg|jpg|gif|png|bmp|webp|svg)(\?[^\s]*)?$/i;

  return (
    <div className="p-16 profileBackground h-screen">
      <form
        onSubmit={handleSubmit(onSub)}
        className="p-8 bg-gray-400 shadow mt-24 opacity-[92%] border rounded-box"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last lg:order-first mt-20 lg:mt-0">
            <div>
              <p
                className={`font-bold text-xl ${
                  user.isOnline ? "text-green-700" : "text-red-700"
                }`}
              >
                {user.isOnline ? "online" : "ofline"}
              </p>
              <p className="text-black">State</p>
            </div>
            <div>
              <p className="font-bold text-white text-xl">
                {user.favorite.length}
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
              <img className="rounded-full" src={user.profileImage} alt="" />
            </div>
          </div>
          <div className="space-x-8 flex justify-between sm:justify-evenly mt-32 lg:mt-0 lg:justify-center">
            <button
              onClick={() => changePassword()}
              type="button"
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-blue-800 hover:border-blue-900 py-2 px-4 uppercase rounded shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Change password
            </button>
            <button
              onClick={() => nav("/user/profile")}
              type="button"
              className="btn bg-red-600 hover:bg-red-700 text-white border-red-800 hover:border-red-900 py-2 px-4 uppercase rounded shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Back to profile
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12 grid justify-center">
          <input
            {...register("name", {
              required: {
                value: true,
                message: "Full Name is required...",
              },
              minLength: { value: 2, message: "min 2 chars..." },
              maxLength: { value: 20, message: "max 20 chars..." },
            })}
            placeholder="name"
            defaultValue={user.name}
            type="text"
            className="bg-transparent text-4xl font-medium text-white text-center border border-black rounded-xl"
          />
          {errors.name && (
            <p className="m-0 text-red-600 font-semibold">
              {errors.name.message}
            </p>
          )}
          <input
            {...register("email", {
              required: { value: true, message: "email is required" },
              pattern: { value: emailReg, message: "invalid email" },
            })}
            placeholder="email"
            defaultValue={user.email}
            type="email"
            className="bg-transparent font-light text-black mt-3 text-center border border-black rounded-lg"
          />
          {errors.email && (
            <p className="m-0 text-red-600 font-semibold">
              {errors.email.message}
            </p>
          )}
          <input
            {...register("profileImage", {
              required: { value: true, message: "profileImage is required" },
              pattern: {
                value: imageUrlRegex,
                message: "Invalid image URL",
              },
            })}
            placeholder="profile-image"
            defaultValue={user.profileImage}
            type="url"
            className="bg-transparent font-light text-black mt-3 text-center border border-black rounded-lg"
          />
          {errors.profileImage && (
            <p className="m-0 text-red-600 font-semibold">
              {errors.profileImage.message}
            </p>
          )}
          {dataEdit.isError && (
            <p className="m-0 text-red-600 font-semibold">
              {dataEdit.error.data.err}
            </p>
          )}
          <button
            type="sumbit"
            className="btn mt-3 bg-black hover:bg-green-700 text-white hover:text-black border-white hover:border-black py-2 px-4 uppercase rounded-xl shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          >
            Sumbit
          </button>
          <p className="mt-8 text-black">Role - {user.role}</p>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <h5 className="text-center text-white text-lg underline underline-offset-4">
            User creation date:
          </h5>
          <p className="text-black text-center font-light lg:px-16">
            Date:{user.created_at.substring(0, 10)} | Time:
            {user.created_at.substring(11, 19)}
          </p>
          <button className=" text-blue-700 py-2 px-4 font-medium mt-4">
            Show more
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
