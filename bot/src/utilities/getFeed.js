const Feed = require("feed-to-json-promise");
const feed = new Feed();

const getFeed = async url => {
  try {
    const rssFeed = await feed.load(url);
    return rssFeed;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getFeed };
