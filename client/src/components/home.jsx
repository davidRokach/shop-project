import React from "react";
import Product from "./products";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 ms-5 mt-2 border-b-2 border-[#ddd] w-[98vw] p-5">
        <h1 className="text-4xl underline font-bold ">All-Products:</h1>
        <h3 className="text-2xl">In This Page You Can See All The Prodcuts.</h3>
      </div>
      <Product />
    </>
  );
};

export default Home;
