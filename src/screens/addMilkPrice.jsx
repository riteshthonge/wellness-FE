import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { PushSpinner } from 'react-spinners-kit';
import UserNavbar from '../components/UserNavbar';
import setPriceIcon from '../assetes/Dairy/setPrice.webp';
import api from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AddMilkPrice() {
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        username: '',
        date: '',
        milk_rate: '',
        milk_quantity: '',
        time: '',
        role: 'user'
    });
    const navigate = useNavigate();
    return (
        <div>
            <UserNavbar />
            <div className="back-arrow position-absolute top-5 start-0 p-3">
            <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
        </div>
            <div className="container">

                <div className=" shadow rounded m-4 rounded p-4 d-flex flex-row">

                    <div className="container ">
                        <h2 className='text-center'>Add <strong>Milk</strong> Price Here</h2>
                        <div className='container col-md-7'>

                            <div className="form-floating mb-3">
                                <select class name="" id="" className="form-control">
                                    <option value="morning">Morning</option>
                                    <option value="evening">Evening</option>
                                </select>
                                <label htmlFor="farmerDropdown">Select Shift</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="date" className="form-control" id="lName" placeholder="Date"
                                // onChange={(e) =>
                                //     setUserData({ ...userData, last_name: e.target.value.trim() })
                                // }
                                />
                                <label htmlFor="lName">Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="mobileNumber" placeholder="Milk Rate"
                                // onChange={(e) =>
                                //     setUserData({ ...userData, phone_number: e.target.value.trim() })
                                // }
                                />
                                <label htmlFor="mobileNumber">Milk Rate</label>

                            </div>

                            <div className='text-center my-2'>
                                <button id="signupButton" className="btn btn-success w-75 text-center"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // signupHandler();
                                    }}
                                >
                                    {
                                        loading ? (
                                            <div className="container  d-flex justify-content-center align-items-center">
                                                <PushSpinner size={30} color="white" />
                                            </div>
                                        ) : 'Add Data'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <img id='signUpImage' src={setPriceIcon} className='img-fluid ' alt="Sign Up Background " />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMilkPrice