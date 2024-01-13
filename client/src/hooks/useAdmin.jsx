import { useState } from "react";
import { useGetUserListQuery } from "../redux/feature/userApi";
import { useEffect } from "react";

const useAdmin = () => {
  const {
    data: userList,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetUserListQuery();
  
  const [amountUsers, setAmountUsers] = useState(0);
  const [usersOnline, setUsersOnline] = useState(0);

  const usersOnlineFunc = () => {
    let tempUserOnline = 0;
    userList?.users.forEach((item) => {
      if (item.isOnline) {
        tempUserOnline++;
      }
    });
    setUsersOnline(tempUserOnline);
  };

  // if (
  //     (dataUser.data?.role === "superadmin" ||
  //       dataUser.data?.role === "admin") &&
  //     isSuccess == false
  //   ) {

  //   }

  useEffect(() => {
    if (isSuccess) {
      setAmountUsers(userList.users.length);
    }
    usersOnlineFunc();
  }, [isSuccess]);
  return { amountUsers, usersOnline, userList, isLoading, refetch };
};

export default useAdmin;
