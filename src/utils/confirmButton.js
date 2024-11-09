const { ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { warningEmbed, successEmbed, errorEmbed } = require('./embeds');

module.exports = async(interaction,confirmation_msg)=>{
    const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Confirm')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary)
        );
    const confirmationMessage = await interaction.editReply({
          embeds:[warningEmbed(confirmation_msg)],
          components: [row],
          fetchReply:true,
        });
        return new Promise((resolve, reject) => {
            // Create collector for button interactions
            const filter = (i) => i.user.id === interaction.user.id;
            const collector = confirmationMessage.createMessageComponentCollector({
                filter,
                componentType: ComponentType.Button,
                time: 60000 // Timeout in milliseconds (adjust as needed)
            });
    
            // Handle button interactions
            collector.on('collect', async i => {
                if (i.customId === 'confirm') {
                    await i.update({ embeds:[successEmbed('Confirmed!')], components: [] });
                    resolve(true);
                } else if (i.customId === 'cancel') {
                    await i.update({ embeds:[errorEmbed('Canceled!')], components: [] });
                    resolve(false);
                }
            });
    
            // Handle timeout
            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.editReply({ embeds:[errorEmbed('You did not respond in time.')], components: [] });
                    resolve(false);
                }
            });
        });
    };