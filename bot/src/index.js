const { Client } = require("discord.js");

const commands = require("./commands/index");
const { getFeed } = require("./utilities/getFeed");

const client = new Client();
const feedList = ["https://xkcd.com/rss.xml"];
const serverId = "458034851296313375";

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  for (const rssFeed of feedList) {
    try {
      const channelId = await commands.add(rssFeed, serverId, client);
      const feed = await getFeed(rssFeed);
      sendFeedItems(feed.items, channelId);
    } catch (error) {
      console.error(error);
    }
  }
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  if (!msg.mentions.users.size) {
    return;
  } else if (msg.mentions.users.first().username === "RnD") {
    const args = msg.content.split(/\s+/);
    args.shift();
    runCommand(args);
  }
});

try {
  client.login(process.env.BOT_TOKEN);
} catch (error) {
  console.log(error);
}

const sendFeedItems = async (items, channelId) => {
  try {
    for (const item of items) {
      const channel = await client.channels.get(channelId);
      await channel.send(
        `${item.title}:\n<${item.link}>\n--------------------`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const runCommand = args => {
  if (!commands[args[0]]) {
    console.log("command not found");
    return;
  }

  commands[args[0]](args[1], serverId, client);
};
