import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assetes/login.png'
import gmail from '../assetes/gmail.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import Footer from '../components/Footer'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import api from '../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getHeaders from '../api/header';
import { PushSpinner } from 'react-spinners-kit';
import { useDispatch } from 'react-redux';
import { addUser } from '../featurs/userSlice';
import MobileLogin from '../components/modals/mobileLogin';
import loginImage from '../assetes/bankLogin.png'
import Icon from 'react-icons-kit';
function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState(0)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showMobileLogin, setShowMobileLogin] = useState(false)
  //passwordType
  const [passwordType, setPasswordType] = useState('password')
  const [icon, setIcon] = useState(eyeOff);
  const dispatch = useDispatch()




  const loginHandler = () => {
    setLoading(true);
    const apiUrl = 'user/login/';
    api.post(
      apiUrl,
      {
        password: password,
        phone: phone,
        getHeaders,
      }
    ).
      then((response) => {
        toast.success(response.data.message);
        console.log(response.data.data)
        dispatch(addUser(response.data.data))
        console.log(response.data.data)
        localStorage.setItem('userData', JSON.stringify(response.data.data));
        navigate('/user')
      }).
      catch((error) => {
        console.log(error)
        toast.error(error.response.data.message);
      }).finally(() => {
        setLoading(false);
      })
  }


  return (
    <div className="container-fluid position-relative">
      <Navbar />
      <div className="back-arrow position-absolute top-5 start-0 p-3">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
      </div>
      <ToastContainer />
      <MobileLogin visiblePin={showMobileLogin} setVisiblePin={setShowMobileLogin} />
      <div className="container d-flex loginForm position-relative border shadow p-3 mt-5">
        <div data-aos="fade-right" className='container'>
          <div className="p-3">
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInput" placeholder="98XXXXXXXXXX"
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
              />
              <label htmlFor="floatingInput">Mobile Number</label>
            </div>
            <div className="form-floating position-relative">
              <input type={passwordType} className="form-control" id="floatingPassword" placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <span class="password-toggle-icon position-absolute top-50 end-0 translate-middle-y pe-3" onClick={()=>{
                if(passwordType==='password'){
                  setIcon(eye);
                  setPasswordType("text")
                }
                else{
                  setIcon(eyeOff)
                  setPasswordType("password")
                }
                 
              }}>
                  <Icon class="absolute mr-10" icon={icon} size={25}/>
              </span>
              <label htmlFor="floatingPassword">Password</label>
              
              <div className="text-end mt-3">
                <Link style={{ color: 'red', textDecoration: 'none' }} to="/forgot-password">Forgotten Password?</Link>
              </div>
            </div>
            <div className="text-center mt-4">
              <button id="signupButton" className="btn btn-success w-75 text-center" onClick={loginHandler}>
                {
                  loading ? (
                    <div className="container  d-flex justify-content-center align-items-center">
                      <PushSpinner size={30} color="white" />
                    </div>
                  ) : 'Log in'
                }
              </button>
            </div>
          </div>
          <div>
            <hr className='w-75 mx-auto' />
            <h5 className="text-center"><strong>OR</strong></h5>
            <div className="container  text-center">
              <p className="border  mobile-login border-black btn p-2 rounded " onClick={() => {
                setShowMobileLogin(true)
              }}>
                <img src={gmail} alt="" className='img-fluid gmail-logo mx-3' />
                Log in with otp
              </p>
            </div>
          </div>
        </div>
        <div data-aos="fade-left" className="container loginImageContainer">
          <img src={loginImage} alt="" className='img-fluid' />
        </div>
      </div>

      <img id="signUpImage" src={loginImg} className="img-fluid position-absolute top-0 start-0 w-100 h-100" alt="Log in " style={{ zIndex: -1 }} />
      <div className="d-flex justify-content-center mt-5">
        <Footer />
      </div>
    </div>
  );
}
export default Login