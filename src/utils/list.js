const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
module.exports = async (channels) => {
    const select = new StringSelectMenuBuilder()
        .setCustomId('list')
        .setPlaceholder('Chose a channel !');
    channels.map(channel =>{
        select.addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel(channel.name)
            .setValue(channel.id)
        )
    })

    const row = new ActionRowBuilder().addComponents(select);
    return row;
    
}