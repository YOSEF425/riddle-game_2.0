export async function addToLB(name,seconds){
    const response = await fetch(`http://localhost:5000/leaderboard/${name}`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name":name,"time":seconds})
    })
}
    
