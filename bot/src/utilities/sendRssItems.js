const _ = require("lodash");

const sendRssItems = async (rssItems, channelId, client) => {
  try {
    const channel = await client.channels.get(channelId);
    const channelMessages = await channel.fetchMessages({
      limit: _.size(rssItems.items)
    });
    const messageContents = channelMessages.map(message => message.content);
    for (const item of rssItems.items) {
      const rssMessage = `${item.title}: <${item.link}>`;

      if (
        !messageContents.find(
          msg =>
            msg === `${item.title}: <${item.link}>` ||
            msg === `${item.title}: ${item.link}`
        )
      ) {
        const message = await channel.send(`${item.title}: <${item.link}>`);
        await message.react("↘");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendRssItems };
