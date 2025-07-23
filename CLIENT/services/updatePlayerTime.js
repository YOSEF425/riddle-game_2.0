export async function updateTotalTime(player) {
  try {
    const response = await fetch('http://localhost:5000/api/update-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: player.name,        
        time: player.totalTime         
      })
    });

    const result = await response.text();
    }catch(error){
    console.error("Failed to update time:", error.message);
  }
}
