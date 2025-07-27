import readline from 'readline-sync';



export async function createPerson() {
  
  const _name = readline.question("What's your name?");
  const _password = readline.question("please enter a Password!")
    

  await fetch('http://localhost:5000/api/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: _name,
      password: _password,
    })
  });
}
