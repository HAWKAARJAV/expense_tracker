import React from 'react'
import{
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer
} from "recharts"
import { FaChartBar } from "react-icons/fa";
import { addThousandsSeparator } from '../../utils/helper';

const CustomBarChart = ({data},xAxisKey) => {

    const getBarColor=(index)=>{
        return index%2===0?"#875cf5":"#cfbefb";
    }
    const CustomTooltip=({active,payload})=>{
        if(active && payload && payload.length){
            return(
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200">
                    <p className="text-xs font-semibold text-purple-600 mb-1"> {payload[0].payload.category} </p>
                    <p className='text-sm text-gray-600'>
                        Amount:<span className="text-sm font-medium text-gray-900 ">₹{addThousandsSeparator(payload[0].payload.amount)}</span>
                    </p>
                </div>
            )
        }
        return null;
    }

    const hasData = data && data.length > 0;

    if (!hasData) {
        return (
            <div className="bg-white mt-6 flex flex-col items-center justify-center h-[300px] text-gray-500">
                <FaChartBar className="text-6xl mb-4 text-gray-300" />
                <p className="text-lg font-medium">No data available</p>
                <p className="text-sm text-gray-400 mt-1">Add transactions to see the chart</p>
            </div>
        );
    }

  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke="none" />
                <XAxis dataKey={xAxisKey} tick={{fontSize:12, fill:"#555"}}
                />
                <YAxis tick={{fontSize:12, fill:"#555"}} stroke='none'/>
                <Tooltip content={CustomTooltip} />
                <Bar 
                dataKey="amount" 
                fill="#875cf5"
                radius={[10,10,0,0]}
                activeDot={{r:8, fill:"yellow"}}
                activeStyle={{fill:"green"}}
                >   
                {data.map((entry,index)=>(
                    <Cell key={index} fill={getBarColor(index)}/>
                ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart