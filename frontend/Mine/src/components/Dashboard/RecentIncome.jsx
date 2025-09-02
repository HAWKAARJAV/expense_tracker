import React from 'react'
import {LuArrowRight} from "react-icons/lu"
import moment from 'moment'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import { LuWalletMinimal } from "react-icons/lu";

const RecentIncome = ({transactions,onSeeMore}) => {
  const hasTransactions = transactions && transactions.length > 0;
  
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income</h5>

            <button className='card-btn' onClick={onSeeMore}>
                SeeAll<LuArrowRight className='text-base'/>
                </button>
        </div>

        <div className="mt-6">
            {hasTransactions ? (
                transactions.slice(0,5).map((income)=>(
                    <TransactionInfoCard 
                    key={income._id} 
                    title={income.source}
                    icon={income.icon}
                    date={moment(income.date).format("Do MMM YYYY")}
                    amount={income.amount}
                    type="income"
                    hideDeleteBtn
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <LuWalletMinimal className="text-4xl mb-2 text-gray-300" />
                    <p className="text-sm font-medium">No income yet</p>
                    <p className="text-xs text-gray-400 mt-1">Add your first income to start tracking</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default RecentIncome