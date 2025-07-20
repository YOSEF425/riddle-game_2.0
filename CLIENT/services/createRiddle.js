import readline from 'readline-sync';
import {Riddle} from '../classes/Riddle.js'
import fs from 'node:fs';


export async function createRiddle(){     // create riddle "object" , get all properties from user
    const riddleName = readline.question("What is the name of the riddle you want to add?")
    const difficulty = readline.question("What is the difficuly level?(easy, medium , hard)")
    const describe = readline.question("Describe the riddle!");
    const answer = readline.question("What is the answer to the riddle?")


    let myRiddle = new Riddle(difficulty,riddleName,describe,answer);

  
        const response = await fetch('http://localhost:5000/api/riddles',{
         method: 'POST',
         headers: {
             'Content-Type':'application/json'
         },
         body: JSON.stringify(myRiddle)
        })
        const result = await response.text()
        console.log(result)
        
    }

     






