const fs = require('fs');
const discord = require('discord.js');
const http = require('http');
const cron = require('node-cron');


// Start of web server for hosting
const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('go to <href link="https://urbskali.github.io/">https://urbskali.github.io/</href>');
  }
  
  const server = http.createServer(requestListener);
  server.listen(process.env.PORT || 8080);
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
/*
let data = JSON.parse(fs.readFileSync('./shed.json'));
for (let i = 0; i < data.length; i++) {
    cron.schedule(data[i].date, () => {
        const geth = require('./commands/homework/getHomework')
        var d = new Date();
        var input_date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()+1}`
        const channel = client.channels.cache.get(data[i].channel);
        const homework = geth.getHm(input_date);
        channel.send(homework);
    });
}*/

client.login(client.config.discord.token);