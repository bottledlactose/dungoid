const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls a dice with the given amount of sides')
    .addIntegerOption(option =>
        option
          .setName('sides')
          .setDescription('The amount of sides on the dice')
          .setRequired(true)),
	async execute(interaction) {
    const sides = interaction.options.getInteger('sides');

    if (sides < 1) {
      await interaction.reply('Amount of sudes must be greater than 1!');
      return;
    }

    const result = Math.floor(Math.random() * sides);
		await interaction.reply('Pong! You rolled ' + result + ' with ' + sides + ' sides!');
	},
};
