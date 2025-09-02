import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import moment from 'moment'
const IncomeList = ({transactions,onDeleteIncome,onDownloadIncome,isDownloading}) => {
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Income</h5>
            <button 
              className={`download-btn ₹{isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={onDownloadIncome}
              disabled={isDownloading}
            >
            <LuDownload className="text-base"/> 
            {isDownloading ? 'Downloading...' : 'Download Excel'}
            </button>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2">

        {
            transactions?.map((income)=>(
                <TransactionInfoCard 
                key={income._id} 
                title={income.source}
                icon={income.icon}
                date={moment(income.date).format("Do MMM YYYY")}
                amount={income.amount}
                type="income"
                onDeleteIncome={()=>onDeleteIncome(income._id)}
                />
            ))
        }
        </div>
    
    </div>
  )
}

export default IncomeList