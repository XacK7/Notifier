const { Interaction, Client, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        interaction.deferReply({ ephemeral: true });
        const targetMessage = interaction.targetMessage;
        
        // Fetch members in the guild
        const members = await interaction.guild.members.fetch();

        // Filter out bots and members without a specific role (replace 'ROLE_ID' with the actual role ID)
        const filteredMembers = members.filter(member => 
            !member.user.bot  // Replace 'ROLE_ID' with your desired role ID
        );

        // Send the DM to each filtered member
        for (const member of filteredMembers.values()) {
            try {
                await member.send({content:targetMessage.content, files: targetMessage.attachments.map(a => a.url)});
            } catch (error) {
                console.error(`Failed to send DM to ${member.user.tag}: ${error}`);
                
                
            }
        }

        await interaction.editReply({ content: 'Message has been sent to all selected members!' });
    },
    name: "Send As DM",
    type: 3, // Application command type for message context menu
    permissionsRequired: [PermissionFlagsBits.Administrator],
};

