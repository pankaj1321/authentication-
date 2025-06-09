import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import { handleError, handleSucess } from "../utils";

const Signup = () => {
  const [signup,setSignup] = useState({
    name:"",
    email: "",
    password:"",
  })
  const navigate = useNavigate();

  const handleChange = (e)=>{
    // using spread operator to copy the previous state and update the current state
   setSignup((prev)=>{
     const newSignup = {...prev,[e.target.name]:e.target.value}
     return newSignup 
   })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {name,email,password} = signup
    if( !name||!email || !password){
      handleError("Please fill all the fields")

    }

    // api calling 
    // Here you would typically send the signup data to your backend API
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signup)

      })
      const result = await response.json();
      
      const {message,success,error} = result;
      if(success){
        handleSucess(message);
        setTimeout(() => {
          navigate("/login")
        }, 1000);
      }
      else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }
      else if (!success){
        handleError(message)

      }
      console.log(result);
      
      
    } 
    catch (error) {
      handleError(error)
      

      
    }



    

  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          SignUp
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              name="name"
            onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={signup.name}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              name="email"
            onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={signup.email}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              name="password"
            onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={signup.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition"
          >
            SignUp
          </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <span className="text-purple-600 cursor-pointer"><Link to="/login">Login</Link></span>
        </p>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Signup;
