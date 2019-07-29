const { Client } = require("discord.js");

const commands = require("./commands");
const { getFeed } = require("./utilities/getFeed");

const feedList = ["https://xkcd.com/rss.xml"];
const serverId = "458034851296313375";

const client = new Client();

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  for (const rssFeed of feedList) {
    try {
      await commands.add([rssFeed], serverId, client);
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
    return runCommand(args, msg);
  }
});

try {
  client.login(process.env.BOT_TOKEN);
} catch (error) {
  console.error(error);
}

const runCommand = async (args, msg) => {
  const [cmd, ...rest] = args;
  const command = commands[cmd] || commands.help;
  const result = await command(rest, serverId, client);
  await msg.reply(result);
};
