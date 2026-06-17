import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import axios from 'axios'
import Context from '../context/Context';
import {useNavigate} from "react-router-dom"
import {toast} from 'react-toastify'
function Login() {
  const [isCreateAccount,setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {backend_url,setIsLoggedIn,getUserData} = useContext(Context)
  const navigate = useNavigate();

  //calling for register 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try{
      if(isCreateAccount){
        //register API
        const response = await axios.post(`${backend_url}/register`,{name,email,password});
        if(response.status==201){
           navigate("/");
           toast.success("Account Created Successfully.");
        }else{
          toast.error("Email already exists");
        }
      }else{
        // Login Api
        const response = await axios.post(`${backend_url}/login`,{email,password});
        if(response.status == 200){
          setIsLoggedIn(true);
          getUserData();
          navigate("/")
        }else{
          toast.error("Email/Password is incorrect")
        }
      }
    }catch(err){
      toast.error(err.response.data.message || "Something went wrong");
    }
    finally{
      setLoading(false);
    }
  }

  return (

    <div className='position-relative min-vh-100 d-flex justify-content-center align-items-center px-3'
      style={{ background: "linear-gradient(90deg, #6a5af9, #8268f9", border: "none" }}>
      <div className="position-absolute top-0 start-0 p-3 p-md-4">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <img src={assets.logo} alt='logo' width={32} height={32} />
          <span className='fw-bold fs-4 text-light'>Authify</span>
        </Link>
      </div>
      <div className="card p-4 p-sm-4 p-md-5 w-100" style={{ maxWidth: "400px" }}>
        <h2 className='text-center mb-4'>
            {isCreateAccount ? "Create Account" : "Login"}
        </h2>
        <form onSubmit={onSubmitHandler}>
          {
            isCreateAccount && ( <div className='mb-3 '>
            <label htmlFor="Full Name" className='form-lable'>Full Name</label>
            <input type='text' id='fullName' className='form-control' placeholder='Enter fullname' required 
            onChange={(e) => setName(e.target.value)} value={name}/>
          </div>)
          }
          <div className='mb-3 '>
            <label htmlFor="email" className='form-lable'>Email Id</label>
            <input type='text' id='email' className='form-control' placeholder='Enter Email' required 
            onChange={(e)=>setEmail(e.target.value)} value={email}/>
          </div>
          <div className='mb-3'>
            <label htmlFor="email" className='form-lable'>Password</label>
            <input type='password' id='password' className='form-control' placeholder='********' required 
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>
          </div>
          <div className='d-flex justify-content-between mb-3'>
              <Link to="/reset-password" className='text-decoration-none'>
                    Forget Password?
              </Link>
          </div>
            <button type='submit' className='btn btn-primary w-100' disabled={loading}> 
            {
              loading ? "Loading..." : isCreateAccount ? "Sign Up" : "Login"
            }
            </button>

        </form>
        <div className='text-center mt-3'>
            <p className='mb-0'>
              {isCreateAccount ? 
                    (
                       <>
                        Already have an account?
                        <span className='text-decoration-underline' style={{cursor:"pointer"}} 
                        onClick={()=>setIsCreateAccount(false)}>
                          Login here
                        </span>
                      </>
                    ) : (
                      <>
                        Don't have an Account?

                        <span className='text-decoration-underline' style={{cursor: "pointer"}}
                          onClick={()=>setIsCreateAccount(true)}>
                          Sign Up
                          </span>
                      </>
                    )
              }
            </p>
        </div>
      </div>
    </div>
  )
}

export default Login