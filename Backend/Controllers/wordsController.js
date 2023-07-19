const fs = require('fs');
const path = require('path');
const AppError = require('../Utils/AppError');

const databasePath = path.join(__dirname+'/../Database','TestData.json');

const getRandomWords = (req,res,next)=>{
    // reading database file then returning shuffledList to the frontend
    fs.readFile(databasePath,(err,data)=>{
        if(err) return next(new AppError("error reading the database",404));
        const {wordList} = JSON.parse(data);
        // shuffling function to shuffle wordList and checking that it has at least 1*(verb+noun+adv+adj)
        const shufflingFunc = ()=> {
        // initializing pos counter variables
            let adj = 0;
            let noun = 0;
            let adv = 0;
            let verb = 0;
        // shuffling using array.sort (if -ve shift to left if 0 remains in place if +ve shift to right)
            wordList.sort(()=>Math.random()-0.5);
        // slicing the array to get only 10 words in the array
            const shuffledList = wordList.slice(0,10);
        // increasing the counters by one for every pos
            shuffledList.forEach((word)=> {
                word.pos == "adverb"? adv++:
                word.pos == "noun"? noun++:
                word.pos == "adjective"? adj++:
                word.pos == "verb"? verb++: null
            })
        // condition checking if the array contains at least 1*(verb+noun+adv+adj)
            // if not it will repeat the function again (recursion)
            if(adj==0 || adv==0 || noun==0 || verb==0){
                // recursion
                shufflingFunc()
            }
            else{
                // responding to the request with the shuffledList containing at least 1*(verb+noun+adv+adj)
                res.status(200).json(shuffledList)
            }
        }
    // calling the function to execute the logic
        shufflingFunc();
    })
}

module.exports = {getRandomWords};