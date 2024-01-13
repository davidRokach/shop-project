import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { useGetProductsQuery } from "../../../redux/feature/productApi";
import ProductItem from "./productItem";
import ProductItemCard from "./productItemCard";
import Loading from "../../loading";
import Pagination from "../../../components/products/pagination";

const AllProduct = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError, isSuccess, refetch } = useGetProductsQuery({
    search: searchParams.get("search"),
    cat: searchParams.get("cat"),
    page: JSON.parse(localStorage.getItem("page")),
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Fade direction="top" duration={500}>
          <div className="overflow-x-auto bg-white m-6 opacity-90 rounded-xl hidden md:block">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>quantity</th>
                  <th>created-updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((item, i) => (
                  <ProductItem
                    item={item}
                    key={i}
                    index={i}
                    refetch={refetch}
                  />
                ))}
                {/* foot */}
              </tbody>
              <tfoot>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>quantity</th>
                  <th>created-updated</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
          <Pagination refetch={refetch} />

          <div className="block md:hidden p-[0px] mt-[80px]">
            <div className="grid grid-cols-1 sm3:grid-cols-2 justify-items-center gap-8">
              {data.products.map((item, i) => (
                <ProductItemCard item={item} key={i} refetch={refetch} />
              ))}
            </div>
          </div>
        </Fade>
      )}
    </>
  );
};

export default AllProduct;
