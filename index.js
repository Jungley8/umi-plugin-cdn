// ref:
// - https://umijs.org/plugin/develop.html
const path = require("path");
const QiniuPlugin = require("./webpack.qiniu");
const AliyunPlugin = require("./webpack.aliyun");

const DEFAULT_OPTIONS = {
  cdn: "qiniu", // qiniu ，aliyun
  publicPath: "/",
  config: {
    accessKey: "",
    secretKey: "",
    bucket: "",
    path: "", // 七牛CDN用
    region: "", // 阿里云OSS用
    exclude: /\.html$/
  }
};

module.exports = function(api, options) {
  // Example: output the webpack config
  options = { ...DEFAULT_OPTIONS, ...options };
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    return;
  }
  const notUpload = process.env.UPLOAD_CDN === "none";
  // 不上传图片到CDN
  if (notUpload) {
    return;
  }

  // 检查配置是否完整
  let isValid = false;
  let cdnConfig = options.config || {};
  if (cdnConfig.accessKey && cdnConfig.secretKey && cdnConfig.bucket) {
    if (options.cdn === "qiniu") {
      isValid = true;
    } else if (options.cdn === "aliyun" && cdnConfig.region) {
      isValid = true;
    }
  }

  if (!isValid) {
    api.log.info("cdn config is incomplete~~");
    return;
  }

  // 修改 webpack 插件
  api.modifyWebpackConfig(webpackConfig => {
    let cdnPlugin = null;
    switch (options.cdn) {
      case "qiniu":
        // 静态资源前缀
        webpackConfig.output.publicPath = path.join(
          options.publicPath,
          cdnConfig.path
        );
        cdnPlugin = new QiniuPlugin({
          accessKey: cdnConfig.accessKey,
          secretKey: cdnConfig.secretKey,
          bucket: cdnConfig.bucket,
          path: cdnConfig.path,
          exclude: cdnConfig.exclude
        });
        break;
      case "aliyun":
        // 静态资源前缀
        webpackConfig.output.publicPath = path.join(options.publicPath, cdnConfig.ossDir);
        cdnPlugin = new AliyunPlugin({
          ossDir: cdnConfig.ossDir,
          accessKeyId: cdnConfig.accessKey,
          accessKeySecret: cdnConfig.secretKey,
          bucket: cdnConfig.bucket,
          region: cdnConfig.region,
          exclude: cdnConfig.exclude
        });
        break;
    }
    cdnPlugin && webpackConfig.plugins.push(cdnPlugin);
    return webpackConfig;
  });
};
