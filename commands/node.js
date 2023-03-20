const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')

const nodeEmbed = new EmbedBuilder()
	.setColor('Green')
	.setTitle('Comandos do node')
	.addFields(
        { name: '\u200B', value: '\u200B' },
            { name: 'node .\deploy-commands.js', value: 'Faz o deploy dos comandos criados para o bot', inline: true },
        { name: '\u200B', value: '\u200B' },
            { name: 'node index.js', value: 'Faz o login do bot no server', inline: true },
	)

module.exports = {
    
    data:new SlashCommandBuilder() 
        .setName('node')
        .setDescription("CheatSheet do node"),
    
    async execute(interaction) {
        await interaction.reply({ embeds: [nodeEmbed] })
    }
    
}