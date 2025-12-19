import React from 'react'
import { useEffect, useState } from 'react'

import CustomBarChart from '../Charts/CustomBarChart'
import { prepareExpenseBarChartData } from '../../utils/helper'

const ExpenseOverview = ({ transactions }) => {
  const [charData, setCharData] = useState([])

  useEffect(() => {
    setCharData(prepareExpenseBarChartData(transactions))
    return () => {}
  }, [transactions])

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-xs uppercase tracking-[0.18em] text-slate-500'>Expenses</p>
          <h5 className='text-lg font-semibold text-slate-900'>Overview</h5>
          <p className='text-xs text-gray-500 mt-0.5'>Track where your money goes</p>
        </div>
      </div>
      <div className='mt-8'>
        <CustomBarChart data={charData} xAxisKey="month" />
      </div>
    </div>
  )
}

export default ExpenseOverview