import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../styles/editFutsal.css";
import { EditFutsalForm } from "./EditFutsalForm";

export default function EditFutsal({ futsalId }) {
  return (
    <div>
      <Popup
        trigger={<button className="edit-button"> EDIT FUTSAL </button>}
        modal
        nested
      >
        {(close) => (
          <div className="pop-up">
            <div className="form-div">
              <EditFutsalForm futsalId={futsalId} close={close} />
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
