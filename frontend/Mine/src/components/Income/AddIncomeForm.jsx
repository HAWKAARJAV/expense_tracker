import React from 'react'
import { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'
const AddIncomeForm = ({onAddIncome}) => {

    const[income,setIncome]=useState({
  source: "",
  amount: "",
  date: "",
  icon: ""
    });
   const handleChange=(key,value)=>{
    setIncome({...income,[key]:value});
   }

  return (
     <div>
   <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon)=> handleChange("icon",selectedIcon)}
        />
      <Input 
      value={income.source} 
      onChange={(e)=>handleChange("source",e.target.value)} 
      placeholder="Freelance,Salary, etc."
      type="text" 
      label="Income Source" />
      
        <Input 
  value={income.amount}
  onChange={(e)=>handleChange("amount",e.target.value)} 
  placeholder="0"
  type="number" 
  label="Amount" />


    <Input 
      value={income.date}
      onChange={(e)=>handleChange("date",e.target.value)} 
      placeholder=""
      type="date" 
      label="Date" />
    
    <div className='flex justify-end mt-6'>
       <button 
       type="button"
       onClick={()=>onAddIncome(income)}
       className='btn-primary'
       >
        Submit Income</button>
    </div>

    </div>
  )
}
export default AddIncomeForm