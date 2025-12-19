import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useState } from 'react'
import IncomeOverview from '../../components/Income/IncomeOverview'
import {LuPlus} from "react-icons/lu"
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apipaths'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
const Income = () => {
  const[incomeData,setIncomeData]=useState([]);
  const[loading,setLoading]=useState(false);
  const[isDownloading,setIsDownloading]=useState(false);
  const[openDeleteAlert,setOpenDeleteAlert]=useState({
  show:false,
  data:null,

  });
  const[openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  const fetchIncomeDetails=async()=>{

    if(loading) return;
    setLoading(true);
    try{
      const response=await axiosInstance.get(`${API_PATHS.INCOME.GET_INCOME}`);
      if(response.data){
        setIncomeData(response.data);
      }
    }
      catch(error){
        console.log(error);
      }
      finally{  
        setLoading(false);
      }
    };
   

  

   const handleAddIncome=async(income)=>{

const{
  source,
  amount,
  date,
  icon}=income;

  if(!source.trim()){
    toast.error("Please enter source");
    return;
  }
if(!amount  || isNaN(amount) || Number(amount) <= 0){
  toast.error("Please enter valid amount");
  return;
}
if(!date){
  toast.error("Please enter date");
  return;
}

try{
  await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`,{
    source,
    amount,
    date,
    icon
  })
  setOpenAddIncomeModel(false);
  toast.success("Income added successfully");
  fetchIncomeDetails();
  
}
catch(error){
  console.log(error);
  toast.error("Failed to add income");
}

   }

   const deleteIncome=async(id)=>{

    console.log("Deleting income at:", `${API_PATHS.INCOME.DELETE_INCOME}/${id}`);
    console.log("Deleting ID:", id);  // ✅ check if undefined or wrong
  if (!id) {
    toast.error("No ID found");
    return;
  }

    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({
        show:false,
        data:null,
      });
      fetchIncomeDetails();
      toast.success("Income deleted successfully");
    }
    catch(error){
      console.log(error);
      toast.error("Failed to delete income");
    }
    
     }
  
   useEffect(()=>{
    fetchIncomeDetails();
    return ()=>{}
   },[]);

   const handleDownloadIncomeDetails=async()=>{
    setIsDownloading(true);
    try{
      const response=await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME_EXCEL,
        {
          responseType: "blob",
        }
        );
        const url=window.URL.createObjectURL(new Blob([response.data]));
        const link=document.createElement("a");
        link.href=url;
        link.setAttribute("download","income_details.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Income data downloaded successfully");
    }
    catch(error){
      console.log(error);
      if(error.response){
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to download income data");
      }
    } finally {
      setIsDownloading(false);
    }
   }

  return (
    <DashboardLayout activeMenu="Income">

    <div className="my-8 mx-auto bg-gradient-to-br from-white via-purple-50 to-fuchsia-100 rounded-2xl shadow-xl p-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-extrabold text-purple-700 mb-2 tracking-wide">Income Overview</h2>
          <p className="text-sm text-slate-700 font-medium">Track your earnings and celebrate every milestone!</p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition text-lg"
          onClick={() => setOpenAddIncomeModel(true)}
        >
          <LuPlus className="animate-bounce" /> Add Income
        </button>
      </div>
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold text-purple-600">Total Income</span>
            <span className="text-2xl font-bold text-fuchsia-700">₹{incomeData.reduce((sum, i) => sum + (i.amount || 0), 0).toLocaleString()}</span>
          </div>
          <span className="text-xs text-slate-500 italic">"Every rupee counts! Keep growing your income."</span>
        </div>
      </div>
      <IncomeOverview 
        transactions={incomeData}
        onAddIncome={() => setOpenAddIncomeModel(true)}
      />
      <IncomeList 
        transactions={incomeData}
        onDeleteIncome={(id) => {
          setOpenDeleteAlert({ show: true, data: id });
        }}
        onDownloadIncome={handleDownloadIncomeDetails}
        isDownloading={isDownloading}
      />
      <Modal 
        isOpen={openAddIncomeModel}
        onClose={() => setOpenAddIncomeModel(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>
      <Modal 
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert
          content="Are you sure you want to delete this income?"
          onDeleteIncome={() => deleteIncome(openDeleteAlert.data)}
        />
      </Modal>
    </div>
    </DashboardLayout>
  )
}

export default Income