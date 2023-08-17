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
import {  toast,ToastContainer} from 'react-toastify';
function ResetPwdScreen() {
    const [email, setEmail] = useState('');
    const handleBackToLogin = () => {
        window.location.replace("http://localhost:3000/login");
    }
    
    const sendNewPassword = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/resetpwd', null, {
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
                            window.location.replace("http://localhost:3000/login");
                        }
                    })
                    ;
                    
          
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
    const handleSendNewPasspwd = () => { 
        sendNewPassword();
        // console.log(email)
    }
    const handleEmailChange = (newValue) => {
        setEmail(newValue);
    }
    return (
        <div class="ResetPwd mx-auto">
            <div class="content">
                <h5 class="col-md-6 text-justify mx-auto pb-2">Reset Password</h5>
                <span >Procedures required to complete password reset</span>
                <ul class="pt-2">
                    <li>Enter your email account correctly in the box below</li>
                    <li>We will send you a new password. Please access your email to enter a new password.</li>
                    <li>Proceed to login again and change the new password at that login</li>
                </ul>

                <Input placeholder="Enter your email account" label="Email reset " onChange={handleEmailChange} />
                <ButtonSubmit classes=" btn-custom mt-3" onClick={handleSendNewPasspwd}>Resend new password</ButtonSubmit>
                <ButtonSubmit classes=" btn-custom-transparent" onClick={handleBackToLogin}>Back to login</ButtonSubmit>
            </div>
                   <ToastContainer />
                
        </div>
    );
}

export default ResetPwdScreen;
