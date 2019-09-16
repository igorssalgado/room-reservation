const mongoose = require('mongoose')

const checkDayAvailability = function(room){

    if(room.availability===true){
        console.log("day is free");
        return true;
    }else{
        console.log("day was taken");
        return false ;
    }
}



module.exports = checkDayAvailability;