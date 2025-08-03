import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  console.log(userData);
  const [yogaSessions, setYogaSessions] = useState(
    JSON.parse(localStorage.getItem("yogaSessions")) || []
  );
  const [meditationSessions, setMeditationSessions] = useState(
    JSON.parse(localStorage.getItem("meditationSessions")) || []
  );
  const [exerciseSessions, setExerciseSessions] = useState(
    JSON.parse(localStorage.getItem("exerciseSessions")) || []
  );

  const [allUsers, setAllUsers] = useState(
    JSON.parse(localStorage.getItem("allUsers")) || []
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || []
  );

  const backendUrl = "https://wellness-be.onrender.com";
  // const backendUrl = "http://localhost:4000";

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-user-Data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.userData);
        localStorage.setItem("userData", JSON.stringify(data.userData));
        await getAllSessions();
        navigate("/user");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllYogaSessions = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-yoga-sessions`,{
            headers: {
          Authorization: `Bearer ${token}`,
        },
        }
      );
      if (data.success) {
        setYogaSessions(data.data || []);
        localStorage.setItem("yogaSessions", JSON.stringify(data.data || []));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllMeditationSessions = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-meditation-sessions`,{
  headers: {
          Authorization: `Bearer ${token}`,
        },
        }
      );
      if (data.success) {
        setMeditationSessions(data.data || []);
        localStorage.setItem(
          "meditationSessions",
          JSON.stringify(data.data || [])
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllExerciseSessions = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-exercise-sessions`,{
            headers: {
          Authorization: `Bearer ${token}`,
        },
        }
      );
      if (data.success) {
        setExerciseSessions(data.data || []);
        localStorage.setItem(
          "exerciseSessions",
          JSON.stringify(data.data || [])
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllUsers = async () => {
    try {
      console.log("token" + token);
      const { data } = await axios.get(`${backendUrl}/api/user/get-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setAllUsers(data.data || []);
        localStorage.setItem("allUsers", JSON.stringify(data.data || []));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllSessions = async () => {
    await getAllYogaSessions();
    await getAllMeditationSessions();
    await getAllExerciseSessions();
  };

  useEffect(() => {
    if (userData) {
      getAllUsers();
      getAllSessions();
    }
  }, [userData]);

  return (
    <AppContext.Provider
      value={{
        navigate,
        userData,
        backendUrl,
        allUsers,
        getUserData,
        yogaSessions,
        meditationSessions,
        exerciseSessions,
        getAllYogaSessions,
        getAllMeditationSessions,
        getAllExerciseSessions,
        getAllSessions,
        getAllUsers,
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
