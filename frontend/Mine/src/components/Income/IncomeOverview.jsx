import React, { useState, useEffect } from 'react'

import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'

const IncomeOverview = ({ transactions }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions)
    setChartData(result)
    return () => {}
  }, [transactions])

  return (
    <div className="card" >
      <div className="flex items-center justify-between">
        <div className="">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Income</p>
          <h5 className="text-lg font-semibold text-slate-900">Overview</h5>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor monthly inflows
          </p>
        </div>
      </div>
      <div className="mt-8">
        <CustomBarChart data={chartData}  xAxisKey="month" />
      </div>
    </div>
  )
}

export default IncomeOverview