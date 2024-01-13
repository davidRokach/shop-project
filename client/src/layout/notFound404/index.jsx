import React from "react";
import "./index.css"
import { NavLink } from "react-router-dom";

const NotFound404 = () => {
  return (
    <>
      <section className="page_404 h-screen w-screen ">
        <div className="">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2 text-2xl">Look like you're lost</h3>
                  <p className="text-xl">the page you are looking for not avaible!</p>
                  <NavLink to={"/"} className="link_404 btn btn-accent">
                    Go to Home
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound404;
