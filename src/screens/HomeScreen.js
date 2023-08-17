import { PiUserGearBold } from "react-icons/pi";
import { GrShieldSecurity } from "react-icons/gr";
import { MdPublishedWithChanges } from "react-icons/md";
import { FaRegBell, FaRegUser, FaRegHeart } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { HiOutlineUserPlus, HiOutlineUsers } from 'react-icons/hi2';
import { MdOutlineSms } from "react-icons/md";
import { IoMdExit} from 'react-icons/io';
import ButtonSubmit from '../components/ButtonSubmit';
import axios from "axios";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
  import {  toast,ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {
  useState,
  useEffect,
} from 'react'
import swal from 'sweetalert';
import SearchBar from '../components/SearchBar';
import { Button, Modal, ModalDialog } from 'react-bootstrap';
import Input from '../components/Input';
import NumberInput from '../components/NumberInput';

function HomeScreen() {
  const [uuid, setUuid] = useState("")
  const [status, setStatus] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [secretKey, setSecretKey] = useState('')
  const [code, setCode] = useState("")
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [renewPassword, setRenewPassword] = useState('');
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [emailNew, setEmailNew] = useState('');
  const [otp, setOTP] = useState('');

  const [phoneNew, setPhoneNew] = useState('');
  const [otpPhone, setOtpPhone] = useState('');

  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);

  const handleCloseModal4 = () => setShowModal4(false);
  const handleShowModal4 = () => setShowModal4(true);
  
  const handleCloseModal5 = () => setShowModal5(false);
  const handleShowModal5 = () => setShowModal5(true);

  const handleCloseModal6 = () => setShowModal6(false);
  const handleShowModal6 = () => setShowModal6(true);

  const handleCloseModal7 = () => setShowModal7(false);
  const handleShowModal7 = () => setShowModal7(true);
  const [valueSearch, setValueSearch] = useState("")

  var savedData = JSON.parse(localStorage.getItem('data'));
  console.log(savedData);
  if (savedData == undefined) {
    localStorage.setItem('data', JSON.stringify(
      { email: "", accesstoken: "", refreshtoken: "" }
         
    ));
    savedData = JSON.parse(localStorage.getItem('data'));
  }

 
  
     const refreshToken = async ( uuid_value) => {

        try {
        const res = await axios.post('http://localhost:8080/api/token/refresh-token', null, {
            params: {
            uuid: uuid_value
           }
        });
        console.log(res['status']);
          if (res['status'] == 200) {
               console.log(res.data['token'])
            var response= (JSON.parse(res.data['token']))
         
            
          savedData["access-token"] = response['access-token'];
          savedData["refresh-token"] = response['refresh-token'];
          localStorage.removeItem('data');
          localStorage.setItem('data', JSON.stringify(
                savedData
            ));
        }
       
     }
    catch (err) {
        console.log(err.response.data['message']);
     }

    }
  useEffect(() => {
    // generateCode();
    if (savedData['refresh-token'] != null) { 
        refreshToken(savedData['refresh-token']);

    }

    document.getElementsByClassName("icon-clean")[0].addEventListener("click", function (e) { 
      setValueSearch("");
    })

    if ( savedData.accesstoken =="") { 
          document.getElementsByClassName("user-tag")[0].addEventListener('mouseover', function() { 
        document.getElementsByClassName("sub-list-user")[0].classList.remove("hidden"); 
          })

          
          document.getElementsByClassName("user-tag")[0].addEventListener('mouseout', function() { 
              document.getElementsByClassName("sub-list-user")[0].classList.add("hidden"); 
          })

  }
  else{
    document.getElementsByClassName("settings-tag")[0].addEventListener('mouseout', function() { 
      document.getElementsByClassName("sub-list-settings")[0].classList.add("hidden"); 
    })
    document.getElementsByClassName("settings-tag")[0].addEventListener('mouseover', function() { 
      document.getElementsByClassName("sub-list-settings")[0].classList.remove("hidden"); 
        })
  }
  checkStatus();

  },[])
  const checkStatus = async (emails) => {
    try {
        const res = await axios.post('http://localhost:8080/api/reader/checkStatus', null, {
          headers: {
            'Authorization': `Bearer ${savedData["access-token"]}` 
          }
        })
        setStatus(res.data);
        console.log(res.data);
    }
    catch (err) {
        console.error(err)
    }
  }
  
  
  const logout = async ( ) => {

        try {
        const res = await axios.post('http://localhost:8080/api/reader/logout', null, {
            headers: {
              'Authorization': `Bearer ${savedData["access-token"]}` 
            }
        });
        console.log(res['status']);
        if (res['status'] == 200) {
          
          swal({
            title: "Logout success",
            icon: "success",
          }).then(() => { 
            window.location.replace("http://localhost:3000/login");
          });
        }
      
        
    }
    catch (err) {
        swal({
              title: "Logout failure!",
              icon: "error",
                });
    
    }

    }


  
  const onchange = (event) => {
    setValueSearch(event.target.value);
    var search = document.getElementsByClassName("icon-search")[0]
    var clean = document.getElementsByClassName("icon-clean")[0]
    if (event.target.value != "") {
      search.classList.add("hidden");
      clean.classList.remove("hidden");
    }
    else {
      search.classList.remove("hidden");
      clean.classList.add("hidden");
    }

  }

  const userClicked = (event) => { 
    window.location = "http://localhost:3000/register";
  }
   const loginClicked = (event) => { 
    window.location = "http://localhost:3000/login";
  }
   const heartClicked = (event) => { 
  
  }

  const logoutClicked = (event) => { 
    swal({
    
      title: "Do you want to sign out?",
      icon: "info",
      buttons: {
        cancel: "Cancel",
        logout: "Logout"
      }
    }).then((value) => { 
      switch (value) { 
        case "logout":
        logout()
        localStorage.removeItem('data');
          break;
        default:
          window.location.reload();
      }


    });

    
  }
  const authMfaByVerifyCode = async () => { 
    try {
        const res = await axios.post('http://localhost:8080/api/reader/authMfa', null, {
            params: {
              
                secretKey,
                code
            },
            headers: {
              'Authorization': `Bearer ${savedData["access-token"]}` 
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
            // window.location.reload();
        })
        console.log(err)
    }
    
    
}
  
  const changePasswordRequest = async () => { 
    try {
        const res = await axios.post('http://localhost:8080/api/reader/changePassword', null, {
            params: {
                oldPassword,
                newPassword
            },
            headers: {
              'Authorization': `Bearer ${savedData["access-token"]}` 
            }
        })
        swal({

            title: res.data,
            icon: "success",
            buttons: "OK"
            
        }).then(() => {

          swal({
    
            title: "Do you want to logout after change password?",
            icon: "info",
            buttons: {
              cancel: "Cancel",
              logout: "Logout"
            }
          }).then((value) => { 
            switch (value) { 
              case "logout":
              logout()
              localStorage.removeItem('data');
                break;
              default:
                window.location.reload();
            }
      
      
          });
           
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
  const getQrCode = async () => { 
    try {
        const res = await axios.post('http://localhost:8080/api/reader/enableMfa', null, {
          headers: {
            'Authorization': `Bearer ${savedData["access-token"]}` 
          }
        })
        setQrCode(res.data.qrCode)
        setSecretKey(res.data.secretKey)
    }
    catch (err) {
            swal({

                title: err.response.data,
                icon: "error",
                buttons: "OK"
                
            }).then(() => {
                // window.location.reload();
            })
            console.log(err)
        }
        
    }
  


  const setUpMfa = (event) => { 
    swal({
    
      title: "Do you want to set up MFA?",
      icon: "info",
      buttons: {
        cancel: "Cancel",
        setup: "Set up"
      }
    }).then((value) => { 
      switch (value) { 
        case "setup":
        getQrCode();
        handleShowModal2();
          break;
        default:
        
      }
    });
    
  }
   
  const sendOTP = async () => {
    try {
        const res = await axios.post('http://localhost:8080/api/reader/sendOtpToChangeEmail', null, {
            headers: {
              'Authorization': `Bearer ${savedData["access-token"]}` 
            }
        });

        if (res['status'] == 200) {
                toast.success(res.data, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 500,
                    pauseOnHover: false,
                  
                });
                handleCloseModal4();
                handleShowModal5();
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

const sendPhone = async () => {
  try {
      const res = await axios.post('http://localhost:8080/api/reader/sendSMS', null, {
          headers: {
            'Authorization': `Bearer ${savedData["access-token"]}` 
          }
      });

      if (res['status'] == 200) {
              toast.success(res.data, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 500,
                  pauseOnHover: false,
                
              });
              handleCloseModal6();
              handleShowModal7();
              if (document.getElementsByClassName("btnVerifyPhone")[0] != undefined) {
                  document.getElementsByClassName("btnVerifyPhone")[0].classList.remove("hidden");
                  document.getElementsByClassName("btnResendPhone")[0].classList.add("hidden");
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
      const res = await axios.post('http://localhost:8080/api/reader/authChangeEmail', null, {
          params: {
              emailNew,
              otp
          },
          headers:{
            'Authorization': `Bearer ${savedData["access-token"]}` 
          }
      });

      if (res['status'] == 200) {
              console.log(res)
              toast.success(res.data.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 500,
                  pauseOnHover: false,
                  onClose: () => { 
                    savedData["access-token"] = res.data.accessToken;
                    savedData["refresh-token"] = res.data.refreshToken;
                    savedData["email"] = emailNew;
                    localStorage.removeItem('data');
                    localStorage.setItem('data', JSON.stringify(
                          savedData
                      ));

                    swal({
    
                      title: "Do you want to logout after change email?",
                      icon: "info",
                      buttons: {
                        cancel: "Cancel",
                        logout: "Logout"
                      }
                    }).then((value) => { 
                      switch (value) { 
                        case "logout":
                        logout()
                        localStorage.removeItem('data');
                          break;
                        default:
                          window.location.reload();
                      }
                
                
                    });

                  }
              });
           
          }
      }
  catch (err) {
          console.log(err);
      swal({
  
          title: err.response.data,
          icon: "error",
          buttons: "OK"
      
      })
      if(err.response.status == 400){
          document.getElementsByClassName("btnVerify")[0].classList.add("hidden");
          document.getElementsByClassName("btnResend")[0].classList.remove("hidden");
      }

  }

}

const authChangePhone = async () => {
  try {
      const res = await axios.post('http://localhost:8080/api/reader/authChangePhone', null, {
          params: {
              phoneNew,
              otpPhone
          },
          headers:{
            'Authorization': `Bearer ${savedData["access-token"]}` 
          }
      });

      if (res['status'] == 200) {
              console.log(res)
              toast.success(res.data, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 500,
                  pauseOnHover: false,
                  onClose: () => { 
                    window.location.reload();
                  }
              });
           
          }
      }
  catch (err) {
          console.log(err);
      swal({
  
          title: err.response.data,
          icon: "error",
          buttons: "OK"
      
      })
      if(err.response.status == 400){
          document.getElementsByClassName("btnVerifyPhone")[0].classList.add("hidden");
          document.getElementsByClassName("btnResendPhone")[0].classList.remove("hidden");
      }

  }

}
const changePassword = (event) => { 
  handleShowModal1();
}

const changeEmail= (event) => { 
  handleShowModal4();
}
const changePhone= (event) => { 
  
  handleShowModal6();
}


  const handleVerifyCode = (newValue)=>{
      setOTP(newValue);

  }

  const handleNewEmail = (newValue)=>{
    setEmailNew(newValue);

}

const handleOtpPhone = (newValue)=>{
  setOtpPhone(newValue);

}

const handlePhoneNew = (newValue)=>{
setPhoneNew(newValue);

}

  const handleChangePass =()=>{

      changePasswordRequest();
  }
  const hanldeOldPassword =(newValue)=>{
    setOldPassword(newValue);
   
  }
  const hanldeNewPassword =(newValue)=>{
    setNewPassword(newValue);
    
  }
  const hanldeConfirmNewPassword =(newValue)=>{
    setRenewPassword(newValue);
  }
  const handleQrCodeMfa =  () => {
    handleShowModal3()
    handleCloseModal2();
    // handleCloseModal2();
    // handleShowModal3();
  };
  const handleOTPCode = (newValue) => {
    setCode(newValue);
  }
  const handleChangeEmail = ()=>{
      sendOTP();

  }

  const handleChangePhone = ()=>{
    sendPhone();

}
  const submitCode = () => {
    authMfaByVerifyCode()
  }
  
  const handleResendCode =() => {
    sendOTP();
}
const handleResendCodePhone =() => {
  sendPhone();
}

const submitCodeEmail =() => {
  authChangeEmail();
}

const submitCodePhone = () => {
  authChangePhone()
}

  return (
    <div class="Home container">
      <div class="d-flex justify-content-between">
        <h3 class="col-md-1">Books</h3>
        <div class="col-md-5">
          <SearchBar placeholder={"Search by author, title, name"} value={ valueSearch} onChange ={onchange} />
        </div>
        <div class="button-tab-web col-md-1 justify-content-around pt-2 d-flex">
          <div>
            <FaRegHeart cursor="pointer" onClick={heartClicked} />
          </div>
       
          { savedData.accesstoken  == "" ?
          <div class="position-relative user-tag" >
            <FaRegUser  cursor="pointer" />
            <ul class="position-absolute sub-list-user hidden">
              <li  onClick={userClicked}><HiOutlineUserPlus size="12" /> Register</li>
              <li onClick={loginClicked}><HiOutlineUsers size="12"  /> SignIn</li>
            </ul>
            </div> : <div  class="position-relative settings-tag" >
              <PiUserGearBold cursor="pointer" size={18} />
              <ul class="position-absolute sub-list-settings hidden">
                <li  onClick={changePassword}><MdPublishedWithChanges size="12" /> Change password</li>
                <li  onClick={changeEmail}><MdPublishedWithChanges size="12" /> Change email</li>
                <li  onClick={changePhone}><MdOutlineSms size="12" /> Change phone</li>
                {status == false?<li  onClick={setUpMfa}><GrShieldSecurity size="12" /> Setup MFA</li>:<div></div> }
                <li onClick={logoutClicked}><IoMdExit size="12"  /> Logout</li>
              </ul>
              </div>
        
        }
          

          <div>
            <FaRegBell cursor="pointer" />
          </div>
        </div>

      </div>
      <div class="d-flex justify-content-between">
        <div class="col-md-1"></div>
          <div class="col-md-5 pt-2">
          <Tabs>
            <TabList>
              <Tab>Home</Tab>
              <Tab>Popular</Tab>
              <Tab>Contact</Tab>
              <Tab>About</Tab>
             
            </TabList>

            <TabPanel>
              <img src={code} height={200} width={200} />
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
          </Tabs>
        </div>
        <div class="col-md-1"></div>
      </div>
      <Modal show={showModal1} onHide={handleCloseModal1} backdrop="static" >

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
          <Modal show={showModal2} onHide={handleCloseModal2}>
                <Modal.Header >
                    <Modal.Title>Configure your token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>To complete registration you should configure your token in Gooogle Authenticator application. You will need this token farther to be able to log in</p>
                    <br/>
                    <p>Scan the QR code displayed below on enter token manually</p>
                    <div class="col-md-6 mx-auto bg-qr-code">
                            <img class="mx-auto" src={qrCode}></img>
                        </div>
                    <div class="col-md-6 mx-auto">
                      <p>Key: {secretKey}</p>  
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-success mx-auto' onClick={handleQrCodeMfa}>
                    Next
                    </Button>
                </Modal.Footer>
                </Modal>
            <Modal show={showModal3} onHide={handleCloseModal3} className=' modal-dialog-centered modal-mfa-enable' >

                <Modal.Header closeButton>
                    <Modal.Title>MFA First Setup Authentication</Modal.Title>
                </Modal.Header>
              <Modal.Body>
                <div class="d-flex justify-content-around">
                    <NumberInput className="col-md-12" placeholder="Please enter verify code " onChange={handleOTPCode} value={code}  />
                    
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn btn-success mx-auto" onClick={submitCode}>
                      Verify MFA
                    </Button>
                </Modal.Footer>
          </Modal>

          <Modal show={showModal4} onHide={handleCloseModal4} className=' modal-dialog-centered ' >

                <Modal.Header closeButton>
                    <Modal.Title>Change email</Modal.Title>
                </Modal.Header>
              <Modal.Body>
                <span class= "title-modal" >Procedures required to complete change email</span>
                  <ul class="pt-2">
                      <li>Enter your email account correctly in the box below</li>
                      <li>We will send you a otp code to verify about change email . Please access your email to enter a OTP code .</li>
                      <li>Proceed to press the verify button and enter the new email code to complete the procedure</li>
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <ButtonSubmit classes=" btn-custom mt-3" onClick={handleChangeEmail}>Change email</ButtonSubmit>
                </Modal.Footer>
          </Modal>
          <Modal show={showModal5} onHide={handleCloseModal5} backdrop="static" className=' modal-dialog-centered' >

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
                <Button variant="secondary" className="btn btn-success mx-auto btnVerify" onClick={submitCodeEmail}>
                    Verify
                    </Button>
                
                </Modal.Footer>
            </Modal>
            <Modal show={showModal6} onHide={handleCloseModal6} className=' modal-dialog-centered ' >

                <Modal.Header closeButton>
                    <Modal.Title>Change email</Modal.Title>
                </Modal.Header>
              <Modal.Body>
                <span class= "title-modal" >Procedures required to complete change phone</span>
                  <ul class="pt-2">
                      <li>We will send you a otp code to verify about change email . Please access your email to enter a OTP code .</li>
                      <li>Proceed to enter the new phone and code then press the verify button to change phone </li>
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <ButtonSubmit classes=" btn-custom mt-3" onClick={handleChangePhone}>Change phone</ButtonSubmit>
                </Modal.Footer>
          </Modal>

          <Modal show={showModal7} onHide={handleCloseModal7} backdrop="static" className=' modal-dialog-centered' >

                <Modal.Header >
                    <Modal.Title> Verify OTP code to change phone</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="">
                    <Input class ="col-md-12 mx-auto" placeholder="Please enter OTP code " label="OTP code" type="number" onChange={handleOtpPhone} value={otpPhone}  />
                    <Input class ="col-md-12 mx-auto" placeholder="Please enter new phone " label="New phone"  onChange={handlePhoneNew} value={phoneNew}  />
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn btn-success mx-auto btnResendPhone hidden" onClick={handleResendCodePhone}>
                    Resend
                </Button>
                <Button variant="secondary" className="btn btn-success mx-auto btnVerifyPhone" onClick={submitCodePhone}>
                    Verify
                    </Button>
                
                </Modal.Footer>
            </Modal>

          
          
    <ToastContainer />
    </div>

  );
}

export default HomeScreen;
