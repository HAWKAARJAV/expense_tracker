import React from 'react'
import {LuArrowRight} from "react-icons/lu"
import moment from 'moment'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import { LuUtensils, LuBriefcase, LuFileText } from "react-icons/lu";

const iconMap = {
  Freelancing: <LuBriefcase className="text-green-500" />,
  Food: <LuUtensils className="text-red-500" />,
};
const RecentTransactions = ({transactions,onSeeMore}) => {
  const hasTransactions = transactions && transactions.length > 0;
  
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
            {hasTransactions ? (
                transactions.slice(0,5).map((item, index)=>(
                    <TransactionInfoCard
                    key={item.id || item._id || index}  
                    title={item.type=='expense'? item.category:item.source}
                    icon={iconMap[item.source] || item.icon}
                    date={moment(item.date).format('Do MMM YYYY')}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn
                    />  
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <LuFileText className="text-4xl mb-2 text-gray-300" />
                    <p className="text-sm font-medium">No transactions yet</p>
                    <p className="text-xs text-gray-400 mt-1">Start adding income and expenses to see them here</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default RecentTransactions