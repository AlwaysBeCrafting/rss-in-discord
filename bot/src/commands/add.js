const { getFeed } = require("../utilities/getFeed");

module.exports = async (args, guildId, client) => {
  const [url] = args;
  if (!url) {
    return `Usage: @RnD add <rss URL>
      Ex: @RnD add <https://xkcd.com/rss.xml>`;
  }
  try {
    const rssFeed = await getFeed(url);
    const guild = await client.guilds.find(guild => guild.id === guildId);
    const channelName = rssFeed.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    let channel = guild.channels
      .filter(ch => ch.type === "text")
      .find(ch => ch.name === channelName);
    if (!channel) {
      channel = await guild.createChannel(channelName, "text");
    }
    sendMessage(rssFeed.items, channel.id, client);
    return `Feed Added.`;
  } catch (error) {
    console.error(error.name);
    return `Invalid rss URL.
      Usage: @RnD add <rss URL>
      Ex: @RnD add <https://xkcd.com/rss.xml>`;
  }
};

const sendMessage = async (message, channelId, client) => {
  try {
    for (const item of message) {
      const channel = await client.channels.get(channelId);
      await channel.send(
        `${item.title}:\n<${item.link}>\n--------------------`
      );
    }
  } catch (error) {
    console.error(error);
  }
};
