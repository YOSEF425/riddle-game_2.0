import readline from 'readline-sync';

export class Riddle{

    constructor(difficulty,id,name,taskDescription,correctAnswer){
        this.difficulty = difficulty;
        this.id = id;
        this.name = name;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
    }

     ask(){
        const startTime = Date.now();
        console.log(`${this.id}:  ${this.name}`)
        let answer = 0;
        while(answer !== this.correctAnswer){
             answer = readline.question(`${this.taskDescription}`);
             if(answer !== this.correctAnswer){
                console.log("WRONG!!!")
             }
        }
        console.log("Correct!");
        const endTime = Date.now();
        const duration = endTime - startTime;
        return duration;
    }
    
}      
    








