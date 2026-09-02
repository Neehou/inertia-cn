# CLAUDE.md

## 项目
- **名称**：inertiapd.cn（Inertia 广州易纳官网，中英双语）
- **类型**：纯静态网站，无框架、无构建、无后端
- **域名**：`inertiapd.cn`

## 技术栈
- HTML5 + CSS3 + 原生 JavaScript
- 图片：WebP 多尺寸（480w/960w/1440w）+ `<picture>` 标签
- 设计 token：藏青 `#160C4B` + 金色 `#ffc000`（见 `css/style.css` 的 `:root`）

## 结构
- `zh/` 中文版，`en/` 英文版（同构，改动必须同步）
- `css/`、`js/`、`img/`、`index.html`、`404.html`、`sitemap.xml`、`robots.txt`、`llms.txt`

## 托管与部署
- 托管在 **Cloudflare Pages**（项目 `inertia-cn`），**不是 GitHub Pages**
- 部署用 CLI：`npx -y wrangler pages deploy <干净目录> --project-name inertia-cn`
- 维护规则详见项目根目录的《网站维护规则.md》

## 注意
- 仓库里**禁止**添加 `wrangler.jsonc` / `wrangler.toml`（会误判成 Workers 模式）
- 代码里域名一律写 `inertiapd.cn`，禁止出现 `pages.dev` / `neehou.github.io`
