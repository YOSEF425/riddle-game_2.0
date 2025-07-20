import { MongoClient } from "mongodb"


const client = new MongoClient('mongodb+srv://steinbergyosef:20155775@cluster0.om22ofs.mongodb.net?retryWrites=true&w=majority&appName=Cluster0')

 


export async function connectToMongo(){
    try{
       await client.connect();
       console.log("connected to db!");
    }catch(error){
        console.log(error)
    }
    
}

export default client

