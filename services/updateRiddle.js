import readline from 'readline-sync';
import fs, { read } from 'node:fs';
import { error } from 'node:console';



function changeRiddle(riddleId){
    const choice = readline.question(`Which part of the riddle do you want to change?(name,difficulty,question,answer)`)
    const newVersion = readline.question("What is the version after the change?")

    fs.readFile("../riddlesDB/riddleList.txt","utf8",(err,data) => {   // read from the db
        if(err){
            console.error("error reading file",error);
            return
        }
        const riddleArray = JSON.parse(data)          // creating an array with js objects 

        for(const riddle of riddleArray){             
            if(riddle.id === riddleId){
                riddle[choice] = newVersion
                break
            }
        }
        const jsonString = JSON.stringify(riddleArray,null,2)
        fs.writeFile("../riddlesDB/riddleList.txt",jsonString,(err) => {
            if(err){
                console.error("error writing to file: ",err)
            }
            else{
                console.log("file saved successfully!")
            }
        })

    })
}

