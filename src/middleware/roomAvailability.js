const mongoose = require('mongoose')

const checkDayAvailability = function(date){
    console.log(date)
    if(date==='2019-01-01T02:00:00.000Z'){
        console.log("day was taken");
        return false;
    }else{
        console.log("day is free");
        return true;
    }
}

module.exports = checkDayAvailability;