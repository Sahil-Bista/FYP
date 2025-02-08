import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function PendingFutsals() {
  const [pendingFutsal, setPendingFutsal] = useState([]);
  const Navigate = useNavigate();

  const handleSubmit = (_id) => {
    const futsalId = _id;
    axios
      .post(
        `http://localhost:3001/validateFutsal/${futsalId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log(result.data.updatedFutsal.isValid);
        if (result.data.updatedFutsal.isValid == true) {
          Navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleDelete = (_id) => {
  //   const futsalId = _id;
  //   axios
  //     .delete(`http://localhost:3001/deleteValidateFutsal/${futsalId}`, {
  //       withCredentials: true,
  //     })
  //     .then((result) => {
  //       console.log(result.data.updatedFutsal.isValid);
  //       if (result.data.updatedFutsal.isValid == true) {
  //         Navigate("/home");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    axios
      .get("http://localhost:3001/pending-futsals", { withCredentials: true })
      .then((result) => {
        console.log(result);
        setPendingFutsal(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {pendingFutsal.length > 0 ? (
        pendingFutsal.map(
          ({
            futsal_name,
            _id,
            image,
            futsal_address,
            futsal_description,
            address_link,
          }) => (
            <ul key={_id}>
              <div style={{ display: "flex" }}>
                <li key={_id}>
                  {futsal_name}, {image}, {futsal_address}, {futsal_description}
                  ,{address_link},
                </li>
                <button onClick={() => handleSubmit(_id)}>Save</button>
                {/* <button onClick={() => handleDelete(_id)}>Delete</button> */}
              </div>
            </ul>
          )
        )
      ) : (
        <div>
          <h1> No futsals to review</h1>
        </div>
      )}
    </div>
  );
}
