import { error } from 'node:console'
import fs from 'node:fs'


export function readRiddles(){
    fetch('http://localhost:5000/api/riddles')
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
    })
}


