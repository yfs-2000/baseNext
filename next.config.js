/**
 * @type {import('next').NextConfig}
 */
const path = require("path");
const withTM = require("next-transpile-modules")([]); //部分组件需要如echarts  ['echarts', 'zrender']
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false, //禁用Analyzer  可打开分析
});
const { i18n } = require("./next-i18next.config");
module.exports = withBundleAnalyzer(
  withTM({
    sassOptions: {
      //使用sass导入函数和变量等
      includePaths: [path.join(__dirname, "common/css")],
      prependData: `@import "theme.scss";`,
    },
    images: {
      //图片地址
      domains: ["lux-std-img.obs.ap-southeast-1.myhuaweicloud.com"],
      minimumCacheTTL: 86400,
    },
    compiler: {
      removeConsole:
        process.env.NEXT_PUBLIC_ENV !== "production"
          ? false
          : {
              exclude: ["error"],
            },
      // Uncomment this to suppress all logs.
      // removeConsole: true,
    },
    i18n,
  })
);
