const mongoose=require("mongoose");
const IncomeSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,ReferenceError:"User",required:true},
        icon:{
            type: String
        },
    source: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});
module.exports=mongoose.model("Income",IncomeSchema);