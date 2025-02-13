import React from "react";
import Popup from "reactjs-popup";
import "../styles/BookFutsal.css";
import { BookFutsalForm } from "./bookfutsalform";

export default function PopupGfg({ futsalId }) {
  return (
    <div>
      <Popup
        trigger={<button className="pop-up-button">BOOK NOW </button>}
        modal
        nested
      >
        {(close) => (
          <div className="pop-up-card">
            <div className="form-div">
              <BookFutsalForm close={close} futsalId={futsalId} />
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
