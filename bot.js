const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require('./config.json');

// Initialize a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Create a collection to store our commands in
client.commands = new Collection();

// Fetch the command files from the corresponding path
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

  // Ensure each command contains the required data and execute delegate
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, c => {
	console.info(`Ready! Logged in as ${c.user.tag}`);

  // Set up the bot user's custom status
  client.user.setPresence({
    activities: [
      { name: `/help /create /roll`, type: ActivityType.Listening }
    ]
  });
});

client.on(Events.InteractionCreate, async interaction => {
  // Avoid handling anything that is not a chat input command
  if (interaction.isChatInputCommand()) {
    // Fetch the command from the pre-loaded list of commands
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      // Run the command and hope we don't get an error...
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  } else if (interaction.isAutocomplete()) {
    const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.autocomplete(interaction);
		} catch (error) {
			console.error(error);
		}
  }
});

// Log in as the bot user through the configured token
client.login(config.token);
