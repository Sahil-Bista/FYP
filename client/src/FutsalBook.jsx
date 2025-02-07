import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PopupGfg({ futsalId }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contact_number: Yup.string()
      .matches(/^98\d{8}$/, "Invalid Phone Number")
      .required("First name is required"),
    game_date: Yup.date().required("Game date is required"),
    startTime: Yup.date().required("Start time is required"),
    endTime: Yup.date().required("End time is required"),
    team_size: Yup.string().required("Team size is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post(
        `http://localhost:3001/book`,
        {
          futsalId,
          ...data,
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log("hello");
        const team_size = result.data.booking
          ? result.data.booking.team_size
          : null;
        if (team_size === "Half-full") {
          return navigate(`/bookingList/${futsalId}`);
        }
        const bookingId = result.data.booking ? result.data.booking._id : null;
        if (bookingId) {
          console.log(bookingId);
          navigate(`/payment/${bookingId}`);
        } else {
          console.error("Booking ID not found in the response.");
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err.response?.data?.message) {
          const message = err.response.data.message;
          console.log(message);
          toast.error(message, { autoClose: 5000 }); // Display error message via toast
        } else {
          // If there's no message, show a general error
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <div>
      <Popup
        trigger={
          <button
            style={{
              boxSizing: "border-box",
              minWidth: "100px",
              height: "35px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid #7C7C7C",
              borderRadius: "40px",
              color: "white",
              fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              marginRight: "5px",
            }}
          >
            BOOK NOW{" "}
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div
            className="white"
            style={{
              display: "flex",
              backgroundColor: "black",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "20px",
                left: "30px",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ToastContainer />
                  <div style={{ marginBottom: "30px" }}>
                    <h2 style={{ color: "white" }}>Book your game!!</h2>
                  </div>
                  <div>
                    <button
                      style={{
                        position: "absolute",
                        top: "25x",
                        right: "30px",
                        color: "white",
                        backgroundColor: "black",
                        border: "1px solid black",
                        fontSize: "25px",
                      }}
                      onClick={() => close()}
                    >
                      {" "}
                      <i className="fa-solid fa-x"></i>
                    </button>
                  </div>
                </div>
                <div
                  className="form-content"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "40px",
                      justifyContent: "space-around",
                      marginBottom: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        gap: "4px",
                      }}
                    >
                      <label htmlFor="first_name">First Name</label>
                      <input
                        {...register("first_name")}
                        type="text"
                        id="first_name"
                        placeholder="Enter your first name here"
                        name="first_name"
                      ></input>
                      <p style={{ color: "red", paddingBottom: "0px" }}>
                        {errors.first_name?.message}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        gap: "4px",
                      }}
                    >
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        {...register("last_name")}
                        type="text"
                        placeholder="Enter your last name here"
                        name="last_name"
                        id="last_name"
                      ></input>
                      <p style={{ color: "red", paddingBottom: "0px" }}>
                        {errors.last_name?.message}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        gap: "4px",
                      }}
                    >
                      <label htmlFor="address">Address</label>
                      <input
                        {...register("address")}
                        type="text"
                        placeholder="Enter your address here"
                        name="address"
                        id="address"
                      ></input>
                      <p style={{ color: "red", paddingBottom: "0px" }}>
                        {errors.address?.message}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "40px",
                      justifyContent: "space-around",
                      marginBottom: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        gap: "4px",
                      }}
                    >
                      <label htmlFor="email">Email</label>
                      <input
                        {...register("email")}
                        placeholder="Enter your email here"
                        name="email"
                        type="email"
                      ></input>
                      <p style={{ color: "red", paddingBottom: "0px" }}>
                        {errors.email?.message}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        gap: "4px",
                      }}
                    >
                      <label htmlFor="contact_number">Contact Number</label>
                      <input
                        {...register("contact_number")}
                        maxLength={10}
                        placeholder="Enter Contact Number"
                        name="contact_number"
                      ></input>
                      <p style={{ color: "red", paddingBottom: "0px" }}>
                        {errors.contact_number?.message}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        gap: "4px",
                      }}
                    >
                      <label htmlFor="team_size">Team Size</label>
                      <select
                        {...register("team_size")}
                        style={{
                          height: "30px",
                          width: "190px",
                        }}
                        name="team_size"
                        id="team_size"
                      >
                        <option value="">Select Team Size</option>
                        <option value="Full">Full</option>
                        <option value="Half-full">Half-full</option>
                      </select>
                      <p style={{ color: "red", paddingBottom: "0px" }}>
                        {errors.team_size?.message}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "40px",
                      justifyContent: "space-around",
                      marginBottom: "40px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        gap: "4px",
                      }}
                    >
                      <label htmlFor="date">Date</label>
                      <Controller
                        name="game_date"
                        control={control}
                        render={({ field }) => (
                          <Calendar
                            {...field}
                            style={{ height: "30px", width: "190px" }}
                            showIcon
                            onChange={(e) => field.onChange(e.value)}
                          />
                        )}
                      />
                      <p style={{ color: "red", paddingBottom: "0px" }}>
                        {errors.game_date?.message}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        gap: "4px",
                      }}
                    >
                      <label htmlFor="start">Start Time</label>
                      <Controller
                        name="startTime"
                        control={control}
                        render={({ field }) => (
                          <Calendar
                            {...field}
                            style={{ height: "30px", width: "190px" }}
                            timeOnly
                            showIcon
                            icon="pi pi-clock"
                            hideOnRangeSelection
                            stepMinute={60}
                            minDate={new Date(new Date().setHours(6, 0, 0, 0))}
                            maxDate={new Date(new Date().setHours(20, 0, 0, 0))}
                            onChange={(e) => field.onChange(e.value)}
                          />
                        )}
                      />
                      <p style={{ color: "red", paddingBottom: "0px" }}>
                        {errors.startTime?.message}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        gap: "4px",
                      }}
                    >
                      <label htmlFor="end">End time</label>
                      <Controller
                        name="endTime"
                        control={control}
                        render={({ field }) => (
                          <Calendar
                            {...field}
                            style={{ height: "30px", width: "190px" }}
                            timeOnly
                            showIcon
                            icon="pi pi-clock"
                            hideOnRangeSelection
                            stepMinute={60}
                            minDate={new Date(new Date().setHours(7, 0, 0, 0))}
                            maxDate={new Date(new Date().setHours(21, 0, 0, 0))}
                            onChange={(e) => field.onChange(e.value)}
                          />
                        )}
                      />
                      <p style={{ color: "red", paddingBottom: "0px" }}>
                        {errors.endTime?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <button
                    style={{
                      width: "120px",
                      minWidth: "100px",
                      height: "42px",
                      border: "1px solid #7C7C7C",
                      borderRadius: "40px",
                      backgroundColor: "black",
                      color: "white",
                    }}
                    type="Submit"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

// @media (max-width: 768px) {
//   .form-row {
//     flex-direction: column;
//     gap: 10px;
//   }
