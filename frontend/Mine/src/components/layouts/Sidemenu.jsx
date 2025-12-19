import React from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'
import CharAvatar from '../cards/CharAvatar'
import { useState } from 'react'

const SideMenu = ({ activeMenu }) => {
  const { user, clearuser } = useContext(UserContext)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const navigate = useNavigate()

  const handleClick = (route) => {
    if (route === 'logout') {
      setShowLogoutModal(true)
      return
    }
    navigate(route)
  }

  const handleLogout = () => {
    localStorage.clear()
    clearuser()
    navigate('/login')
    setShowLogoutModal(false)
  }

  return (
    <div className="h-[calc(100vh-64px)] w-72 rounded-r-3xl border border-slate-200/70 bg-white/90 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-lg sticky top-[64px]">
      <div className="mb-6 flex flex-col items-center justify-center gap-3">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ''}
            alt="Profile pic"
            className="h-20 w-20 rounded-full border border-white/70 object-cover shadow-lg"
          />
        ) : (
          <CharAvatar fullName={user?.fullName} width="w-20" height="h-20" style="text-xl" />
        )}

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">{user?.fullName || ''}</p>
          <p className="text-xs text-slate-500">{user?.email || ''}</p>
        </div>
      </div>

      {SIDE_MENU_DATA.map((item, index) => {
        const isActive = activeMenu === item.label || (item.label === 'Logout' && showLogoutModal)
        return (
          <button
            key={`menu_${index}`}
            className={`relative mb-3 flex w-full items-center gap-5 rounded-xl border px-6 py-3 text-[15px] font-semibold transition-all duration-200
              ${isActive
                ? 'border-sky-200 bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20'
                : 'border-slate-200/70 bg-white/70 text-slate-700 hover:-translate-y-[1px] hover:border-sky-200 hover:bg-sky-50'}
            `}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className={`text-xl ${isActive ? 'text-white' : 'text-sky-600'}`} />
            {item.label}
            {isActive && <span className="absolute left-2 h-8 w-1 rounded-full bg-white/80" />}
          </button>
        )
      })}

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/30 px-4 pt-16 backdrop-blur-sm">
          <div className="w-full max-w-md animate-fadeIn rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="mb-1 text-base font-bold text-slate-900">Log out?</h3>
            <p className="mb-4 text-sm text-slate-600">You will need to sign in again to access your dashboard.</p>
            <div className="flex gap-3">
              <button
                className="rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-105"
                onClick={handleLogout}
              >
                Yes, log out
              </button>
              <button
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={() => setShowLogoutModal(false)}
              >
                Stay
              </button>
            </div>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fadeIn { animation: fadeIn 0.2s ease; }
          `}</style>
        </div>
      )}
    </div>
  )
}

export default SideMenu