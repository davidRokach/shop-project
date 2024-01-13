import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useEditProductMutation,
  useGetProductByIdQuery,
} from "../../../../redux/feature/productApi";
import useUser from "../../../../hooks/useUser";
import { Fade } from "react-awesome-reveal";
import { CATEGORIES } from "../../../../constant/data";
import Loading from "../../../loading";

const EditProduct = () => {
  const { nav } = useUser();
  const { id } = useParams();

  const { data, isLoading, isError, isSuccess, refetch } =
    useGetProductByIdQuery(id);

  const [triggerEdit, resultEdit] = useEditProductMutation();

  const {
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Your regular expression for image URLs
  const imageUrlRegex =
    /^(https?:\/\/)?[^\s/$.?#].[^\s]*\.(jpeg|jpg|gif|png|bmp|webp|svg)(\?[^\s]*)?$/i;

  const maxYear = new Date().getFullYear();

  const onSub = async (bodyData) => {
    bodyData.moreImages = bodyData.moreImages
      .split(",")
      .map((url) => url.trim());
    console.log(bodyData);
    await triggerEdit({ id: id, body: bodyData });
    nav(-1);
  };

  useEffect(() => {
    if (resultEdit.isSuccess) {
      refetch();
    }
  }, [resultEdit.isSuccess]);
  return isLoading ? (
    <Loading/>
  ) : (
    <Fade direction="top" duration={500}>
      <div className="h-[155vh] sm2:h-[158vh] md:h-[100vh]">
        <div className="login-box w-[95vw] md:w-[80vw] lg:w-[70vw] absolute left-[50%] top-[36%] sm2:top-[45%] md:top-[45%] h-[1370px] sm2:h-[1370px] md:h-[900px]">
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit(onSub)}>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
              <div className="user-box">
                <input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required...",
                    },
                    minLength: { value: 2, message: "min 2 chars..." },
                    maxLength: { value: 100, message: "max 100 chars..." },
                  })}
                  type="text"
                  id="name"
                  defaultValue={data?.name}
                  required
                />
                <label htmlFor="name">Name</label>
                {errors.name && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("info", {
                    required: { value: true, message: "Info is required" },
                    minLength: { value: 2, message: "min 2 chars..." },
                    maxLength: { value: 600, message: "max 600 chars..." },
                  })}
                  type="text"
                  id="info"
                  defaultValue={data?.info}
                  required
                />
                <label htmlFor="info">Info</label>
                {errors.info && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.info.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("price", {
                    required: { value: true, message: "Price is required" },
                    minLength: {
                      value: 0.01,
                      message: "min 0.01 chars...",
                    },
                    maxLength: {
                      value: 99999.99,
                      message: "max 99999.99 chars...",
                    },
                  })}
                  type="number"
                  id="price"
                  defaultValue={data?.price}
                  required
                />
                <label htmlFor="price">Price</label>
                {errors.price && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <select
                  {...register("category", {
                    required: {
                      value: true,
                      message: "Category is required",
                    },
                    validate: (value) => {
                      return value !== "Pick one" || "Category is required";
                    },
                  })}
                  id="category"
                  defaultValue={data?.category}
                  required
                >
                  <option value="Pick one" disabled>
                    Pick one
                  </option>
                  {CATEGORIES.map((item, i) => (
                    <option key={i}>{item}</option>
                  ))}
                </select>
                <label htmlFor="category" className="select-label">
                  Category
                </label>
                {errors.category && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("image", {
                    required: { value: true, message: "Image is required" },
                    pattern: {
                      value: imageUrlRegex,
                      message: "Invalid image URL",
                    },
                  })}
                  type="url"
                  id="image"
                  defaultValue={data?.image}
                  required
                />
                <label htmlFor="image">Image</label>
                {errors.image && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.image.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("moreImages", {
                    required: {
                      value: true,
                      message: "MoreImages is required",
                    },
                    attern: {
                      value: imageUrlRegex,
                      message: "Invalid image URL",
                    },
                  })}
                  type="url"
                  id="moreImages"
                  defaultValue={data?.moreImages}
                  required
                />
                <label htmlFor="moreImages">MoreImages</label>
                {errors.moreImages && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.moreImages.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("company", {
                    required: {
                      value: true,
                      message: "Company is required",
                    },
                    minLength: { value: 2, message: "min 2 chars..." },
                    maxLength: { value: 400, message: "max 400 chars..." },
                  })}
                  type="text"
                  id="company"
                  defaultValue={data?.company}
                  required
                />
                <label htmlFor="company">Company</label>
                {errors.company && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.company.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("model", {
                    required: { value: true, message: "Model is required" },
                    minLength: { value: 2, message: "min 2 chars..." },
                    maxLength: { value: 400, message: "max 400 chars..." },
                  })}
                  type="text"
                  id="model"
                  defaultValue={data?.model}
                  required
                />
                <label htmlFor="model">Model</label>
                {errors.model && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.model.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("year", {
                    required: {
                      value: true,
                      message: "Year is required...",
                    },
                    min: { value: 1900, message: "min 1900 number..." },
                    max: {
                      value: maxYear,
                      message: `max ${maxYear} number...`,
                    },
                  })}
                  type="number"
                  id="year"
                  defaultValue={data?.year}
                  required
                />
                <label htmlFor="year">Year</label>
                {errors.year && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.year.message}
                  </p>
                )}
              </div>
              <div className="user-box">
                <input
                  {...register("quantity", {
                    required: {
                      value: true,
                      message: "Quantity is required",
                    },
                    min: { value: 0, message: "min 0 number..." },
                    max: { value: 1000, message: "max 1000 number..." },
                  })}
                  type="number"
                  id="quantity"
                  defaultValue={data?.quantity}
                  required
                />
                <label htmlFor="quantity">Quantity</label>
                {errors.quantity && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
              <div className="flex flex-row-reverse justify-end items-center gap-3 mb-14 md:mb-0">
                <input
                  {...register("inStock", {
                    required: {
                      value: true,
                      message: "InStock is required",
                    },
                    minLength: { value: 2, message: "min 2 chars..." },
                    maxLength: { value: 400, message: "max 400 chars..." },
                  })}
                  type="checkbox"
                  id="inStock" // Add an ID for the label association
                  defaultChecked={data?.inStock}
                  required
                  className="checkbox checkbox-info border-[#03e9f4] checked:border-[#03e9f4] checked:bg-[#03e9f4]"
                />
                <label className="cursor-pointer label" htmlFor="inStock">
                  <span className="text-white">InStock</span>
                </label>
                {errors.inStock && (
                  <p className="m-0 text-red-600 font-semibold">
                    {errors.inStock.message}
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
                Edit
              </button>
              <button
                onClick={() => nav("/admin/allProductAdmin")}
                type="button"
              >
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

export default EditProduct;
