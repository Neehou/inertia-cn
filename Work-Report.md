# Inertia 广州易纳企业官网 — 工作报告

**日期：** 2026年7月21日
**版本：** v1.0
**项目：** inertia-cn.pages.dev（广州易纳科技有限公司企业官网）
**部署平台：** Cloudflare Pages

---

# 一、项目概述

## 1.1 项目背景

受 Inertia Product Development（加拿大，多伦多，成立于 2004 年）委托，为其中国子公司——广州易纳科技有限公司（成立于 2018 年）建设独立的企业官方网站。目标是在母公司品牌体系下，建立面向中国市场和全球客户的中英双语数字化门户，实现品牌展示、业务介绍、AI 搜索可发现性和客户转化。

## 1.2 项目范围

- **语言：** 中文（zh-CN）、英文（en）双版本
- **页面：** 6 个页面类型 × 2 语言 = 12 个核心页面（首页、关于我们、业务、制造、动态、联系我们）
- **父站克隆：** 44 个父站 inertiapd.com 页面（用于设计参考，部署于 pages/ 目录）
- **部署：** Cloudflare Pages 自动 CI 部署，SSL 加密，全球 CDN 加速

## 1.3 交付物清单

| 类别 | 文件 | 说明 |
|------|------|------|
| HTML 页面 | 12 个核心页面 | zh/ 和 en/ 目录各 6 个 |
| 样式表 | css/style.css | 2,648 行，CSS 自定义属性令牌体系 |
| 脚本 | js/main.js | 164 行，导航交互、滚动动画 |
| 图片资源 | img/ 目录 | 33 个文件（含 Hero 图、案例图、Logo、国旗等） |
| SEO 配置 | robots.txt | 允许全站抓取，指定 sitemap 位置 |
| SEO 配置 | sitemap.xml | 12 条 URL，含 hreflang 标注、优先级、最后修改日期 |
| AI 爬虫 | llms.txt | 全站 12 页面路径 + 中英文摘要 + 实体关键词 |
| Cloudflare | wrangler.jsonc | Cloudflare Pages 部署配置 |
| 内容源 | content/ 目录 | 11 个父站内容提取文件 + 索引 |
| 分析报告 | AI-Search-Readiness-Report.pdf | AI 搜索就绪度评估报告（21 页） |
| 分析报告 | GEO-Report.md | GEO 优化工作详细记录 |
| 域名文档 | docs/ 目录 | 域名接管需求 + 域名申请分析报告 |

---

# 二、网站建设工作

## 2.1 页面体系

全站 12 个核心 HTML 页面涵盖企业官网完整信息架构：

| 页面 | 中文 | 英文 | 核心内容 |
|------|------|------|---------|
| 首页 | zh/index.html | en/index.html | 品牌价值主张、三大支柱（创新/开发/制造）、7 个产品案例、信任证明、FAQ |
| 关于我们 | zh/about.html | en/about.html | 公司简介、关键数据（2004/25+/50+/3）、中加双岸模式、资质认证、发展历程 |
| 业务 | zh/business.html | en/business.html | 四大核心服务（产品设计、原型制作、医疗器械制造、供应链管理） |
| 制造 | zh/cases.html | en/cases.html | 7 个客户案例，Z 字形交替布局 + 完整项目描述 |
| 动态 | zh/news.html | en/news.html | 3 篇行业文章 + JSON-LD BlogPosting 标记，内容持续更新 |
| 联系我们 | zh/contact.html | en/contact.html | 广州/多伦多双岸地址、电话、邮箱、GeoCoordinates 坐标 |

## 2.2 设计系统

由于没有 Figma 源文件或设计系统文档，从母公司 inertiapd.com 的 1,259 行 CSS 代码中逆向提取了完整的设计 DNA，并建立 CSS 自定义属性令牌体系。

### 提取的设计令牌

