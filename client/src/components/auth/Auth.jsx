import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/feature/userApi";
import { userRegister } from "../../redux/feature/userSlice";
import useUser from "../../hooks/useUser";
import "./auth.css";
import { NavLink } from "react-router-dom";
import Loading from "../../layout/loading";

const Auth = () => {
  const { isRegister, nav, dispatch, updateUser, stateOfGetUser } = useUser();

  const {
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const [sendRegister, resultRegister] = useRegisterMutation();
  const [sendLogin, resultLogin] = useLoginMutation();
  const { data, isLoading, isError, error, isSuccess } = stateOfGetUser();
  const state = stateOfGetUser();

  const onSub = async (bodyData) => {
    // console.log("bodyData", bodyData);
    if (isRegister) {
      await sendLogin(bodyData);
      // console.log(resultLogin);
      updateUser();
    } else {
      await sendRegister(bodyData);
      // console.log(resultRegister);
    }
  };

  useEffect(() => {
    console.log(state);
    if (isSuccess) {
      nav("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (resultRegister.isSuccess) {
      nav("/user/signIn");
      dispatch(userRegister(true));
    }
  }, [resultRegister.isSuccess]);

  useEffect(() => {
    reset();
    resultLogin.reset();
  }, [isRegister]);

  return (
    <>
      {resultRegister.isLoading ? (
        <Loading />
      ) : (
        <div className="h-[80vh] sm2:h-[100%]">
          <div
            className={`${
              isRegister
                ? "login-box w-[95vw] md:w-[80vw] lg:w-[75vw] xl:w-[40vw] 2xl:w-[30vw] absolute left-[50%] top-[31%] sm2:top-[45%] md:top-[45%] h-[480px]"
                : "login-box w-[95vw] md:w-[80vw] lg:w-[75vw] xl:w-[40vw] 2xl:w-[30vw] absolute left-[50%] top-[31%] sm2:top-[45%] md:top-[45%] h-[590px]"
            } `}
          >
            <h2>{!isRegister ? "SignUp" : "SignIn"}</h2>
            <form className="" onSubmit={handleSubmit(onSub)}>
              {!isRegister && (
                <div className="user-box">
                  <input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Full Name is required...",
                      },
                      minLength: { value: 2, message: "min 2 chars..." },
                      maxLength: { value: 20, message: "max 20 chars..." },
                    })}
                    type="text"
                    id="name"
                    required
                  />
                  <label htmlFor="name">Full Name</label>
                  {errors.name && (
                    <p className="mb-0 text-red-600 font-normal relative bottom-4">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}

              <div className="user-box">
                <input
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: { value: emailReg, message: "Invalid email" },
                  })}
                  type="text"
                  id="email"
                  required
                />
                <label htmlFor="email">Email</label>
                {errors.email && (
                  <p className="m-0 text-red-600 font-normal relative bottom-4">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required...",
                    },
                    minLength: { value: 2, message: "min 2 chars..." },
                    maxLength: { value: 50, message: "max 50 chars..." },
                  })}
                  type="password"
                  id="password"
                  required
                />
                <label htmlFor="password">Password</label>
                {errors.password && (
                  <p className="m-0 text-red-600 font-normal relative bottom-4">
                    {errors.password.message}
                  </p>
                )}
                {resultLogin.isError && (
                  <p className="m-0 text-red-600 font-normal relative bottom-4">
                    {resultLogin.error.data.msg}
                  </p>
                )}
                {resultRegister.isError && (
                  <p className="m-0 text-red-600 font-normal relative bottom-4">
                    {resultRegister.error.data.err}
                  </p>
                )}
              </div>
              <div>
                <NavLink
                  to={isRegister ? "/user/signUp" : "/user/signIn"}
                  onClick={() =>
                    dispatch(userRegister(isRegister ? false : true))
                  }
                  className="link link-hover text-lg text-[#03e9f4] hover:text-[rgb(3,253,244)]"
                >
                  {isRegister ? "register" : "login"}
                </NavLink>
              </div>
              <div className="flex justify-between">
                <button>
                  <span />
                  <span />
                  <span />
                  <span />
                  {isRegister ? "login" : "register"}
                </button>
                <button onClick={() => nav("/")}>
                  <span />
                  <span />
                  <span />
                  <span />
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
