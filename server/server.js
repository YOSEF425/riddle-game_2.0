import express from "express"
import { connectToMongo } from "./MongoDB/db.js";
import client from "./MongoDB/db.js";
import { ObjectId } from "mongodb";
import { supabaseClient } from "./supabaseDB/db.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken'


const app = express();

const PORT = 5000;

app.use(express.json());


await connectToMongo();    
const collection = client.db("myDatabase").collection("riddleCollection") // creating my collection in db.


function getRole(req,res,next){
    if(!req.headers.authorization){
        res.send("You are not registered!")
    }
    const token = req.headers.authorization.split(' ')[1];
    try{
        const decode = jsonwebtoken.verify(token,'KDjenl5803jdjJFKnrj94305')
        req.role = decode.role;
        next()
    }catch(error){
        res.status(401).send("Your token is Unauthorized!")
    }
}


app.get('/api/riddles',getRole,async(req,res) => {   // Show user all riddles.(not for playing, just show)
    if(req.role === 'guest' || req.role === 'Guest'){
        res.send('Guests cannot view riddle list')
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

app.post('/api/riddles',getRole,async(req,res) => {    // endpoint for user to add a riddle.
    if(req.role === 'guest' || req.role === 'Guest'){
        res.send('Guests cannot add to riddle list')
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

app.put('/api/riddles/:id',getRole,async(req,res) => {
     if(req.role !== 'Admin' || req.role ==! 'admin'){
        res.send('Only admin can update riddles.')
    }
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

app.delete('api/riddle/:id',getRole, async(req,res) => {
    if(req.role !== 'Admin' || req.role ==! 'admin'){
        res.send('Only admin can delete riddles.')
    }

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

app.get('/findPlayerByName/:name', async (req, res) => {
  const name = req.params.name;

  try {
    const { data, error } = await supabaseClient
      .from('players')
      .select('*')
      .eq('user_name', name);

    if (error) {
      console.error(`Supabase error: ${error.message}`);
      return res.status(500).send('Internal server error.');
    }

    if (data.length >= 1) {
      return res.send('Found you in the system!');
    } else {
      return res.send('Didn’t find you in the system!');
    }
  } catch (err) {
    console.error(`Unexpected error: ${err.message}`);
    return res.status(500).send('Something went wrong.');
  }
});


app.post('/api/signUp',async (req,res) => {
    const {name,password} = req.body;
    const hashed = await bcrypt.hash(password,12);
    try{
        const {data,error} = await supabaseClient
       .from('players')
       .insert([{user_name:name,password:hashed,role:"user"}])
    
    if(error) {
      return res.status(500).send(`Error loading to DB: ${error.message}`);
    }
    const payload = {
        username:name,
        role:'user'
    }
    const token = jsonwebtoken.sign(payload,'KDjenl5803jdjJFKnrj94305')
    res.json({token,message:'added you to player database!'})
    }
    catch(error){
        res.send(`error: ${error}`)
    }

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



// app.get('/api/player/:username', async (req, res) => {
//   const username = req.params;
  
//   const data = await supabaseClient
//   .from('leaderboard') 
//   .select('user_name')
//   .eq('user_name',username)
//     .from('players')
//     .select()
//     .eq('name', username)
//     .single(); 

//   res.send(data);
// });

app.post('/leaderboard/:player/:time',async(req,res) => {   // ADD PLAYER TO LEADERBOARD
     const name = req.params.player
     const time = req.params.time
     const {data,error} = await supabaseClient
     .from('leaderboard')
     .select('best_record')
     .eq('name',name)
     .single()
     if(data.best_record < time){
        data.best_record = time
     }
})

app.get('/showLB',async(req,res) => {     //  DISPLAY LEADERBOARD
    const {data,error} = await supabaseClient
    .from('leaderboard')
    .select('*')
    if (error) {
  console.error('Error fetching table:', error);
} else {
  console.log('Full table data:', data);
}
})



app.listen(PORT,() => {
    console.log(`Server running on port: ${PORT}`)
})