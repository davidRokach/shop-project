import React from "react";
import { CATEGORIES } from "../../constant/data";
import { NavLink, useSearchParams } from "react-router-dom";

const Menu = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const groupCategories = [];
  const chunkSize = 4;

  for (let i = 0; i < CATEGORIES.length; i += chunkSize) {
    groupCategories.push(CATEGORIES.slice(i, i + chunkSize));
  }
  return (
    <>
      <ul
        tabIndex={0}
        className="menu xl:menu-horizontal lg:min-w-max bg-base-200 rounded-box dropdown-content p-2 shadow-2xl mt-3 bg-gradient-to-br from-zinc-600 to-stone-800 text-white"
      >
        <a className=" ps-5 w-full">Categories</a>
        {groupCategories.map((group, index) => (
          <li key={index}>
            <ul>
              <ul >
                {group.map((item, i) => (
                  <li key={i}>
                    <NavLink className="bg-inherit" to={searchParams.get("search")?`?cat=${item}&search=${searchParams.get("search")}`:`?cat=${item}`}>{item}</NavLink>
                  </li>
                ))}
              </ul>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Menu;
