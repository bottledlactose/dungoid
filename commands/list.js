const { SlashCommandBuilder } = require('discord.js');
const { charactersData } = require('../modules/data');
const { infoEmbed } = require('../modules/embed');
const { maxCharacters } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('List your aliases or characters')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('Which user\'s characters do you want to list?')),
  async autocomplete(interaction) {
    const characters = await charactersData.get(interaction.user);

    const focused = interaction.options.getFocused().toLowerCase();
    const filtered = characters.filter(choice => choice.name.toLowerCase().startsWith(focused));

    await interaction.respond(
      filtered.map(choice => ({ name: choice.name, value: choice.tag })),
    );
  },
	async execute(interaction, client) {
    const user = interaction.options.getUser('user') || interaction.user;
    // Fetch a list of all characters to display in the list embed
    const characters = await charactersData.get(user);

    const embed = infoEmbed(client, {
      title: 'Characters',
    })

    // Let's check if the user has no characters yet to show an alternative message
    if (characters.length === 0) {
      embed.setDescription(`${user.id == interaction.user.id ? 'You have' : `${user} has`} no characters yet! You can start creating one with \`/create\`. Alternatively, you may use the \`/help\` command to get you started.`);

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
      const stats = character.stats || {};

      const messages = stats.messages || 0;
      const average = stats.average || [];

      let averageCount = 0;

      if (average.length > 0) {
        for (const count of average)
          averageCount += count;

        averageCount /= average.length;
        averageCount = Math.round(averageCount);
      }

      embed.addFields({
        name: character.name,
        value: `tag: \`${character.tag}\` · [avatar](${character.avatarURL})\n`
          + `messages: \`${messages}\` · average: \`${averageCount}\` (of last \`${average.length}\`)`,
      });
    }

		await interaction.reply({ embeds: [embed] });
	},
};
