const mongoose = require('mongoose')

const checkDayAvailability = function(date){
    console.log(date)
    if(date!=='ok'){
        console.log("day was taken");
        return false;
    }else{
        console.log("day is free");
        return true;
    }
}



module.exports = checkDayAvailability;