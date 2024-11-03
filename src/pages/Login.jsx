import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import axios from "axios";

function Login() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(' ')
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const {  setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('')
    try {
      const resposne = await axios.post('http://localhost:8000/api/user/login', formValues)
      const data = resposne.data
      setCurrentUser(data)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message)
    }
    
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="border px-5 py-6 rounded-md shadow-lg">
        <h1 className="text-4xl mb-6 font-semibold text-center">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            className="w-[340px] my-2 bg-white p-2 outline-none border border-gray-400 rounded-md"
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              className="w-[340px] my-2 bg-white p-2 outline-none border border-gray-400 rounded-md"
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-2 top-[22px] cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-[340px] my-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-4 text-sm">
          <p>
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-600 cursor-pointer">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
