const { SlashCommandBuilder } = require('discord.js');
const embedModule = require('../modules/embed');

const { clientId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Sends an invite link to add me to your own server!'),
	async execute(interaction, client) {

    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=536870912&scope=bot%20applications.commands`;

    const embed = embedModule.info(client)
      .setTitle('Here\'s your invite!')
      .setDescription(`Thank you for inviting me to your server! Please [click here](${url}) to complete the process. Don't see your server in the list? Ask a server administrator to invite me instead.`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
