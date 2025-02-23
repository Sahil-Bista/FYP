import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../styles/editBooking.css";
import { EditBookingForm } from "./editBookingForm";

export default function EditBooking({ bookingId }) {
  return (
    <div>
      <Popup
        trigger={<button className="editt-button"> Edit </button>}
        modal
        nested
      >
        {(close) => (
          <div className="popp-up">
            <div className="form-div">
              <EditBookingForm bookingId={bookingId} close={close} />
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
