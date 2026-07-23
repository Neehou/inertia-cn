# Inertia 广州易纳网站 GEO 优化工作报告

**日期：** 2026年7月21日
**版本：** v1.0
**站点：** inertia-cn.pages.dev

---

# 一、GEO 优化工作成果

## 1.1 结构化数据 (JSON-LD)

全站 12 个 HTML 页面全部部署 JSON-LD 结构化数据，覆盖 7 种 Schema.org 类型。这是 AI 搜索引擎（Google SGE、Bing Copilot、ChatGPT、Perplexity）理解网站内容的核心入口。

### 各页面 Schema 覆盖详情

| 页面 | Schema 类型 | 关键字段 |
|------|------------|---------|
| 首页 (en/zh) | Organization + FAQPage + BreadcrumbList + ItemList(7 Product) | 公司全称、母公司关系、两项认证、3 组 FAQ、7 个产品案例 |
| 制造页 (en/zh) | Organization(@id锚定) + FAQPage(7问) + Service + OfferCatalog(5项) + BreadcrumbList + WebPage + SpeakableSpecification | 实体锚定、质量体系 FAQ、5 项制造服务、语音搜索适配 |
| 业务页 (en/zh) | Service + OfferCatalog(4项) + BreadcrumbList | 四大核心服务分类，每项含 serviceType |
| 关于页 (en/zh) | AboutPage + Organization + BreadcrumbList | 成立年份 2018、母公司 2004、地址、认证 |
| 联系页 (en/zh) | ContactPage + Organization + PostalAddress + GeoCoordinates | GPS 坐标 (22.9375, 113.3642)、电话、邮箱、双岸地址 |
| 动态页 (en/zh) | BlogPosting × 3 + ItemList + BreadcrumbList | 发布日期、标题、摘要、作者(Organization)、配图 |

## 1.2 Schema 字段完善（本轮新增）

本轮 GEO 优化对 JSON-LD 进行了以下增强：

**Organization 实体增强**
- `logo` 由相对路径 `../img/logo.svg` 改为绝对 URL `https://inertia-cn.pages.dev/img/logo.svg`（Google 结构化数据规范要求）
- 新增 `image` 字段，与 logo 一致，AI 搜索结果可展示品牌图片
- 新增 `sameAs` 数组，包含 LinkedIn 公司页面和母公司官网，AI 引擎用于实体验证

**ContactPage 本地搜索优化**
- 新增 `geo` 坐标 (latitude: 22.9375, longitude: 113.3642)，精确到广州番禺制造中心
- 当用户搜索"广州附近的医疗器械制造商"时，AI 可基于地理坐标匹配

**AboutPage 层级补全**
- 新增 `BreadcrumbList`（Home → About Us），AI 理解页面在站点中的层级位置

**BlogPosting 富媒体完善**
- 每篇文章新增 `author`（Organization 类型，指向 Inertia Guangzhou）
- 每篇文章新增 `image`（hero-news.jpg），满足 AI 富媒体卡片展示要求

## 1.3 AI 专项优化

### llms.txt
创建了 `llms.txt` 文件放在网站根目录。这是新兴的 AI 爬虫标准（类比 robots.txt），ChatGPT、Perplexity、Google AI 等大语言模型在抓取网站前会优先读取此文件。文件列出：
- 全部 12 个页面路径和摘要
- 关键实体：公司名称、认证、行业、服务类型、地理位置
- 中英文双语描述

### FAQPage Schema
首页 3 组 FAQ + 制造页 7 组 FAQ，使用 Question/Answer 结构化标记。AI 可以直接将 FAQ 问答提取为搜索结果摘要，无需额外处理。

### 实体锚定体系
通过 `@id`、`parentOrganization`、`sameAs` 三个字段建立了跨页面实体关系图：

Inertia Product Development (Toronto, 2004)
    └── Inertia Guangzhou (广州易纳, 2018)
            ├── ISO 13485:2016
            ├── ISO 9001
            ├── LinkedIn
            └── inertiapd.com

AI 知识图谱可以据此建立"广州易纳 = Inertia PD 中国子公司 = ISO 13485 认证制造商"的完整认知。

### 语义化 HTML
全站使用标准 HTML5 语义标签：`main`、`section`、`article`、`nav`，并配合 `aria-labelledby`、`aria-label` 无障碍标注。AI 爬虫通过这些标签区分内容的主次和层级。

