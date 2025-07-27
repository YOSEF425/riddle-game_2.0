import readline from 'readline-sync';
import { Player } from './classes/Player.js';
import { Riddle } from './classes/Riddle.js';
import {createRiddle} from './services/createRiddle.js'
import {readRiddles,readRiddlesToPlay} from './services/readRiddles.js'
import {updateRiddle} from './services/updateRiddle.js'
import { deleteRiddle } from './services/deleteRiddle.js';
import { createClient } from '@supabase/supabase-js';
import { createPerson } from './services/createPerson.js';
import { updateTotalTime } from './services/updatePlayerTime.js';
import {findPlayer} from './services/findPlayer.js'
import {addToLB} from './services/addToLeaderboard.js'
import {displayLB} from './services/displayLeaderboard.js'



console.log("Welcome to the quiz!")

const newOrNot = readline.question('Are you New here?')
if(newOrNot === "yes"){
  const join = readline.question('Do you want to register?')
  if(join === "no"){
    console.log('If you dont want to register, the only thing you can do is just play the game :(')
    await readRiddlesToPlay()
    process.exit();
  }
  else{
    await createPerson();
  }
}
else{ // user claims he's already registered
  findPlayer();
}






const choice = readline.question(`What do you want to do?\n1. Play the game\n2. Create a new riddle\n3. Read all riddles\n4. Update an existing riddle\n5. Delete a riddle\n6. View leaderboard`); 


     switch(choice){

        case("1"):
        const myName = readline.question("What is your name?")
        console.log(`Hello ${myName}!!`)
        const time = readRiddlesToPlay();
        addToLeaderboard(myName,time)
        


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
          displayLeaderboard();

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

