import express from "express"
import { connectToMongo } from "./MongoDB/db.js";
import client from "./MongoDB/db.js";


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
    console.log(`Recieved riddle: ${riddle}`)

    fs.readFile('./DATA/riddlesList.txt','utf-8',(error,data) => {
        if(error){
            return res.status(500).send("error reading from database")
        }
        let riddleArray = []
        try{
            riddleArray = JSON.parse(data);
        }catch(err){
            return res.status(500).send("couldnt parse data")
        }
        riddleArray.push(riddle)
        
        fs.writeFile('./DATA/riddlesList.txt',JSON.stringify(riddleArray,null,2),(error) => {
          if(error){
              return res.status(500).send("error sending riddle to database.")
          }
          res.send("added riddle to database!")

        })
    })
})

app.put('/api/riddles/:id',(req,res) => {
     const id = req.body.id;
     const propertie = req.body;
     const newVersion = req.body.propertieToChange;

     
    fs.readFile('./DATA/riddlesList.txt','utf-8',(error,data) => {
        if(error){
            res.status(500). res.send("error reading from database")
        }
        const riddleArray = JSON.parse(data)

        for(const riddle of riddleArray){
            if(riddle.id === id){
                riddle[propertie] = newVersion;
                break;
            }
        }
    
        fs.writeFile('./DATA/riddlesList.txt',JSON.stringify(riddleArray,null,2),(error) => {
          if(error){
              res.status(500). res.send("error sending riddle to database.")
          }
          res.send("added update riddle to database!")
        })


    })

})


await connectToMongo();
const db = client.db("myDatabase")
await db.createCollection("riddleCollection")


app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT}`)
})