import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Email = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_okxan1r",
        "template_ltb5rvh",
        form.current,
        "VvaXXIN2pIpn7Dqt1"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("massage sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    // <form ref={form} onSubmit={sendEmail}>
    //   <label>Name</label>
    //   <input type="text" name="user_name" />
    //   <label>Email</label>
    //   <input type="email" name="user_email" />
    //   <label>Message</label>
    //   <textarea name="message" />
    //   <input type="submit" value="Send" />
    // </form>
    <div className="h-[80vh] sm2:h-[100%]">
      <div className="login-box w-[95vw] md:w-[80vw] lg:w-[75vw] xl:w-[40vw] 2xl:w-[30vw] absolute left-[50%] top-[31%] sm2:top-[45%] md:top-[45%] h-[590px]">
        <h2>Email</h2>
        <form  ref={form} onSubmit={sendEmail}>
          <div className="user-box">
            <input type="text" name="user_name" id="name" required />
            <label htmlFor="name">Name</label>
          </div>
          <div className="user-box">
            <input type="email" name="user_email" id="email" required />
            <label htmlFor="email">Email</label>
          </div>
          <div className="user-box">
            <textarea name="message" id="message" required />
            <label className="label-textarea" htmlFor="message">Message</label>
          </div>
          <div className="flex justify-between">
            <button>
              <span />
              <span />
              <span />
              <span />
              Send
            </button>
            <button onClick={() => nav(-1)}>
              <span />
              <span />
              <span />
              <span />
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Email;
