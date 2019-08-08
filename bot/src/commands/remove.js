const { getFeed } = require("../utilities/getFeed");

module.exports = async (args, message, client) => {
  const [url] = args;
  if (!url) {
    return `Usage: @RnD remove <rss URL>`;
  }
  try {
    const rssFeed = await getFeed(url);
    const guild = message.guild;
    const channelName = rssFeed.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const channel = await guild.channels.find(
      ch => ch.name === channelName && ch.type === "text"
    );
    if (!channel) {
      return `Channel for ${url} doesn't exist.`;
    }
    await channel.delete();
    return `Channel removed.`;
  } catch (error) {
    console.error(error.name);
    return `Invalid rss URL.
      Usage: @RnD remove <rss URL>`;
  }
};
