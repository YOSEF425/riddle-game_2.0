import { error } from 'node:console'
import fs from 'node:fs'


function showRiddles(){
    fs.readFile("../riddlesDB/riddleList.txt","utf-8",(error,data) =>{
        if(error){
            console.log("error reading")
        }
        console.log(data)
    })
}


d