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
          .setRequired(true)),
	async execute(interaction, client) {
    const sides = interaction.options.getInteger('sides');

    if (sides < 1) {
      const reply = embed.error(client)
        .setDescription('The amount of sides must be greater than **0**!');

      await interaction.reply({ embeds: [reply] });
      return;
    }

    const result = Math.floor(Math.random() * sides) + 1;
    const reply = embed.success(client)
      .setDescription(`You rolled **${result}** out of **${sides}**!`);

		await interaction.reply({ embeds: [reply] });
	},
};
