import React, { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import useUser from "../../hooks/useUser";
import { useForm } from "react-hook-form";
import { useUpdateAddressMutation } from "../../redux/feature/userApi";

const UpdateAddress = () => {
  const { nav } = useUser();
  const {
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [triggerUpdate, resultUpdate] = useUpdateAddressMutation();
  console.log(resultUpdate);
  const onSub = (bodyData) => {
    console.log(bodyData);
    triggerUpdate(bodyData);
  };

  return (
    <Fade direction="top" duration={500}>
      <div className="h-[155vh] sm2:h-[158vh] md:h-[100vh]">
        <div className="login-box w-[95vw] md:w-[80vw] lg:w-[70vw] absolute left-[50%] top-[36%] sm2:top-[45%] md:top-[45%] h-[760px] md:h-[600px]">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit(onSub)}>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
              <div className="user-box">
                <input
                  {...register("street", {
                    required: "Street is required.",
                    minLength: {
                      value: 2,
                      message: "Street should be at least 2 characters long.",
                    },
                    maxLength: {
                      value: 100,
                      message: "Street should not exceed 100 characters.",
                    },
                  })}
                  type="text"
                  id="street"
                />
                <label htmlFor="street">Street</label>
                {errors.street && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.street.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("city", {
                    required: "City is required.",
                    minLength: {
                      value: 2,
                      message: "City should be at least 2 characters long.",
                    },
                    maxLength: {
                      value: 600,
                      message: "City should not exceed 600 characters.",
                    },
                  })}
                  type="text"
                  id="city"
                  required
                />
                <label htmlFor="city">City</label>
                {errors.city && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("state", {
                    required: "State is required.",
                    minLength: {
                      value: 2,
                      message: "State should be at least 2 characters long.",
                    },
                    maxLength: {
                      value: 100,
                      message: "State should not exceed 100 characters.",
                    },
                  })}
                  type="text"
                  id="state"
                  required
                />
                <label htmlFor="state">State</label>
                {errors.state && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("postalCode", {
                    required: "Postal Code is required.",
                    minLength: {
                      value: 2, // Minimum length of 2 characters
                      message: "Postal Code should be at least 2 characters.",
                    },
                    maxLength: {
                      value: 10, // Maximum length of 10 characters
                      message: "Postal Code should not exceed 10 characters.",
                    },
                  })}
                  type="text" // Change the input type to text for postal code
                  id="postalCode"
                  required
                />
                <label htmlFor="postalCode">Postal Code</label>
                {errors.postalCode && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>

              <div className="user-box">
                <input
                  {...register("country", {
                    required: "Country is required.",
                  })}
                  type="text"
                  id="country"
                  required
                />
                <label htmlFor="country">Country</label>
                {errors.country && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <button>
                <span />
                <span />
                <span />
                <span />
                Update
              </button>
              <button onClick={() => nav(-1)}>
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
    </Fade>
  );
};

export default UpdateAddress;
