import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
import { addThousandsSeparator } from '../../utils/helper'

const COLORS = ['#5b8def', '#22d3ee', '#fbbf24']

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    const balanceData = [
        { name: 'TotalBalance', amount: totalBalance },
        { name: 'TotalIncome', amount: totalIncome },
        { name: 'TotalExpense', amount: totalExpense },
    ]

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Overview</p>
                    <h5 className="text-lg font-semibold text-slate-900">Finance Snapshot</h5>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 border border-sky-100">
                    Live
                </span>
            </div>

            <div className="flex justify-center items-center py-6">
                <div className="w-full max-w-xs">
                    <CustomPieChart
                        data={balanceData}
                        label="Total Balance"
                        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
                        colors={COLORS}
                        showTextAnchor
                    />
                </div>
            </div>
        </div>
    )
}

export default FinanceOverview