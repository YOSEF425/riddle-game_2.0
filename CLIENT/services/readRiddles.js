import { error } from 'node:console'
import fs from 'node:fs'
import {Riddle} from '../classes/Riddle.js'



export async function readRiddles(){ // function to just show the riddles
    const result = await fetch('http://localhost:5000/api/riddles')
    console.log(await result.text())

    
}

export async function readRiddlesToPlay() {  // function to show riddles to play
  const result = await fetch('http://localhost:5000/api/riddles/play');
  const riddleArray = await result.json();

  console.log('________HERE ARE THE RIDDLES_______');
  let totalTime = 0;

  riddleArray.forEach(riddle => {
    const newRiddle = new Riddle(riddle);
    const timeSpent = newRiddle.ask(); 
    totalTime += timeSpent;
  });

  console.log('Total time for all riddles:', totalTime);
}

  