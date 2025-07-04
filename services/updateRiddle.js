import readline from 'readline-sync';
import fs, { read } from 'node:fs';



function changeRiddle(riddleId){
    const choice = readline.question(`Which part of the riddle do you want to change?(name,difficulty,question,answer)`)
    const newVersion = readline.question("What is the version after the change?")

    fs.readFile("../riddlesDB/riddleList.txt","utf8",(err,data) => {
        if(err){
            console.log("error reading file");
            return
        }
        const riddleArray = JSON.parse(data)

        for(const riddle of riddleArray){
            if(riddle.id === riddleId){
                riddle[choice] = newVersion
                break
            }
        }
        const jsonString = JSON.stringify(riddleArray,null,2)
        fs.writeFile("../riddlesDB/riddleList.txt",jsonString,(err) => {
            if(err){
                console.log("error writing to file")
            }
            else{
                console.log("file saved successfully!")
            }
        })

    })
}

