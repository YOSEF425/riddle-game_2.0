import express from "express"
import { connectToMongo } from "./MongoDB/db.js";
import client from "./MongoDB/db.js";


const app = express();

const PORT = 5000;

app.use(express.json());


app.get('/api/riddles',async(req,res) => {
    try{
         const allDocs = await riddleCollection.find({}).toArray();
        res.send(allDocs)
    }catch(error){
        res.send(`Error reading for database: ${error}`)
    }

})


app.post('/api/riddles',async(req,res) => {
    const newDoc = req.body;
    console.log(`Recieved riddle: ${riddle}`)
    try{
       const result = await riddleCollection.insertOne(newDoc)
       res.send("added riddle to database!")

    }catch(error){
        res.send(`error uploading riddle to db ${error}`)
    }

})

app.put('/api/riddles/:id',async(req,res) => {

    try{
     const id = req.params.id;
     const propertieToChange = req.body;
     const newVersion = req.body.propertieToUpdate;

     const foundRiddle = { _id: new ObjectId(id) };

     const update = {
     $set: {
       propertieToChange: newVersion,
       },
    };
    const updatedRiddle = await collection.updateOne(foundRiddle, update);
    res.send('updated riddle!')
    }catch(error){
        res.send(`error updating riddle: ${error}`)
    }

     
     
    

    

})


await connectToMongo();
const db = client.db("myDatabase")
await db.createCollection("riddleCollection")


app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT}`)
})