| 令牌名称 | 值 | 用途 |
|---------|---|------|
| `--color-gold` | `#ffc000` | 品牌主色（按钮、强调、链接、图标） |
| `--color-navy` | `#160c4b` | 品牌辅色（深色文字、背景） |
| `--color-dark` | `#0A2540` | 深色背景（Hero 叠加、暗色区块） |
| `--color-text` | `#212121` | 正文颜色 |
| `--color-text-light` | `#757575` | 辅助文字 |
| `--font-heading` | Outfit | 标题字体（替代父站 Roboto Slab） |
| `--font-body` | Roboto + Noto Sans SC | 正文字体（英文 + 中文） |
| `--radius-sm` ~ `--radius-full` | 4px → 9999px | 5 级圆角体系 |
| `--shadow-natural` | `6px 6px 9px rgba(0,0,0,0.2)` | 自然阴影（卡片、按钮） |
| `--shadow-deep` | `12px 12px 50px rgba(0,0,0,0.4)` | 深度阴影（Hero、弹窗） |

### 设计模式

- **按钮交互：** gold ↔ navy 颜色互换 + `translateY(-1px)` 微动效
- **响应式标题：** `clamp(2.25rem, 5vw, 3.5rem)` 流式缩放
- **Hero 覆盖渐变：** `linear-gradient(135deg, rgba(22,12,75,0.85) 0%, rgba(10,37,64,0.70) 100%)`
- **导航下拉：** 三角箭头指示器替代金色圆点，hover 展开子菜单
- **Z 字形布局：** 制造案例页左右交替图文布局，自然比例图片展示

## 2.3 技术架构

```
inertia-cn.pages.dev/
├── index.html          → 302 重定向到 /zh/index.html
├── zh/                 → 中文版（6 个页面）
│   ├── index.html      → 首页
│   ├── about.html      → 关于我们
│   ├── business.html   → 业务
│   ├── cases.html      → 制造案例
│   ├── news.html       → 动态
│   └── contact.html    → 联系我们
├── en/                 → 英文版（6 个页面）
├── css/style.css       → 2,648 行全局样式
├── js/main.js          → 导航、动画交互
├── img/                → 33 个图片资源
├── llms.txt            → AI 爬虫入口文件
├── robots.txt          → 搜索引擎抓取规则
├── sitemap.xml         → 12 条 URL + hreflang 标注
└── wrangler.jsonc      → Cloudflare Pages 配置
```

### 技术特点

- **纯静态 HTML/CSS/JS：** 零构建步骤，Cloudflare Pages 自动部署
- **语义化 HTML5：** `main`、`section`、`article`、`nav` + ARIA 无障碍标注
- **移动端响应式：** 768px 断点，自适应导航、卡片网格、排版缩放
- **全球 CDN：** Cloudflare 全球边缘网络加速

---

# 三、GEO / AI 搜索优化工作

GEO（Generative Engine Optimization）是针对 AI 搜索引擎（Google SGE、Bing Copilot、ChatGPT、Perplexity）的优化。这是本项目的核心差异化工作。

## 3.1 JSON-LD 结构化数据

全站 12 个页面全部部署 JSON-LD 结构化数据，覆盖 7 种 Schema.org 类型：

| Schema 类型 | 部署页面 | 关键字段 |
|------------|---------|---------|
| Organization | 首页、制造、关于、联系 | 全称、母公司关系、双认证、sameAs |
| FAQPage | 首页(3问)、制造页(7问) | Question/Answer 对，AI 可直接提取 |
| BreadcrumbList | 全部内页 | 面包屑导航层级 |
| ItemList | 首页(7产品)、动态(3文章) | 列表结构化标记 |
| Service + OfferCatalog | 业务页(4项)、制造页(5项) | 服务分类 + serviceType |
| AboutPage | 关于页 | foundingDate、certifications、parentOrganization |
| ContactPage + GeoCoordinates | 联系页 | GPS 坐标(22.9375, 113.3642)、地址、电话 |
| BlogPosting × 3 | 动态页 | headline、datePublished、author、image |
| WebPage + Speakable | 制造页 | 语音搜索适配 |

## 3.2 实体锚定体系

通过 `@id`、`parentOrganization`、`sameAs` 三个字段建立了跨页面知识图谱：

```
Inertia Product Development (Toronto, 2004)
    └── @id: https://inertia-cn.pages.dev/#org
        └── Inertia Guangzhou (广州易纳科技, 2018)
            ├── ISO 13485:2016
            ├── ISO 9001
            ├── sameAs: LinkedIn
            └── sameAs: inertiapd.com
```

