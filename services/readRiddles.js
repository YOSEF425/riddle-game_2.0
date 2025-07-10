import { error } from 'node:console'
import fs from 'node:fs'


function showRiddles(){
    fetch('http://localhost:5000/api/riddles')
    .then(Response => Response.json())
    .then(data => {
    fs.readFile("../riddlesDB/riddleList.txt","utf-8",(error,data) =>{
        if(error){
            console.log("error reading")
        }
        console.log(data)
    })
}
