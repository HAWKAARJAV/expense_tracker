import React, { useContext, useMemo } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { useState } from 'react'
import SideMenu from './SideMenu'
import { UserContext } from '../../context/userContext'

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const { user } = useContext(UserContext)

  const initials = useMemo(() => {
    if (!user?.fullName) return ''
    return user.fullName
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }, [user])

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3 text-white">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
            onClick={() => setOpenSideMenu(!openSideMenu)}
            aria-label="Toggle navigation"
          >
            {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Track smarter</p>
            <h1 className="text-xl font-extrabold tracking-tight text-white">Expense Tracker</h1>
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="text-right">
            <p className="text-xs text-slate-200">{activeMenu || 'Dashboard'}</p>
            <p className="text-sm font-semibold text-white">{user?.fullName || 'Welcome'}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-bold text-white shadow-lg">
            {initials || 'ET'}
          </div>
        </div>
      </div>

      {openSideMenu && (
        <div className="fixed left-0 top-[64px] z-40 w-72 rounded-r-2xl border border-slate-200/70 bg-white/95 shadow-2xl">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </header>
  )
}

export default Navbar