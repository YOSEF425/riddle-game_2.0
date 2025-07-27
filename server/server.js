import express from "express"
import { connectToMongo } from "./MongoDB/db.js";
import client from "./MongoDB/db.js";
import { ObjectId } from "mongodb";
import { supabaseClient }  from "./supabaseDB/db.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken'


const app = express();

const PORT = 5000;

app.use(express.json());


// app.get('/names',logger,(req,res) => {
//     res.send("hi from server!")
// })

// function logger(req,res,next){
//     console.log("hi from function")
//     next()
// }

function getRole(req,res,next){
    const role = req.body.token
    if(!role){
        res.send('You are not registered in the system!')
    }
    
}

await connectToMongo();    
const collection = client.db("myDatabase").collection("riddleCollection") // creating my collection in db.



app.get('/api/riddles',async(req,res) => {   // Show user all riddles.(not for playing, just show)

    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(decoded.role === "guest" || decoded.role === "Guest"){
        res.status(403).send('Access denied: this data is not visible to your role');
    }
    try{
         const allDocs = await collection.find({}).toArray();
        res.send(allDocs)
    }catch(error){
        res.status(404).send(`Error reading from database: ${error}`)
    }

})

app.get('/api/riddles/play',async(req,res) => {  // Show riddles one by one for player to play!
    try{
        const allDocs = await collection.find({}).toArray();
        res.send(allDocs)
    }catch(error){
        res.status(404).send(`Error reading from database: ${error}`)
    }
})

app.post('/api/riddles',async(req,res) => {    // endpoint for user to add a riddle.
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(decoded.role === "guest" || decoded.role === "Guest"){
        res.status(403).send('admin or users only!')
    }

    const newDoc = req.body;
    try{
       await collection.insertOne(newDoc)
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




//  S U P A B A S E   E N D P O I N T S 


app.post('/api/signUp',async (req,res) => {
    const {name,password} = req.body;
    const hashed = await bcrypt.hash(password,12);
    try{
        const {data,error} = await supabaseClient
       .from('players')
       .insert([{user_name:name,password:hashed,role:"user"}])
       console.log('Insert Result:', data, error);
       res.status(200).send('You were added to the list of players!')
    }catch(error){
        res.status(500).send(`Error signing up.: ${error}`)
        return
    }
    const payload = {
        username:name,
        role:'user'
    }
    const token = jsonwebtoken.sign(payload,'KDjenl5803jdjJFKnrj94305')
    res.json({token})   
})




app.post('/api/player', async (req, res) => {
  const { userName, createdAt, bestTime } = req.body;
  
      const {data,error} = await supabaseClient     // deconstruction. dont know what the "await" will return
      .from('players')
      .insert([{ user_name:userName, created_at:createdAt, best_time:bestTime}]);
      if(error){
        console.log(error)
        res.send(`error uploading riddle to db: ${error}`)
      }
      else{
        res.send('uploaded riddle to db successfully!')
      }
})



app.get('/api/player/:username', async (req, res) => {
  const username = req.params;

  const data = await supabaseClient
    .from('players')
    .select()
    .eq('name', username)
    .single(); 

  res.send(data);
});


app.post('/api/update-time',async (req,res) => {
    const {name,best_time} = req.body
    const {data,error} = await supabaseClient
    .from('players')
    .update({ best_time })
    .eq('user_name', name);
    if(error){
        res.send(`error uploading time to db: ${error}`)
    }
    res.status(200).send('Best time updated successfully');
})




app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT}`)
})