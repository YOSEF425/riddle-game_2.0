import { error } from 'node:console'
import fs from 'node:fs'
import {Riddle} from '../classes/Riddle.js'



export async function readRiddles(){
    const result = await fetch('http://localhost:5000/api/riddles')
    console.log(await result.text())

    
}

export async function readRiddlesToPlay() {
  const result = await fetch('http://localhost:5000/api/riddles/play');
  const riddleArray = await result.json();

  console.log('======HERE ARE THE RIDDLES:========')
  riddleArray.forEach(riddle => {
    const newRiddle = new Riddle(riddle)

    newRiddle.ask();
  });
}
  