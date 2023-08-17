import 'bootstrap/dist/css/bootstrap.css';

import { Button, Modal, ModalDialog } from 'react-bootstrap';
import 'bootstrap/js/src/modal';
import axios from 'axios'
import React from 'react';
import swal from 'sweetalert';
import { AiOutlineLink } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import {
    useRef,
    useState,
    useEffect,
} from 'react'
import Input from '../components/Input';
import ButtonSubmit from '../components/ButtonSubmit';
import NumberInput from '../components/NumberInput';
import InputDate from '../components/InputDate';
import DropDownMenu from '../components/DropDownMenu';
import {  toast,ToastContainer} from 'react-toastify';
function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const [otp, setOtp] = useState('');
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);

    const handleCloseModal1 = () => setShowModal1(false);
    const handleShowModal1 = () => setShowModal1(true);
    const handleCloseModal2 = () => setShowModal2(false);
    const handleShowModal2 = () => setShowModal2(true); 
    const handleCloseModal3 = () => setShowModal3(false);
    const handleShowModal3 = () => setShowModal3(true);
    const handleCloseModal4 = () => setShowModal4(false);
    const handleShowModal4 = () => setShowModal4(true);
    const modalRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (!modalRef.current.contains(event.target)) {
        event.stopPropagation();
        }
    };

    const handleVerifyCode = (otp) => {
            setOtp(otp);
        };
    const fetchData = async ( name,gender,address,phone,dob,email,password) => {

          try {
        const res = await axios.post('http://localhost:8080/api/register', null, {
            params: {
             name,gender,address,phone,dob,email,password
           }
        });
        console.log(res);
              if (res['status'] == 200) {
             swal({
    
                    title: res.data.message,
                    icon: "success",
                    buttons: "OK"
                
             }).then((value) => {
                  handleShowModal1()
                });  
        }
        
     }
    catch (err) {  
        swal({
    
            title: err['response']['data'],
            icon: "error",
            buttons: "OK"
        
        })
     }

    }
    const getStatus = async ( ) => {

          try {
        const res = await axios.post('http://localhost:8080/api/register/getStatusVerify', null, {
            params: {
            email
           }
        });
        console.log(res);
              if (res.data == true) {
                  swal({
    
                      title: "Your account has been verified ",
                      icon: "success",
                      buttons: "OK"
                
                  }).then((value) => {
                      window.location.replace('http://localhost:3000/login');
                  });
            
              }
              else { 
                  swal({
    
                      title: "Your account has not been verified. Please login to re-authenticate.",
                      icon: "error",
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
        
        })
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
                    handleCloseModal1();
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        pauseOnHover:false,
                    });
                handleShowModal4();
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
                            handleCloseModal1();
                            handleShowModal3();
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

    const handleEmailChange = (email) => {
        setEmail(email);
    };
    const handleNameChange = (name) => {
        setName(name);
    };

    const handlePassWord = (pass) => {
        setPassword(pass);
    };
    const handleRepass = (repass) => {
        setRepass(repass);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        // alert((gender));
    };
    const handleDobChange = (event) => {
        setDob(event.target.value);
    };

    const handlePhoneChange = (phone) => {
        setPhone(phone);
    };
    const handleAddressChange = (address) => {
        setAddress(address);
    };

    const handleClickNext = () => {
        fetchData(name, gender, address, phone, dob, email, password);
    };
      const handleClickLogin = () => {
       window.location.replace("http://localhost:3000/login");
    };

    useEffect(() => { 

        document.querySelector('.form-register').addEventListener('scroll', function () {
            this.classList.toggle('scrolling', this.scrollTop > 0 );
        });
      
    }, [])
    
    const handleAuthVerifyLink = () => {
        sendLink();
    }
     const handleAuthVerifyCode = () => {
        verifyOTPCode();
    }
   

    const submitCode = () => { 
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



  return (
      <div class="Register">
          <div class="register mx-auto d-flex justify-content-between">
             
            <div class="left">
                <h4 class="col-md-3" >Register</h4>
                <div class="col-md-12 overflow-y-scroll form-register ">
                    <Input placeholder="Trần Tấn Tài" value={name} label="Fullname" onChange={handleNameChange} type="text" />
                    <Input placeholder="4/17B K2O2, thị trấn Thủ Thừa" value={address} label="Address" onChange={handleAddressChange} type="text" /> 
                    <DropDownMenu values ={["Male", "Female"]} value={gender} onChange={handleGenderChange} />
                    <InputDate value={dob} label="Date of birth" type="date" onChange={handleDobChange} />
                    <Input placeholder="0000-000-000" value={phone} label="Phone" onChange={handlePhoneChange} type="text" />
                    <Input placeholder="example@gmail.com" value={email} label="Email" onChange={handleEmailChange} type="text" />
                    <Input placeholder="*********" value={password} label="Password" onChange={handlePassWord} type="password" />
                    <Input placeholder="*********" value={password} label="Password" onChange={handleRepass} type="password" />
                      <ButtonSubmit classes=" btn-custom btnResgister" onClick={handleClickNext} >Register</ButtonSubmit>
                    <ButtonSubmit classes=" btn-custom" onClick={handleClickLogin}>Login</ButtonSubmit>
                </div>
                
            </div>
              
            <div class="right"></div>
              
          </div>
          <Modal show={showModal1} onHide={handleCloseModal1} backdrop="static" className=' modal-dialog-centered modal-mfa-enable' >
              
                <Modal.Header >
                    <Modal.Title>Enable MFA authentication</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You need to verify the registered account. Please choose one of the two options below.
                </Modal.Body>
              <Modal.Footer>
                    <div class="justify-content-around d-flex col-md-12">
                        <Button variant="secondary" className="btn btn-success col-md-5" onClick={handleAuthVerifyLink} >
                           <AiOutlineLink/> By link
                        </Button>
                        <Button variant="secondary" className="btn btn-danger col-md-5" onClick={handleAuthVerifyCode}>
                            <MdPassword/> By OTP code
                        </Button>
                    </div>
                  
                </Modal.Footer>
          </Modal>
          

          <Modal show={showModal2} onHide={handleCloseModal2} backdrop="static" className=' modal-dialog-centered modal-mfa-enable' >

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

          <Modal show={showModal3} onHide={handleCloseModal3} backdrop="static" className=' modal-dialog-centered modal-mfa-enable' >

                <Modal.Header >
                    <Modal.Title> Verify OTP Code</Modal.Title>
                </Modal.Header>
              <Modal.Body>
                <div class="d-flex justify-content-around">
                    <NumberInput class ="col-md-12 mx-auto" placeholder="Please enter OTP code " onChange={handleVerifyCode} value={otp}  />
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

          <Modal show={showModal4} onHide={handleCloseModal4} backdrop="static" className=' modal-dialog-centered modal-mfa-enable' >

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
        <ToastContainer />
    </div>

  );
}

export default RegisterScreen;
