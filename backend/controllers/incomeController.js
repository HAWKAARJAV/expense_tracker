const User=require("../models/User");
const Income=require("../models/Income");
const xlsx = require("xlsx");
exports.addIncome=async(req,res)=>{
    const userId=req.user.id;
    try{
        const {icon,source,amount,date}=req.body;
        if(!source || !amount || !date){
            return res.status(400).json({message:"Please enter all fields"});
        }
        const newIncome=new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        });
        await newIncome.save();
        res.status(201).json({message:"Income added successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
    
}
exports.getAllIncome=async(req,res)=>{
    const userId=req.user.id;
    try{
        const income=await Income.find({userId}).sort({date:-1});
        res.status(200).json(income);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
    
}
exports.deleteIncome=async(req,res)=>{
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Income deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    } 
}
exports.downloadIncomeExcel=async(req,res)=>{
    const userId=req.user.id;
    try{
        const income=await Income.find({userId}).sort({date:-1});
        const data=income.map((income)=>({
               
                Source:income.source,
                Amount:income.amount,
                Date:income.date,
            }
    ));
        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        xlsx.writeFile(wb,"Income.xlsx");
        res.download("Income.xlsx");
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
        
}