import readline from 'readline-sync';



async function createNewPlayer(){
    const _name = readline.question("What is your name?")
    const _password = readline.question("Please Create a Password!")

     const response = await fetch('http://localhost:5000/api/signUp',{
        method : 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name : _name,
            password : _password
        })

     })
   
}

createNewPlayer();