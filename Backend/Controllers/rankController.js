const fs = require('fs');
const path = require('path');
const AppError = require('../Utils/AppError');

const databasePath = path.join(__dirname+'/../Database','TestData.json');

const getUserRank = (req,res)=>{
    // getting score from request body (frontend)
    const {userScore} = req.body;
    // reading database file then returning rank to the frontend
    fs.readFile(databasePath,(err,data)=>{
        if(err) return next(new AppError("error reading the database",404));
        const {scoresList} = JSON.parse(data);
        // initializing a counter
        let counter = 0;
        // condition to increase counter if condition is true
        scoresList.forEach(el=> el<userScore? counter++: null);
        // percentage of the scores
        let rank = (counter/scoresList.length)*100;
        // rounding the rank to the nearest hundredth
        rank = Math.round(rank*100)/100;
        // responding with the calculated rank
        res.status(200).json(rank);
    })
}

module.exports = {getUserRank};