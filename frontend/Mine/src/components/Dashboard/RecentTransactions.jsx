import React from 'react'
import {LuArrowRight} from "react-icons/lu"
import moment from 'moment'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import { LuUtensils, LuBriefcase } from "react-icons/lu";

const iconMap = {
  Freelancing: <LuBriefcase className="text-green-500" />,
  Food: <LuUtensils className="text-red-500" />,
};
const RecentTransactions = ({transactions,onSeeMore}) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Recent Transactions</h5>
            <button className="card-btn"
            onClick={onSeeMore}>
            SeeAll<LuArrowRight className="text-base"/>
        </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0,5).map((item)=>(
                <TransactionInfoCard
                key={item.id || item._id || index}  
                title={item.type=='expense'? item.category:item.source}
                icon={iconMap[item.source] || item.icon}
                date={moment(item.date).format('Do MMM YYYY')}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
                />  
            ))}
        </div>
    </div>
  )
}

export default RecentTransactions