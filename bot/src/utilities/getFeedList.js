const getFeedList = async client => {
  const feedList = {};
  await Promise.all(
    client.guilds.map(async guild => {
      try {
        const textChannels = guild.channels.filter(
          channel => channel.type === "text"
        );
        for (const [channelId, textChannel] of textChannels) {
          const pinnedMessages = await textChannel.fetchPinnedMessages();
          const rssMessages = pinnedMessages.filter(
            message =>
              message.content.includes("rss") &&
              message.author.id === client.user.id
          );
          const rssUrl = rssMessages.map(
            message => message.content.match(/rss URL: <([^>]+)>/)[1]
          )[0];

          if (rssUrl) {
            feedList[guild.id] = { channels: { [channelId]: rssUrl } };
          }
        }
      } catch (error) {
        console.error(error);
      }
    })
  );
  console.log(feedList);
};

module.exports = { getFeedList };
