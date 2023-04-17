const { SlashCommandBuilder } = require('discord.js');
const embed = require('../embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls a dice with the given amount of sides')
    .addIntegerOption(option =>
        option
          .setName('sides')
          .setDescription('The amount of sides on the dice')
          .setRequired(true)
          .setMinValue(1)
          .setMaxValue(100)),
	async execute(interaction, client) {
    const sides = interaction.options.getInteger('sides');
    const result = Math.floor(Math.random() * sides) + 1;

    const response = embed.success(client)
      .setDescription(`You rolled **${result}** out of **${sides}**!`);

		await interaction.reply({ embeds: [response] });
	},
};
