module.exports = (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        if (interaction.commandName === 'help') {
            console.log("zbeub")
            await interaction.reply({ content: 'tmp!', ephemeral: true });
        }
    });
}