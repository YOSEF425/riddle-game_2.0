export async function createPerson(player) {
  await fetch('http://localhost:5000/api/player', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: player.name,
      createdAt: player.createdAt,
      bestTime: player.bestTiming
    })
  });
}
