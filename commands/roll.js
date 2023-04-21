const { SlashCommandBuilder } = require('discord.js');
const { infoEmbed } = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll a dice with the given amount of sides')
    .addIntegerOption(option =>
      option
        .setName('sides')
        .setDescription('How many sides does your dice have?')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100))
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('How many dice would you like to throw?')
        .setMinValue(1)
        .setMaxValue(6))
    .addIntegerOption(option =>
      option
        .setName('modifier')
        .setDescription('Which modifier would you like to use for this throw?')
        .setMinValue(-5)
        .setMaxValue(10)),
	async execute(interaction, client) {
    const sides = interaction.options.getInteger('sides');
    const amount = interaction.options.getInteger('amount') || 1;
    const modifier = interaction.options.getInteger('modifier') || 0;

    const embed = infoEmbed(client);
    const modifierDisplay = modifier > -1 ? '+' + modifier : modifier;

    console.log(modifierDisplay);

    if (amount > 1) {
      embed.setDescription('You rolled the following results:');

      for (let i = 0; i < amount; ++i) {
        const result = (Math.floor(Math.random() * sides) + 1) + modifier;
        embed.addFields([{
          name: `Dice #${i + 1}`,
          value: `\`${result}\` (\`${modifierDisplay}\`) out of \`${sides}\``
        }]);
      }

      await interaction.reply({ embeds: [embed] });
      return;
    }

    // Generate a random number based on the amount of sides to use
    const result = (Math.floor(Math.random() * sides) + 1) + modifier;
    embed.setDescription(`You rolled \`${result}\` (\`${modifierDisplay}\`) out of \`${sides}\`!`);

    await interaction.reply({ embeds: [embed] });
	},
};
