import React, { useState, useEffect } from 'react'
import card from '../../assets/images/card.png'
import {LuTrendingUpDown} from 'react-icons/lu'
import { addThousandsSeparator } from '../../utils/helper';
// ...existing imports...
const AuthLayout = ({children}) => {
  const [randomValue, setRandomValue] = useState(Math.floor(Math.random() * 900000 + 100000));

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomValue(Math.floor(Math.random() * 900000 + 100000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="flex items-stretch">
  <div className="w-screen h-screen md:w-[90vw] pt-10 pb-12 pl-8">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-400 drop-shadow-lg mb-8 tracking-widest border-b-4 border-purple-200 pb-2">EXPENSE TRACKER</h1>
      {children}
    </div>
  <div className="hidden md:block w-[45vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative mt-29 ">
      <div className="w-48 h-48 rounded-[40px] bg-violet-600 absolute -top-7 -left-5"/>
      <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] right-[-10%]"/>
      <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5"/>
      <div className="grid grid-cols-1 z-20 max-w-xs mx-auto">
        <StatsInfoCard
          icon={<LuTrendingUpDown className="text-white text-3xl" />}
          label="Track Your Income & Expenses"
          value={randomValue}
          color="bg-purple-600"
        />
      </div>
      <img 
        src={card}
        className="w-60 lg:w-[90%] absolute bottom-0 shadow-lg shadow-blue-400/15"/>
    </div>
  </div>
}
export default AuthLayout
const StatsInfoCard = ({icon,label,value,color}) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200 z-10">
      <div 
        className={`w-12 h-12 flex items-center justify-center text-[26px] ${color} text-white rounded-full drop shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-2"> {label} </h6>
        <span className="text-[20px]">₹{addThousandsSeparator(value)}</span>
      </div>
    </div>
  )
}
