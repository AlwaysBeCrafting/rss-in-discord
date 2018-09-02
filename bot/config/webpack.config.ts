import Webpack from "webpack";
import { path } from "app-root-path";

const config: Webpack.Configuration = {
  entry: "./src/index.ts",
  resolve: { mainFields: ["main", "module"] },
  module: {
    rules: [
      {
        test: /.*\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  output: {
    path: `${path}/build`,
    filename: "bot.js"
  },
  mode: "development",
  target: "node"
};

export default config;
