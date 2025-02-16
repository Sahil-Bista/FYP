import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

import { editFutsalValidationSchema } from "../validation/editFutsalValidation";

export const EditFutsalForm = ({ futsalId, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(editFutsalValidationSchema) });

  const onSubmit = async (data) => {
    console.log("hello");
    const updatedData = {
      futsal_name: data.futsalName,
      futsal_address: data.futsalAddress,
      address_link: data.addressLink,
      futsal_description: data.futsalDescription,
      futsal_contact: data.futsalContact,
    };
    await axios
      .patch(
        `http://localhost:3001/api/futsal/editFutsal/${futsalId}`,
        updatedData,
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log(result);
        close();
        window.location.reload();
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          const message = error.response.data.message;
          toast.error(message, { autoClose: 5000 });
        } else {
          toast.error("An unexpected error occured.Please try again");
        }
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/futsal/${futsalId}`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log("data", result.data);
        reset({
          futsalName: result.data.futsal.futsal_name,
          futsalAddress: result.data.futsal.futsal_address,
          addressLink: result.data.futsal.address_link,
          futsalDescription: result.data.futsal.futsal_description,
          futsalContact: result.data.futsal.futsal_contact,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [futsalId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <div className="heading-button">
        <div className="form-header">
          <h2> Edit Futsal</h2>
        </div>
        <div className="cross-button-div">
          <button type="button" onClick={close} className="cross-button">
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
      <div className="input-field-container">
        <div className="input-row">
          <div className="label-input">
            <label htmlFor="name">Futsal Name</label>
            <input
              className="smaller-input-fields"
              type="text"
              placeholder="Enter Futsal Name"
              {...register("futsalName")}
            ></input>
            <p className="error">{errors.futsalName?.message}</p>
          </div>
          <div className="label-input">
            <label htmlFor="address">Futsal Address</label>
            <input
              className="smaller-input-fields"
              type="text"
              {...register("futsalAddress")}
              placeholder="Enter Futsal Address"
            ></input>
            <p className="error">{errors.futsalAddress?.message}</p>
          </div>
        </div>
        <div>
          <div className="label-input">
            <label htmlFor="contact">Contact Number</label>
            <input
              maxLength={10}
              className="larger-input-fields"
              type="text"
              placeholder="Enter Futsal address link"
              {...register("futsalContact")}
            ></input>
            <p className="error">{errors.futsalContact?.message}</p>
          </div>
        </div>
        <div>
          <div className="label-input">
            <label htmlFor="link">Address link(from google maps)</label>
            <input
              className="larger-input-fields"
              type="text"
              {...register("addressLink")}
              placeholder="Enter Futsal address link"
            ></input>
            <p className="error">{errors.addressLink?.message}</p>
          </div>
        </div>
        <div className="label-input">
          <label htmlFor="description"> Description </label>
          <textarea
            maxLength={50}
            className="text-area"
            placeholder="Enter Futsal Description"
            {...register("futsalDescription")}
          ></textarea>
          <p className="error">{errors.futsalDescription?.message}</p>
        </div>
      </div>
      <div className="save-button-div">
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </div>
    </form>
  );
};
