import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apipaths';
import { useEffect } from 'react';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal  from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import DeleteAlert from '../../components/DeleteAlert';
import ExpenseList from '../../components/Expense/ExpenseList';
const Expense = () => {
  useUserAuth();

  const[expenseData,setExpenseData]=useState([]);
  const[loading,setLoading]=useState(false);
  const[openDeleteAlert,setOpenDeleteAlert]=useState({
  show:false,
  data:null,
   });

  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  const fetchExpenseDetails=async()=>{

    if(loading) return;
    setLoading(true);
    try{
      const response=await axiosInstance.get(`${API_PATHS.EXPENSE.GET_EXPENSE}`);
      if(response.data){
        setExpenseData(response.data);
      }
    }
      catch(error){
        console.log(error);
      }
      finally{  
        setLoading(false);
      }
    };


    const handleAddExpense=async(expense)=>{
      const{
        category,
        amount,
        date,
        icon}=expense;
      
        if(!category.trim()){
          toast.error("Please enter category");
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
        await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`,{
          category,
          amount,
          date,
          icon
        })
        setOpenAddExpenseModel(false);
        fetchExpenseDetails();
        toast.success("Expense added successfully");
      }
      catch(error){
        console.log(error);
        toast.error("Failed to add expense");
      }
      };

      useEffect(()=>{
        fetchExpenseDetails();
        return () => {}
      },[]);

    
      const deleteExpense=async(id)=>{

        try{
          await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
          setOpenDeleteAlert({
            show:false,
            data:null,
          });
          fetchExpenseDetails();
          toast.success("Expense deleted successfully");
        }
        catch(error){
          console.log(error);
          toast.error("Failed to delete expense");
        }
        
         }
         const handleDownloadExpenseDetails=async()=>{
          try{
            const response=await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE_EXCEL,
              {
                responseType: "blob",
              }
              );
              const url=window.URL.createObjectURL(new Blob([response.data]));
              const link=document.createElement("a");
              link.href=url;
              link.setAttribute("download","expense_details.xlsx");
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
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
      <div className="grid grid-cols-1 gap-6">
     <div className="">
      <ExpenseOverview 
          transactions={expenseData}
          onExpenseIncome={()=> setOpenAddExpenseModel(true)}
    />
    </div>

    <ExpenseList
     transactions={expenseData}
     onDeleteIncome={(id)=>{
      setOpenDeleteAlert({
        show:true,
        data:id,
      });
     }}
     onDownload={handleDownloadExpenseDetails}
     />

    </div>
    <Modal 
    isOpen={openAddExpenseModel}
     onClose={()=>setOpenAddExpenseModel(false)}
       title="Add Expense"
     >
     <AddExpenseForm
     onAddExpense={handleAddExpense}/>
     </Modal>


     <Modal 
      isOpen={openDeleteAlert.show}
      onClose={() => setOpenDeleteAlert({
        show:false,
        data:null,
      })}
      title="Delete Expense"
      >
      <DeleteAlert
      content="Are you sure you want to delete this expense?"
      onDeleteIncome={()=>deleteExpense(openDeleteAlert.data)}
      />
      </Modal>



      </div>
    </DashboardLayout>
  )
}

export default Expense