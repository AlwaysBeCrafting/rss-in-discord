const Feed = require("feed-to-json-promise");
const feed = new Feed();

const getFeed = async url => {
  const rssFeed = await feed.load(url);
  return rssFeed;
};

module.exports = { getFeed };
