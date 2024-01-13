import { useEffect, useState } from "react";
import {
  useModifyItemShopCartMutation,
  useGetShopCartQuery,
} from "../redux/feature/userApi";
import useUser from "./useUser";

const useCart = () => {
  const { updateUser, stateOfGetUser } = useUser();
  const [trigger, result] = useModifyItemShopCartMutation();
  const { data, isLoading, isError, isSuccess, refetch } =
    useGetShopCartQuery();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const user = stateOfGetUser();

  useEffect(() => {
    if (result.isSuccess) {
      refetch();
      result.reset();
    }
    if (user.isSuccess) {
      refetch();
    }
    updateUser();
    setTotalPrice(data?.totalPrice);
    setTotalItems(data?.totalItems);
  }, [result.isSuccess, data]);

  const addToCart = (item, action = "increase", newAmount) => {
    const shopCartItem = { _id: item, amount: 1 };
    trigger({ shopCartItem, action, newAmount });
    console.log(result);
  };

  const deleteItemFromCart = (item) => {
    const shopCartItem = { _id: item, amount: 1 };
    const action = "delete";
    trigger({ shopCartItem, action });
    console.log(result);
  };

  return {
    addToCart,
    data,
    totalPrice,
    totalItems,
    deleteItemFromCart,
    refetch,
  };
};

export default useCart;
