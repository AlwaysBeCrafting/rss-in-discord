const { getFeed } = require("../utilities/getFeed");

module.exports = async (args, msg, guildId, client) => {
  const [url] = args;
  if (!url) {
    await msg.reply(
      `Usage: @RnD remove <rss URL>
      Ex: @RnD remove <https://xkcd.com/rss.xml>`
    );
  }
  try {
    const rssFeed = await getFeed(url);
    const guild = await client.guilds.find(guild => guild.id === guildId);
    const channelName = rssFeed.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    let channel = guild.channels
      .filter(ch => ch.type === "text")
      .find(ch => ch.name === channelName);
    if (!channel) {
      await msg.reply(`Channel for ${url} doesn't exist.`);
      return;
    }
    await channel.delete();
    await msg.reply(`Channel removed.`);
  } catch (error) {
    console.error(error.name);
    await msg.reply(`Invalid rss URL.
      Usage: @RnD remove <rss URL>
      Ex: @RnD remove <https://xkcd.com/rss.xml>
    `);
  }
};
