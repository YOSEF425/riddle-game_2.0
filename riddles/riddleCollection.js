import riddle1 from "./riddle1.js";    
import riddle2 from "./riddle2.js";
import riddle3 from "./riddle3.js";
import riddle4 from "./riddle4.js";
import riddle5 from "./riddle5.js";


const riddleArray = [riddle1,riddle2,riddle3,riddle4,riddle5];
export let easy = riddleArray.filter(riddle => riddle.difficulty === "easy");
export let medium = riddleArray.filter(riddle => riddle.difficulty === "medium");
export let hard = riddleArray.filter(riddle => riddle.difficulty === "hard");

