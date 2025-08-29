import React from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'
import { useState } from 'react'  

const AddExpenseForm = ({onAddExpense}) => {
    const[income,setIncome]=useState({
        category:"",
        amount:0,
        date:"",
        icon:""
    })
    const handleChange=(key,value)=>{
        setIncome({...income,[key]:value});
       }
  return <div>
    <EmojiPickerPopup
    icon={income.icon}
    onSelect={(selectedIcon)=> handleChange("icon",selectedIcon)}/>
    
    <Input 
    value={income.category} 
    onChange={(e)=>handleChange("category",e.target.value)} 
    
    placeholder="Rent,groceries,etc"
    type="text" 
    label="Category" />


    <Input 
    value={income.amount}
    onChange={(e)=>handleChange("amount",e.target.value)} 
    placeholder=""
    type="number" 
    label="Amount" />


    <Input 
    value={income.date}
    onChange={(e)=>handleChange("date",e.target.value)} 
    placeholder=""
    type="date" 
    label="Date" />


    <div className='flex justify-end mt-6 '>
    <button 
    type="button"
    className="add-btn add-btn-fill"
     onClick={()=>onAddExpense(income)}>Add Expense</button>
    </div>
    </div>
  
}

export default AddExpenseForm