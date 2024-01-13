import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserInfoMutation,
  useLogoutMutation,
} from "../redux/feature/userApi";
import { useNavigate } from "react-router-dom";
import { logout, setUserInfo, userRegister } from "../redux/feature/userSlice";
import { useEffect } from "react";

const useUser = () => {
  const { user, isRegister } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [triggerGetUserInfo, dataUser] = useGetUserInfoMutation();
  const [logoutHook, resultLogout] = useLogoutMutation();

  const updateUser = async () => {
    await triggerGetUserInfo();
  };

  const stateOfGetUser = () => {
    return dataUser;
  };

  const logoutFunc = (path) => {
    nav(path);
    logoutHook();
    dispatch(logout());
    dispatch(userRegister(true));
  };

  useEffect(() => {
    if (dataUser.isSuccess) {
      dispatch(setUserInfo(dataUser.data));
      dataUser.reset();
    }
  }, [dataUser.isSuccess]);

  return {
    user,
    isRegister,
    updateUser,
    logoutFunc,
    nav,
    dispatch,
    stateOfGetUser,
  };
};

export default useUser;
