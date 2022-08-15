const Discord = require('discord.js');
require('discord-reply'); //IMPORTANT: put this before defining the client
const { token } = require('./config-fnf.json');
const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]     
});

const prefix = '!';

client.on('ready', () => {
   console.log('Command Bot is online!')
});


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();
 
    if(command === 'new'){

        const Solana = new solanaWeb3.Connection(
        "https://solana-api.projectserum.com"
        );

        const genWallet = async () => {
            const recentBlock = await Solana.getEpochInfo();
            console.log("~~~~~~~~~~~~~~~~~NEW BLOCK~~~~~~~~~~~~\n", recentBlock);
            const keyPair = solanaWeb3.Keypair.generate();
        
            console.log("Public Key:", keyPair.publicKey.toString());
            console.log("Secret Key:",keyPair.secretKey)

            let data = keyPair.secretKey.toString();
            fs.writeFileSync(keyPair.publicKey.toString() + '.json', '[ ' + data + ' ]')

            message.lineReply(keyPair.publicKey.toString());
        };

        genWallet();
    }})



client.login(token)