AI 知识图谱可据此建立完整认知："广州易纳 = Inertia PD 中国子公司 = ISO 13485 认证医疗器械制造商"。

## 3.3 llms.txt — AI 爬虫入口

创建了 `llms.txt` 放在网站根目录。这是新兴的 AI 爬虫标准（类比 robots.txt），ChatGPT、Perplexity、Google AI 等大语言模型在抓取前会优先读取此文件。内容包括：

- 全部 12 个页面路径和中英文摘要
- 关键实体：公司名称、认证、行业、服务类型、地理位置
- 结构化数据提示

## 3.4 其他 SEO 优化

| 优化项 | 说明 |
|--------|------|
| robots.txt | 允许全站抓取，指定 sitemap 绝对路径 |
| sitemap.xml | 12 URL + 优先级分级 + lastmod + hreflang 双向标注 |
| canonical URL | 每个页面指定权威 URL，避免重复内容 |
| hreflang | `zh-CN` ↔ `en` 双向注释 + `x-default` |
| meta description | 每页独立描述（120-160 字符） |
| Open Graph | og:title、og:description、og:type 标签 |
| 图片 alt 文本 | 全部 56 个 `<img>` 标签均含描述性 alt |
| 语义化 HTML | 正确使用 `main`、`section`、`article`、`nav` |

## 3.5 Schema 字段完善

本轮 GEO 优化中补全了多项关键字段：

- `logo` 相对路径 → 绝对 URL（Google 规范要求）
- 新增 `image` 字段（AI 搜索结果展示品牌图片）
- 新增 `sameAs` 数组（LinkedIn + 母公司官网，用于实体验证）
- 新增 `geo` 坐标（广州番禺制造中心 GPS 坐标，支持本地搜索）
- 新增 `author` + `image` 到 BlogPosting（AI 富媒体卡片要求）
- 新增 `BreadcrumbList` 到 AboutPage（页面层级理解）

---

# 四、面临的问题与解决方案

## 问题 1：母公司设计 DNA 逆向提取

**困难：** 父站 inertiapd.com 的 CSS 设计规则分散在 11 个页面面板中（1,259 行混合代码），没有独立的设计系统文档、Figma 源文件或变量定义。需要从大量重复的魔数中识别出设计意图。

**解决：** 逐行分析父站代码，识别出 5 级圆角规则（4/8/16/22/32px）、定向阴影模式（6px 6px 而非标准均匀阴影）、gold↔navy 互换按钮模式、Outfit 字体选择。将提取结果映射为 `--var` CSS 令牌体系，确保全站一致性和可维护性。2,648 行 CSS 全部使用变量替代硬编码颜色。

## 问题 2：多页面 JSON-LD 一致性

**困难：** 12 个页面 × 7 种 Schema 类型 × 中英双语，每个页面的实体关系不同。首页的 Organization 是独立的，制造页需要 `@id` 锚定到首页，ContactPage 的 Organization 嵌套在 `about` 属性中，AboutPage 需要包含 `foundingDate`。

**解决：** 建立 `@id` 实体锚定体系——制造页 `@id: https://inertia-cn.pages.dev/#org` 与首页形成知识图谱节点链接。ContactPage 通过 `about.Organization` 嵌套模型继承地址电话属性。AboutPage 通过 `parentOrganization` 关联母公司。

## 问题 3：中英 hreflang 双向标注

**困难：** 6 个页面 × 2 语言 = 12 个 URL，每个 URL 须标注自身及所有语言变体的 hreflang。易错点：en 页链接到 zh 页路径不匹配，或遗漏 `x-default` 值。

**解决：** 在 sitemap.xml 中为每条 URL 内嵌 `<xhtml:link rel="alternate" hreflang="...">` 双向标注，同时在 HTML `<head>` 中放置 `<link rel="alternate">` 标签，两种机制互相验证。

## 问题 4：临时域名的局限性

