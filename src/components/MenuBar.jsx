import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'

import axios from 'axios'
import {useNavigate} from "react-router-dom"
import Context from '../context/Context'
import { toast } from 'react-toastify'
function MenuBar() {
  const navigate = useNavigate()
  const {userData,backend_url,setUserDate,setIsLoggedIn} = useContext(Context);
  const [dropDownOpen, setdropDownOpen] = useState(false);
  const dropDownRef = useRef(null);

  //handle if we click outside the 
  useEffect(() => {
    const HandleClickOutSide = () => {
      if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
        setdropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", HandleClickOutSide);
    return () => document.removeEventListener("mousedown", HandleClickOutSide);
  },[]);

  //Logout
  const handleLogout = async () => {
    try{
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backend_url}/logout`);
      if(response.status == 200) {
        setIsLoggedIn(false);
        setUserDate(false);
        navigate("/");
      }
    }catch(error){
      toast.error(error.response.data.message);
    }
  }

  const sendVerificationOtp = async () => {
    try{
      const response = await axios.post(backend_url+"/send-otp");
    if(response.status === 200){
      navigate("/email-verify");
      toast.success("OTP has been sent successfully.");

    }else{
      toast.error("Unable to sent OTP!");
    }
    }catch(error){
      toast.error(error.response.data.message);
    }
  }

  return (
    <nav className='navbar bg-white px-5 py-4 d-flex justify-contant-between align-items-center'>
        <div className='d-flex align-items-center gap-2'>
            <img src={assets.logo_home} alt='logo' width={32} height={32}/>
            <span>Authify</span>
        </div>
        {userData ? (
          <div className='position-relative' ref={dropDownRef}>
              <div className='rounded-circle d-flex justify-content-center align-items-center custom-Logo'
                    style={{
                      width:"40px",
                      height:"40px",
                      cursor:"pointer",
                      userSelect:"none",
                    }} 
                    onClick={() => setdropDownOpen((prev) => !prev)}> 
                    {/* RightSide Name Logo Char based on index      */}
                    {userData.name[0].toUpperCase()} 
              </div>
              {dropDownOpen && (
                <div className='position-absolute  rounded p-2 custom-dropdown'
                    style = {{
                      
                      top:"50px",
                      right: 0,
                      zIndex: 100,
                      }}>
                        {!userData.isAccountVerified && (
                          <div className='dropdown-item py-1 px-2 custom-dropdown-item' style = {{cursor: "pointer",}}
                               onClick={sendVerificationOtp}>
                                Verify Email
                          </div>
                        )}
                        <div className='dropdown-item py-1 px-2 text-danger custom-dropdown-item danger' style = {{cursor: "pointer"}}
                             onClick={handleLogout}>
                              Logout
                        </div>                        
                   </div>
              )}
          </div>
        ) : (
              <div className='btn btn-outline-dark rounded-pill px-3' onClick={() => navigate("/login")}>
                   Login 
              </div>
        )}
       
    </nav>
  )
}

export default MenuBar