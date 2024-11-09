const { Message } = require("discord.js");
module.exports = async (message, target_channel, thread_id) => {
  /**
   * @param {Message} message
   */
  const env = process.env.ENVIRONMENT;

  let clientId;
  if (env === "prod") {
    clientId = process.env.PROD_CLIENT_ID;
  } else {
    clientId = process.env.DEV_CLIENT_ID;
  }

  try {
    const webhooks = await message.guild.fetchWebhooks();
    let webhook = webhooks.find(wh => wh.token && wh.owner.id === clientId);
    if (!webhook) {
      webhook = await target_channel.createWebhook({ name: 'MoveHook' });
    }
    if (webhook.channel !== target_channel) {
      await webhook.edit({
        channel: target_channel,
      });
    }

    const attachments = message.attachments.map(attachment => ({
      attachment: attachment.url,
      name: attachment.name,
    }));
    const embeds = message.embeds.map(embed => embed.toJSON());

    // Determine the sender's name using nickname > displayName > username
    const senderName = message.member?.nickname || message.member?.displayName || message.author.username;

    if (message.reference) {
      try {
        // Fetch the referenced message
        const referencedMessage = await message.channel.messages.fetch(message.reference.messageId);
        const messageLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${referencedMessage.id}`;
        const replyContent = `╭ Replying to ${referencedMessage.author} ${referencedMessage.content ? referencedMessage.content.slice(0, 11) + '...' : '[Attachment]'}`;
        
        await webhook.send({
          content: replyContent,
          username: senderName,
          avatarURL: message.author.avatarURL(),
          channel: target_channel,
        });
        // Await a delay of 1.5 seconds
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (error) {
        console.error('Error fetching referenced message:', error);
      }
    }

    await webhook.send({
      content: message.content,
      username: senderName,
      avatarURL: message.author.avatarURL(),
      channel: target_channel,
      files: attachments,
      embeds: embeds,
      threadId: thread_id,
    });

    // message.delete()

  } catch (error) {
    console.error(`Error sending or fetching the webhook: ${error}`);
    throw new Error(`Error sending or fetching the webhook: ${error.message}`);
  }
};
