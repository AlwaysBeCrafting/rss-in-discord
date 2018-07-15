import Feed = require("feed-to-json-promise");
import { Client, TextChannel } from "discord.js";

const client = new Client();
const feed = new Feed();

const serverID = "458034851296313375";

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  addFeedChannel("https://xkcd.com/rss.xml", serverID);
  const rss = await feed.load("https://xkcd.com/rss.xml");
  const channelId = client.channels
    .filter(channel => channel.type === "text")
    .find(
      (channel: TextChannel) =>
        channel.name === rss.title.toLowerCase().replace(/[^a-z0-9]/g, "")
    ).id;
  getFeedItems("https://xkcd.com/rss.xml")
    .then(items =>
      items.forEach(item => {
        const channel = client.channels.get(channelId) as TextChannel;
        channel.send(item.link);
      })
    )
    .catch(console.error);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.login("NDY3ODE4MjQxNjM3NDgyNTA2.DiwNcA.2ioTOx8iFIj5KnBvMZe07lNDZVU");

const addFeedChannel = async (url: string, guildID: string) => {
  const channelName = await feed.load(url).then(feed => feed.title);
  const guild = client.guilds.find(guild => guild.id === guildID);
  if (
    !guild.channels.find(
      channel =>
        channel.type === "text" &&
        channel.name === channelName.toLowerCase().replace(/[^a-z0-9]/g, "")
    )
  ) {
    guild.createChannel(channelName, "text");
  }
};

const getFeedItems = async (url: string) => {
  return feed.load(url).then(rss => rss.items);
};
