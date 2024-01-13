import React from "react";
import { NavLink } from "react-router-dom";
import SidebarAdmin from "./sidebarAdmin";
import Logo from "../../assets/logo.png";


const HeaderAdmin = () => {
  return (
    <div className="navbar shadow-2xl bg-gradient-to-br from-zinc-600 to-stone-800 text-black relative z-10 h-20">
      <div className="flex-1">
        <NavLink to={"/"} className="btn btn-ghost sm:text-xl lg:text-2xl w-20 p-10">
        <img src={Logo} alt="Logo" className="h-24 absolute top-0" />
        </NavLink>
      </div>

      <div className="pr-6 flex-none gap-10">
        <SidebarAdmin />
      </div>
    </div>
  );
};

export default HeaderAdmin;
