export async function deleteRiddle(riddleId){
  const response = await fetch(`/api/riddle/${riddleId}`,{
    method : 'DELETE'
  })
  console.log((await response).text());
}

