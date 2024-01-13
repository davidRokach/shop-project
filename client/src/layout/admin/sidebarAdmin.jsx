import React from "react";
import HamburgerButton from "../hamburgerButton";
import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label>
          <HamburgerButton />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content text-xl">
          {/* Sidebar content here */}
          <li>
            <NavLink to={"addProduct"}>Add Product</NavLink>
          </li>
          <li>
            <NavLink to={"allProductAdmin"}>All Products</NavLink>
          </li>
          <li>
            <NavLink to={"allOrders"}>All Orders</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
