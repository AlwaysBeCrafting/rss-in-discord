import { load } from "rss-to-json";

load("https://xkcd.com/rss.xml", (_, rss) => console.log(rss));
