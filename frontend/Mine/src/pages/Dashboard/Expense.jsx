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
  const[isDownloading,setIsDownloading]=useState(false);
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
          setIsDownloading(true);
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
              toast.success("Expense data downloaded successfully");
          }
          catch(error){
            console.log(error);
            if(error.response){
              toast.error(error.response.data.message);
            } else {
              toast.error("Failed to download expense data");
            }
          } finally {
            setIsDownloading(false);
          }
         }

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-8 mx-auto bg-gradient-to-br from-white via-purple-50 to-fuchsia-100 rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-extrabold text-purple-700 mb-2 tracking-wide">Expense Overview</h2>
            <p className="text-sm text-slate-700 font-medium">Track your spending and stay in control!</p>
          </div>
          <button
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition text-lg"
            onClick={() => setOpenAddExpenseModel(true)}
          >
            <span className="animate-bounce">💸</span> Add Expense
          </button>
        </div>
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-fuchsia-600">Total Expense</span>
              <span className="text-2xl font-bold text-purple-700">₹{expenseData.reduce((sum, e) => sum + (e.amount || 0), 0).toLocaleString()}</span>
            </div>
            <span className="text-xs text-slate-500 italic">"Smart spending leads to big savings!"</span>
          </div>
        </div>
        <ExpenseOverview 
          transactions={expenseData}
        />
        <ExpenseList
          transactions={expenseData}
          onDeleteIncome={(id) => {
            setOpenDeleteAlert({ show: true, data: id });
          }}
          onDownload={handleDownloadExpenseDetails}
          isDownloading={isDownloading}
        />
        <Modal 
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>
        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDeleteIncome={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense