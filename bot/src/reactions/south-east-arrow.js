const southEastArrow = async (message_id, channel_id, client) => {
  try {
    const channel = await client.channels.get(channel_id);
    const message = await channel.fetchMessage(message_id);
    const parsedMessageContent = message.content.match(/([^<]+)<([^>]+)>/);
    if (parsedMessageContent) {
      const title = parsedMessageContent[1];
      const url = parsedMessageContent[2];
      await message.edit(`${title}${url}`);
      await message.clearReactions();
      await message.react("↖");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { southEastArrow };
