
import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { Link } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apipaths'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'
import uploadImage from '../../utils/uploadImage' 
  const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    
    const {updateuser} = useContext(UserContext);
   const navigate=useNavigate();
   const handleSignUp = async (e) => 
   {
    e.preventDefault();
    let profileImageUrl = null;
    if(!fullName)
    {
      setError("Please enter your full name");
     return;
     }
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

      if(profilePic) {
        const imgUploadRes= await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl ||"";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateuser(user);
        navigate("/dashboard");
      }  

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } 
      else {
        setError("An error occurred. Please try again.");
      }
    }
  };


   return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center bg-gradient-to-br from-white via-purple-100 to-fuchsia-200 text-black rounded-xl shadow-xl px-8 py-10">
        <h3 className="text-3xl font-extrabold text-purple-700 mb-2 tracking-wide">Create an Account</h3>
        <p className="text-sm text-slate-700 mb-6 font-medium">Join us today by entering your details below.</p>
        <form onSubmit={handleSignUp} className="space-y-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              type="text"
              label="Full Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              label="Email"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                label="Password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition">
            <span className="inline-flex items-center gap-2"><span className="animate-pulse">📝</span> SIGN UP</span>
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{' '}
            <Link className="font-medium text-primary underline" to="/login">
              Login
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
    </AuthLayout>
  )

}

export default SignUp