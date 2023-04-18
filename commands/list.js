const { SlashCommandBuilder } = require('discord.js');
const embedHelper = require('../modules/embed-helper');
const characterModule = require('../modules/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Lists all of your currenct characters'),
	async execute(interaction, client) {
    const characters = await characterModule.get(interaction.user);
    const embed = embedHelper.info(client);

    if (characters.length == 0) {
      embed.setDescription('You have no characters yet!');
    } else {
      for (const c of characters) {
        embed.addFields({ name: c.name, value: `Prefix: \`${c.prefix}\`` });
      }
    }

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
