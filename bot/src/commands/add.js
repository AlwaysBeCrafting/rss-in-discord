const { getFeed } = require("../utilities/getFeed");
const { sendRssItems } = require("../utilities/sendRssItems");

const add = async (args, message, client) => {
  const [url] = args;
  if (!url) {
    return `Usage: @RnD add <rss URL>`;
  }
  try {
    const rssFeed = await getFeed(url);
    const guild = message.guild;
    const channelName = rssFeed.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const channelExists = await guild.channels.find(
      ch => ch.name === channelName && ch.type === "text"
    );

    if (channelExists) {
      return `Channel ${url} already exists.`;
    }

    const channel = await guild.createChannel(channelName, "text");
    await sendLegend(url, channel.id, client);
    await sendRssItems(rssFeed, channel.id, client);
    return `Feed Added.`;
  } catch (error) {
    console.error(error.name);
    return `Invalid rss URL.
      Usage: @RnD add <rss URL>`;
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
