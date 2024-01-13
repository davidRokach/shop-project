import React from "react";
import useOrderCart from "../../../hooks/useOrderCart";
import OneOrder from "./oneOrder";
import { Fade } from "react-awesome-reveal";
import OneOrderCard from "./oneOrderCard";

const OrdersFromUsers = () => {
  const { data } = useOrderCart();
  console.log(data);
  return (
    <>
      <Fade direction="top" duration={500}>
        <div className="overflow-x-auto bg-white m-6 opacity-90 rounded-xl hidden md:block">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User-Name</th>
                <th>Status</th>
                <th>Total-Price</th>
                <th>Quantity</th>
                <th>Created-Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, i) => (
                <OneOrder item={item} key={i} index={i}/>
              ))}
              {/* foot */}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <th>User-Name</th>
                <th>Status</th>
                <th>Total-Price</th>
                <th>Quantity</th>
                <th>Created-Order</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="block md:hidden p-[0px] mt-[80px]">
          <div className="grid grid-cols-1 sm3:grid-cols-2 justify-items-center gap-8">
            {data?.map((item, i) => (
              <OneOrderCard item={item} key={i} />
            ))}
          </div>
        </div>
      </Fade>
    </>
  );
};

export default OrdersFromUsers;
