# Weijiang

个人博客，用 [Astro](https://astro.build) 生成静态页面，发布在 GitHub Pages。

## 写一篇文章

在 `src/content/posts/` 下新建一个 `.md` 文件。文件名就是网址的一部分，用英文或拼音，例如 `writing-as-thinking.md` 对应 `/posts/writing-as-thinking/`。

文件开头写这几项：

```md
---
title: 文章标题
subtitle: 可选的英文副标题
description: 可选，一句话摘要，用于 RSS 和搜索引擎
date: 2026-11-16
category: 随笔        # 随笔 或 技术
tags: [写作]          # 可选
lang: zh              # 英文文章写 en，标题会自动用衬线体
draft: false          # true 则只在本地预览，不发布
---
```

正文用 Markdown。支持脚注（`[^1]`）、表格、代码块；`---` 会显示成三个点的章节分隔；`*强调*` 在中文文章里显示为楷体。

推送到 `master` 分支后，GitHub Actions 会自动构建并发布。

## 本地预览

```sh
npm install
npm run dev
```

## 改设计

- 颜色、字体、宽度：`src/styles/global.css` 开头的变量。
- 站名、首页引文：`src/site.mjs`。
- 关于页的文字：`src/content/about.md`。
- 导航：`src/layouts/Base.astro`。标签页已经生成在 `/tags/`，只是导航里还没有入口。

## 旧站

原来的 Jekyll 站点备份在 `old-site` 分支。
