import readline from 'readline-sync';
import {Riddle} from '../classes/Riddle.js'
import fs from 'node:fs';


function createRiddle(){     // create riddle "object" , get all properties from user
    const riddleName = readline.question("What is the name of the riddle you want to add?")
    const difficulty = readline.question("What is the difficuly level?(easy, medium , hard)")
    const describe = readline.question("Describe the riddle.");
    const answer = readline.question("What is the answer to the riddle?")


    let myRiddle = new Riddle(difficulty,5,riddleName,describe,answer);
    fetch('http://loclahost:5000/api/riddles',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(myRiddle)
    })
}















// function sendRiddleToDB(riddle){     // function to send given riddle to db
//     fs.readFile("../riddlesDB/riddleList.txt","utf8",(error,data) => {
//         if(error){
//             console.error("Error reading file:",err)
//             return
//         }
//         const riddleArray = JSON.parse(data);    // get all riddles and make a js array of them
//         riddleArray.push(riddle);                // add riddle to array

//         fs.writeFile("../riddlesDB/riddleList.txt",JSON.stringify(riddleArray,null,2),"utf-8",(error) => { //send array back to txt file
//             if(error){
//                 console.error("error writing file")
//             }
//             else{
//                 console.log("object added successfully!")
//             }
//         })
       
//     })
// }

function sendRiddleToDB(riddle){     // function to send given riddle to db
    fs.readFile("../riddlesDB/riddleList.txt","utf8",(error,data) => {
        if(error){
            console.error("Error reading file:",err)
            return
        }
        const riddleArray = JSON.parse(data);    // get all riddles and make a js array of them
        riddleArray.push(riddle);                // add riddle to array

        fs.writeFile("../riddlesDB/riddleList.txt",JSON.stringify(riddleArray,null,2),"utf-8",(error) => { //send array back to txt file
            if(error){
                console.error("error writing file")
            }
            else{
                console.log("object added successfully!")
            }
        })
       
    })
}
