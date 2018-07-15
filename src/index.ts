import { load } from "rss-to-json";
import { Client, TextChannel } from "discord.js";

const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  say("467844728990466049", "hello world");
});

const say = (id: string, message: string) => {
  client.guilds.forEach(guild => {
    const channel = guild.channels.find(
      channel => channel.type === "text" && channel.id === id
    ) as TextChannel;
    if (!channel) return;
    channel.send(message);
  });
};

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  if (msg.content === "rss") {
    msg.guild
      .createChannel("test", "text")
      .then(() =>
        client.guilds.forEach(guild =>
          console.log(guild.channels.find("name", "test"))
        )
      );
  }
});

client.login("NDY3ODE4MjQxNjM3NDgyNTA2.DiwNcA.2ioTOx8iFIj5KnBvMZe07lNDZVU");

load("https://xkcd.com/rss.xml", (_, rss) => console.log(rss));
