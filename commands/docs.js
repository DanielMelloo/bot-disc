const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('docs')
            .setPlaceholder('Nenhuma Linguagem selecionada')
            .addOptions({
                label: 'Python',
                description: 'Veja a documentação do Python',
                value: 'python',

            },
            {
                label: 'Javascript',
                description: 'Veja a documentação do Javascript',
                value: 'javascript',
            },
            {
                label: 'C++',
                description: 'Veja a documentação do C++',
                value: 'c++',
            },
            {
                label: 'Django',
                description: 'Veja a documentação do Django',
                value: 'django',
            },
            {
                label: 'Discord.js',
                description: 'Veja a documentação do Discord.js',
                value: 'discord.js',
            })
    )

module.exports = {
    
    data:new SlashCommandBuilder() 
        .setName('docs')
        .setDescription("Acesse a documentação da tecnologia que quiser"),
    
    async execute(interaction) {
        await interaction.reply({content: 'Selecione uma das tecnologias abaixo:', components: [row]})
    }
    
}