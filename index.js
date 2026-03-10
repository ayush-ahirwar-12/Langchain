import {config} from "dotenv";
config();

import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";


const template = PromptTemplate.fromTemplate(`explain {topic} in hinglish`);


const model = new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    model:"llama-3.1-8b-instant"
});


template.pipe(model).invoke({topic:"express.js"}).then((response)=>{console.log(response.content)});