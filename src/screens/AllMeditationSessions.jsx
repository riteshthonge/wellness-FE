import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import UserNavbar from '../components/UserNavbar';
import yoga from '../assetes/meditation.png';

const AllMeditationSessions = () => {
  const { userData, meditationSessions, navigate } = useContext(AppContext);

  if (!meditationSessions || meditationSessions.length === 0) {
    return (
      <div>
        <UserNavbar />
        <div className="text-center mt-5 text-muted">No meditation sessions available.</div>
      </div>
    );
  }

  return (
    <div>
      <UserNavbar/>
      <div className="container  mt-5 py-4">
        <h2 className="text-center mb-5 fw-bold text-success">Explore All Meditation Sessions</h2>
        <div className="row">
          {meditationSessions.map((session) => (
            <div className="col-md-6 col-lg-4 mb-4" key={session._id}>
              <div
                className="card h-100 shadow-sm border rounded-4 bg-light"
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="card-body p-4 d-flex flex-column text-start justify-content-start">
                  <h5 className="card-title text-success text-center fw-bold mb-3">
                    {session.sessionName}
                  </h5>

                  <img src={yoga} alt="Meditation" className="img-fluid mb-3 rounded" />

                  <p className="card-text mb-1">
                    <strong className="text-dark">Duration:</strong> {session.duration} minutes
                  </p>

                  <p className="card-text mb-1">
                    <strong className="text-dark">Start Date:</strong>{' '}
                    {new Date(session.startDate).toLocaleDateString()}
                  </p>

                  <p className="card-text mb-1">
                    <strong className="text-dark">End Date:</strong>{' '}
                    {new Date(session.endDate).toLocaleDateString()}
                  </p>

                  <p className="card-text mb-3">
                    <strong className="text-dark">Time:</strong> {session.timing}
                  </p>

                  <button
                    className="btn btn-md btn-success mt-auto"
                    onClick={() => navigate(`/meditation-session-details/${session._id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMeditationSessions;
