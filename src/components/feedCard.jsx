import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function FeedCard({ feedName, imageUrl, stock, status }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // if (feedData.status === 'Low') {
    //   handleAction(feedName); // Perform a custom action, e.g., notify low stock
    // } else {
    //   navigate('/feedCard'); // Navigate to feed details
    // }
  };

  return (
    <div className="card feed-card shadow-sm col-md-4">
      {/* Image Section */}
      <img
        src={imageUrl || 'https://via.placeholder.com/150'}
        alt={`${feedName} Image`}
        className="img img-fluid card-img-top"
      />

      {/* Feed Details */}
      <div className="card-body text-start">
        <h5 className="card-title">{feedName || 'Feed Name'}</h5>
        <p className="card-text">
          <strong>Stock:</strong> {stock} kg
        </p>
        <p
          className={`card-text ${
            status === 'Low' ? 'text-danger' : 'text-success'
          }`}
        >
          <strong>Status:</strong> {status}
        </p>
        <button
          className={`btn ${
            status === 'Low' ? 'btn-danger' : 'btn-success'
          } w-100 mt-3`}
          onClick={handleButtonClick}
        >
          {status === 'Low' ? 'Resolve Low Stock' : 'View Details'}
        </button>
      </div>
    </div>
  );
}

// Prop Types for Validation
// FeedCard.propTypes = {
//   feedData: PropTypes.shape({
//     feedName: PropTypes.string.isRequired,
//     imageUrl: PropTypes.string,
//     stock: PropTypes.number.isRequired,
//     status: PropTypes.oneOf(['Low', 'Sufficient', 'Critical']).isRequired,
//   }).isRequired,
//   handleAction: PropTypes.func.isRequired,
// };

export default FeedCard;
