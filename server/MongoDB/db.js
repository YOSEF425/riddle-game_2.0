import { MongoClient } from "mongodb"


const client = new MongoClient(process.env.MONGO_DB_URI)
 


export async function connectToMongo(){
    try{
       await client.connect();
       console.log("connected to db!");
    }catch(error){
        console.log(error)
    }
    
}

export default client

