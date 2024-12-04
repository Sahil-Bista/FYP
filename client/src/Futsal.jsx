import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Futsals() {
  const [image, setImage] = useState(null);
  const [futsalName, setFutsalName] = useState("");
  const [futsalAddress, setFutsalAddress] = useState("");
  const [futsalDescription, setFutsalDescription] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image); // assuming 'image' is a file input
    formData.append("futsalName", futsalName);
    formData.append("futsalAddress", futsalAddress);
    formData.append("futsalDescription", futsalDescription);

    // Make the POST request with the 'multipart/form-data' content type header
    axios
      .post("http://localhost:3001/addFutsal", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This is required for file uploads
        },
      })
      .then((result) => {
        console.log(result);
        navigate("/futsal");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          //file-list is an array like object that js uses to store files
        ></input>
        <input
          type="text"
          placeholder="Enter Futsal Name"
          name="futsal_name"
          onChange={(e) => setFutsalName(e.target.value)}
          required
        ></input>
        <input
          type="text"
          placeholder="Enter Futsal Address"
          name="futsal_address"
          onChange={(e) => setFutsalAddress(e.target.value)}
          required
        ></input>
        <input
          type="textarea"
          placeholder="Enter Futsal Description"
          name="futsal_description"
          onChange={(e) => setFutsalDescription(e.target.value)}
          required
        ></input>
        <button type="submit">Create Futsal</button>
      </form>
    </div>
  );
}
