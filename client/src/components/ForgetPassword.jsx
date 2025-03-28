import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPasswordValidationSchema } from "../validation/forgetPasswordValidation";

export const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordValidationSchema) });

  const onSubmit = async (data) => {
    await axios
      .post(
        "http://localhost:3001/api/user/forgetPassword",
        { email: data.email },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        toast.success("Email sent succesfully", {
          theme: "dark",
          autoClose: 5000,
        });
      })
      .catch((err) => {
        if (err.response?.data?.msg) {
          const message = err.response.data.msg;
          console.log(message);
          toast.error(message, { autoClose: 5000 });
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };
  return (
    <>
      <Popup
        trigger={
          <span style={{ color: "white", cursor: "pointer" }}>
            Forgot Password?
          </span>
        }
        modal
        nested
        contentStyle={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        {(close) => (
          <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "300px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  {" "}
                  Change Password
                </h4>
              </div>
              <p style={{ color: "white" }}>
                {" "}
                Please enter your email to receive the change password link
              </p>
              <div className="label-input">
                <input
                  {...register("email")}
                  type="text"
                  placeholder="Enter your email here"
                />
                <span className="error">{errors.email?.message}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {" "}
                <button type="submit">Confirm</button>
                <button onClick={() => close()}>Close</button>
              </div>
            </form>
          </>
        )}
      </Popup>
    </>
  );
};
