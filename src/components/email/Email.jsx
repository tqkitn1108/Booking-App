import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./index.css";

const MailList = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="mail system-font">
      <h1 className="mailTitle system-font">Save time, save money!</h1>
      <span className="mailDesc system-font">Sign up and we'll send the best deals to you</span>
      <form onSubmit={formik.handleSubmit}>
        <div className="mailInputContainer system-font">
          <input
            type="text"
            placeholder="Your Email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          
          <button type="submit">Subscribe</button>
         
        </div>
      </form>
    </div>
  );
};

export default MailList;
