import React from 'react'
import{XAxis,YAxis,LineChart,Line,ResponsiveContainer,CartesianGrid,Area,AreaChart,Tooltip} from 'recharts'
import { LuTrendingUp } from "react-icons/lu";

const CustomLineChart = ({data}) => {

const CustomTooltip=({active,payload})=>{
    if(active && payload && payload.length){
        return(
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className="text-xs font-semibold text-purple-800 mb-1"> {payload[0].payload.category} </p>
                <p className='text-sm text-gray-600'>
                    Amount:<span className="text-sm font-medium text-gray-900">₹{require('../../utils/helper').addThousandsSeparator(payload[0].payload.amount)}</span>
                </p>
            </div>
        )
    }
    return null;
}

const hasData = data && data.length > 0;

if (!hasData) {
    return (
        <div className="bg-white flex flex-col items-center justify-center h-[300px] text-gray-500">
            <LuTrendingUp className="text-6xl mb-4 text-gray-300" />
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm text-gray-400 mt-1">Add transactions to see the chart</p>
        </div>
    );
}

  return (
    <div className='bg-white'>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} >
            <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#875cf5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#875cf5" stopOpacity={0}/>
                </linearGradient>
                </defs>
                <CartesianGrid stroke="none" />
                <XAxis dataKey="month" tick={{fontSize:12, fill:"#555"}} stroke='none'
                />
                <YAxis tick={{fontSize:12, fill:"#555"}} stroke='none'/>
                <Tooltip content={CustomTooltip} />
                <Area type="monotone" dataKey="amount" stroke="#875cf5" fill="url(#incomeGradient)"strokeWidth={3} dot={{r:3, fill:'#ab8df8'}}/>
            
            </AreaChart>
            </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart