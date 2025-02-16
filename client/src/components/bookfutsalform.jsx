import axios from "axios";
import { useNavigate } from "react-router";
import { Calendar } from "primereact/calendar";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import { bookFutsalValidationSchema } from "../validation/bookFutsalValidation";

export const BookFutsalForm = ({ futsalId, close }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookFutsalValidationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    console.log("futsal", futsalId);
    await axios
      .post(
        `http://localhost:3001/api/booking/createBooking`,
        {
          futsalId,
          ...data,
        },
        { withCredentials: true }
      )
      .then((result) => {
        const team_size = result.data.booking
          ? result.data.booking.team_size
          : null;
        if (team_size === "Half-full") {
          return navigate(`/bookingList/${futsalId}`);
        }
        const bookingId = result.data.booking ? result.data.booking._id : null;
        if (bookingId) {
          navigate(`/payment/${bookingId}`);
        } else {
          console.error("Booking ID not found in the response.");
        }
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          const message = err.response.data.message;
          toast.error(message, { autoClose: 5000 });
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <div className="button-heading-div">
        <div className="heading-div">
          <h2 className="heading">Book your game!!</h2>
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
            <label htmlFor="address">Address</label>
            <input
              {...register("address")}
              type="text"
              placeholder="Enter your address here"
            ></input>
            <p className="error">{errors.address?.message}</p>
          </div>
        </div>
        <div className="row-1">
          <div className="label-input">
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              placeholder="Enter your email here"
              type="email"
            ></input>
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="label-input">
            <label htmlFor="contact_number">Contact Number</label>
            <input
              {...register("contact_number")}
              placeholder="Enter Contact Number"
            ></input>
            <p className="error">{errors.contact_number?.message}</p>
          </div>
          <div className="label-input">
            <label htmlFor="team_size">Team Size</label>
            <select {...register("team_size")} className="select-label">
              <option value="">Select Team Size</option>
              <option value="Full">Full</option>
              <option value="Half-full">Half-full</option>
            </select>
            <p className="error">{errors.team_size?.message}</p>
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
