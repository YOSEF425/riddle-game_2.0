import readline from 'readline-sync';
import { error } from 'node:console';



export async function updateRiddle(riddleId){

    const propertieToUpdate = readline.question(`Which part of the riddle do you want to change?(name,difficulty,question,answer)`)
    const newVersion = readline.question("What is the version after the change?")

    const response = await fetch(`http://localhost:5000/api/riddles/${riddleId}`,{
        method : 'PUT',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify({propertieToUpdate : propertieToUpdate, newVersion : newVersion})
        
    })
    const result = await response.text();
    console.log('Server responded:', result);


}


    




    

     
   







