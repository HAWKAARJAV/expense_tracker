import React from 'react'

const DeleteAlert = ({content,onDeleteIncome}) => {
  return (
    <div>
    <p className='text-sm'>{content}</p>
    <div className='flex justify-end mt-6'>
    <button
    type="button"
    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
    onClick={onDeleteIncome}
  >
    Delete
  </button>
</div>

    </div>
  )
}

export default DeleteAlert