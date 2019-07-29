const { getFeed } = require("../utilities/getFeed");

module.exports = async (args, guildId, client) => {
  const [url] = args;
  if (!url) {
    return `Usage: @RnD add <rss URL>`;
  }
  try {
    const rssFeed = await getFeed(url);
    const guild = await client.guilds.find(guild => guild.id === guildId);
    const channelName = rssFeed.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const channel =
      (await guild.channels.find(
        ch => ch.name === channelName && ch.type === "text"
      )) || (await guild.createChannel(channelName, "text"));
    await sendPinnedMessage(`rss URL: <${url}>`, channel.id, client);
    await sendRssItems(rssFeed.items, channel.id, client);
    return `Feed Added.`;
  } catch (error) {
    console.error(error.name);
    return `Invalid rss URL.
      Usage: @RnD add <rss URL>`;
  }
};

const sendRssItems = async (rssItems, channelId, client) => {
  try {
    for (const item of rssItems) {
      const channel = await client.channels.get(channelId);
      await channel.send(`${item.title}: <${item.link}>`);
    }
  } catch (error) {
    console.error(error);
  }
};

const sendPinnedMessage = async (msg, channelId, client) => {
  try {
    const channel = await client.channels.get(channelId);
    const message = await channel.send(msg);
    return message.pin();
  } catch (error) {
    console.error(error);
  }
};
