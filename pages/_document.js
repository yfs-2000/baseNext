import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    //lang 语言  alternate当前语言的链接  谷歌搜索用
    //当前文件里面定义所有页面通用的布局
    return (
        <Html lang="en">
            <Head>
                <meta name="theme-color" content="#000000" />
                <meta
                    name="keywords"
                    content=""
                />
                <link rel="alternate" hrefLang="en" href="https://nft.luxfi.io/" />
                <link
                    rel="alternate"
                    hrefLang="x-default"
                    href="https://nft.luxfi.io/"
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/logo192.png" />
                <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}