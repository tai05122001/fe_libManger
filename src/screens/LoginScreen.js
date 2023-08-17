import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap/js/src/modal';
import { toast,ToastContainer} from 'react-toastify';
import { Button, Modal, ModalDialog } from 'react-bootstrap';
import {
    useContext,
    useState
} from 'react'
import axios from 'axios'

import React from 'react';
import Input from '../components/Input';
import ButtonSubmit from '../components/ButtonSubmit';
import NumberInput from '../components/NumberInput';
import CheckBox from '../components/CheckBox';
import ImageButton from '../components/ImageButton';
import InputSecretKey from '../components/InputSecretKey';
import swal from 'sweetalert';
import { AiOutlineLink } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(false);
    const [verifyCode, setVerifyCode] = useState('');
    const [code, setCode] = useState('123123');
    const [otp, setOtp] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [renewPassword, setRenewPassword] = useState('');
    const [isRemember, setRemember] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [showModal5, setShowModal5] = useState(false);
    const [showModal6, setShowModal6] = useState(false);
    const [showModal7, setShowModal7] = useState(false);
    const [showModal8, setShowModal8] = useState(false);

    const handleCloseModal4 = () => setShowModal4(false);
    const handleShowModal4 = () => setShowModal4(true);

    const handleCloseModal5 = () => setShowModal5(false);
    const handleShowModal5 = () => setShowModal5(true);

    const handleCloseModal6 = () => setShowModal6(false);
    const handleShowModal6 = () => setShowModal6(true);

    const handleCloseModal7 = () => setShowModal7(false);
    const handleShowModal7 = () => setShowModal7(true);

    const handleCloseModal8 = () => setShowModal8(false);
    const handleShowModal8 = () => setShowModal8(true);

    const handleNameChange = (email) => {
        setEmail(email);
    };

    const handlePassWord = (password) => {
        setPassword(password);
    };

    const handleVerifyCode = (verifyCode) => {
        setVerifyCode(verifyCode);
    };
    const handleVerifyOTPCode = (verifyCode) => {
        setOtp(verifyCode);
    };

      const handleCode= (code) => {
        setCode(code);
    };
    const hanldeOldPassword = (password) => { 
        setOldPassword(password);
    }
     const hanldeNewPassword = (password) => { 
        setNewPassword(password);
    }
     const hanldeConfirmNewPassword = (password) => { 
        setRenewPassword(password);
    }

     const checkVerify = async (emails) => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/getStatusVerify', null, {
                params: {
                    email,
                }
            })
            return res.data;
        }
        catch (err) {
            swal({

                title: err.response.data,
                icon: "error",
                buttons: "OK"
                
            }).then(() => {
                window.location.reload();
            })
        }
    }
    
    const checkStatus = async (emails) => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/checkStatus', null, {
                params: {
                    email,
                }
            })
            setStatus(res.data);
            console.log(res.data);
        }
        catch (err) {
            console.error(err)
        }
    }
    const changePassword = async () => { 
        try {
            const res = await axios.post('http://localhost:8080/api/auth/changePassword', null, {
                params: {
                    oldPassword,
                    newPassword,
                    email,
                }
            })
            swal({

                title: res.data,
                icon: "success",
                buttons: "OK"
                
            }).then(() => {
                window.location.reload();
            })

        }
        catch (err) {
            swal({

                title: err.response.data,
                icon: "error",
                buttons: "OK"
                
            }).then(() => {
               
            })
            console.log(err)
        }
        
    }

    const fetchData = async () => {
        try {
        const res = await axios.post('http://localhost:8080/api/auth/authenticate', null, {
            params: {
                email,
                password,
                code
           }
        });
            if (res['status'] == 200) {
                localStorage.setItem('data', JSON.stringify(res.data));
              
                swal({
    
                    title: res.data.message,
                    icon: "success",
                    buttons: "OK"
                
                }).then((value) => {
                    window.location.replace("http://localhost:3000/");
                });
                
            }
     }
        catch (err) {
            console.log(err)
        swal({

            title: err.response.data,
            icon: "error",
            });
  
     }

    }

    const getStatusVerify = async () => {
        try {
   
        const res = await axios.post('http://localhost:8080/api/register/getStatusVerify', null, {
            params: {
                email,

           }
        });
                return res

     }
    catch (err) {
        swal({

            title: err.response.data,
            icon: "error",
            });
  
     }

    }

       const getStatusReset = async () => {
        try {
   
        const res = await axios.post('http://localhost:8080/api/auth/getStatusReset', null, {
            params: {
                email,
                password,
           }
        });
                return res

     }
    catch (err) {
        swal({

            title: err.response.data,
            icon: "error",
            });
  
     }

    }
    const sendLink = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/register/authByEmail', null, {
                params: {
                    email
                }
            });
            console.log(res);
            if (res['status'] == 200) {
                    handleCloseModal4();
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        pauseOnHover:false,
                    });
                handleShowModal7();
                  if (document.getElementsByClassName("btnVerifyLink")[0] != undefined) {
                    document.getElementsByClassName("btnVerifyLink")[0].classList.remove("hidden");
                    document.getElementsByClassName("btnResendLink")[0].classList.add("hidden");
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
    const resendOTPCode = async () => {

        try {
            const res = await axios.post('http://localhost:8080/api/register/authByOtpCode', null, {
                params: {
                    email
                }
            });
            console.log(res);
                if (res['status'] == 200){
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 10000,
                        pauseOnHover:false,
                        onOpen: () => {
                            document.getElementsByClassName("btnVerify")[0].classList.remove("hidden");
                            document.getElementsByClassName("btnResend")[0].classList.add("hidden");
                        }
                    });
                }
        
        }
    catch (err) {
        console.log(err);
        alert(err['response']['data']);
        swal({
    
            title: err['response']['data'],
            icon: "error",
            buttons: "OK"
        
        })
     }

    }

    const confirmOTPCode = async () => {

        try {
            const res = await axios.post('http://localhost:8080/api/register/confirmOTP', null, {
                params: {
                    email,
                    otp
                }
            });
            console.log(res);
                if (res['status'] == 200){
                  swal({
    
                      title: res.data,
                      icon: "success",
                      buttons: "OK"
                
                  }).then((value) => {
                      window.location.replace('http://localhost:3000/login');
                  });
            }
            
        
        }
    catch (err) {
        console.log(err);
            swal({
    
                title: err['response']['data'],
                icon: "error",
                buttons: "OK"
        
            }).then((value) => { 
                if (err['response']["status"] == 400) {
                    document.getElementsByClassName("btnVerify")[0].classList.add("hidden");
                    document.getElementsByClassName("btnResend")[0].classList.remove("hidden");
                }
                
            })
        
        
     }

    }
    const verifyLink = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/register/verifyLink', null, {
                params: {
                    email
                }
            });
            console.log(res);
                if (res['status'] == 200){
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                        pauseOnHover:false,
                        onClose: () => {
                            window.location.replace("http://localhost:3000/login");
                        }
                    });
                        document.getElementsByClassName("btnVerifyLink")[0].classList.remove("hidden");
                        document.getElementsByClassName("btnResendLink")[0].classList.add("hidden");
                }
        
        }
    catch (err) {
        console.log(err);
        swal({
    
            title: err['response']['data'],
            icon: "error",
            buttons: "OK"
            
        })
        document.getElementsByClassName("btnVerifyLink")[0].classList.add("hidden");
        document.getElementsByClassName("btnResendLink")[0].classList.remove("hidden");
        
     }

    }

    const verifyOTPCode = async () => {

        try {
            const res = await axios.post('http://localhost:8080/api/register/authByOtpCode', null, {
                params: {
                    email
                }
            });
            console.log(res);
                if (res['status'] == 200){
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 10000,
                        pauseOnHover:false,
                        onOpen: () => {
                            handleCloseModal4();
                            handleShowModal6();
                        }
                    });
                }
        
        }
    catch (err) {
        console.log(err);
        alert(err['response']['data']);
        swal({
    
            title: err['response']['data'],
            icon: "error",
            buttons: "OK"
        
        })
     }

    }
    const handleClick = async () => {

        getStatusReset().then((res) => {
            if (res == undefined) return;
            if (res.data == false) {
                getStatusVerify().then((res) => { 
                    if(res==undefined) return;
                    if (res.data == false) {
                        handleShowModal4();
                    }
                    else {
                    
                        fetchData();
                        console.log(code)  
                    }
                    })
            }
            else {
                handleShowModal8();
                
            }
        })

        
    };

    const changeStatusRemember = () => {

        setRemember(isRemember ? false : true);
        // alert(!isRemember);
    }

     const handleAuthVerifyLink = () => {
        sendLink();
    }
     const handleAuthVerifyCode = () => {
        verifyOTPCode();
    }
    const handleConfirmOtpCode = () => { 
        confirmOTPCode()
    }
    
    const handleResendLink = () => { 
        sendLink();

    }
    const handleResendCode = () => { 
        resendOTPCode();

    }
    const handleVerifyLink = () => { 
        verifyLink();

    }
    const handleChangePass = () => {
        changePassword();
        
    }

    
  return (
      <div class="Login">
          <div class="login mx-auto d-flex justify-content-between">
              <div class=" left"></div>
              <div class="right">
                    <h4 class="col-md-3" >Login</h4>
                    <p>Let's explore the books in the warehouse together to increase our knowledge!</p>
                    <div class="form-login col-md-12">
                        <Input placeholder="example@gmail.com" value={email} label="Email" onChange={handleNameChange} type="text" />
                        <Input placeholder="*********" value={password} label="Password" onChange={handlePassWord} type="password" />
                        <Input placeholder="*********" value={code} label="MFA Code" onChange={handleCode} type="number" />
                 
                        <div class="d-flex justify-content-between ">
                          <CheckBox onChangeStatus={changeStatusRemember} label="Remember my" />
                          <a class="pt-2" href="/resetpwd">Reset password</a> 
                        </div>
                      <ButtonSubmit classes="btn-custom" onClick={handleClick} >Login</ButtonSubmit>
                      <div class="col-md-6 mx-auto mt-2">
                        <div class="d-flex justify-content-center">
                            <ImageButton src="facebook.png"  />
                            <ImageButton src="google.png"  />
                        </div>
                          
                      </div>

                        <div class="col-md-12 mx-auto d-flex justify-content-around text-center" >
                             <a class="col-md-4" href="/register">Creat a new account</a>
                             <a class="col-md-4" href="/changeEmail">Change email</a>
                             <a class="col-md-4" href="/changePhone">Change phone</a>
                         </div>
                        
                    </div>
              </div>
          </div>
    
          
            <Modal show={showModal4} onHide={handleCloseModal4} backdrop="static" className=' modal-dialog-centered modal-mfa-enable' >
              
                <Modal.Header >
                    <Modal.Title>Enable verify account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You need to verify the registered account. Please choose one of the two options below.
                </Modal.Body>
              <Modal.Footer>
                    <div class="justify-content-around d-flex col-md-12">
                        <Button variant="secondary" className="btn btn-success col-md-5"  onClick={handleAuthVerifyLink}>
                           <AiOutlineLink/> By link
                        </Button>
                        <Button variant="secondary" className="btn btn-danger col-md-5" onClick={handleAuthVerifyCode} >
                            <MdPassword/> By OTP code
                        </Button>
                    </div>
                  
                </Modal.Footer>
          </Modal>

          <Modal show={showModal5} onHide={handleCloseModal5} backdrop="static" className=' modal-dialog-centered modal-mfa-enable' >

                <Modal.Header >
                    <Modal.Title>Resend Link</Modal.Title>
                </Modal.Header>
              <Modal.Body>
                <div class="d-flex justify-content-around">
                    <p>If you haven't received link via email, press the resend button so we can resend the code</p>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn btn-success mx-auto" onClick={handleResendLink}>
                      Resend
                    </Button>
                </Modal.Footer>
          </Modal>

          <Modal show={showModal6} onHide={handleCloseModal6} backdrop="static" className=' modal-dialog-centered modal-mfa-enable' >

                <Modal.Header >
                    <Modal.Title> Verify OTP Code</Modal.Title>
                </Modal.Header>
              <Modal.Body>
                <div class="d-flex justify-content-around">
                    <NumberInput class ="col-md-12 mx-auto" placeholder="Please enter OTP code " onChange={handleVerifyOTPCode} value={otp}  />
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn btn-success mx-auto btnResend hidden" onClick={handleResendCode}>
                      Resend
                  </Button>
                   <Button variant="secondary" className="btn btn-success mx-auto btnVerify" onClick={handleConfirmOtpCode} >
                      Verify
                    </Button>
                  
                </Modal.Footer>
          </Modal>

          <Modal show={showModal7} onHide={handleCloseModal7} backdrop="static" className=' modal-dialog-centered modal-mfa-enable' >

                <Modal.Header >
                    <Modal.Title> Verify Link</Modal.Title>
                </Modal.Header>
              <Modal.Body>
                <div class="d-flex justify-content-around">
                    <p>If you have authenticated with the link inside the email, then click the "Verity" button to authenticate.</p>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn btn-success mx-auto btnResendLink hidden" onClick={handleResendLink}>
                      Resend
                  </Button>
                   <Button variant="secondary" className="btn btn-success mx-auto btnVerifyLink" onClick={handleVerifyLink}>
                      Verify
                    </Button>
                  
                </Modal.Footer>
          </Modal>

          <Modal show={showModal8} onHide={handleCloseModal8} backdrop="static" >

                <Modal.Header closeButton>
                    <Modal.Title>Change password</Modal.Title>
                </Modal.Header>
              <Modal.Body>
                <div class="">
                    <Input class ="col-md-12 mx-auto" placeholder="Please enter old password" label="Old password" type="password" onChange={hanldeOldPassword} value={oldPassword}  />
                    <Input class ="col-md-12 mx-auto" placeholder="Please enter old password" label="New password" type="password" onChange={hanldeNewPassword} value={newPassword}  />
                    <Input class ="col-md-12 mx-auto" placeholder="Please enter old password" label="Confirm new password" type="password" onChange={hanldeConfirmNewPassword} value={renewPassword}  />
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn btn-success col-md-12 mx-auto btnConfirmChange" onClick={handleChangePass}>
                      Change
                  </Button>
                  
                </Modal.Footer>
          </Modal>
        <ToastContainer />
   
    </div>

  );
}

export default LoginScreen;
