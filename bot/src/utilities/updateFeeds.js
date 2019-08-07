const { getFeed } = require("./getFeed");
const { sendRssItems } = require("./sendRssItems");

const updateFeeds = async (feedList, client) => {
  const rssUrls = extractRssUrls(feedList);
  try {
    const fetchedFeeds = await fetchFeeds(rssUrls);
    for (const [channelId, rssUrl] of Object.entries(feedList)) {
      const sendItems = await sendRssItems(
        fetchedFeeds[rssUrl],
        channelId,
        client
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const extractRssUrls = feedList => {
  const rssUrlsSet = new Set(Object.values(feedList));
  return [...rssUrlsSet];
};

const fetchFeeds = async urlList => {
  const feeds = {};
  try {
    for (const url of urlList) {
      feeds[url] = await getFeed(url);
    }
  } catch (error) {
    console.error(error);
  }
  return feeds;
};

module.exports = { updateFeeds };
