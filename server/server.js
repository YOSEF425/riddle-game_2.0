import express from "express"
import { connectToMongo } from "./MongoDB/db.js";
import client from "./MongoDB/db.js";
import { ObjectId } from "mongodb";


const app = express();

const PORT = 5000;

app.use(express.json());


await connectToMongo();
const collection = client.db("myDatabase").collection("riddleCollection")

app.get('/api/riddles',async(req,res) => {
    try{
         const allDocs = await collection.find({}).toArray();
        res.send(allDocs)
    }catch(error){
        res.status(404).send(`Error reading from database: ${error}`)
    }

})

app.get('/api/riddles/play',async(req,res) => {
    try{
        const allDocs = await collection.find({}).toArray();
        res.send(allDocs)
    }catch(error){
        res.status(404).send(`Error reading from database: ${error}`)
    }
})

app.post('/api/riddles',async(req,res) => {
    const newDoc = req.body;
    try{
       const result = await collection.insertOne(newDoc)
       res.send("added riddle to database!")
       res.end();

    }catch(error){
        res.send(`error uploading riddle to db: ${error}`)
    }

})

app.put('/api/riddles/:id',async(req,res) => {

    try{
     const id = req.params.id;
     const propertieToChange = req.body.propertieToUpdate;
     const newVersion = req.body.newVersion;

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

app.delete('api/riddle/:id', async(req,res) => {
   

     const idToDelete = req.params.id;
     const result = await collection.deleteOne({id : new ObjectId(idToDelete)})
     if(result.deleteCount === 1){
        res.send("Documant deleted successfully!")
     }
     else{
        res.send("No documant with that id.")
     }
})





app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT}`)
})