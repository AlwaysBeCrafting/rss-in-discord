const { getFeed } = require("../utilities/getFeed");

const add = async (args, guildId, client) => {
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

    await sendLegend(url, channel.id, client);
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
      const message = await channel.send(`${item.title}: <${item.link}>`);
      await message.react("↘");
    }
  } catch (error) {
    console.error(error);
  }
};

const sendLegend = async (url, channelId, client) => {
  const pinnedMessage = `rss URL: <${url}>
  Legend: 
    Expand message:   :arrow_lower_right: 
    Collapse message: :arrow_upper_left: 

Click the X to Unsubscribe`;
  try {
    const channel = await client.channels.get(channelId);
    const message = await channel.send(pinnedMessage);
    await message.react("❌");
    return message.pin();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { add };
