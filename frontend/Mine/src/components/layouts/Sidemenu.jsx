import React from 'react'
import { SIDE_MENU_DATA } from '../../utils/data';
import { useNavigate } from "react-router-dom";
import {UserContext} from "../../context/userContext";
import { useContext } from 'react';
import user from "../../context/userContext";
import CharAvatar from '../cards/CharAvatar';
console.log(user);
console.log("SIDE_MENU_DATA:", SIDE_MENU_DATA);
import { useState } from 'react';
const SideMenu = ({activeMenu}) => {
  const { user, clearuser } = useContext(UserContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const handleClick = (route) => {
    if (route === "logout") {
      setShowLogoutModal(true);
      return;
    }
    navigate(route);
  };
  const handleLogout = () => {
    localStorage.clear();
    clearuser();
    navigate("/login");
    setShowLogoutModal(false);
  };
  return <div className="w-72 h-[calc(100vh-64px)] bg-gradient-to-br from-purple-50 via-fuchsia-100 to-white border-r border-purple-200 p-7 sticky top-[64px] shadow-xl rounded-r-3xl">
    <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-3'>
       {user?.profileImageUrl?(
        <img src={user?.profileImageUrl ||""}
        alt="Profile pic"
        className="w-20 h-20 bg-slate-400 rounded-full"
    />
       ):(<CharAvatar
       fullName={user?.fullName  }
       width="w-20"
       height="h-20"
       style= "text-xl"
       />
       )}



       <h5 className='text-gray-950 font- medium leading-6'
    >{user?.fullName||""}
    </h5>
    </div>


    {SIDE_MENU_DATA.map((item,index) => (
      <button
        key={`menu_${index}`}
        className={`w-full flex items-center gap-5 text-[17px] font-semibold relative transition-all duration-200 ease-in-out
          ${activeMenu === item.label || (item.label === 'Logout' && showLogoutModal)
            ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg border-2 border-purple-400 scale-105" 
            : "text-gray-700 hover:bg-purple-100 hover:border-2 hover:border-purple-300"
          } py-4 px-7 rounded-xl mb-4 border-2 border-transparent`}
        onClick={() => handleClick(item.path)}
      >
        <item.icon className={`text-2xl transition-colors duration-200 ${activeMenu === item.label || (item.label === 'Logout' && showLogoutModal) ? "text-white" : "text-purple-600"}`}/>
        {item.label}
        {(activeMenu === item.label || (item.label === 'Logout' && showLogoutModal)) && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
        )}
      </button>
    ))}
    {showLogoutModal && (
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-10">
        <div className="bg-white border border-purple-300 rounded-xl shadow-2xl p-6 flex flex-col items-center animate-fadeIn w-[90%] max-w-md">
          <h3 className="text-base font-bold text-purple-700 mb-1">Log Out</h3>
          <p className="text-xs text-gray-700 mb-4">Are you sure you want to log out?</p>
          <div className="flex gap-3">
            <button
              className="px-4 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold shadow hover:scale-105 transition text-sm"
              onClick={handleLogout}
            >Yes</button>
            <button
              className="px-4 py-1 rounded-lg bg-gray-200 text-gray-700 font-bold shadow hover:scale-105 transition text-sm"
              onClick={() => setShowLogoutModal(false)}
            >No</button>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fadeIn { animation: fadeIn 0.3s ease; }
          `}</style>
        </div>
      </div>
    )}
    </div>
}

export default SideMenu