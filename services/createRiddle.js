import readline from 'readline-sync';
import {Riddle} from '../classes/Riddle.js'
import fs from 'node:fs';


function createRiddle(){
    const riddleName = readline.question("What is the name of the riddle you want to add?")
    const difficulty = readline.question("What is the difficuly level?(easy, medium , hard)")
    const describe = readline.question("Describe the riddle.");
    const answer = readline.question("What is the answer to the riddle?")

}

function sendRiddleToDB(riddle){
    fs.readFile("../riddlesDB/riddleList.txt","utf8",(err,data) => {
        if(err){
            console.log("Error reading file:",err)
            return
        }
        const riddleArray = JSON.parse(data);
        riddleArray.push(riddle);

        fs.writeFile("riddleList.txt",JSON.stringify(riddleArray,null,2),"utf-8",(err) => {
            if(err){
                console.error("error writing file")
            }
            else{
                console.log("object added successfully!")
            }
        })
       
    })
}

