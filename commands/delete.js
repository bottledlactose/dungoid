const { SlashCommandBuilder } = require('discord.js');
const characterModule = require('../modules/character');
const embedModule = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete an alias or character')
    .addStringOption(option =>
      option
        .setName('tag')
        .setDescription('What is the unique tag for your character?')
        .setRequired(true)
        .setMaxLength(6)),
	async execute(interaction, client) {
    const tag = interaction.options.getString('tag');
    // Fetch all characters from the user's dataset
    let characters = await characterModule.get(interaction.user);

    for (const i in characters) {
      if (characters[i].tag === tag) {
        // Temporarily store the character for display after deletion
        const character = characters[i];
        // Delete the character from the dataset and overwrite the remaining value
        characters.splice(i, 1);
        await characterModule.set(interaction.user, characters);

        const embed = embedModule.success(client)
          .setTitle('Character deleted!')
          .setDescription(`**${character.name}** has been successfully deleted.`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }
    }

    const embed = embedModule.error(client)
      .setTitle('Failed to delete character!')
      .setDescription(`You don't have any character with the tag \`${tag}\`! `
        + `You can view your characters with \`/list\`.`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