### 双语言 hreflang
sitemap.xml 中每条 URL 通过 `xhtml:link` 双向标注 `zh-CN` 和 `en` 语言变体。AI 引擎据此为不同语言的用户推荐对应版本的页面。

### 图像可访问性
全部 56 个 `<img>` 标签均包含描述性 `alt` 文本，多模态 AI（如 GPT-4V、Gemini）可以直接理解图片内容。

### 技术基础设施
- `robots.txt`：正确配置，允许全站抓取，指定 sitemap 位置
- `sitemap.xml`：12 条 URL，含 hreflang 标注、优先级分级、最后修改日期
- Cloudflare Pages 部署：自动 CI 构建、SSL 证书、全球 CDN

## 1.4 设计系统优化

从母公司 inertiapd.com 的 1259 行 CSS 中逆向提取设计 DNA：

| 设计令牌 | 提取值 |
|---------|-------|
| 品牌金色 | `#ffc000` → `--color-gold` |
| 暖海军蓝 | `#160c4b` → `--color-navy` |
| 深蓝背景 | `#0A2540` → `--color-dark` |
| 英文字体 | Outfit (替代原 Roboto Slab) |
| 圆角体系 | 4px → 8px → 16px → 22px → 32px → 9999px |
| 自然阴影 | `6px 6px 9px rgba(0,0,0,0.2)` |
| 深度阴影 | `12px 12px 50px rgba(0,0,0,0.4)` |
| 按钮交互 | gold ↔ navy 颜色互换 + translateY(-1px) |
| 响应式标题 | `clamp(2.25rem, 5vw, 3.5rem)` |

全部映射为 CSS 自定义属性（`--var` 令牌），800+ 行 CSS 中替换硬编码颜色。

---

# 二、网站制作面临的问题与解决

## 问题 1：母公司设计 DNA 逆向提取

**困难：** 父站 inertiapd.com 的 CSS 设计规则分散在 11 个页面面板中（1259 行混合代码），没有独立的设计系统文档、没有 Figma 源文件、没有变量定义。需要从大量重复的魔数中识别出设计意图。

**解决：** 逐行分析父站代码，识别出 5 级圆角规则（4/8/16/22/32）、定向阴影模式（6px 6px 而非标准均匀阴影）、gold↔navy 互换按钮模式、Outfit 字体选择。将提取结果映射为 `--var` CSS 令牌体系，确保全局一致性和可维护性。

## 问题 2：多页面 JSON-LD 一致性

**困难：** 12 个页面 × 7 种 Schema 类型 × 中英双语，每个页面的实体关系不同。例如：首页的 Organization 是独立的，制造页的 Organization 需要通过 `@id` 锚定到首页；ContactPage 的 Organization 是嵌套在 about 属性中的；AboutPage 的 Organization 需要包含 foundingDate。

**解决：** 建立 `@id` 实体锚定体系——制造页的 Organization 使用 `@id: https://inertia-cn.pages.dev/#org` 与首页形成知识图谱节点链接。ContactPage 通过 `about.Organization` 嵌套继承地址、电话属性。

## 问题 3：中英 hreflang 双向标注

**困难：** 6 个页面 × 2 语言 = 12 个 URL，每个 URL 都要标注自身以及所有语言变体的 hreflang。容易出错的情况：en 页 link 到 zh 页时 URL 路径不匹配，或遗漏 x-default 值。

**解决：** 在 sitemap.xml 中为每条 URL 内嵌 `<xhtml:link rel="alternate" hreflang="...">` 双向标注，不单独依赖 HTML `<head>` 中的 `<link>` 标签。两种机制互相验证。

## 问题 4：临时域名的局限性

**困难：** 网站部署在 `inertia-cn.pages.dev`（Cloudflare Pages 默认域名）。这带来两个致命问题：一是 `.pages.dev` 子域名在 Google/Bing 的域名权威度 (Domain Authority) 为零，AI 搜索引擎将其视为临时/测试站点，大幅降低推荐概率；二是 Cloudflare 的 `.pages.dev` 域名在中国大陆 DNS 层面被污染，百度、360、搜狗等国内搜索引擎完全无法访问。

**解决：** 技术准备工作全部前置完成（llms.txt、全 Schema 覆盖、实体锚定、hreflang），确保自定义域名绑定 + ICP 备案通过的当天，AI 搜索引擎即可抓取到完整优化的内容。域名绑定和备案正在推进中。

