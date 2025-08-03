import React, { useContext, useState, useEffect } from "react";
import signupImg from "../assetes/project3.png";
import { ToastContainer, toast } from "react-toastify";
import { PushSpinner } from "react-spinners-kit";
import { AppContext } from "../context/AppContext";
import UserNavbar from "../components/UserNavbar";
import axios from "axios";

function AddSession() {
  const { backendUrl, userData, getAllSessions,token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    sessionName: "",
    goal: "",
    timing: "",
    duration: "",
    startDate: "",
    endDate: "",
    sessionType: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("sessionFormData");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("sessionFormData", JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeout);
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isDraftField = (key) => {
    return formData[key] && localStorage.getItem("sessionFormData");
  };

  const renderDraftLabel = (key) => {
    return isDraftField(key) ? (
      <span className="text-success ms-2" style={{ fontSize: "0.8rem" }}>Draft</span>
    ) : null;
  };

  const submitHandler = async () => {
    setLoading(true);
    const { sessionName, goal, timing, duration, startDate, endDate, sessionType } = formData;

    if (!sessionName || !goal || !timing || !duration || !startDate || !endDate || !sessionType) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
     const { data } = await axios.post(
  `${backendUrl}/api/user/create-wellness-session`,
  {
    ...formData,
    createdBy: userData.id,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // optional, needed only if you're also using cookies
  }
);

      if (data.success) {
        toast.success(data.message);
        await getAllSessions();
        setFormData({
          sessionName: "",
          goal: "",
          timing: "",
          duration: "",
          startDate: "",
          endDate: "",
          sessionType: "",
        });
        localStorage.removeItem("sessionFormData");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error while adding session");
    }

    setLoading(false);
  };

  return (
    <div>
      <UserNavbar />
      <ToastContainer />
      <div style={{ marginTop: "3.5rem" }}>
        <h2 className="text-start my-2 mt-5">
          <strong className="p-2">Create a Wellness Session</strong>
        </h2>

        <div className="container p-3">
          <form className="d-flex p-3 container rounded position-relative" style={{ zIndex: 2 }}>
            <div className="container col-md-7">
              <div className="form-floating mb-3 position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="sessionName"
                  placeholder="Session Name"
                  value={formData.sessionName}
                  onChange={handleChange}
                />
                <label htmlFor="sessionName" className="fs-6">
                  Session Name {renderDraftLabel("sessionName")}
                </label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <select
                  className="form-select"
                  id="sessionType"
                  value={formData.sessionType}
                  onChange={handleChange}
                >
                  <option value="">Select Session Type</option>
                  <option value="Meditation">Meditation</option>
                  <option value="Exercise">Exercise</option>
                  <option value="Yoga">Yoga</option>
                </select>
                <label htmlFor="sessionType" className="fs-6">
                  Session Type {renderDraftLabel("sessionType")}
                </label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <textarea
                  className="form-control"
                  id="goal"
                  placeholder="Session Goal"
                  style={{ height: "100px" }}
                  value={formData.goal}
                  onChange={handleChange}
                />
                <label htmlFor="goal" className="fs-6">
                  What is the goal of this session? {renderDraftLabel("goal")}
                </label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type="time"
                  className="form-control"
                  id="timing"
                  placeholder="Session Start Time"
                  value={formData.timing}
                  onChange={handleChange}
                />
                <label htmlFor="timing" className="fs-6">
                  Session Start Time {renderDraftLabel("timing")}
                </label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  placeholder="Duration"
                  value={formData.duration}
                  onChange={handleChange}
                />
                <label htmlFor="duration" className="fs-6">
                  Duration (e.g., 30 mins) {renderDraftLabel("duration")}
                </label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <label htmlFor="startDate" className="fs-6">
                  Start Date {renderDraftLabel("startDate")}
                </label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
                <label htmlFor="endDate" className="fs-6">
                  End Date {renderDraftLabel("endDate")}
                </label>
              </div>

              <div className="text-center my-2">
                <button
                  className="btn btn-success w-75 text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    submitHandler();
                  }}
                >
                  {loading ? (
                    <div className="container d-flex justify-content-center align-items-center">
                      <PushSpinner size={30} color="white" />
                    </div>
                  ) : (
                    "Add Session"
                  )}
                </button>
              </div>
            </div>

            <div className="container mx-auto my-auto loginImageContainer">
              <img
                id="signUpImage"
                src={signupImg}
                className="img-fluid"
                alt="Wellness Form Illustration"
                style={{ width: "80%", height: "80%" }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSession;
