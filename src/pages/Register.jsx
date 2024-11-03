// Register.js
import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8000/api/user/register", formValues)
      const data = await response.data
      console.log(data)
      if(!data){
        setError("User couldn't be register, Please! try again")
      }
      navigate('/login')
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <div className='border px-5 py-6 rounded-md shadow-lg'>
        <h1 className='text-4xl mb-6 font-semibold text-center'>
          Sign Up
        </h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col'>
          {/* Full Name Input */}
          <input
            className='md:w-[340px] my-2 bg-white p-2 outline-none border border-gray-400 rounded-md'
            type="text"
            name="name"
            placeholder='Name'
            value={formValues.name}
            onChange={handleChange}
            required
          />

          {/* Email Input */}
          <input
            className='w-[340px] my-2 bg-white p-2 outline-none border border-gray-400 rounded-md'
            type="email"
            name="email"
            placeholder='Email'
            value={formValues.email}
            onChange={handleChange}
            required
          />

          {/* Password Input */}
          <div className='relative'>
            <input
              className='w-[340px] my-2 bg-white p-2 outline-none border border-gray-400 rounded-md'
              type={show ? "text" : "password"}
              name="password"
              placeholder='Password'
              value={formValues.password}
              onChange={handleChange}
              required
            />
            <span
              className='absolute right-2 top-[22px] cursor-pointer'
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className='relative'>
            <input
              className='w-[340px] my-2 bg-white p-2 outline-none border border-gray-400 rounded-md'
              type={show ? "text" : "password"}
              name="confirmPassword"
              placeholder='Confirm Password'
              value={formValues.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className='absolute right-2 top-[22px] cursor-pointer'
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Register Button */}
          <button
            type='submit'
            className='w-[340px] my-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300'
          >
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <div className='mt-4 text-sm'>
          <p>Already have an account? <Link to={'/login'} className='text-blue-600 cursor-pointer'>Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
