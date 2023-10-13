const Discord = require('discord.js'); 
const OpenAI = require('openai');
const express = require('express');

const app = express();

require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessageTyping,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.MessageContent,
        Discord.IntentsBitField.Flags.DirectMessages,
        Discord.IntentsBitField.Flags.DirectMessageTyping
    ]
});
//required for hosting on HEROKU, without specifying the port, it will crash shortly after deployment

const PORT = process.env.PORT; 

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
});



//listens for the command !question and sends question to OpenAI API, then responds with the first generated answer. 
//It stores the question in a const called stringPrompt, and includes it in the prompt.

client.on('messageCreate', async msg => {
  const stringPrompt = msg.content;
  const triggerCommand = '!question';
  const codeSafety = ' (Surround any code blocks with three ` characters so it will display correctly. Ex. ```Code```';
  
  if (stringPrompt.includes(triggerCommand)) {

      try {
          const response = await openai.completions.create({
              model: "gpt-4",
              prompt: stringPrompt + codeSafety,
              temperature: 0.7,
              max_tokens: 800,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
          });

          const generatedResponse = response.choices[0].text.trim();
          msg.reply(`Hello ${msg.author.username}, let me answer that for you: \n${generatedResponse}`);

      } catch (error) {
          if (error instanceof OpenAI.APIError) { //per openai 4.0.0+
              console.error(error.status);  // e.g., 401
              console.error(error.message); // e.g., The authentication token you passed was invalid...
              console.error(error.code);    // e.g., 'invalid_api_key'
              console.error(error.type);    // e.g., 'invalid_request_error'
          } else {
              console.log(error);
          }
      }
  }
});

client.login(process.env.CLIENT_TOKEN); 






