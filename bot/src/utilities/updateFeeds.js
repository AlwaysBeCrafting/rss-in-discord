const { getFeed } = require("./getFeed");

const updateFeeds = async (feedList, client) => {
  const rssUrls = extractRssUrls(feedList);
  const feeds = fetchFeeds(rssUrls);
};

const sendRssItems = async (rssItems, channelId, client) => {
  try {
    for (const item of rssItems) {
      const channel = await client.channels.get(channelId);
      const message = await channel.send(`${item.title}: <${item.link}>`);
      await message.react("↘");
    }
  } catch (error) {
    console.error(error);
  }
};

const extractRssUrls = feedList => {
  const rssUrlsSet = new Set();
  for (const [guild, channels] of Object.entries(feedList)) {
    for (const [channelId, rssUrl] of Object.entries(channels)) {
      rssUrlsSet.add(rssUrl);
    }
  }
  return [...rssUrlsSet];
};

const fetchFeeds = async urlList => {
  console.log(urlList);
  const feeds = {};
  try {
    for (const url of urlList) {
      feeds[url] = await getFeed(url);
    }
  } catch (error) {
    console.error(error);
  }
  console.log(feeds);
};
module.exports = { updateFeeds };
