import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from "axios"
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setIsPopup } = useContext(StoreContext);

  const [currState, setCurrState] = new useState("Login");
  const [data, setData] = new useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setData(pre => ({... pre, [e.target.name]: e.target.value}));
  }

  const onLogin = async (evt) => {
    evt.preventDefault();

    let newUrl = url;
    newUrl += currState === "Login" ? "/api/user/login" : "/api/user/register";

    const response = await axios.post(newUrl, data);
    if(response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setIsPopup(false);
      setShowLogin(false)
    } else {
      toast.error("Invalid Credentials!!!")
      console.error('Error during login/register:', error);
      alert(response.data.messaage)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(prev => !prev)} src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popup-inputs'>
          {
            currState === "Login"
              ? <></>
              : <input onChange={onChangeHandler} name='name' value={data.name} type="text" placeholder='Your Name' required />
          }
          <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Your Email' required />
          <input onChange={onChangeHandler} name='password' value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>
          {currState === "Login" ? "Login" : "Create Account"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {
          currState === "Login" 
          ? <p>Create a new Account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
          : <p>Already have an Account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
