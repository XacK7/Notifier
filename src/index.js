const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const { applyTimestampLogging } = require('./utils/logger');

let token = process.argv[2];;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    // IntentsBitField.Flags.GuildMessages,
    // IntentsBitField.Flags.GuildPresences,
    // IntentsBitField.Flags.MessageContent,
  ],
});

// Apply the custom logging
 const log = applyTimestampLogging();

(async () => {
  try {
    eventHandler(client);
    client.login(token);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();
