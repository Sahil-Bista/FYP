import axios from "axios";
import { Calendar } from "primereact/calendar";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import { editBookingValidationSchema } from "../validation/editBookingValidation";
import { useEffect, useState } from "react";

export const EditBookingForm = ({ bookingId, close }) => {
  const [futsalId, setFutsalId] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(editBookingValidationSchema),
  });

  const onSubmit = async (data) => {
    const updatedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      contact_number: data.contact_Number,
      game_date: data.game_date,
      startTime: data.startTime,
      endTime: data.endTime,
    };
    await axios
      .patch(
        `http://localhost:3001/api/booking/editBooking/${bookingId}`,
        { futsalId, updatedData },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          const message = error.response.data.message;
          toast.error(message, { theme: "dark", autoClose: 5000 });
        } else {
          toast.error("An unexpected error occured.Please try again", {
            theme: "dark",
            autoClose: 5000,
          });
        }
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/booking/${bookingId}`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log("data", result.data);
        setFutsalId(result.data.booking.futsalId);
        reset({
          first_name: result.data.booking.first_name,
          last_name: result.data.booking.last_name,
          contact_number: result.data.booking.contact_Number,
        });
      });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <div className="button-heading-div">
        <div className="heading-div">
          <h2 className="heading">Edit Booking!!</h2>
        </div>
        <div>
          <button className="close-button" onClick={() => close()}>
            {" "}
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
      <div className="form-content">
        <div className="row-1">
          <div className="label-input">
            <label htmlFor="first_name">First Name</label>
            <input
              {...register("first_name")}
              type="text"
              placeholder="Enter your first name here"
            ></input>
            <p className="error">{errors.first_name?.message}</p>
          </div>
          <div className="label-input">
            <label htmlFor="last_name">Last Name</label>
            <input
              {...register("last_name")}
              type="text"
              placeholder="Enter your last name here"
            ></input>
            <p className="error">{errors.last_name?.message}</p>
          </div>
          <div className="label-input">
            <label htmlFor="contact_number">Contact Number</label>
            <input
              {...register("contact_number")}
              placeholder="Enter Contact Number"
            ></input>
            <p className="error">{errors.contact_number?.message}</p>
          </div>
        </div>
        <div className="row-1">
          <div className="label-input">
            <label htmlFor="date">Date</label>
            <Controller
              name="game_date"
              control={control}
              render={({ field }) => (
                <Calendar
                  {...field}
                  className="select-label"
                  showIcon
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
            <p className="error">{errors.game_date?.message}</p>
          </div>
          <div className="label-input">
            <label htmlFor="start">Start Time</label>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <Calendar
                  {...field}
                  className="select-label"
                  timeOnly
                  showIcon
                  icon="pi pi-clock"
                  hideOnRangeSelection
                  stepMinute={60}
                  // minDate={new Date(new Date().setHours(6, 0, 0, 0))}
                  // maxDate={new Date(new Date().setHours(20, 0, 0, 0))}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
            <p className="error">{errors.startTime?.message}</p>
          </div>
          <div className="label-input">
            <label htmlFor="end">End time</label>
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <Calendar
                  {...field}
                  className="select-label"
                  timeOnly
                  showIcon
                  icon="pi pi-clock"
                  hideOnRangeSelection
                  stepMinute={60}
                  // minDate={new Date(new Date().setHours(7, 0, 0, 0))}
                  // maxDate={new Date(new Date().setHours(21, 0, 0, 0))}
                  onChange={(e) => field.onChange(e.value)}
                />
              )}
            />
            <p className="error">{errors.endTime?.message}</p>
          </div>
        </div>
      </div>
      <div className="button-div">
        <button className="confirm-button" type="Submit">
          Confirm
        </button>
      </div>
    </form>
  );
};
