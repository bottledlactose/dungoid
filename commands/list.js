const { SlashCommandBuilder } = require('discord.js');
const characterModule = require('../modules/character');
const embedModule = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('List all your aliases or characters'),
	async execute(interaction, client) {
    const characters = await characterModule.get(interaction.user);
    const embed = embedModule.info(client);

    if (characters.length == 0) {
      // Set up a fallback message since no characters were found
      embed.setDescription('You have no characters yet! '
        + 'Start by creating one using \`/create\`');
    } else {
      embed.setTitle('Characters');

      for (const i in characters) {
        // Add a new field entry for the current character
        embed.addFields({
          name: characters[i].name,
          value: `prefix: \`${characters[i].prefix}\``
            + ` · [avatar](${characters[i].avatarURL})`,
        });
      }
    }

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
