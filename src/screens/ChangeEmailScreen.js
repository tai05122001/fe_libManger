import 'bootstrap/dist/css/bootstrap.css';

import { Button, Modal, ModalDialog } from 'react-bootstrap';
import 'bootstrap/js/src/modal';
import axios from 'axios'
import React from 'react';
import swal from 'sweetalert';
import {
    useRef,
    useState,
    useEffect,
} from 'react'
import Input from '../components/Input';
import ButtonSubmit from '../components/ButtonSubmit';

import NumberInput from '../components/NumberInput';
import {  toast,ToastContainer} from 'react-toastify';
function ChangeEmailScreen() {
    const [email, setEmail] = useState('');
    const [emailNew, setEmailNew] = useState('');
    const [otp, setOTP] = useState('');
    const [showModal3, setShowModal3] = useState(false);

    const handleShowModal3 = () => setShowModal3(true)
    const handleCloseModal3 = () => setShowModal3(false)
    
    
    const handleBackToLogin = () => {
        window.location.replace("http://localhost:3000/login");
    }
    
    const sendOTP = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/sendOtpToChangeEmail', null, {
                params: {
                    email
                }
            });

            if (res['status'] == 200) {
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 500,
                        pauseOnHover: false,
                        onClose: () => { 
                           
                        }
                    });
                    handleShowModal3();
                    if (document.getElementsByClassName("btnVerify")[0] != undefined) {
                        document.getElementsByClassName("btnVerify")[0].classList.remove("hidden");
                        document.getElementsByClassName("btnResend")[0].classList.add("hidden");
                    }
          
                }
            }
        catch (err) {
                console.log(err);
            swal({
        
                title: err['response']['data'],
                icon: "error",
                buttons: "OK"
            
            })
        }

    }
    const authChangeEmail = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/authChangeEmail', null, {
                params: {
                    emailNew,
                    otp,
                    email
                }
            });

            if (res['status'] == 200) {
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 500,
                        pauseOnHover: false,
                        onClose: () => { 
                            handleBackToLogin();
                        }
                    });
                 
                }
            }
        catch (err) {
                console.log(err);
            swal({
        
                title: err['response']['data'],
                icon: "error",
                buttons: "OK"
            
            })
            if(err.response.status == 400){
                document.getElementsByClassName("btnVerify")[0].classList.add("hidden");
                document.getElementsByClassName("btnResend")[0].classList.remove("hidden");
            }

        }

    }
    const handleVerifyCode =(newValue) => setOTP(newValue);
    const handleResendCode =() => {
        sendOTP();
    }
    const handleNewEmail =(newValue) => setEmailNew(newValue);
    const submitCode =() => {
        authChangeEmail();
    }

    const handleSendOTP = () => { 
        sendOTP();
        // console.log(email)
    }

    const handleEmailChange = (newValue) => {
        setEmail(newValue);
    }
    return (
        <div class="ChangeEmail mx-auto">
            <div class="content">
                <h5 class="col-md-6 text-justify mx-auto pb-2">Change email</h5>
                <span >Procedures required to complete chagne email</span>
                <ul class="pt-2">
                    <li>Enter your email account correctly in the box below</li>
                    <li>We will send you a otp code to verify about change email . Please access your email to enter a OTP code .</li>
                    <li>Proceed to press the verify button and enter the new email code to complete the procedure</li>
                </ul>

                <Input placeholder="Enter your email account" label="Email reset " onChange={handleEmailChange} />
                <ButtonSubmit classes=" btn-custom mt-3" onClick={handleSendOTP}>Resend OTP Code</ButtonSubmit>
                <ButtonSubmit classes=" btn-custom-transparent" onClick={handleBackToLogin}>Back to login</ButtonSubmit>
            </div>
            <Modal show={showModal3} onHide={handleCloseModal3} backdrop="static" className=' modal-dialog-centered modal-mfa-enable' >

                <Modal.Header >
                    <Modal.Title> Verify OTP code to change Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="">
                    <Input class ="col-md-12 mx-auto" placeholder="Please enter OTP code " label="OTP code" type="number" onChange={handleVerifyCode} value={otp}  />
                    <Input class ="col-md-12 mx-auto" placeholder="Please enter new email " label="New email"  onChange={handleNewEmail} value={emailNew}  />
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn btn-success mx-auto btnResend hidden" onClick={handleResendCode}>
                    Resend
                </Button>
                <Button variant="secondary" className="btn btn-success mx-auto btnVerify" onClick={submitCode}>
                    Verify
                    </Button>
                
                </Modal.Footer>
            </Modal>

                <ToastContainer />
                   
                
        </div>
    );
}

export default ChangeEmailScreen;
