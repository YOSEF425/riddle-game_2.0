const express = require('express')
const fs = require('fs');

const app = express();

const PORT = 5000;

app.use(express.json());


app.get('/api/riddles',(req,res) => {
    fs.readFile('../riddlesDB/riddleList.txt','utf-8',(error,data) => {
        if(error){
            console.error(`error reading data: ${error}`)
        }
        res.send(data)
    })
})


// app.post('/api/riddles',(req,res) => {
//     const riddle = req.body

// })










app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT}`)
})