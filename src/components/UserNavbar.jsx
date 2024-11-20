import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser } from '../featurs/userSlice';

function UserNavbar() {
    const dispatch = useDispatch()
    const nevigate=useNavigate()
    const logout=()=>{
        localStorage.removeItem("userData");
        dispatch(deleteUser());
        nevigate('/')
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/user">FarmDairy</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/user">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/show-milk">Check Milk Status</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/update-profile" >Account Update</Link>
            </li>
          </ul>
          <div className="d-flex">
          <button className="btn btn-outline-success me-2" onClick={()=>{
            nevigate('/update-profile');
          }}>Update Profile</button>  
            <button className="btn btn-outline-danger me-2" onClick={logout}>Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
