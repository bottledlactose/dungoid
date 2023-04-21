const { SlashCommandBuilder } = require('discord.js');
const { charactersData } = require('../modules/data');
const { infoEmbed } = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('List all your aliases or characters'),
	async execute(interaction, client) {
    const characters = await charactersData.get(interaction.user);
    const embed = infoEmbed(client);

    if (characters.length == 0) {
      // Set up a fallback message since no characters were found
      embed.setDescription('You have no characters yet! '
        + 'Start by creating one using \`/create\`');
    } else {
      embed
        .setTitle('Characters')
        .setDescription(`You have a total of **${characters.length}** characters! `
          + `You can create new characters using \`/create\` and delete them using \`/delete\`.`);

      // Sort all characters by display name
      characters.sort((a, b) => {
        if (a.name < b.name)
          return -1;

        if (a.name > b.name)
          return 1;

        return 0;
      });

      for (const i in characters) {
        // Add a new field entry for the current character
        embed.addFields({
          name: characters[i].name,
          value: `tag: \`${characters[i].tag}\``
            + ` · [avatar](${characters[i].avatarURL})`,
        });
      }
    }

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
