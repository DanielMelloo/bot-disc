const { Client, Events, GatewayIntentBits, Collection, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')

// ========= //
// Variables //
// ========= //



let docs_links = {
    'python': 'https://www.python.org',
    'javascript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'c++': 'https://devdocs.io/cpp/',
    'django': 'https://docs.djangoproject.com/en/4.1/',
    'discord.js': 'https://discordjs.guide/#before-you-begin',
}

// ========= //
// Functions //
// ========= //


function getRandomDice(diceValue = 6){
    return Math.floor(Math.random() * (diceValue + 1))
}


// ============== //
// Guild Atribute //
// ============== //

client.on("guildCreate",(guild) => {
	console.log('entrou em um servidor')
	console.log ('id da guilda que entre: ' + guild.id)
	console.log ('Nome da guilda onde entrei: ' + guild.name)

	servidores[guild.id] = {
		connection: null,
		dispatcher:null,
		fila: [],
		estouTocando: false
	}

})


// ====== //
// DotEnv //
// ====== //


const dotenv = require('dotenv')
dotenv.config()
// const {	TOKEN } = process.env
const {	TOKEN, CLIENT_ID, GUILD_ID } = process.env


// =============== //
// Import Commands //
// =============== //


const fs = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))


const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command)

	} else {
		console.log(`Não foi possível importar o comando ${command.data.name}`)
		console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes`)
	}

}



// ============ //
// Login do Bot //
// ============ //


client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`)
})

client.login(TOKEN)


// ================================ //
// Listener de Interações Com o Bot //
// ================================ //


client.on(Events.InteractionCreate, async interaction =>{
	
	const command = interaction.client.commands.get(interaction.commandName)

	if (interaction.isStringSelectMenu()){

		const selected = interaction.values[0];

		let value

		switch (interaction.customId) {
			case 'dice':

				const nmbr = selected.substring(1) -(-1) -1

				await interaction.reply(` * Resultado do D${nmbr} *\n\n${getRandomDice(nmbr)}`);

				break;

			case `dice${value}x`:

				await interaction.reply(`${value}`);
				
				break;

			case 'docs':
				await interaction.reply(`Documentação do ${selected}:  ${docs_links[selected]}`);

			break
		
			default:
				break;
		}
	}

	if (!interaction.isChatInputCommand()) return

	if (!command) {
		console.log(`Não foi possível encontrar o comando ${interaction.commandName}`)
		return
	}

	try {
		await command.execute(interaction)
		
	} catch (error) {
		console.error(error)
		await interaction.reply({ content: 'Desculpe, ocorreu um erro inesperado!', ephemeral: true })
	}
})
