import React, { useState, useEffect } from 'react'
import card from '../../assets/images/card.png'
import { LuTrendingUpDown } from 'react-icons/lu'
import { addThousandsSeparator } from '../../utils/helper';

const AuthLayout = ({ children }) => {
  const [randomValue, setRandomValue] = useState(Math.floor(Math.random() * 900000 + 100000));
  const [trend, setTrend] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomValue(Math.floor(Math.random() * 900000 + 100000));
      setTrend(Math.floor(Math.random() * 40) - 20);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Modern Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-stretch min-h-screen">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col justify-center px-6 py-10">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 drop-shadow-lg mb-4 tracking-widest">
              EXPENSE TRACKER
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {children}
          </div>
        </div>

        {/* Right Panel - Modernized */}
        <div className="hidden md:flex w-[45vw] bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 relative overflow-hidden items-center justify-center p-8">
          {/* Decorative Shapes */}
          <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl opacity-20 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 left-10 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl opacity-25 animate-bounce"></div>

          <div className="max-w-sm w-full space-y-8 z-20">
            {/* Stats Card */}
            <div className="bg-white/95 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl shadow-lg">
                  <LuTrendingUpDown className="text-2xl" />
                </div>
                <div className="flex-1">
                  <h6 className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Monthly Analytics
                  </h6>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">₹{addThousandsSeparator(randomValue)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {trend > 0 ? '+' : ''}{trend}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" style={{width: '75%'}}></div>
              </div>
            </div>

            {/* Credit Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-700 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl transform group-hover:scale-105 transition-all duration-300">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow-lg"></div>
                  <div className="text-right">
                    <div className="text-xs opacity-80 tracking-wider">EXPENSE</div>
                    <div className="text-sm font-bold tracking-widest">TRACKER</div>
                  </div>
                </div>
                <div className="text-xl font-mono tracking-wider mb-4">**** **** **** 1234</div>
                <div className="flex justify-between text-sm opacity-90">
                  <div>
                    <div className="text-xs opacity-70">VALID THRU</div>
                    <div className="font-semibold">12/28</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-70">CVV</div>
                    <div className="font-semibold">***</div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 rounded-full transform translate-x-10 -translate-y-10"></div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 text-center shadow-lg border border-white/30 hover:scale-105 transition-all duration-300">
                <div className="text-xl font-bold text-green-600 mb-1">+{trend > 0 ? trend : Math.abs(trend)}%</div>
                <div className="text-xs text-gray-600">This Month</div>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 text-center shadow-lg border border-white/30 hover:scale-105 transition-all duration-300">
                <div className="text-xl font-bold text-blue-600 mb-1">₹2.4L</div>
                <div className="text-xs text-gray-600">Total Saved</div>
              </div>
            </div>

            {/* Card Image */}
            {card && (
              <img 
                src={card}
                alt="Credit Card"
                className="w-48 mx-auto opacity-20 hover:opacity-40 transition-opacity duration-300"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout