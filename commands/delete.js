const { SlashCommandBuilder } = require('discord.js');
const embedModule = require('../modules/embed');
const characterModule = require('../modules/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete an alias or character')
    .addStringOption(option =>
      option
        .setName('prefix')
        .setDescription('What is the chat prefix for your character?')
        .setRequired(true)
        .setMaxLength(6)),
	async execute(interaction, client) {
    const prefix = interaction.options.getString('prefix');
    // Fetch all characters from the user's dataset
    let characters = await characterModule.get(interaction.user);

    for (const i in characters) {
      if (characters[i].prefix === prefix) {
        // Temporarily store the character for display after deletion
        const character = characters[i];
        // Delete the character from the dataset and overwrite the remaining value
        characters.splice(i, 1);
        await characterModule.set(interaction.user, characters);

        const embed = embedModule.success(client)
          .setTitle('Done!')
          .setDescription(`**${character.name}** has been successfully deleted!`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }
    }

    const embed = embedModule.error(client)
      .setTitle('Failed to delete character!')
      .setDescription(`You don't have any character with the prefix \`${prefix}\`!`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
