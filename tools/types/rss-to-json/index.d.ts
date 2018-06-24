// Type definitions for rss-to-json

declare module "rss-to-json" {
  export function load(
    url: string,
    callback: (error: Error, channel: Channel) => void
  ): void;

  export interface Channel {
    title: string;
    description: string;
    url: string;
    items: Item[];
  }

  export interface Item {
    title: string;
    description: string;
    link: string;
    url: string;
    created: number;
    enclosures: Enclosure[];
  }

  export interface Enclosure {
    url: string;
    length: number;
    type: string;
  }
}
