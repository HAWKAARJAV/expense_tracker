import React, { use } from 'react'
import{LuPlus} from "react-icons/lu"
import { useEffect, useState } from 'react'

import CustomBarChart from '../Charts/CustomBarChart'
import { prepareExpenseBarChartData } from '../../utils/helper'
const ExpenseOverview = ({transactions,onExpenseIncome}) => {
    const[charData,setCharData]=useState([]);

    useEffect(() => {
        setCharData(prepareExpenseBarChartData(transactions));
    return () => {
        
    }  
    }, [transactions]);
  return (
    <div className='card'>
         <div className='flex items-center justify-between'>
            <div className=''>
            <h5 className='text-lg'>Expense Overview</h5>
            <p className='text-xs text-gray-500 mt-0.5'>
            Track your income and expenses
            </p>
         </div>

            </div>
            <div className='mt-10'>
                <CustomBarChart data={charData} xAxisKey="month" />
                </div>
                </div>

         
   
  )
}

export default ExpenseOverview