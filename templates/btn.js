const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

const btn = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
        // .setCustomId('linkDoc')
        .setLabel(`Documentação do ${selected}`)
        .setStyle(ButtonStyle.Link)
        .setURL(`${docs_links[selected]}`)
)