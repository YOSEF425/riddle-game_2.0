export async function findPlayer(name){
   const response =  fetch(`http://localhost:5000/findPlayerByName/${name}`)
   const text = await response.text
   console.log(text)
}


