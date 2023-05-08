const { SlashCommandBuilder } = require('discord.js');
const { charactersData } = require('../modules/data');
const { errorEmbed, successEmbed } = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete an alias or character')
    .addStringOption(option =>
      option
        .setName('tag')
        .setDescription('What is the unique tag for your character?')
        .setRequired(true)
        .setAutocomplete(true)),
  async autocomplete(interaction) {
    const characters = await charactersData.get(interaction.user);

    const focused = interaction.options.getFocused().toLowerCase();
    const filtered = characters.filter(choice => choice.name.toLowerCase().startsWith(focused));

    await interaction.respond(
      filtered.map(choice => ({ name: choice.name, value: choice.tag })),
    );
  },
	async execute(interaction, client) {
    // Fetch the input values from the interaction's options
    const tag = interaction.options.getString('tag');

    const { character } = await charactersData.single(interaction.user, tag) || {};
    // Attempt to delete the character from the user's data
    const success = await charactersData.delete(interaction.user, tag);

    if (!success) {
      const embed = errorEmbed(client, {
        title: 'Failed to delete character!',
        description: `You don't have any characters with the tag \`${tag}\`! You can view a list of your previously created characters with \`/list\`.`
      });

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } else {

      const embed = successEmbed(client, {
        title: 'Character deleted!',
        description: `Your character **${character.name}** has been deleted.`
      }).setImage(character.avatarURL);

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
	},
};
