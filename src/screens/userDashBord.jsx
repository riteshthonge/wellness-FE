import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import UserNavbar from "../components/UserNavbar";
import UserServiceCard from "../components/UserServiceCard";
import Footer from "../components/Footer";

function UserDashBord() {
  const { userData } = useContext(AppContext);

  return (
    <>
      <UserNavbar />

      {/* Full screen height container */}
      <div className="min-vh-100 d-flex flex-column align-items-center" style={{ marginTop: "3.5rem" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            Hello <span className="text-success">{userData.name}</span>,
          </h2>
          <h6 className="text-muted">Welcome Back Again.</h6>
        </div>

        <div className="w-100">
          <UserServiceCard />
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default UserDashBord;
