declare module "feed-to-json-promise" {
  export = Feed;

  class Feed {
    load(url: string, options?: Feed.Options): Promise<Feed.Channel>;
    constructor(options?: Feed.Options);
  }

  namespace Feed {
    interface Options {
      count?: number;
      timeout?: number;
    }

    interface Channel {
      title: string;
      description: string;
      link: string;
      image: Image;
      items: Item[];
    }

    interface Image {
      url: string;
      title: string;
      description: string;
      width: number;
      height: number;
      type: string;
    }

    interface Item {
      title: string;
      description: string;
      link: string;
      date: string;
      guid: string;
      categories: string[];
      thumbnail: string;
      media: Image;
    }
  }
}
