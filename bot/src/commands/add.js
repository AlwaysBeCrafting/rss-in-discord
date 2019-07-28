const { getFeed } = require("../utilities/getFeed");

module.exports = async (url, guildId, client) => {
  try {
    console.log(client);
    const rssFeed = await getFeed(url);
    const guild = client.guilds.find(guild => guild.id === guildId);
    const channelName = rssFeed.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const channel = guild.channels
      .filter(ch => ch.type === "text")
      .find(ch => ch.name === channelName);
    if (!channel) {
      const newChannel = await guild.createChannel(channelName, "text");
      return newChannel.id;
    }
    return channel.id;
  } catch (error) {
    console.log(error);
  }
};
