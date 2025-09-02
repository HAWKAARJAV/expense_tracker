import React from 'react'
import { LuDownload } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const ExpenseList = ({transactions,onDeleteIncome,onDownload,isDownloading}) => {
  return (
    <div className="card ">
  <div className="flex items-center justify-between">
    <h5 className="text-lg">All Expenses</h5>
    <button 
  className={`download-btn ₹{isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`} 
      onClick={onDownload}
      disabled={isDownloading}
    >
    <LuDownload className="text-base"/> 
    {isDownloading ? 'Downloading...' : 'Download Excel'}
    </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2">
    {
        transactions?.map((expense)=>(
            <TransactionInfoCard key={expense._id} 
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDeleteIncome={() => onDeleteIncome(expense._id)}
            />
        ))
    }
    </div>
    </div>
  )
}

export default ExpenseList