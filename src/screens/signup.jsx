import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import signupImg from '../assetes/signup.png'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer'
import getHeaders from '../api/header';
import { ToastContainer, toast } from 'react-toastify';
import api from '../api/api';
import { PushSpinner } from 'react-spinners-kit';
function Signup() {
  const [userData, setUserData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    re_password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const signupHandler = () => {
    setLoading(true);
    const { first_name, middle_name, last_name, email, phone_number, password, re_password, role } = userData;
    const apiUrl = 'user/signup/';
    api.post(
      apiUrl,
      {
        first_name, middle_name, last_name, email, phone_number, password, re_password, role,
        getHeaders,
      }
    ).then((response) => {
      console.log(response);
      console.log(response);
      toast.success(response.data.message);
      navigate("/")

    }).catch((error) => {
      console.log(error)
      toast.error(error.response.data.message);
    }).finally(() => {
      setLoading(false);
    })
  }
  return (
    <div className='container-fluid'>
      <Navbar />
      <div className="back-arrow position-absolute top-5 start-0 p-3">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
      </div>
      <ToastContainer />
      <h2 className='text-start my-2  mt-5'><strong>Hey User,Fill the Signup Form Below</strong></h2>
      <div className='container p-3'>
        <form className=' d-flex p-3  container rounded position-relative' style={{ zIndex: 2 }}>
          <div data-aos="fade-right" className='container col-md-7'>
            <div className="form-floating  mb-3">
              <input type="text" className="form-control" id="fName" placeholder="First Name"
                onChange={(e) =>
                  setUserData({ ...userData, first_name: e.target.value.trim() })
                }
              />
              <label htmlFor="fName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="lName" placeholder="Last Name"
                onChange={(e) =>
                  setUserData({ ...userData, last_name: e.target.value.trim() })
                }
              />
              <label htmlFor="lName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="mobileNumber" placeholder="Mobile Number"
                onChange={(e) =>
                  setUserData({ ...userData, phone_number: e.target.value.trim() })
                }
              />
              <label htmlFor="mobileNumber">Mobile Number</label>
              <div className='text-end'>
                <button className='btn btn-secondary m-1'>Send Otp</button>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" placeholder="Email Id"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value.trim() })
                }
              />
              <label htmlFor="email">Email Id</label>
              <div className='text-end'>
                <button className='btn btn-secondary m-1'>Send Otp</button>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="password" placeholder="Set Password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value.trim() })
                }
              />
              <label htmlFor="password">Set Password</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="rePassword" placeholder="Re-set Password"
                onChange={(e) =>
                  setUserData({ ...userData, re_password: e.target.value.trim() })
                }
              />
              <label htmlFor="rePassword">Re-set Password</label>
            </div>
            <p className='text-end'>
              <Link to='/' style={{ color: 'red', textDecoration: 'none' }}>
                Already Have Account?
              </Link>
            </p>

            <div className='text-center my-2'>
              <button id="signupButton" className="btn btn-success w-75 text-center"
                onClick={(e) => {
                  e.preventDefault();
                  signupHandler();
                }}
              >
                {
                  loading ? (
                    <div className="container  d-flex justify-content-center align-items-center">
                      <PushSpinner size={30} color="white" />
                    </div>
                  ) : 'Sign Up'
                }
              </button>
            </div>
          </div>
          <div data-aos="fade-left" className="container mx-auto my-auto  loginImageContainer">
            <img id='signUpImage' src={signupImg} className='img-fluid ' alt="Sign Up Background " />
          </div>

        </form>
        {/* <img id='signUpImage' src={signupImg} className='img-fluid position-absolute top-0 start-0 w-100 h-100'  alt="Sign Up Background " /> */}
      </div>
      <Footer />
    </div>
  )
}


export default Signup