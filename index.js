const fs = require('fs');
const discord = require('discord.js');
const http = require('http');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const server = http.createServer((req, res) => {
// Set the response HTTP header with HTTP status and Content type
res.writeHead(200, {'Content-Type': 'text/plain'});
// Send the response body "Hello World"
res.end('The bot is online\n');
});
const port = 8080
server.listen(port, () => {
console.log('Hello world listening on port', port);
});


const client = new discord.Client({ disableMentions: 'everyone' });

const help = require('./commands/core/help');

client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.commands = new discord.Collection();


fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});


const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};






client.login(client.config.discord.token);