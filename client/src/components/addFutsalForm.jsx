import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { addFutsalValidationSchema } from "../validation/addFutsalValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "../styles/AddFutsal.css";

export const AddFutsalForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addFutsalValidationSchema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("futsalName", data.futsalName);
    formData.append("addressLink", data.addressLink);
    formData.append("futsalAddress", data.futsalAddress);
    formData.append("futsalDescription", data.futsalDescription);
    formData.append("futsalContact", data.futsalContact);

    await axios
      .post(`http://localhost:3001/api/futsal/addFutsal/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This is required for file uploads
        },
      })
      .then((result) => {
        console.log(result);
        toast.success("Add futsal request sent to the admin", {
          theme: "dark",
          autoClose: 5000,
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          const message = error.response.data.message;
          toast.error(message, { autoClose: 5000, theme: "dark" });
        } else {
          toast.error("An unexpected error occured.Please try again", {
            autoClose: 5000,
            theme: "dark",
          });
        }
      });
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-fields-container">
        <div className="form-heading">
          <h2> &nbsp; Enter Futsal Details Below:</h2>
        </div>
        <div className="flex-row">
          <div className="label-input">
            <label htmlFor="image">Add Picture: </label>
            <input {...register("image")} type="file"></input>
            <p className="error">{errors.image?.message}</p>
          </div>
          <div className="label-input">
            <label htmlFor="contact">Contact Number: </label>
            <input
              {...register("futsalContact")}
              className="smaller-input-fields"
              placeholder="Enter you contact Number here"
              type="text"
              maxLength={10}
            ></input>
            <p className="error">{errors.futsalContact?.message}</p>
          </div>
        </div>
        <div className="flex-row">
          <div className="label-input">
            <label htmlFor="name">Futsal Name</label>
            <input
              {...register("futsalName")}
              className="smaller-input-fields"
              type="text"
              placeholder="Enter Futsal Name"
            ></input>
            <p className="error">{errors.futsalName?.message}</p>
          </div>
          <div className="label-input">
            <label htmlFor="address">Futsal Address</label>
            <input
              {...register("futsalAddress")}
              className="smaller-input-fields"
              type="text"
              placeholder="Enter Futsal Address"
            ></input>
            <p className="error">{errors.futsalAddress?.message}</p>
          </div>
        </div>
        <div classname="row-3">
          <div className="label-input">
            <label htmlFor="link">Address link(from google maps)</label>
            <input
              {...register("addressLink")}
              className="larger-input-fields"
              type="text"
              placeholder="Enter Futsal address link"
            ></input>
            <p className="error">{errors.addressLink?.message}</p>
          </div>
        </div>
        <div className="label-input">
          <label htmlFor="description"> Description </label>
          <textarea
            {...register("futsalDescription")}
            className="text-area-field"
            placeholder="Enter Futsal Description"
          ></textarea>
          <p className="error">{errors.futsalDescription?.message}</p>
        </div>

        <div className="add-button">
          <button type="submit">Add Futsal</button>
        </div>
      </div>
    </form>
  );
};
