const crossMark = async (message_id, channel_id, client) => {
  try {
    const channel = await client.channels.get(channel_id);
    const message = await channel.fetchMessage(message_id);
    const isClientUser = message.author.id === client.user.id;
    const isLegend = RegExp(/^rss URL:*/).test(message.content);
    if (!(message.pinned && isClientUser && isLegend)) {
      return;
    }
    channel.delete();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { crossMark };
