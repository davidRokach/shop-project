import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import { useGetProductsQuery } from "../../redux/feature/productApi";
import { useEffect } from "react";
import TableOfUserList from "./tableOfUserList";
import useAdmin from "../../hooks/useAdmin";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const {updateUser} = useUser()
  const { amountUsers, usersOnline, userList } = useAdmin();
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetProductsQuery({search:null,cat:null});
  const [amountProducts, setAmountProducts] = useState(0);
  const [unitsInStock, setUnitsInStock] = useState(0);
  useEffect(() => {
    if (isSuccess) {
      setAmountProducts(data.amountOfProducts);
      setUnitsInStock(data.unitsInStock);
    }
  }, [isSuccess]);

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div className=" m-5 ">
      <div className="grid-cols-1 w-full md:flex md:flex-row opacity-95 text-white mb-10">
        <div className="grid flex-grow h-32 card rounded-box place-items-center w-full md:w-[50%]">
          <div className="grid-cols-1 w-full md:flex md:flex-row">
            <div className="grid flex-grow h-32 card rounded-box place-items-center bg-purple-700 w-full md:w-[50%]">
              <span className=" text-7xl">{amountUsers}</span> User Created
            </div>
            <div className="divider md:divider-horizontal"></div>
            <div className="grid flex-grow h-32 card rounded-box place-items-center bg-blue-600 bg w-full md:w-[50%]">
              <span className=" text-7xl">{amountProducts}</span> Product
              Created
            </div>
          </div>
        </div>
        <div className="divider mt-[200px] md:divider-horizontal"></div>
        <div className="grid flex-grow h-32 card rounded-box place-items-center w-full md:w-[50%]">
          <div className="grid-cols-1 w-full md:flex md:flex-row">
            <div className="grid flex-grow h-32 card rounded-box place-items-center bg-green-500 w-full md:w-[50%]">
              <span className=" text-7xl">{usersOnline}</span>User Online
            </div>
            <div className="divider md:divider-horizontal"></div>
            <div className="grid flex-grow h-32 card rounded-box place-items-center bg-yellow-600 w-full md:w-[50%]">
              <span className=" text-7xl">{unitsInStock}</span> Products InStock
            </div>
          </div>
        </div>
      </div>
      <TableOfUserList />
    </div>
  );
};

export default Dashboard;
