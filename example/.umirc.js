import { join } from "path";

export default {
  hash: true,
  plugins: [
    [
      join(__dirname, "..", require("../package").main || "index.js"),
      {
        cdn: "aliyun", // qiniu ，aliyun
        // qiniu 的配置参数,建议使用环境变量来
        // publicPath: "https://static-qiniu.com.com/",
        // config: {
        //   accessKey: "xxxxxxx",
        //   secretKey: "xxxxxxx",
        //   bucket: "xxxxxxx",
        //   path: "xxxxxxx/",
        //   exclude: /\.html$/
        // }
        // 阿里云OSS 的参数
        publicPath: "https://static-aliyun.com.com/",
        config: {
          accessKey: "xxxxxxx",
          secretKey: "xxxxxxx",
          bucket: "xxxxxxx",
          region: "xxxxxxx",
          exclude: /\.html$/
        }
      }
    ]
  ]
};
