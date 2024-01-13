import React from "react";
import {
  useGetOrdersQuery,
  useSendOrderMutation,
} from "../redux/feature/productApi";
import useUser from "./useUser";
import useCart from "./useCart";

const useOrderCart = () => {
  const [triggerOrder, resultOrder] = useSendOrderMutation();
  const { data, isLoading, isError, error, isSuccess, refetch } =
    useGetOrdersQuery();
  const { nav, updateUser } = useUser();
  const { refetch:refetchCart } = useCart();

  const makeOrder = async (data, shipping_price) => {
    console.log({
      orderItems: data.cart,
      totalOrderPrice: data.totalPrice,
      shipping_price,
      status: "Pending",
    });
    const body = {
      orderItems: data.cart,
      totalOrderPrice: data.totalPrice,
      shipping_price,
      status: "Pending",
    };
    await triggerOrder(body);
    await updateUser();
    await refetchCart();
    nav("/");
  };
  // console.log(resultOrder);
  return { makeOrder, data, resultOrder };
};

export default useOrderCart;
