import { useEffect } from "react";

import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apipaths";

export const useUserAuth = () => {
    const{user,updateuser,clearuser}=useContext(UserContext);
const navigate=useNavigate();

useEffect(()=>{
    if(user) return;
    let isMounted=true;
    const fetchUserInfo=async()=>{
        try{
            const res=await axiosInstance.get(API_PATHS.AUTH.GET_USER);
            if(isMounted && res.data);
            {
                updateuser(res.data);
            }
        }
        catch(error){
            console.log(error);
            if(isMounted){
            clearuser();
            navigate("/login");
            }
      }
    };
    fetchUserInfo();
    return ()=>{
        isMounted=false;
    };
},[updateuser,clearuser,navigate]);
        
}