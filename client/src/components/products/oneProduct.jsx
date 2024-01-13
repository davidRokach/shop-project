import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/feature/productApi";
import useUser from "../../hooks/useUser";
import { DEFAULT_IMAGE } from "../../constant/url";
import { Fade } from "react-awesome-reveal";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { TbCurrencyShekel } from "react-icons/tb";
import useCart from "../../hooks/useCart";
import Loading from "../../layout/loading";

const OneProduct = () => {
  // const [image, setImage] = useState("");
  const { nav } = useUser();
  const { addToCart } = useCart();

  const { id } = useParams();
  const { data, isLoading, refetch } = useGetProductByIdQuery(id);
  // console.log(data);
  // console.log(image);
  // console.log(DEFAULT_IMAGE);

  // useEffect(() => {
  //   setImage(data?.image);
  // }, [data]);

  // useEffect(() => {
  //   refetch();
  // }, [image]);
  return (
    <Fade direction="top" duration={500}>
      <div className="h-[115vh] sm2:h-[125vh] md:h-[50vh]">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-[410px] mt-[-120px] sm2:mt-[10px] sm:w-[610px] sm2:w-[750px] sm:h-[900px] sm2:h-[820px] md:h-auto md:w-[800px] lg:w-[1000px] absolute bg-white top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md transition duration-300 hover:shadow-2xl fontToOneProduct">
            <nav className="flex justify-between items-center w-full h-5 text-gray-700 uppercase py-10 px-3 border-b-2 border-gray-300">
              <div className="flex gap-2 items-center text-xl">
                <span>
                  <MdOutlineArrowBackIosNew />
                </span>
                <button onClick={() => nav(-1)}>Back to all Products</button>
              </div>
              <span className=" text-4xl hover:text-red-700">
                <AiFillHeart />
              </span>
            </nav>
            <div className="grid md:flex md:justify-between h-auto">
              <div className="text-center w-[100%] md:w-[75%] lg:w-[65%]">
                <img
                  src={data.image}
                  alt="Product"
                  className="w-full max-w-[800px] max-h-[430px] h-auto p-[15px]"
                />
              </div>
              <div className="p-8 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 h-auto flex flex-col gap-12 sm:gap-6 sm2:gap-1 lg:gap-6">
                <h2 className="uppercase text-2xl font-extrabold text-gray-700 pt-15">
                  {data.name}
                </h2>
                <h4 className="uppercase text-gray-700">{data.category}</h4>
                <h1 className="flex items-center font-light text-gray-700">
                  <span>
                    <TbCurrencyShekel />
                  </span>
                  {data.price}
                </h1>
                <h1 className="flex items-center font-light text-gray-700">
                  {data.quantity}-InSotck
                </h1>
                <p className="text-12 leading-20 text-gray-700 w-[100%]">
                  {data.info}
                </p>
                <div className="flex pt-8 justify-between w-full">
                  <button
                    onClick={() => addToCart(item._id, "increase")}
                    className="btn w-[45%] outline-none border-gray-400 py-8 text-gray-700 font-semibold content-center"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => nav("/user/cart")}
                    className="btn w-[45%] outline-none border-gray-400 py-8  mb-30 text-gray-700 font-semibold content-center"
                  >
                    Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fade>
  );
};
export default OneProduct;
