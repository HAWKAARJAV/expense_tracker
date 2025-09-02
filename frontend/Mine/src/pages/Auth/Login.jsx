import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import  Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import { Link } from 'react-router-dom'
import { API_PATHS } from '../../utils/apipaths'
import axiosInstance from '../../utils/axiosInstance'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const {updateuser} = useContext(UserContext);
const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Sending login:", { email, password }); // <--- Add this line

  if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }

  if (!password) {
    setError("Please enter your password");
    return;
  }

  setError(null);

  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });

    const { token, user } = response.data;
    if (token) {
     

      localStorage.setItem("token", token);
      updateuser(user);
      navigate("/dashboard");
    }
  } catch (error) {
    console.log(error);
    setError(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center bg-gradient-to-br from-white via-purple-100 to-fuchsia-200 text-black overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-3xl font-extrabold flex items-center gap-2 mb-2 mt-6">
            <span className="animate-bounce text-purple-600">💸</span> Welcome Back
          </h3>
          <p className="text-xs mb-6 font-medium text-slate-700">
            Please enter your details to log in
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition">
              <span className="inline-flex items-center gap-2"><span className="animate-pulse">🔓</span> LOGIN</span>
            </button>
            <div className="mt-4 p-3 bg-slate-100 rounded text-sm text-slate-800 border border-slate-300 flex flex-col gap-1">
              <strong className="text-purple-700">Demo Credentials:</strong>
              <span>Email: <span className="font-mono">hawk@gmail.com</span></span>
              <span>Password: <span className="font-mono">1234</span></span>
            </div>
            <p className="text-[13px] text-slate-800 mt-3">
              Don't have an account?{" "}
              <Link className="font-medium text-primary underline" to="/signup">
                SignUp
              </Link>
            </p>
          </form>
          <div className="mt-8 text-center text-xs text-slate-500">
            <span className="font-bold text-purple-600">Built by Aarjav Jain</span> &mdash; NSUT CSAI Student
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-200 to-fuchsia-200 p-4 rounded-xl shadow flex flex-col items-center">
              <span className="text-3xl animate-bounce">📈</span>
              <span className="font-semibold mt-2">Track Expenses</span>
              <span className="text-xs text-slate-600">Monitor your spending live</span>
            </div>
            <div className="bg-gradient-to-br from-purple-200 to-fuchsia-200 p-4 rounded-xl shadow flex flex-col items-center">
              <span className="text-3xl animate-bounce">💰</span>
              <span className="font-semibold mt-2">Track Income</span>
              <span className="text-xs text-slate-600">See your earnings grow</span>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login