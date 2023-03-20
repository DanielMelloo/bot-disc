const { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder  } = require('discord.js')

const menu = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('dice')
            .setPlaceholder('Nenhum Dado Selecionado')
            .addOptions({
                label: 'D4',
                description: 'D4',
                value: 'd4',

            },
            {
                label: 'D6',
                description: 'D6',
                value: 'd6',
            },
            {
                label: 'D8',
                description: 'D8',
                value: 'D8',
            },
            {
                label: 'D10',
                description: 'D10',
                value: 'd10',
            },
            {
                label: 'D12',
                description: 'D12',
                value: 'd12',
            },
            {
                label: 'D20',
                description: 'D20',
                value: 'd20',
            },
            {
                label: 'D100',
                description: 'D100',
                value: 'd100',
            },
            )
    )

    
module.exports = {
    
    data:new SlashCommandBuilder() 
        .setName('dice')
        .setDescription("Rola um dado à sua escolha"),
    
    async execute(interaction) {
        await interaction.reply({content: 'Escolha abaixo qual dado rolar:', components: [menu]})
    }
    
}