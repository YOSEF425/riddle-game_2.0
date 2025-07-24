import readline from 'readline-sync';



export async function createPerson() {
  
  const name = readline.question("Whats your name?");
  const password = readline.question("please enter a password!")
  const role = readline.question("What is yout role? (Guest,User,Admin)")
    

  await fetch('http://localhost:5000/api/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: player.name,
      created_at: player.createdAt,
      best_time: player.bestTiming
    })
  });
}




