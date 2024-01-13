import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "../../../redux/feature/userSlice";

const Pagination = ({ refetch }) => {
  const { page } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  return (
    <div className="join flex justify-center mt-5 items-end">
      <button
        onClick={() => {
          dispatch(updatePage("back")), refetch();
        }}
        className="join-item btn"
      >
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button
        onClick={() => {
          dispatch(updatePage("next")), refetch();
        }}
        className="join-item btn"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
