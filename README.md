# DiscordAI ChatBot
 Discord AIChat Bot


This is a Discord AI chatbot built using Node.js. The bot is designed to interact with users on Discord servers using natural language processing.

### Installation
1. Clone this repository to your local machine using the following cmd:
   ```
   git clone <repo_url>
   ```
2. Navigate to the directory
   
3. Install the required dependencies using npm:
    ```
    npm install
    ```

### Configuration
Before running the bot, you need to set up the configuration. Follow these steps:

1. Create a new application on the Discord Developer Portal.

2. Create a bot for your application and copy the bot token.

3. Rename the .env.example file to .env and open it.

4. Replace the CLIENT_TOKEN placeholder with your bot token.
    > NOTE: .env is located in the src folder
    ```
    CLIENT_TOKEN=your_discord_bot_token
    ```
>NOTE: Discord is constantly changing, I will update as needed

### Open AI 
1. Add your OpenAI API key to the .env file
    ```
    OPENAI_API_KEY = Api-key-here
    ```

### Usage
To start the bot, run the following command:
    ```
    npm start
    ```

The bot will now be active and ready to respond to user messages on Discord servers.

### Heroku
This is required if you plan on hosting on heroku:
    ```
    const PORT = process.env.PORT; 
    ```

### Features
-The chatbot uses natural language processing to understand and respond to user messages.
-It can be customized with additional functionality to suit your specific needs.
-The bot is designed to be extendable and can be integrated with various APIs and services.

### License
This project is licensed under the MIT License.

