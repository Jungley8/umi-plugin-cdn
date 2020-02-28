# umi-plugin-cdn

[![NPM version](https://img.shields.io/npm/v/umi-plugin-cdn.svg?style=flat)](https://npmjs.org/package/umi-plugin-cdn)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-cdn.svg?style=flat)](https://npmjs.org/package/umi-plugin-cdn)

umi 上传到 CDN 的插件（目前支持 qiniu，aliyun oss）

## Usage

```bash
yarn add umi-plugin-cdn
# or
npm install umi-plugin-cdn
```

Configure in `.umirc.js`,

```js
export default {
  plugins: [["umi-plugin-cdn", options]]
};
```

## Options

```js
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
];
```

> 注意，publicPath 地址后缀需要带上 / ，否则上传后的地址变成 `https://static-qiniu.com.comstatic/logo.png`
> 注意，七牛的 path 参数，同样的原因，在在字符串尾部加上一个 /

## ENV

环境变量 `UPLOAD_CDN` 等于 `none` 的时候，不上传静态资源

## LICENSE

MIT
