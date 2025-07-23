export async function createPerson(player) {
  await fetch('http://localhost:5000/api/player', {
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
