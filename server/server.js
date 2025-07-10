import express from "express"
import fs from 'fs'


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


app.post('/api/riddles',(req,res) => {
    const riddle = req.body;
    fs.readFile('../riddlesDB/riddleList.txt','utf-8',(error,data) => {
        if(error){
            res.send("error reading from database")
        }
        const riddleArray = JSON.parse(data)
        riddleArray.push(riddle)
    })
    fs.writeFile('../riddlesDB/riddleList.txt',riddleArray,(error) => {
        if(error){
            res.send("error sending riddle to database.")
        }
        res.send("added riddle to database!")

    })
})












app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT}`)
})