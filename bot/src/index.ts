import Feed = require("feed-to-json-promise");
import { Client, TextChannel } from "discord.js";

const client = new Client();
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

client.login(process.env.BOT_TOKEN);

const addFeedChannel = async (url: string, guildId: string) => {
  const rssFeed = await feed.load(url);
  const guild = client.guilds.find(guild => guild.id === guildId);
  const channelName = rssFeed.title.toLowerCase().replace(/[^a-z0-9]/g, "");
  const channel = guild.channels
    .filter(ch => ch.type === "text")
    .find((ch: TextChannel) => ch.name === channelName);
  if (!channel) {
    const newChannel = await guild.createChannel(channelName, "text");
    return newChannel.id;
  }
  return channel.id;
};

const getFeedItems = async (url: string) => {
  const rssFeed = await feed.load(url);
  return rssFeed.items;
};

const sendFeedItems = async (items: Array<Feed.Item>, channelId: string) => {
  await Promise.all(
    items.map(item => {
      const channel = client.channels.get(channelId) as TextChannel;
      return channel.send(
        `${item.title}:\n<${item.link}>\n--------------------`
      );
    })
  );
};
