const { SlashCommandBuilder } = require('discord.js');
const embed = require('../embed');

const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Rolls a dice with the given amount of sides'),
	async execute(interaction, client) {
    const characters = await db.get(`characters_${interaction.user.id}`);
    const response = embed.default(client);

    if (characters.length == 0) {
      response.setDescription('You have no characters yet!');
    } else {
      for (const c of characters) {
        response.addFields({
          name: c.name,
          value: `Prefix: \`${c.prefix}\``
        });
      }
    }

		await interaction.reply({ embeds: [response] });
	},
};