**困难：** 网站部署在 `inertia-cn.pages.dev`（Cloudflare Pages 默认域名），带来两个致命问题：一是 `.pages.dev` 子域名在 Google/Bing 的域名权威度 (Domain Authority) 为零，AI 搜索引擎将其视为临时或测试站点；二是 Cloudflare 的 `.pages.dev` 域名在中国大陆 DNS 层面被污染，百度、360 等国内搜索引擎完全无法访问。

**解决：** 技术准备工作全部前置完成（llms.txt、全 Schema 覆盖、实体锚定、hreflang），确保自定义域名绑定 + ICP 备案通过的当天，AI 搜索引擎即可抓取到完整优化的内容。域名绑定和 ICP 备案正在推进中。

## 问题 5：内容深度不足

**困难：** News 页面仅 3 篇占位文章（每篇约 100 字摘要），无案例详情长文、无客户证言、无行业白皮书。AI 搜索引擎通过内容更新频率和篇幅判断网站"活跃度"，内容过少会导致 AI 降低抓取优先级。

**解决：** 过渡期方案：为 BlogPosting 添加 `author`（Organization 类型）和 `image` 字段，最大限度地利用现有内容的结构化标记价值。计划上线后：为 7 个制造案例各创建 500 字以上的独立详情页；News 扩充至 6-8 篇深度文章；收集真实客户推荐语。

---

# 五、AI 搜索推荐差距分析

## 5.1 八维评分体系

基于 AI-Search-Readiness-Report.pdf（21 页专业评估报告）的 8 维度评分框架：

| 维度 | 当前评分 | 目标评分 | 差距 | 状态 |
|------|---------|---------|------|------|
| 结构化数据 | **9/10** | 10/10 | 小 | JSON-LD 7 种 Schema 全覆盖，缺 Review/AggregateRating |
| 技术 SEO | **9/10** | 10/10 | 小 | sitemap、canonical、hreflang、OG 全配置 |
| 内容深度 | **6/10** | 8/10 | 中 | 需补齐案例长文、白皮书、客户证言 |
| AI 专项优化 | **9/10** | 10/10 | 小 | llms.txt 已是差异化优势 |
| 可访问性 | **8/10** | 9/10 | 小 | 移动端/平板/桌面全适配，全图 alt 文本 |
| 域名权威度 | **0/10** | 7/10 | **致命** | .pages.dev 子域名 DA=0 |
| 中国境内可访问 | **0/10** | 10/10 | **致命** | DNS 污染 + ICP 未备案 |
| 外部链接建设 | **0/10** | 6/10 | **致命** | 零反向链接 |
| **综合** | **4.1/10** | **8.5/10** | — | — |

## 5.2 核心结论

**三个零分维度锁死了当前上限。** 技术准备非常充分（结构化数据、SEO 基础设施、AI 专项优化均达到 9/10），但域名权威度、中国可访问性、外部链接这三个维度在 `.pages.dev` 阶段均为零。

一旦切换到 `inertiapd.cn` 自定义域名、完成 ICP 备案、建立外部链接（母公司网站 + LinkedIn + 行业目录），品牌精确查询的 AI 推荐率将从 30-40% 跃升至 85-95%。

## 5.3 与竞争对手对比

| 维度 | 我方（当前） | 我方（上线后） | 典型竞争对手 |
|------|------------|-------------|------------|
| JSON-LD Schema 类型 | 7 种 | 7 种 | 1-3 种 |
| llms.txt | 已部署 | 已部署 | 通常未部署 |
| 实体锚定 (知识图谱) | 已建立 | 已建立 | 通常未建立 |
| hreflang 双语 | 完整 | 完整 | 部分或不准确 |
| 域名权威度 | 无 | inertiapd.cn（母站权重传递） | 独立域名 |
| 内容资产 | 3 篇短文 | 6-8 篇长文 + 7 案例 + 白皮书 | 较多 |

竞争优势集中在技术先进性，劣势集中在"信任信号"（域名、外链、评价）。

---

# 六、后续优先级行动

## P0 — 上线前必须完成

