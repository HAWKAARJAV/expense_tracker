import React from 'react'
import{
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip

} from "recharts"
import CustomTooltip  from './CustomTooltip';
import CustomLegend  from './CustomLegend';
const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie data={data} 
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={130}
            labelLine={false}
            
            >
                {
                    data.map((entry,index)=>
                    (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                    )
                    )
                }
            </Pie>
            <Tooltip content ={CustomTooltip}/>
            <Legend content ={CustomLegend}/>
            {showTextAnchor && (
  <>
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dy={-25}
      fill="#666"
      fontSize="14px"
    >
      {label}
    </text>
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dy={8}
      fill="#333"
      fontSize="24px"
      fontWeight="600"   
    >
      {totalAmount}
    </text>
  </>
)}
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart