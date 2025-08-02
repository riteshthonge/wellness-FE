import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from '../components/UserNavbar';

const YogaSessionDetails = () => {
  const { id } = useParams();
  const { yogaSessions, allUsers, backendUrl, userData, getAllUsers } = useContext(AppContext);

  const session = yogaSessions.find((s) => s._id === id);
  const [organiser, setOrganiser] = useState(null);
  const [localMembers, setLocalMembers] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    if (session) {
      setLocalMembers(session.members);
      setHasJoined(session.members.includes(userData.id));
    }
  }, [session, userData]);

  useEffect(() => {
    if (session && allUsers.length > 0) {
      const found = allUsers.find((u) => u._id === session.createdBy);
      setOrganiser(found || null);
    }
  }, [allUsers, id, session]);

  const handleEnroll = async () => {
    if (hasJoined) {
      toast.info("You have already enrolled in this session.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/enrollInto-session`,
        {
          user_id: userData.id,
          session_id: session._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Successfully enrolled in the session!");
        setLocalMembers((prev) => [...prev, userData.id]);
        setHasJoined(true);
        getAllUsers();
      } else {
        toast.error(response.data.message || "Enrollment failed.");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("An error occurred while enrolling.");
    }
  };

  if (!session) {
    return (
      <div className="container mt-5 text-center">
        <h4 className="text-danger">Session not found.</h4>
        <ToastContainer position="top-center" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <UserNavbar />
      <div className="row g-4 py-3">
        {/* Left Side */}
        <div className="col-md-7">
          <div className="p-4 border rounded-4 shadow-sm bg-white h-100">
            <h2 className="text-primary mb-3">{session.sessionName}</h2>
            <p><strong>🧘 Goal:</strong> {session.goal}</p>
            <p><strong>⏱ Duration:</strong> {session.duration} minutes</p>
            <p><strong>📅 Start Date:</strong> {new Date(session.startDate).toLocaleDateString()}</p>
            <p><strong>📅 End Date:</strong> {new Date(session.endDate).toLocaleDateString()}</p>
            <p><strong>🕒 Time:</strong> {session.timing}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-5">
          <div className="p-4 border rounded-4 shadow bg-light d-flex flex-column h-100">
            <h5 className="mb-3 fw-bold">👥 Members</h5>
            <ul className="list-group list-group-flush flex-grow-1">
              <li className="list-group-item bg-light fw-semibold text-success">
                Organizer: {organiser ? organiser.name : "Unknown"}
              </li>
              {localMembers
                ?.filter((m) => m !== session.createdBy)
                .map((memberId, idx) => {
                  const member = allUsers.find((u) => u._id === memberId);
                  return (
                    <li className="list-group-item bg-light" key={idx}>
                      {member ? member.name : memberId}
                    </li>
                  );
                })}
            </ul>
            <button
              onClick={handleEnroll}
              className="btn btn-success mt-4 align-self-end"
              disabled={hasJoined}
            >
              {hasJoined ? "Already Enrolled" : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default YogaSessionDetails;
