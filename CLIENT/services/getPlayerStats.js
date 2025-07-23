export async function getPlayerStats(username) {
  const response = await fetch(`http://localhost:5000/api/player/${username}`);
  const playerData = await response.json();
  console.log(playerData);
}
