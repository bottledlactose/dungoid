const { SlashCommandBuilder } = require('discord.js');
const embedHelper = require('../modules/embed-helper');

const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Rolls a dice with the given amount of sides'),
	async execute(interaction, client) {
    const characters = await db.get(`characters_${interaction.user.id}`);
    const embed = embedHelper.info(client);

    if (characters.length == 0) {
      embed.setDescription('You have no characters yet!');
    } else {
      for (const c of characters) {
        embed.addFields({
          name: c.name,
          value: `Prefix: \`${c.prefix}\``
        });
      }
    }

		await interaction.reply({ embeds: [embed] });
	},
};
