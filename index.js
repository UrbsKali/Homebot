const fs = require('fs');
const discord = require('discord.js');
const http = require('http');

// Start of web server for hosting
const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('go to <href link="https://urbskali.github.io/">https://urbskali.github.io/</href>');
  }
  
  const server = http.createServer(requestListener);
  server.listen(80);
// End of web server

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