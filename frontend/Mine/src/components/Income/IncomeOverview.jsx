import React, { useState, useEffect } from 'react'

import{LuPlus} from "react-icons/lu"
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'
const IncomeOverview = ({transactions,onAddIncome}) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result=prepareIncomeBarChartData(transactions);
        setChartData(result);
        return () => {
            
        }
    }, [transactions]);


  return (
    <div className="card" >
        <div className="flex items-center justify-between">
            <div className="">
            <h5 className="text-lg">Income Overview</h5>    
            <p className="text-xs text-gray-500 mt-0.5">
            Track your income and expenses
            </p>
            </div>
               </div>
        <div className="mt-10">
            <CustomBarChart data={chartData}  xAxisKey="month" />
        </div>
    </div>
  )
}

export default IncomeOverview