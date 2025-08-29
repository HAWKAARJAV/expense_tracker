export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const getInitials=(name)=>{
    if(!name){
     return "";
    }
    const names=name.split(" ");
    let initials="";
    for(let i=0;i<Math.min(names.length,2);i++){
     initials+=names[i].charAt(0);
    }
    return initials.toUpperCase();
 }

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) {
        return "";
    }
    const [integerPart, decimalPart] = num.toString().split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}
export const prepareExpenseBarChartData=(data)=>{
    const charData=data.map((item)=>({
        category:item?.category,
        amount:item.amount
    }));
    return charData;

}

import moment from "moment";

export const prepareIncomeBarChartData = (data=[]) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        source: item?.source
    }));

    return chartData;
};
export const prepareExpenseLineChartData=(data=[])=>{

    const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));
    const chartData=sortedData.map((item)=>({
        month:moment(item?.date).format("Do MMM"),
        amount:item?.amount,
        category:item?.category
    }));
    return chartData;
}