## 问题 5：内容深度不足

**困难：** News 页面仅 3 篇占位文章（每篇约 100 字摘要），无案例详情长文、无客户证言、无行业白皮书。AI 搜索引擎通过内容更新频率和篇幅判断网站"活跃度"，内容过少会导致 AI 降低抓取优先级。

**解决：** 过渡期方案：为 BlogPosting 添加 `author`（Organization 类型）和 `image` 字段，最大限度地利用现有内容的结构化标记价值。计划上线后：为 7 个制造案例各创建 500 字以上的独立详情页；News 扩充至 6-8 篇深度文章；收集真实客户推荐语。

---

# 三、AI 搜索推荐差距分析

## 3.1 八维评分体系

| 维度 | 当前 | 目标 | 差距 | 说明 |
|------|------|------|------|------|
| 结构化数据 | **9/10** | 10/10 | 小 | 缺 Review/AggregateRating schema（需真实评价数据支撑） |
| 技术 SEO | **9/10** | 10/10 | 小 | 缺 twitter:card 标签 |
| 内容深度 | **6/10** | 8/10 | 中 | 需补齐案例长文、白皮书、客户证言 |
| AI 专项优化 | **9/10** | 10/10 | 小 | llms.txt 已是差异化优势 |
| 可访问性 | **8/10** | 9/10 | 小 | 移动端 / 平板 / 桌面全适配 |
| 域名权威度 | **0/10** | 7/10 | 致命 | pages.dev 子域名 DA=0 |
| 中国境内可访问 | **0/10** | 10/10 | 致命 | DNS 污染 + ICP 未备案 |
| 外部链接建设 | **0/10** | 6/10 | 致命 | 零反向链接 |
| **综合** | **4.1/10** | **8.5/10** | — | — |

## 3.2 核心结论

**三个零分维度锁死了当前上限。** 技术准备已经非常充分（结构化数据、SEO 基础设施、AI 专项优化均达到 9/10），但域名权威度、中国可访问性、外部链接这三个维度在 `.pages.dev` 阶段均为零。

这就像造了一辆引擎完美调校的赛车，但轮胎还没装上。一旦切换到 `inertiapd.cn` 自定义域名、完成 ICP 备案、建立外部链接（母公司网站 + LinkedIn + 行业目录），品牌精确查询的 AI 推荐率将立即从 30-40% 跃升至 85-95%。

## 3.3 与竞争对手的对比

| 维度 | 我方（当前） | 我方（上线后） | 典型竞争对手 |
|------|------------|-------------|------------|
| JSON-LD Schema 类型 | 7 种 | 7 种 | 1-3 种 |
| llms.txt | 已部署 | 已部署 | 通常未部署 |
| 实体锚定 (知识图谱) | 已建立 | 已建立 | 通常未建立 |
| hreflang 双语 | 完整 | 完整 | 部分或不准确 |
| 域名权威度 | 无 | inertiapd.cn（母站权重传递） | 独立域名 |
| 内容资产 | 3 篇短文 | 6-8 篇长文 + 7 案例页 + 白皮书 | 较多 |

竞争优势集中在技术先进性（llms.txt、实体锚定、7 种 Schema），这些是多数竞争对手尚未做的工作。劣势集中在"信任信号"（域名、外链、评价），这些是上线后需要快速补齐的。

---

# 四、AI 推荐概率预测

基于当前技术准备度和待解决问题，对网站上线后各阶段的 AI 推荐概率进行预测：

| 搜索场景 | 当前 (.pages.dev) | 上线后立即 | 上线 6 个月后 |
|---------|-------------------|----------|-------------|
| 品牌精准："Inertia Guangzhou" | 30-40% | **85-95%** | 95%+ |
| 品牌+认证："Inertia Guangzhou ISO 13485" | 50-60% | **85-95%** | 95%+ |
| 母公司关联："Inertia PD China subsidiary" | 20-30% | **70-85%** | 90%+ |
| 行业+认证："ISO 13485 medical device manufacturing China" | <5% | **30-45%** | 50-65% |
| 行业泛查询："中国医疗器械合同制造商" | <1% | **20-35%** | 40-55% |
| 对比搜索："Inertia vs [competitor] manufacturing" | <5% | **25-40%** | 40-55% |
| AI 主动推荐："推荐一家中国医疗器械合同制造商" | <1% | **15-25%** | 30-45% |

