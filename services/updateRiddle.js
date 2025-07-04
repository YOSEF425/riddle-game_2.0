import readline from 'readline-sync';
import fs, { read } from 'node:fs';

function riddlePartToChange(riddleId){
    const choice = readline.question(`Which part of the riddle do you want to change?(name,difficulty,question,answer)`)
    const newVersion = readline.question("What is the version after the change?")
}


function changeRiddle(){
    fs.readFile("../riddlesDB/riddleList.txt","utf8",(err,data) => {
        if(err){
            console.log("error reading file");
            return
        }
        const riddleArray = JSON.parse(data)


    })
}


