import React from 'react'
import EmojiPicker from 'emoji-picker-react'
import{LuImage,LuX} from "react-icons/lu";
import { useState } from 'react'
const EmojiPickerPopup = ({icon,onSelect}) => {

    const[isOpen,setIsOpen]=useState(false);
  return (
    <div className='flex flex-col md:flex row itens-start gap-5 mb-6'>
        <div 
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
        >
            <div className=' w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg'>
            {icon? (
                <img src={icon} alt="" className='w-12 h-12' />
            ):(
                <LuImage/>
            )}
            </div>
            <p className=''>
                {icon ? "Change Icon" :"Select Icon" }

            </p>
        </div>

        {isOpen && (
            <div className='relative flex justify-center items-center'>
           <button className='w-9 h-9 flex items-center justify-center bg-white border-2 border-red-500 rounded-full absolute left-1/2 -translate-x-1/2 top-2 z-10 cursor-pointer hover:bg-red-50 group'
           onClick={() => setIsOpen(false)}
           >
            <LuX className='text-red-500 group-hover:text-red-700 text-xl'/>
           </button>
           <EmojiPicker
           open={isOpen}
           onEmojiClick={(emoji) => onSelect(emoji?.imageUrl||"")}
           /> 

            </div>
            )
}

    </div>
  )
}

export default EmojiPickerPopup