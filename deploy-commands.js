

// ============== //
// 	REST & Routes //
// ============== //


const {	REST, Routes } = require('discord.js')


// ====== //
// DotEnv //
// ====== //


const dotenv = require('dotenv')
dotenv.config()
const {	TOKEN, CLIENT_ID, GUILD_ID } = process.env


// =============== //
// Import Commands //
// =============== //


const fs = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const commands = []

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

// Instância rest
const rest = new REST({ version: '9' }).setToken(TOKEN);

// Deploy
(async () => {
    try {

        switch (commands.length) {
            case 1:
                console.log(`Registrando ${commands.length} comando...`)
                break;
        
            default:
                console.log(`Registrando ${commands.length} comandos...`)
                break;
        }

        // Put
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        )

        switch (commands.length) {
            case 1:
                console.log('Comando registrados com sucesso!')
                break;
        
            default:
                console.log('Comandos registrados com sucesso!')
                break;
        }




    } catch (error) {
        console.error(error)
    }
})()