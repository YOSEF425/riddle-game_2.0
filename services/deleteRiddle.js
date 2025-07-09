function changeRiddle(riddleId){
  
    fs.readFile("../riddlesDB/riddleList.txt","utf8",(err,data) => {
        if(err){
            console.log("error reading file");
            return
        }
        console.log(data)
        const riddleArray = JSON.parse(data)
        console.log(riddleArray)

        for(const riddle of riddleArray){
            if(riddle.id === riddleId){
                riddleArray.remove(riddle)
                break
            }
        }
        const jsonString = JSON.stringify(riddleArray,null,2)
        fs.writeFile("../riddlesDB/riddleList.txt",jsonString,(err) => {
            if(err){
                console.log("error writing to file")
            }
            else{
                console.log("file saved successfully!")
            }
        })

    })
}

