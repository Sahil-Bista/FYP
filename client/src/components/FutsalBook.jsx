import React, { useState } from "react";
import Popup from "reactjs-popup";
import "../styles/BookFutsal.css";
import { BookFutsalForm } from "./bookfutsalform";
import { toast } from "react-toastify";

export default function PopupGfg({ futsalId }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const userRole = localStorage.getItem("userRole");

  const handleTriggerClick = () => {
    if (!userRole) {
      toast.error("Please login to book a futsal.");
      return;
    }
    setOpen(true);
  };

  return (
    <div>
      <button className="pop-up-button" onClick={handleTriggerClick}>
        BOOK NOW
      </button>

      <Popup open={open} modal nested onClose={closeModal}>
        <div className="pop-up-card">
          <div className="form-div">
            <BookFutsalForm close={() => setOpen(false)} futsalId={futsalId} />
          </div>
        </div>
      </Popup>
    </div>
  );
}
