module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'core',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        if (!args[0]) {
            const homework = message.client.commands.filter(x => x.category == 'travail').map((x) => '`' + x.name + '`').join(', ');
            const core = message.client.commands.filter(x => x.category == 'core').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: 'GREEN',
                    author: { name: 'Petit aide' },
                    footer: { text: 'This bot is FUCKING USEFUL' },
                    timestamp: new Date(),
                    fields: [
                        { name: 'Core', value: core },
                        { name: 'Travail', value: homework },
                    ],
                    description: `LOL, retient la prochaine fois`,
                },
            }) 
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - I did not find this command !`);

            message.channel.send({
                embed: {
                    color: 'GREEN',
                    author: { name: 'Petit reminder' },
                    footer: { text: 'Ce bot devient utile' },
                    fields: [
                        { name: 'Nom', value: command.name, inline: true },
                        { name: 'Catégorie', value: command.category, inline: true },
                        { name: 'Alias', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replaceAll('{prefix}', client.config.discord.prefix), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Trouve des infos sympa sur la commande.\nArgument obligatoire `[]`, Argument optionel `<>`.',
                }
            })
        }
    }
            
};