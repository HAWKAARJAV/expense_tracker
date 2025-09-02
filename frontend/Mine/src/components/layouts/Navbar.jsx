import React from 'react'
import{HiOutlineMenu,HiOutlineX} from"react-icons/hi";
import { useState } from 'react'
import SideMenu from './SideMenu'
const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
  <div className="flex gap-5 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-400 border-b border-purple-200 backdrop-blur-[2px] py-5 px-10 sticky top-0 z-30 shadow-lg">
  <button
  className="block lg:hidden text-white"
    onClick={() => {
        setOpenSideMenu(!openSideMenu)
    }}
    >   
    { openSideMenu ? (
    <HiOutlineX className="text-2xl"/>
    ):(
    <HiOutlineMenu className='text-2xl' />
    )
    }
    </button>
  <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-fuchsia-200 drop-shadow-lg tracking-widest">EXPENSE TRACKER</h1>
    {
      openSideMenu && (
        <div className="fixed top-[61px] left-0 bg-white border-r border-gray-200 shadow-lg z-40">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )
    }
    </div>
  )
    }
export default Navbar