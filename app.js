import readline from 'readline-sync';
import { Player } from './classes/playerClass.js';  
import { Riddle } from './classes/riddleClass.js';


console.log("Welcome to the quiz!")
const name = readline.question("What is your name?");
const Player1 = new Player(name)
console.log(`Hello ${name}!\n\n\n`);



import allRiddles from './riddles/riddleCollection.js';
let totalTime = 0;
for(const riddle of allRiddles){
    let myRiddle = new Riddle(
        riddle
    );
    let time = myRiddle.ask();
    totalTime += time;
    Player1.times.push(time);
}
 

    

console.log(`Your total time is: ${totalTime}\nYour average time pe riddle is: ${totalTime/3} `)


