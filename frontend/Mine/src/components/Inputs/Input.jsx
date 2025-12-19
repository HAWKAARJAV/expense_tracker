import React from 'react'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, type, label }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
    return (
        <div className= "flex flex-col mb-4">
            <label className="text-[13px] text-slate-800 ">  {label} </label>
        <div className="input-box relative">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />
         {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="absolute right-3 cursor-pointer text-slate-500"
            onClick={toggleShowPassword}
               
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="absolute right-3 cursor-pointer text-slate-500"
                onClick={toggleShowPassword}
                
              />
            )}
            </>
          )}
         </div>
         </div>


    )
}
export default Input