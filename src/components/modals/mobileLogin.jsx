import React, { useState } from 'react'
import {
    CModal,
    CModalBody,
    CModalFooter,
    CButton,
    CHeader,
} from '@coreui/react';
import getHeaders from '../../api/header';
import api from '../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import { PushSpinner } from 'react-spinners-kit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../featurs/userSlice';

function MobileLogin({ visiblePin, setVisiblePin }) {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [sendOtploading, setSendOtploading] = useState(false)
    const [sendOtp, setSendOtp] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const submitForm = () => {
        setLoading(true);
        const apiUrl = 'user/verify_mail/';
        api.post(
            apiUrl,
            {
                email: email,
                otp: otp,
                getHeaders,
            }
        ).
            then((response) => {
                toast.success(response.data.message);
                console.log(response.data.data)
                dispatch(addUser(response.data.data))
                console.log(response.data.data)
                localStorage.setItem('userData',JSON.stringify(response.data.data));
                navigate('/user')
            }).
            catch((error) => {
                toast.error(error.response.data.message);
            }).finally(() => {
                setLoading(false);
            })
    }
    const sendOtpForm=()=>{
        setSendOtploading(true);
        const apiUrl = 'user/send_otp/';
        api.post(
            apiUrl,
            {
                email: email,
                getHeaders,
            }
        ).
            then((response) => {
                toast.success(response.data.message);
                setSendOtp(true)
            }).
            catch((error) => {
                console.log(error)
                toast.error(error.response.data.message);
            }).finally(() => {
                setSendOtploading(false);
            })
    }
    return (
        <div >
            <ToastContainer />
            <CModal
                visible={visiblePin}
                alignment="center"
                onClose={() => setVisiblePin(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalBody>
                    <div className="container">
                        <div className=' d-flex flex-column'>
                        <div className="form-floating  mb-3">
                            <input type="email" className="form-control" id="email" placeholder="Email"
                                readOnly={sendOtp}
                                onChange={(e) =>
                                    setEmail(e.target.value.trim())
                                }
                            />
                            <label htmlFor="fName">Email</label>
                        </div>
                        <button className='btn btn-success align-self-end my-1'
                        disabled={sendOtp}
                        onClick={sendOtpForm}>
                        {
                            
                            sendOtploading ? (
                                <div className="container  d-flex justify-content-center align-items-center">
                                    <PushSpinner size={30} color="white" />
                                </div>
                            ) : 'Send Otp'
                        }
                        </button>
                        </div>
                        <div className="form-floating  mb-3">
                            <input type="text" className="form-control" id="otp" placeholder="OTP"
                                readOnly={!sendOtp}
                                onChange={(e) =>
                                    setOtp(e.target.value.trim())
                                }
                            />
                            <label htmlFor="fName">OTP</label>
                        </div>
                        <div className="text-center mt-4">
                            <button id="signupButton" className="btn btn-primary w-75 text-center"
                            disabled={!sendOtp}
                            onClick={submitForm}>
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
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisiblePin(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default MobileLogin