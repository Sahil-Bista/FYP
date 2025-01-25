import React from "react";
import { useNavigate } from "react-router";

export default function RegistrationChoice() {
  const navigate = useNavigate();
  const vendor = "PENDING_VENDOR";
  const user = "USER";

  return (
    <div>
      <div>
        <button onClick={() => navigate(`/register/${user}`)}>
          Register as user
        </button>
      </div>
      <div>
        <button onClick={() => navigate(`/register/${vendor}`)}>
          Register as vendor
        </button>
      </div>
    </div>
  );
}
