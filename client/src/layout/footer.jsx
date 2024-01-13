import React from "react";
import useUser from "../hooks/useUser";

const Footer = () => {
  const {nav} = useUser();
  return (
    <footer className="footer py-6 px-10 bg-base-200 mt-8 bg-gradient-to-br from-zinc-600 to-stone-800 text-black">
      <div>
        <span className="footer-title">Services</span>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">Branding</a>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">Design</a>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">Marketing</a>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">Advertisement</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">About us</a>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">Contact</a>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">Jobs</a>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">Terms of use</a>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">Privacy policy</a>
        <a onClick={() => nav("/user/page-in-building")} className="link link-hover">Cookie policy</a>
      </div>
      <div>
        <span className="footer-title">⇓-bug or report-⇓</span>
        <div className="form-control w-80">
          <label className="label">
            <span className="label-text text-black underline underline-offset-2">Enter the form to submit a problem or help on the site:</span>
          </label>
          <div>
            <button onClick={() => nav("/user/email")} className="btn btn-info w-full mt-2">
              Report/Send-Email
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
