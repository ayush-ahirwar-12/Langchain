import {config} from "dotenv";
config();
import { ChatMistralAI } from "@langchain/mistralai";
import { log } from "console";
import readline from "readline";

// import { ChatGroq } from "@langchain/groq";
// import { PromptTemplate } from "@langchain/core/prompts";


// const template = PromptTemplate.fromTemplate(`explain {topic} in hinglish`);


// const model = new ChatGroq({
//     apiKey:process.env.GROQ_API_KEY,
//     model:"llama-3.1-8b-instant"
// });


// template.pipe(model).invoke({topic:"express.js"}).then((response)=>{console.log(response.content)});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

rl.question("What is your name? ", (name) => {
    console.log(`Hello, ${name}!`);
    rl.close();
})

const model = new ChatMistralAI({
    model:"mistral-small-latest",
    apiKey:process.env.MISTRAL_API_KEY

})

const response  = await model.invoke('What is the daugher name of donald trump?');

console.log(response.text);

