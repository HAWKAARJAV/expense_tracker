import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apipaths'
import { useEffect } from 'react'
import InfoCard from '../../components/cards/InfoCard'
import { IoMdCard } from 'react-icons/io'
import { addThousandsSeparator } from '../../utils/helper'
import {LuHandCoins, LuWalletMinimal} from "react-icons/lu"
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions'
import RecentIncome from '../../components/Dashboard/RecentIncome'
const Home = () => {
  useUserAuth();
   
  const navigate=useNavigate();
  const [dashboardData,setdashboardData]=useState();
  
  const[loading,setLoading]=useState(false);

  const fetchDashboardData=async()=>{
    if(loading) return;
    setLoading(true);
    try{
      const res=await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if(res.data){
        setdashboardData(res.data);
      }
    }
    catch(error){
      console.log(error); 
    }
    finally{
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Debug: Log dashboard data before rendering
  console.log('dashboardData', dashboardData);
  

  return (
 <DashboardLayout activeMenu="Dashboard">
  <div className="my-8 mx-auto bg-gradient-to-br from-white via-purple-50 to-fuchsia-100 rounded-2xl shadow-xl p-8">

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <InfoCard
     icon={<LuWalletMinimal size={28} />}
   label="Total Balance"
  value={Number(dashboardData?.totalBalance ?? 0)}
   color="bg-purple-600"
      />

  <InfoCard
   icon={<LuWalletMinimal/>}
   label="Total Income"
  value={Number(dashboardData?.totalIncome ?? 0)}
   color="bg-orange-500"
      />

      <InfoCard
  icon={<LuHandCoins/>}
  label="Total Expense"
  value={Number(dashboardData?.totalExpense ?? 0)} 
  color="bg-red-500"
      />
      </div>

  <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
      <RecentTransactions
      transactions={dashboardData?.recentTransactions}
      onSeeMore={()=>navigate("/expense")}
      />
      
      <FinanceOverview
      totalBalance={dashboardData?.totalBalance || 0}
      totalIncome={dashboardData?.totalIncome   || 0}
      totalExpense={dashboardData?.totalExpense || 0}                 
      />

      <ExpenseTransactions
        transactions={dashboardData?.last30DaysExpenses?.transactions|| []}
      onSeeMore={()=>navigate("/expense")}
      />

      <Last30DaysExpenses
      data={dashboardData?.last30DaysExpenses?.transactions || []}
      />
      
      <RecentIncomeWithChart
        data={dashboardData?.allIncome?.transactions?.slice(0,4) || []}
        totalIncome={dashboardData?.allIncome?.total || 0}
      />

      <RecentIncome
        transactions={dashboardData?.allIncome?.transactions || []}
        onSeeMore={()=>navigate("/income")}
      />
      
      </div>
  </div>
 </DashboardLayout>
  )
}

export default Home