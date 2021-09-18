module.exports = {
    name: 'sendHomeworkEveryday',
    aliases: ['shed'],
    category: 'travail',
    utilisation: '\`{prefix}sendHomeworkEveryday\ <true | false>` : active dans le channel l\'envoi automatique des devoirs du lendemain',

    async execute(client, message, args) {
        const geth = require('./getHomework')
        if (args[0] === "true"){
            setInterval(await geth.execute(client, message, '+1'), 86400*1000)
        } else if (args[0] === "false"){
            message.channel.send("j'ai pas codé la désactivation ...")
        }
    }
};
