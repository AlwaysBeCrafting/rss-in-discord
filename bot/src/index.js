const { Client } = require("discord.js");

const commands = require("./commands");
const { getFeed } = require("./utilities/getFeed");
const { updateFeeds } = require("./utilities/updateFeeds");
const { getRssList } = require("./utilities/getRssList");

const serverId = "458034851296313375";

const client = new Client();

const runCommand = async (args, msg) => {
  const [cmd, ...rest] = args;
  const command = commands[cmd] || commands.help;
  const result = await command(rest, serverId, client);
  await msg.reply(result);
};

const start = async () => {
  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
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
    await client.login(process.env.BOT_TOKEN);
    setInterval(async () => {
      const feedList = await getRssList(client);
      const update = updateFeeds(feedList, client);
    }, 300000);
  } catch (error) {
    console.error(error);
  }
};

start();
