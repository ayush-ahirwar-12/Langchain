import { config } from "dotenv";
config();

import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import readline from "readline/promises";
import { createAgent, tool } from "langchain";
import { currentDate, sendEmail } from "./mail.service.js";
import * as z from "zod"
import { datetimeRegex } from "zod/v3";

const emailTool = tool(sendEmail, {
  name: "emailTool",
  description: "Use this tool to send email",
  schema: z.object({
    to: z.string().describe("The email address of the recipient"),
    subject: z.string().describe("The subject of the email"),
    html: z.string().optional().describe("The HTML content of the email"),
  })
})
const dateTool= tool(currentDate,{
  name:"currentDate",
  description:"Use this function to get current date",
  schema:z.object({})
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
});



const agent = createAgent({ model, tools: [emailTool,dateTool] });

const messages = [];

while (true) {
  const question = await rl.question("You: ");

  messages.push(new HumanMessage(question));

  const response = await agent.invoke({messages});

  messages.push(response.messages[response.messages.length-1]);

  console.log("Ai: ", response.messages[response.messages.length-1].content);


}