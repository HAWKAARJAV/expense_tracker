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
  const[openDeleteAlert,setOpenDeleteAlert]=useState({
  show:false,
  data:null,

  });
  const[openAddIncomeModel, setOpenAddIncomeModel] = useState(true);

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
    }
    catch(error){
      console.log(error);
      if(error.response){
        toast.error(error.response.data.message);
    }
    }
   }

  return (
    <DashboardLayout activateMenu="Income">

    <div className="my-5 mx-auto">
    <div className="grid grid-cols-1 gap-6">
    <div className="grid grid-cols-1 gap-6">
     <IncomeOverview 
          transactions={incomeData}
          onAddIncome={()=> setOpenAddIncomeModel(true)}
     />
    </div>

    <IncomeList 
     transactions={incomeData}
     onDeleteIncome={(id)=>{
     setOpenDeleteAlert({
      show:true,
      data:id,
    });
  }}
onDownloadIncome={handleDownloadIncomeDetails}
/>

    </div>
   <Modal 
   isOpen={openAddIncomeModel}
   onClose={() => setOpenAddIncomeModel(false)}
   title="Add Income"
   >
    <AddIncomeForm onAddIncome={handleAddIncome} />
   </Modal>

   <Modal 
      isOpen={openDeleteAlert.show}
      onClose={() => setOpenDeleteAlert({
        show:false,
        data:null,
      })}
      title="Delete Income"
      >
      <DeleteAlert
      content="Are you sure you want to delete this income?"
      onDeleteIncome={()=>deleteIncome(openDeleteAlert.data)}
      />
      </Modal>


    </div>
    </DashboardLayout>
  )
}

export default Income