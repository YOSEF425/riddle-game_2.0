import readline from 'readline-sync';

export class Riddle {

    constructor({difficulty, name, taskDescription, correctAnswer}) {
        this.difficulty = difficulty;
        this.name = name;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
    }

    ask() {
        const startTime = Date.now();
        let answer = "";
        while (answer !== this.correctAnswer) {
            answer = readline.question(`${this.taskDescription}`);
            if (answer !== this.correctAnswer) {
                console.log("WRONG!!!")
            }
        }
        console.log("Correct!");
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        return duration;
    }

}









