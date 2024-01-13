import React from "react";
import UserItem from "./userItem";
import { Fade } from "react-awesome-reveal";
import useAdmin from "../../hooks/useAdmin";
import UserItemCard from "./userItemCard";
import Loading from "../../layout/loading";

const TableOfUserList = () => {
  const { amountUsers, usersOnline, userList, isLoading, refetch } = useAdmin();
  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <Fade direction="top" duration={500}>
          <div className="overflow-x-auto bg-white m-6 opacity-90 rounded-xl hidden md:block">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>IsOnline</th>
                  <th>Role</th>
                  <th>created-updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userList.users.map((item, i) => (
                  <UserItem item={item} key={i} index={i} refetch={refetch} />
                ))}
                {/* foot */}
              </tbody>
              <tfoot>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>IsOnline</th>
                  <th>Role</th>
                  <th>created-updated</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
            <div className="block md:hidden p-[0px] mt-[200px]">
              <div className="grid grid-cols-1 sm3:grid-cols-2 justify-items-center gap-8">
                {userList.users.map((item, i) => (
                  <UserItemCard item={item} key={i} refetch={refetch} />
                ))}
              </div>
            </div>
        </Fade>
      )}
    </>
  );
};

export default TableOfUserList;
