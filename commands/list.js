const { SlashCommandBuilder } = require('discord.js');
const { charactersData } = require('../modules/data');
const { infoEmbed } = require('../modules/embed');
const { maxCharacters } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('List all your aliases or characters'),
	async execute(interaction, client) {
    // Fetch a list of all characters to display in the list embed
    const characters = await charactersData.get(interaction.user);

    const embed = infoEmbed(client, {
      title: 'Characters',
    })

    // Let's check if the user has no characters yet to show an alternative message
    if (characters.length === 0) {
      embed.setDescription('You have no characters yet! You can start creating one with \`/create\`. Alternatively, you may use the \`/help\` command to get you started.');

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    // Set the description to some useful information about the user's character counters
    embed.setDescription(`You have a total of **${characters.length}** out of **${maxCharacters}** characters! You can create new characters using \`/create\` and delete them using \`/delete\`. Thank you for using ${client.user.username}!`);

    // Sort all characters by display name
    characters.sort((a, b) => {
      if (a.name < b.name)
        return -1;

      if (a.name > b.name)
        return 1;

      return 0;
    });

    for (const character of characters) {
      const messageCount = character.messageCount || 0;
      const messageAverage = character.messageAverage || [];

      let average = 0;

      if (messageAverage.length > 0) {

        for (const count of messageAverage)
          average += count;

        average /= messageAverage.length;
      }

      embed.addFields({
        name: character.name,
        value: `tag: \`${character.tag}\` · messages: \`${messageCount}\` · [avatar](${character.avatarURL})\n`
          + `avg. message length: \`${average}\` (out of last \`${messageAverage.length}\`)`,
      });
    }

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
