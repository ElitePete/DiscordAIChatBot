require('dotenv').config(); 
const Discord = require('discord.js'); 
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

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




client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
});




client.on('messageCreate', async msg => {
    const stringPrompt = msg.content;
    const triggerCommand = '!question';
    
    if (stringPrompt.includes(triggerCommand)) {

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: stringPrompt,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });

          const generatedResponse = response.data.choices[0].text.trim();

        msg.reply(`Hello ${msg.author.username}, let me answer that for you: \n${generatedResponse}`);
    }
});




client.login(process.env.CLIENT_TOKEN); 






