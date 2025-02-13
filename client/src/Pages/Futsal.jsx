import VendorHeader from "../VendorHeader";
import Footer from "../Footer";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddFutsal.css";
import { AddFutsalForm } from "../components/addFutsalForm";

export default function Futsals() {
  return (
    <div className="primary-div">
      <div className="black-overlay"></div>
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
            style={{
              display: "flex",
              padding: "10px",
              margin: "auto",
              height: "100%",
            }}
          >
            <AddFutsalForm />
          </div>
          <div style={{ marginTop: "auto" }}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
