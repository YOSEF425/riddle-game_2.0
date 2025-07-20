import readline from 'readline-sync';
import { Player } from './classes/Player.js';
import { Riddle } from './classes/Riddle.js';
import {createRiddle} from './services/createRiddle.js'
import {readRiddles,readRiddlesToPlay} from './services/readRiddles.js'
import {updateRiddle} from './services/updateRiddle.js'
import { deleteRiddle } from './services/deleteRiddle.js';


console.log("Welcome to the quiz!")
const name = readline.question("What is your name?");
const myPlayer = new Player(name)
console.log(`Hello ${name}!\n\n\n`);


const choice = readline.question(`What do you want to do?\n1. Play the game\n2. Create a new riddle\n3. Read all riddles\n4. Update an existing riddle\n5. Delete a riddle\n6. View leaderboard`); 


     switch(choice){

        case("1"):
         readRiddlesToPlay()
          break;

        case("2"):
           createRiddle();
           break;

         case("3"):
           readRiddles()
           break;

         case("4"):
           updateRiddle()
           break; 
           
         case("5"):
          deleteRiddle();

         case("6"):







     }
    









































     
// let totalTime = 0;

// for (let riddle of chosenLevel) {
//     let myRiddle = new Riddle(
//         riddle.difficulty,
//         riddle.id,
//         riddle.name,
//         riddle.taskDescription,
//         riddle.correctAnswer
//     );
//     let time = myRiddle.ask();
//     totalTime += time;
//     myPlayer.times.push(time);
// }

// console.log(`Your total time is: ${totalTime} seconds.\nYour average time per riddle is: ${totalTime / chosenLevel.length} seconds. `)

// console.log("hello");

