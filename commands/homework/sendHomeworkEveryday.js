module.exports = {
    name: 'sendHomeworkEveryday',
    aliases: ['shed'],
    category: 'travail',
    utilisation: '\`{prefix}sendHomeworkEveryday\ <true | false>` : active dans le channel l\'envoi automatique des devoirs du lendemain',

    async execute(client, message, args) {
        const geth = require('./getHomework')
        const fs = require('fs');
        

        // check first if user is admin
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("Tu n'as pas les permissions pour faire cette commande !");
        }


        if (args[0] === "true") { 
            // add json object to file with the channel id, the guild id and the date and save it
            
            var tmp = {
                channel: message.channel.id,
                guild: message.guild.id,
                date: `0 0 17 ? JAN,FEB,MAR,APR,MAY,AUG,SEP,OCT,NOV,DEC SUN,MON,TUE,WED,THU *`
            }
            await register_cron(geth, client, message).catch(err => console.log(` top: ${err}`));
            message.channel.send('Envoi automatique des devoirs activé !')
        } else if (args[0] === "false"){
            message.channel.send("j'ai pas codé la désactivation ...")
        } else {
            message.channel.send("Mauvais argument, fait `$help shed` pour plus d'info")
        }
        
    }
    
};


async function register_cron(geth, client, message) {
    try {
        const cron = require('node-cron');
        await cron.schedule('0 0 17 ? JAN,FEB,MAR,APR,MAY,AUG,SEP,OCT,NOV,DEC SUN,MON,TUE,WED,THU *', async () => await cron_(geth, client, message));
    } catch (err) {
        console.log(` registrer_cron : ${err}`);
    }
    
}

async function cron_(geth, client, message) {
    try {
        await geth.execute(client, message, ['+1']);
        console.log("homework");
    } catch (err) {
        console.log(` cron_ : ${err}`);
    }
    
}