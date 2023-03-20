const { SlashCommandBuilder} = require('discord.js')

module.exports = {
    
    data:new SlashCommandBuilder() 
        .setName('playlist')
        .setDescription("Ouça a melhor playlist para estudar"),
    
    async execute(interaction) {
        await interaction.reply('https://open.spotify.com/playlist/4l5oJ1X81MbZQ6SXpbjN8n?si=c9add6398ffa4e9c')
    }
    
}