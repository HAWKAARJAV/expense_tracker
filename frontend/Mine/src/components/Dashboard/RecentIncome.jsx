import React from 'react'
import { LuArrowRight } from "react-icons/lu"
import moment from 'moment'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import { LuWalletMinimal } from "react-icons/lu";

const RecentIncome = ({transactions,onSeeMore}) => {
  const hasTransactions = transactions && transactions.length > 0;
  
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Recent</p>
                    <h5 className='text-lg font-semibold text-slate-900'>Income</h5>
                </div>

                <button
                    className='flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700 transition hover:-translate-y-[1px] hover:bg-sky-100'
                    onClick={onSeeMore}
                >
                    See all <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className="mt-6">
                {hasTransactions ? (
                    transactions.slice(0, 5).map((income) => (
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
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-8 text-gray-500 bg-white/60">
                        <LuWalletMinimal className="mb-2 text-4xl text-slate-300" />
                        <p className="text-sm font-medium">No income yet</p>
                        <p className="mt-1 text-xs text-gray-400">Add your first income to start tracking</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecentIncome