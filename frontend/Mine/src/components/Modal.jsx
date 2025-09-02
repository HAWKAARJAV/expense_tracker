import React from 'react'

const Modal = ({children,isOpen,onClose,title}) => {

    if(!isOpen ) return null
  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-x-hidden overflow-y-auto bg-black/20 bg-opacity -50'>
    <div className='relative p-4 w-full max-w-2xl h-full'>

            <div className='relative bg-white rounded-lg shadow-sm'>
                
                <div className='flex items-start justify-between p-4 md:p-5 border-b rounded-t border-gray-600  border gray-200'>

                <h3 className='text-lg font-medium text-gray-900 dark-text-white'>
                    {title}
                </h3>

                <button type='button' 
                className='w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-full absolute right-4 top-4 z-10 cursor-pointer group transition-all duration-150 hover:bg-red-50 hover:border-red-300'
                onClick={onClose}
                >
                    <svg className="w-5 h-5 text-red-500 group-hover:text-red-700" 
                                                            aria-hidden="true" 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            fill="none" 
                                                            viewBox="0 0 14 14">
                                                            <path 
                                                            stroke="currentColor"
                                                             strokeLinecap="round"
                                                                strokeLinejoin="round" 
                                                                strokeWidth="2" 
                                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                                className="transition-all duration-150 group-hover:stroke-red-700"/>
                                                                </svg>
            </button>
        </div>
    <div className=' p-4 md:p-5 space-y-4'>
        {children}
    </div>
    </div>
    </div>
    </div>
  )
}

export default Modal