import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const backend_url = "https://e-commerce-backendd-zm8m.onrender.com";

  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async() =>{
    console.log("Login Function Executed", formData)
    let responseData;
    
    // লোকালহোস্ট বদলে লাইভ URL দেওয়া হলো
    await fetch(`${backend_url}/login`,{
      method:'POST',
      headers:{
        Accept:'application/json', // স্ট্যান্ডার্ড JSON রিকোয়েস্ট অ্যাকসেপ্ট হেডারের জন্য
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=> response.json()).then((data) => responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/")
    }else{
      alert(responseData.errors)
    }
  }

  const signup = async() =>{
    console.log("Signup Function Executed", formData);
    let responseData;
    
    // লোকালহোস্ট বদলে লাইভ URL দেওয়া হলো
    await fetch(`${backend_url}/signup`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=> response.json()).then((data) => responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/")
    }else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address'/>
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

        {state==="Sign Up"?<p className="loginsignup-login">Already have an Account? <span onClick={()=>{setState("Login")}}>Login here</span></p>:<p className="loginsignup-login">Create an Account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
        
        <div className="loginsignup-agree">
          <input type="checkbox" name ='' id=''/>
          <p>By Continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup