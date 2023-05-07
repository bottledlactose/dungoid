const { Client, Events, GatewayIntentBits } = require('discord.js');
const config = require('../config.json');

// Initialize a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
  c.guilds.cache.each(guild => console.log([guild.name, guild.memberCount]));
  client.destroy();
});

// Log in as the bot user through the configured token
client.login(config.token);
