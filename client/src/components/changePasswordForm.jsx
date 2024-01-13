import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/feature/userApi";
import useUser from "../hooks/useUser";

const ChangePasswordForm = () => {
  const { nav } = useUser();
  const {
    user: { _id },
    updateUser,
  } = useUser();

  const {
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [trigger, result] = useChangePasswordMutation();

  const onSub = (bodyData) => {
    console.log({ id: _id, body: bodyData });
    delete bodyData.confirmPassword;
    trigger({ id: _id, body: bodyData });
  };

  useEffect(() => {
    if (result.isSuccess) {
      updateUser();
      nav("/user/editProfile");
      result.reset();
      reset();
    }
  }, [result.isSuccess]);

  return (
    <div className="bg-cover bg-center h-[100%] w-[100%]">
      <form onSubmit={handleSubmit(onSub)} className="hero h-[90vh]">
        <div className="hero-content flex-col sm:flex-row-reverse p-10 rounded-xl ">
          <div className="card flex-shrink-0 w-full sm:max-w-2xl h-full sm:max-h-2xl shadow-2xl bg-gradient-to-bl from-orange-700 to-yellow-500 opacity-90">
            <div className="card-body">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <div className="form-control">
                <label className="label">
                  <strong className="label-text">Old Password</strong>
                </label>
                <input
                  {...register("oldPassword", {
                    required: {
                      value: true,
                      message: "Old password is required...",
                    },
                    minLength: { value: 2, message: "min 2 chars..." },
                    maxLength: { value: 50, message: "max 50 chars..." },
                  })}
                  type="password"
                  placeholder="••••••••"
                  className="rounded-lg p-2 ps-2 mb-2 bg-gradient-to-r from-slate-700 to-transparent border border-slate-800 shadow-2xl text-white"
                />
                {errors.oldPassword && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <strong className="label-text">New Password</strong>
                </label>
                <input
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: "New password is required...",
                    },
                    minLength: { value: 2, message: "min 2 chars..." },
                    maxLength: { value: 50, message: "max 50 chars..." },
                  })}
                  type="password"
                  placeholder="••••••••"
                  className="rounded-lg p-2 ps-2 mb-2 bg-gradient-to-r from-slate-700 to-transparent border border-slate-800 shadow-2xl text-white"
                />
                {errors.newPassword && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <strong className="label-text">Confirm Password</strong>
                </label>
                <input
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm password is required...",
                    },
                    validate: {
                      value: (val) =>
                        getValues("newPassword") == val ||
                        "Password do not match..",
                    },
                  })}
                  type="password"
                  placeholder="••••••••"
                  className="rounded-lg p-2 ps-2 mb-2 bg-gradient-to-r from-slate-700 to-transparent border border-slate-800 shadow-2xl text-white"
                />
                {errors.confirmPassword && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {errors.password && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.password.message}
                  </p>
                )}
                {result.isError && (
                  <p className="m-0 text-red-600 font-semibold">
                    {result.error.data.msg}
                  </p>
                )}
              </div>
              <div className="form-control mt-8 flex-row gap-10 justify-around">
                <button className="btn bg-gradient-to-r from-slate-700 to-transparent  text-white hover:bg-gradient-to-l hover:from-slate-700 hover:to-transparent hover:text-black hover:border-black w-36 shadow-2xl">
                  Sumbit
                </button>
                <button
                  className="btn bg-gradient-to-r from-slate-700 to-transparent text-white hover:bg-gradient-to-l hover:from-slate-700 hover:to-transparent hover:text-black hover:border-black w-36 shadow-2xl"
                  onClick={() => nav("/user/editProfile")}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