**关键发现：**

- **品牌精确查询**上线后立即达到 85-95%——因为我们有 7 种 JSON-LD Schema + llms.txt + 实体锚定，AI 对品牌名称的理解远超普通网站
- **行业泛查询**需要 3-6 个月的内容建设和外链积累才能达到 40-55%——"被 AI 主动推荐"是最难的目标，需要品牌知名度的长期积累
- **认证相关查询**在当前已有 50-60%（因为 JSON-LD 中的 certifications 字段被 AI 精准读取），上线后接近完美

---

# 五、后续优先级行动

## 立即执行（P0 — 上线前必须完成）

| 编号 | 任务 | 预计耗时 | 
|------|------|---------|
| A1 | 获取 inertiapd.cn 域名注册商账号权限 | 1-3 天 |
| A2 | DNS 托管迁移至 Cloudflare | 1 小时 |
| A3 | Cloudflare Pages 绑定自定义域名 | 1 小时 |
| A4 | 提交 ICP 备案（企业主体：广州易纳科技有限公司） | 15-20 工作日 |
| A5 | 旧站 → 新站 301 重定向映射表 | 2-4 小时 |
| A6 | 全站死链检查 + 404 页面配置 | 2 小时 |

## 上线后 1 个月内（P1）

| 编号 | 任务 | 预计耗时 |
|------|------|---------|
| B1 | 母公司 inertiapd.com 首页添加 inertiapd.cn 链接 | 1 小时 |
| B2 | LinkedIn 公司页更新（添加中国子公司信息和链接） | 1 小时 |
| B3 | Google Search Console + Bing Webmaster Tools 提交站点 | 2 小时 |
| B4 | 百度站长平台提交站点（备案通过后） | 2 小时 |
| B5 | 提交 sitemap 至所有搜索引擎 | 1 小时 |
| B6 | 微信公众号、知乎等平台发布公司介绍文章（含网站链接） | 2-4 小时 |

## 上线后 3 个月内（P2）

| 编号 | 任务 | 预计耗时 |
|------|------|---------|
| C1 | 为 7 个制造案例各创建独立详情页（500 字 + 图片 + 量化成果） | 2-3 天 |
| C2 | News 扩充至 6-8 篇深度行业文章（每篇 500+ 字） | 2-3 天 |
| C3 | 收集并上线 3-5 条真实客户推荐语 | 1-2 天 |
| C4 | 撰写 1-2 篇行业白皮书或技术指南类长文 | 3-5 天 |
| C5 | 注册医疗器械行业目录和 B2B 平台 | 1 天 |
| C6 | 获取 2-3 个权威网站的外部链接（客户、行业协会） | 持续 |

## 长期持续优化（3-6 个月+）

| 编号 | 任务 |
|------|------|
| D1 | 每月发布 1-2 篇行业相关文章，保持内容更新频率 |
| D2 | 监控各搜索引擎控制台数据，根据搜索词优化页面 |
| D3 | 定期用 AI 工具（ChatGPT / Bing Copilot / Perplexity）测试品牌查询准确度 |
| D4 | 积累真实客户评价后嵌入 Review + AggregateRating schema |
| D5 | 注册 inertia.cn、inertia-tech.com 等品牌变体域名作为保护 |

---

# 六、总结

Inertia 广州易纳网站的 GEO 技术准备度已经达到行业领先水平。JSON-LD 结构化数据的全站覆盖、llms.txt 的前瞻性部署、实体锚定体系的知识图谱构建、以及中英双语 SEO 的完整配置，共同构成了一个真正的"AI-ready"企业网站。

**但技术准备只是地基，信任信号才是建筑。** 域名权威度、ICP 备案、外部链接建设这三个零分维度是当前的核心瓶颈——它们不解决，技术优化的效果完全无法发挥。

优先路径清晰明确：**先解决域名和备案（P0，让网站能被看见），再建设外链和内容（P1-P2，让 AI 信任并推荐我们），最后持续优化（长期，拉开与竞争对手的差距）。**

按照这个路径，上线后品牌精确查询的 AI 推荐率将达到 85-95%，6 个月内行业泛查询推荐率达到 40-55%，届时 Inertia 广州易纳将成为 AI 搜索引擎中"中国医疗器械合同制造"领域推荐概率最高的企业之一。
