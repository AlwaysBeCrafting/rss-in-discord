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
      await commands.add([rssFeed], "none", serverId, client);
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
    runCommand(args, msg);
  }
});

try {
  client.login(process.env.BOT_TOKEN);
} catch (error) {
  console.log(error);
}

const runCommand = (args, msg) => {
  const [cmd, ...rest] = args;
  if (!commands[cmd]) {
    console.log("command not found");
    return;
  }
  commands[cmd](rest, msg, serverId, client);
};
