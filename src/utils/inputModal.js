const {ActionRowBuilder,ModalBuilder,TextInputBuilder,TextInputStyle} = require('discord.js');
module.exports=async(interaction,title,label,placeholder)=>{
    const modal = new ModalBuilder({
        customId : `Modal-${interaction.user.id}`,
        title,
    });
    const data_input = new TextInputBuilder({
        customId : `Input-${interaction.user.id}`,
        label,
        style:TextInputStyle.Short,
        placeholder,
        required:false

    });
    const actionRow = new ActionRowBuilder().addComponents(data_input);
    modal.addComponents(actionRow)
    return(modal)
}