import readline from 'readline-sync';
import { Player } from './classes/playerClass.js';  
import { Riddle } from './classes/riddleClass.js';
import {easy,medium,hard} from './riddles/riddleCollection.js'


console.log("Welcome to the quiz!")
const name = readline.question("What is your name?");
const Player1 = new Player(name)
console.log(`Hello ${name}!\n\n\n`);
const level = readline.question("Choose difficulty: easy / medium / hard");

let chosenLevel = [];
switch(level){

    case("easy"):
       chosenLevel.push(...easy);
       break;
    
    case("medium"):
        chosenLevel.push(...medium);
        break;

    case("hard"):
       chosenLevel.push(...hard);
       break;
}
    
let totalTime = 0;
for(let riddle of chosenLevel){
    let myRiddle = new Riddle(
        riddle.difficulty,
        riddle.id,
        riddle.name,
        riddle.taskDescription,
        riddle.correctAnswer
    );
    let time = myRiddle.ask();
    totalTime += time;
    Player1.times.push(time);
}
 

    

console.log(`Your total time is: ${totalTime} seconds.\nYour average time per riddle is: ${totalTime/chosenLevel.length} seconds. `)


