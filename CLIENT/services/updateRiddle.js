import readline from 'readline-sync';
import fs, { read } from 'node:fs';
import { error } from 'node:console';



async function changeRiddle(riddleId){
    const propertieToChange = readline.question(`Which part of the riddle do you want to change?(name,difficulty,question,answer)`)
    const newVersion = readline.question("What is the version after the change?")
    
    
     
   
}







//  for(const riddle of riddleArray){             
//             if(riddle.id === riddleId){
//                 riddle[choice] = newVersion
//                 break
//             }
//         }