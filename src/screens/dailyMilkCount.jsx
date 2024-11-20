import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PushSpinner } from 'react-spinners-kit';
import UserNavbar from '../components/UserNavbar';
import setPriceIcon from '../assetes/Dairy/setPrice.webp';
import api from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import getHeaders from '../api/header';


function DailyMilkCount() {
    const [loading, setLoading] = useState(false);
    const [selectedFarmer, setSelectedFarmer] = useState('');
    const [shift, setShift] = useState('M');
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({
        username: '',
        date: '',
        milk_rate: '',
        milk_quantity: '',
        time: '',
        role: 'user',
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('user/get-all-users/');
            const tempData = response.data?.data || [];
            setUsers(tempData);
        } catch (e) {
            toast.error(e.response?.data?.message || 'Failed to fetch users.');
        }
    };

    const handleSubmit =async () => {
        if (!selectedFarmer || !userData.date || !userData.milk_rate || !userData.milk_quantity) {
            toast.error('Please fill out all fields.');
            return;
        }
        setLoading(true)
        const response = await api.post(
            'milk/add/',
            {
                'mobile':selectedFarmer,'shift':shift,'date':userData.date,'rate':userData.milk_rate,'quantity':userData.milk_quantity,
                getHeaders,
              }
        ).then((response)=>{
            // alert(response.data.message)
            toast.success(response.data.message);
            setUserData(
                {
                    username: '',
                    date: '',
                    milk_rate: '',
                    milk_quantity: '',
                    time: '',
                    role: 'user',
                }
            )
        }).catch((err)=>{
            toast.error(err);
        }).finally(()=>{
            setLoading(false)
        })
       
    };

    return (
        <div>
            <UserNavbar />
            <div className="back-arrow position-absolute top-5 start-0 p-3">
                <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
            </div>
            <ToastContainer />
            <div className="shadow rounded m-4 p-4 d-flex flex-row">
                <div className="container">
                    <div className="container col-md-7">
                        {/* Farmer Dropdown */}
                        <div className="form-floating mb-3">
                            <select
                                className="form-select"
                                id="farmerDropdown"
                                value={selectedFarmer}
                                onChange={(e) => setSelectedFarmer(e.target.value)}
                            >
                                <option value="">Select Farmer</option>
                                {users.map((user) => (
                                    <option key={user.phone_number} value={user.phone_number}>
                                        {user.first_name} {user.last_name} ({user.role})
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="farmerDropdown">Select Farmer</label>
                        </div>

                        {/* Shift Dropdown */}
                        <div className="form-floating mb-3">
                            <select
                                className="form-select"
                                value={shift}
                                onChange={(e) => setShift(e.target.value)}
                            >
                                <option value="M">Morning</option>
                                <option value="E">Evening</option>
                            </select>
                            <label htmlFor="farmerDropdown">Select Shift</label>
                        </div>

                        {/* Date Field */}
                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                className="form-control"
                                value={userData.date}
                                onChange={(e) => setUserData({ ...userData, date: e.target.value })}
                            />
                            <label htmlFor="date">Date</label>
                        </div>

                        {/* Milk Rate */}
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Milk Rate"
                                value={userData.milk_rate}
                                onChange={(e) => setUserData({ ...userData, milk_rate: e.target.value })}
                            />
                            <label htmlFor="milkRate">Milk Rate</label>
                        </div>

                        {/* Milk Quantity */}
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Milk In Liters"
                                value={userData.milk_quantity}
                                onChange={(e) => setUserData({ ...userData, milk_quantity: e.target.value })}
                            />
                            <label htmlFor="milkQuantity">Milk In Liters</label>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center my-2">
                            <button
                                id="submitButton"
                                className="btn btn-success w-75 text-center"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="container d-flex justify-content-center align-items-center">
                                        <PushSpinner size={30} color="white" />
                                    </div>
                                ) : (
                                    'Add Data'
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="container">
                    <img id="signUpImage" src={setPriceIcon} className="img-fluid" alt="Set Price Background" />
                </div>
            </div>
        </div>
    );
}

export default DailyMilkCount;
