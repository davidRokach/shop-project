import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "./headerAdmin";
import Footer from "../footer";
const LayoutAdmin = () => {
  return (
    <div className="layout-container">
      <HeaderAdmin />
      {/*
        Outlet render element by path in url 
        Emaple: /home => will be render The elment of Home components
        */}
      <div className="outlet-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutAdmin;
