使用next的web3项目模板
状态库使用的是zustand  小巧 而且不需要Provider包裹
国际化使用的是next-i18next 使用时页面需要使用serverSideTranslations
ui库使用chakra-ui 小巧而且有响应式  form表单可以和react-hook-form一起使用 更好用
dotenv-cli 配置环境变量
ethersjs为以太坊交互的js库 相比web3js 更小  aip更加简单明了
添加nprogress作为路由跳转时的进度条
css使用module.scss,使用css变量+scss函数为响应式计算,加上部分媒体查询
使用prettier格式化代码
代码质量方面使用eslint控制
站点地图使用next-sitemap自动生成
seo方面  每个页面需要到处next head自定义title,跳转等使用a标签,语义化主要h标签的使用
图片使用next 导出的next/image 更小  可以控制缓存等
字体使用@next/font优化