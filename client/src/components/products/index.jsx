import React from "react";
import ProductItem from "./productItem";
import { useGetProductsQuery } from "../../redux/feature/productApi";
import { useSearchParams } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import "./products.css";
import Pagination from "./pagination";
import Loading from "../../layout/loading";

const Product = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError, isSuccess, refetch, originalArgs } =
    useGetProductsQuery({
      search: searchParams.get("search"),
      cat: searchParams.get("cat"),
      page: JSON.parse(localStorage.getItem("page")),
    });

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        // <ProductItem />
        <Fade direction="top" duration={500}>
          <div className="p-[50px] min-h-screen">
            <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-cols-3 xl:gap-14 3xl:grid-cols-4 4xl:grid-cols-5 gap-8">
              {data.products.map((item, i) => (
                <ProductItem item={item} key={i} />
              ))}
            </div>
          </div>
          {/* <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
         
          </div> */}
          <Pagination refetch={refetch}/>
        </Fade>
      )}
    </>
  );
};

export default Product;
