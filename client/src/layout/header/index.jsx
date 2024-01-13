import React, { useRef } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { userRegister } from "../../redux/feature/userSlice";
import { BsCart4 } from "react-icons/bs";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import useUser from "../../hooks/useUser";
import useCart from "../../hooks/useCart";
import Logo from "../../assets/logo.png";
import Menu from "../../components/categoriesBar/menu";

const Header = () => {
  const { user, logoutFunc, nav, dispatch, updateUser } = useUser();
  const { totalItems, totalPrice } = useCart();
  const searchRef = useRef();

  let [searchParams, setSearchParams] = useSearchParams();

  const checkAdmin = () => {
    return user?.role == "admin" || user?.role == "superadmin";
  };
  return (
    <div className="navbar shadow-2xl bg-gradient-to-br from-zinc-600 to-stone-800 text-black relative z-10 h-20">
      <div className="flex-1">
        <NavLink
          to={"/"}
          className="btn btn-ghost sm:text-xl lg:text-2xl w-20 p-10"
        >
          <img src={Logo} alt="Logo" className="h-24 absolute top-0" />
        </NavLink>
      </div>
      <div className="lg:pr-6 sm:pr-1 flex-none gap-10">
        <div className="form-control">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search"
            className="input bg-gradient-to-r from-slate-700 to-transparent border border-slate-800 text-white w-24 md:w-auto"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                searchRef.current.value
                  ? nav(searchParams.get("cat")?`?cat=${searchParams.get("cat")}&search=${searchRef.current.value}`:`?search=${searchRef.current.value}`)
                  : nav("/");
              }
            }}
            onChange={() =>
              searchRef.current.value
                ? nav(searchParams.get("cat")?`?cat=${searchParams.get("cat")}&search=${searchRef.current.value}`:`?search=${searchRef.current.value}`)
                : nav("/")
            }
          />
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label
            tabIndex={0}
            className="m-1 text-gray-500 lg:tooltip lg:tooltip-bottom"
            data-tip="categories"
          >
            <button className="btn btn-ghost btn-circle text-3xl">
              <BiCategory />
            </button>
          </label>
          <div className=" opacity-[98%]">
            <Menu />
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator text-3xl text-gray-500">
              <BsCart4 />
              <span className="badge badge-sm indicator-item bg-gradient-to-r from-slate-700 to-transparent border-black">
                {user ? user.shopCart.cart?.length : "x"}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">
                {user ? totalItems : "x"} Items
              </span>
              <span className="text-info">
                Subtotal: {totalPrice ? totalPrice : 0}
              </span>
              <div className="card-actions">
                <NavLink
                  to={"/user/cart"}
                  className="btn btn-primary btn-block"
                >
                  View cart
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        {checkAdmin() && (
          <div className="btn btn-ghost btn-circle">
            <div className="lg:tooltip lg:tooltip-bottom" data-tip="admin">
              <NavLink
                to={"/admin"}
                className="indicator text-4xl text-gray-500"
              >
                <MdAdminPanelSettings />
              </NavLink>
            </div>
          </div>
        )}
        <div
          className="dropdown dropdown-end tooltip tooltip-bottom"
          data-tip={user ? user.name : "guest"}
        >
          <label tabIndex={0} className="btn btn-circle avatar border-gray-500">
            <div className="w-10 rounded-full">
              <img
                src={
                  user
                    ? user.profileImage
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2_b2FX08eEz9IOh0tp4kL9JPgni-tpD2WUQ&usqp=CAU"
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user && (
              <li>
                <NavLink to={"user/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <a onClick={() => logoutFunc("user/signIn")}>logout</a>
              </li>
            )}
            {!user && (
              <li>
                <NavLink
                  to={"user/signUp"}
                  onClick={() => dispatch(userRegister(false))}
                >
                  SignUp
                </NavLink>
              </li>
            )}
            {!user && (
              <li>
                <NavLink
                  to={"user/signIn"}
                  onClick={() => dispatch(userRegister(true))}
                >
                  SignIn
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
