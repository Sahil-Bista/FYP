import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "../styles/PendingFutsal.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PendingFutsals() {
  const [pendingFutsal, setPendingFutsal] = useState([]);
  const Navigate = useNavigate();

  const handleSubmit = (_id) => {
    const futsalId = _id;
    axios
      .post(
        `http://localhost:3001/api/futsal/validateFutsal/${futsalId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log(result.data.updatedFutsal.isValid);
        if (result.data.updatedFutsal.isValid == true) {
          Navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (_id) => {
    const futsalId = _id;
    console.log(futsalId);
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/futsal/deletePendingFutsal/${futsalId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setPendingFutsal((pendingFutsals) =>
          pendingFutsals.filter((pendingFutsal) => pendingFutsal._id !== _id)
        );
        toast.success("Futsal deleted successfully!");
      }
    } catch (error) {
      console.log("error deleting futsal", error);
      toast.error("Futsal deletion error");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/futsal/pending-futsals", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        setPendingFutsal(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="primary-div">
      <div className="backgroundd"></div>
      <div className="black-overllay"></div>
      <div className="reference-div">
        <div className="Header">
          <Header />
        </div>
        <div className="page-heading">PENDING FUTSALS</div>
        <div className="Table-div">
          <table className="table">
            <thead>
              <tr className="table-row">
                <th className="table-heading-1">Futsal Name</th>
                <th className="table-heading-3">Address Link</th>
                <th className="table-heading-4">Futsal Description</th>
                <th className="table-heading-4">Futsal contact</th>
                <th className="table-heading-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingFutsal.length &&
                pendingFutsal.map(
                  ({
                    futsal_name,
                    _id,
                    image,
                    futsal_description,
                    address_link,
                    futsal_contact,
                  }) => (
                    <tr className="table-data-row" key={_id}>
                      <td className="futsal_name">{futsal_name}</td>
                      <td className="address_link"> {address_link}</td>
                      <td className="futsal_description">
                        {" "}
                        {futsal_description}
                      </td>
                      <td className="futsal_description"> {futsal_contact}</td>
                      <td className="buttons-td">
                        <button onClick={() => handleSubmit(_id)}>Save</button>{" "}
                        <button onClick={() => handleDelete(_id)}>
                          Delete
                        </button>{" "}
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
