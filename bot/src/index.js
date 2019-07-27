const Feed = require("feed-to-json-promise");
const discord = require("discord.js");

const client = new discord.Client();
const feed = new Feed();

const serverID = "458034851296313375";

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const rssFeed = "https://xkcd.com/rss.xml";
  const channelId = await addFeedChannel(rssFeed, serverID);
  try {
    const items = await getFeedItems(rssFeed);
    sendFeedItems(items, channelId);
  } catch (error) {
    console.error(error);
  }
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.login("NDY3ODE4MjQxNjM3NDgyNTA2.Dm0ucA.XiqUpB5PMrAOA3OEl0KSIYUjreE");

const addFeedChannel = async (url, guildId) => {
  const rssFeed = await feed.load(url);
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
};

const getFeedItems = async url => {
  const rssFeed = await feed.load(url);
  return rssFeed.items;
};

const sendFeedItems = async (items, channelId) => {
  await Promise.all(
    items.map(item => {
      const channel = client.channels.get(channelId);
      return channel.send(
        `${item.title}:\n<${item.link}>\n--------------------`
      );
    })
  );
};