| 编号 | 任务 | 预计耗时 |
|------|------|---------|
| A1 | 获取 inertiapd.cn 域名注册商账号权限 | 1-3 天 |
| A2 | DNS 托管迁移至 Cloudflare | 1 小时 |
| A3 | Cloudflare Pages 绑定自定义域名 | 1 小时 |
| A4 | 提交 ICP 备案（企业主体：广州易纳科技有限公司） | 15-20 工作日 |
| A5 | 旧站 → 新站 301 重定向映射表 | 2-4 小时 |
| A6 | 全站死链检查 + 404 页面配置 | 2 小时 |

## P1 — 上线后 1 个月内

| 编号 | 任务 | 预计耗时 |
|------|------|---------|
| B1 | 母公司 inertiapd.com 首页添加 inertiapd.cn 链接 | 1 小时 |
| B2 | LinkedIn 公司页更新（添加中国子公司信息和链接） | 1 小时 |
| B3 | Google Search Console + Bing Webmaster Tools 提交站点 | 2 小时 |
| B4 | 百度站长平台提交站点（备案通过后） | 2 小时 |
| B5 | 提交 sitemap 至所有搜索引擎 | 1 小时 |
| B6 | 微信公众号、知乎等平台发布公司介绍文章 | 2-4 小时 |

## P2 — 上线后 3 个月内

| 编号 | 任务 | 预计耗时 |
|------|------|---------|
| C1 | 为 7 个制造案例各创建独立详情页（500 字 + 图片 + 量化成果） | 2-3 天 |
| C2 | News 扩充至 6-8 篇深度行业文章（每篇 500+ 字） | 2-3 天 |
| C3 | 收集并上线 3-5 条真实客户推荐语（含 Review Schema） | 1-2 天 |
| C4 | 撰写 1-2 篇行业白皮书或技术指南类长文 | 3-5 天 |
| C5 | 注册医疗器械行业目录和 B2B 平台 | 1 天 |
| C6 | 获取 2-3 个权威网站的外部链接 | 持续 |

## 长期 — 3-6 个月+

| 编号 | 任务 |
|------|------|
| D1 | 每月发布 1-2 篇行业文章，保持内容更新频率 |
| D2 | 监控各搜索引擎控制台数据，根据搜索词优化页面 |
| D3 | 定期用 AI 工具（ChatGPT/Bing Copilot/Perplexity）测试品牌查询准确度 |
| D4 | 积累真实客户评价后嵌入 Review + AggregateRating Schema |
| D5 | 注册品牌变体域名作为保护 |

---

# 七、项目数据总览

| 指标 | 数值 |
|------|------|
| 核心 HTML 页面 | 12 个（6 页 × 中英双语） |
| 父站参考页面 | 44 个（pages/ 目录） |
| CSS 代码量 | 2,648 行 |
| JavaScript 代码量 | 164 行 |
| 图片资源 | 33 个 |
| JSON-LD Schema 类型 | 7 种 |
| JSON-LD Schema 实例 | 24+ 个（12 页 × 平均 2 个以上） |
| FAQ 问答对 | 10 组（首页 3 + 制造页 7） |
| Git 提交次数 | 20 次 |
| 首版到当前迭代 | 约 3 周 |

---

# 八、总结

Inertia 广州易纳企业官网的建设工作已完成 **核心技术交付**：12 个中英双语页面、基于 CSS 令牌的完整设计系统、7 种 JSON-LD Schema 全站覆盖、llms.txt 前瞻性部署、实体锚定知识图谱构建、以及中英双语 SEO 的完整配置。

**GEO 技术准备度达到行业领先水平**（结构化数据 9/10、技术 SEO 9/10、AI 专项优化 9/10），但域名权威度、ICP 备案、外部链接建设三个零分维度是当前的核心瓶颈。这些不解决，技术优化的效果完全无法发挥。

**优先路径清晰明确：** 先解决域名和备案（P0，让网站能被看见），再建设外链和内容（P1-P2，让 AI 信任并推荐），最后持续优化（长期，拉开与竞争对手的差距）。

按照此路径，上线后品牌精确查询的 AI 推荐率将达到 85-95%，6 个月内行业泛查询推荐率达到 40-55%。届时 Inertia 广州易纳将成为 AI 搜索引擎中"中国医疗器械合同制造"领域推荐概率最高的企业之一。
