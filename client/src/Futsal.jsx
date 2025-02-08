import axios from "axios";
import { useNavigate, useParams } from "react-router";
import backgroundImage from "./assets/background.jpg";
import VendorHeader from "./VendorHeader";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Futsals() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const validFileExtensions = ["image/png", "image/jpeg", "image/jpg"];

  function isValidFileType(fileType) {
    return validFileExtensions.includes(fileType);
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("Image is required")
      .test("File type", "Only png, jpeg and jpg are allowed", (value) => {
        //
        return value && isValidFileType(value[0]?.type);
      })
      .test("File Size", "Max allowed size is 5MB", (value) => {
        return value && value[0]?.size <= MAX_FILE_SIZE;
      }),
    futsalName: Yup.string().required("Futsal Name is required"),
    addressLink: Yup.string().url().required("Valid address link required"),
    futsalAddress: Yup.string().required("Futsal Address is required"),
    futsalDescription: Yup.string()
      .max(50, "Description cannor exceed 50 characters")
      .required("Futsal Description is required"),
    futsalContact: Yup.string()
      .matches(/^98\d{8}$/, "Invalid Phone Number")
      .required("Valid contact is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("futsalName", data.futsalName);
    formData.append("addressLink", data.addressLink);
    formData.append("futsalAddress", data.futsalAddress);
    formData.append("futsalDescription", data.futsalDescription);
    formData.append("futsalContact", data.futsalContact);

    await axios
      .post(`http://localhost:3001/addFutsal/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This is required for file uploads
        },
      })
      .then((result) => {
        console.log(result);
        navigate("/home");
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          const message = error.response.data.message;
          console.log(message);
          toast.error(message, { autoClose: 5000 });
        } else {
          toast.error("An unexpected error occured.Please try again");
        }
      });
  };

  console.log("validation", errors);
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
        zIndex: "0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.68)",
          zIndex: "1",
        }}
      ></div>
      <div
        style={{
          position: "relative",
          zIndex: "2",
          flex: "1",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="Header"
            style={{
              position: "sticky",
              top: 0,
              zIndex: "10",
            }}
          >
            <VendorHeader />
          </div>
          <div
            className="content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90%",
              margin: "auto",
              maxWidth: "750px",
              backgroundColor: "black",
              opacity: 0.7,
              zIndex: "2",
              justifyContent: "center",
            }}
          >
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div style={{ marginTop: "25px" }}>
                <h2
                  style={{
                    color: "white",
                  }}
                >
                  {" "}
                  &nbsp; Enter Futsal Details Below:
                </h2>
              </div>
              <ToastContainer />
              <div
                className="input fields container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                  gap: "16px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      padding: "0px",
                      gap: "4px",
                      color: "white",
                    }}
                  >
                    <label htmlFor="image">Add Picture: </label>
                    <input {...register("image")} type="file"></input>
                    <p style={{ color: "red", paddingBottom: "0px" }}>
                      {errors.image?.message}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "0px",
                      gap: "4px",
                      color: "white",
                    }}
                  >
                    <label htmlFor="contact">Contact Number: </label>
                    <input
                      {...register("futsalContact")}
                      style={{ width: "250px" }}
                      placeholder="Enter you contact Number here"
                      type="text"
                      maxLength={10}
                    ></input>
                    <p style={{ color: "red", paddingBottom: "0px" }}>
                      {errors.futsalContact?.message}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "170px",
                    marginBottom: "10px",
                    width: "570px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "0px",
                      gap: "4px",
                      color: "white",
                    }}
                  >
                    <label htmlFor="name">Futsal Name</label>
                    <input
                      {...register("futsalName")}
                      style={{ width: "210px" }}
                      type="text"
                      placeholder="Enter Futsal Name"
                    ></input>
                    <p style={{ color: "red", paddingBottom: "0px" }}>
                      {errors.futsalName?.message}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      padding: "0px",
                      gap: "4px",
                      color: "white",
                    }}
                  >
                    <label htmlFor="address">Futsal Address</label>
                    <input
                      {...register("futsalAddress")}
                      style={{ width: "250px" }}
                      type="text"
                      placeholder="Enter Futsal Address"
                    ></input>
                    <p style={{ color: "red", paddingBottom: "0px" }}>
                      {errors.futsalAddress?.message}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "150px",
                    justifyContent: "space-around",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      padding: "0px",
                      gap: "4px",
                      color: "white",
                    }}
                  >
                    <label htmlFor="link">Address link(from google maps)</label>
                    <input
                      {...register("addressLink")}
                      style={{ width: "630px" }}
                      type="text"
                      placeholder="Enter Futsal address link"
                    ></input>
                    <p style={{ color: "red", paddingBottom: "0px" }}>
                      {errors.addressLink?.message}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "0px",
                    gap: "4px",
                    color: "white",
                    marginBottom: "20px",
                  }}
                >
                  <label htmlFor="description"> Description </label>
                  <textarea
                    {...register("futsalDescription")}
                    style={{ width: "630px", height: "90px" }}
                    placeholder="Enter Futsal Description"
                  ></textarea>
                  <p style={{ color: "red", paddingBottom: "0px" }}>
                    {errors.futsalDescription?.message}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <button type="submit">Add Futsal</button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
