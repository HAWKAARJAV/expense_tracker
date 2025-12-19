import React from 'react'
import {LuArrowRight} from "react-icons/lu"
import moment from 'moment'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import { LuHandCoins } from "react-icons/lu";

const ExpenseTransactions = ({transactions,onSeeMore}) => {
  const hasTransactions = transactions && transactions.length > 0;
  
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Expense Transactions</h5>
            <button className="card-btn"
            onClick={onSeeMore}>
            SeeAll<LuArrowRight className="text-base"/>
        </button>
        </div>
      <div className="mt-6">
        {hasTransactions ? (
            transactions.slice(0,5).map((expense)=>(
                <TransactionInfoCard 
                key={expense._id} 
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("DD-MM-YYYY")}
                amount={expense.amount}
                type="expense"
                hideDeleteBtn
                />
            ))
        ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <LuHandCoins className="text-4xl mb-2 text-gray-300" />
                <p className="text-sm font-medium">No expenses yet</p>
                <p className="text-xs text-gray-400 mt-1">Add your first expense to start tracking</p>
            </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseTransactions