export async function findPlayer(name){     /// Just to check if player is in system i'm using his unique name. Otherwise using token.
   const response =  fetch(`http://localhost:5000/findPlayerByName/${name}`)
   const text = await response.text
   console.log(text)
}


