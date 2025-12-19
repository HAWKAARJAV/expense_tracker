import React from 'react'
import { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysExpenses = ({ data }) => {
  const [charData, setCharData] = useState([])

  useEffect(() => {
    const result = prepareExpenseBarChartData(data)
    setCharData(result)
    return () => {}
  }, [data])

  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between'>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Spending</p>
          <h5 className='text-lg font-semibold text-slate-900'>Last 30 days</h5>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-100">
          Trend
        </span>
      </div>
      <div className="mt-6">
        <CustomBarChart data={charData} xAxisKey="category" />
      </div>
    </div>
  )
}

export default Last30DaysExpenses