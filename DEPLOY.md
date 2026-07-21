# 部署上线指南 — inertiapd.cn

本文写给不熟悉技术的同事，按步骤操作即可完成域名绑定。

---

## 你需要的信息

| 项目 | 值 |
|------|-----|
| 域名 | `inertiapd.cn`（你自己买的那个） |
| 域名管理平台 | 买域名的那个网站（阿里云/腾讯云/GoDaddy 等） |
| Cloudflare 账号 | 需要注册一个（免费）：https://dash.cloudflare.com/sign-up |
| Cloudflare Pages 项目 | 已经建好，叫 `inertia-cn` |
| 当前线上地址 | `inertia-cn.pages.dev` |
| 网站代码仓库 | `https://github.com/Neehou/inertia-cn` |

---

## 第一步：注册 Cloudflare 账号（10 分钟）

1. 打开 https://dash.cloudflare.com/sign-up
2. 用邮箱注册，验证邮箱
3. 登录后进入 Dashboard（控制面板）

---

## 第二步：在 Cloudflare Pages 创建项目（如果还没有的话）

> 如果网站已经在 `inertia-cn.pages.dev` 运行，说明项目已存在，跳过这一步。

1. Cloudflare Dashboard 左侧菜单 → **Workers 和 Pages** → **概述**
2. 点击 **创建** → **Pages** → **连接到 Git**
3. 授权 GitHub 账号，选择 `Neehou/inertia-cn` 仓库
4. 构建设置：
   - **构建命令**：留空
   - **输出目录**：留空（或填 `.`）
   - **框架预设**：无
5. 点击 **保存并部署**，等 2 分钟完成

---

## 第三步：绑定自定义域名（核心步骤）

### 3.1 进入域名设置

1. Cloudflare Dashboard → **Workers 和 Pages** → 点击项目 **`inertia-cn`**
2. 顶部 Tab 选择 **自定义域**（Custom domains）
3. 点击 **设置自定义域** 按钮

### 3.2 添加域名

1. 输入 `inertiapd.cn` → 点击 **继续**
2. Cloudflare 会显示需要添加的 DNS 记录，类似：
   ```
   CNAME  inertiapd.cn  →  inertia-cn.pages.dev
   ```
3. 再添加一个 `www.inertiapd.cn`（同样操作）

### 3.3 到域名管理平台添加 DNS 记录

打开你买域名的那个网站（阿里云/腾讯云/GoDaddy 等），找到 **DNS 解析** 或 **域名解析** 页面，添加两条记录：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| CNAME | `@` | `inertia-cn.pages.dev` | 600 |
| CNAME | `www` | `inertia-cn.pages.dev` | 600 |

> **注意**：
> - 如果域名管理平台不支持 `@` 做 CNAME，用 **URL 转发** 代替：将 `inertiapd.cn` 301 重定向到 `www.inertiapd.cn`
> - 阿里云：产品列表 → 云解析 DNS → 解析设置 → 添加记录
> - 腾讯云：控制台 → 域名管理 → 解析
> - GoDaddy：我的产品 → DNS → 添加

### 3.4 等待生效

- DNS 生效通常需要 **几分钟到 2 小时**（最多 24 小时）
- 浏览器打开 `inertiapd.cn`，能访问就说明成功了
- SSL 证书（HTTPS 小锁）由 Cloudflare 自动签发，额外等待 5-15 分钟

---

## 第四步：更新网站内的域名（重要）

网站代码里有些地方写了 `inertia-cn.pages.dev`，需要改成 `inertiapd.cn`。

### 4.1 如果你会改代码

打开项目文件夹，用 VS Code（或任何编辑器）**全局搜索** `inertia-cn.pages.dev`，全部替换为 `inertiapd.cn`。

影响范围大约 40 处（每个 HTML 文件的 canonical URL 和 JSON-LD 结构化数据）。

### 4.2 改完提交

```bash
git add -A
git commit -m "chore: update domain to inertiapd.cn"
git push
```

推送后 Cloudflare Pages 自动部署，域名下的网站内容即更新。

### 4.3 如果你不会改代码

把这份文档发给开发人员，让他们执行第四步。只需要全局搜索替换 + git push 即可。

---

## 日常更新网站内容

以后任何时候改了代码，只需在项目文件夹里执行：

```bash
git add -A
git commit -m "描述改了什么"
git push
```

推送后 1-2 分钟，`inertiapd.cn` 自动更新。

---

## 常见问题

| 问题 | 解决办法 |
|------|---------|
| 域名打不开 | 等 DNS 生效（最多 24h），用 https://www.whatsmydns.net 查 CNAME 是否传播 |
| 没有 HTTPS 小锁 | Cloudflare 自动签发需要 5-15 分钟，等等再刷新 |
| 忘了 Cloudflare 密码 | https://dash.cloudflare.com/forgot-password |
| 不知道域名在哪买的 | 用 https://who.is 查 `inertiapd.cn`，能看到注册商是谁 |
| Cloudflare 找不到 GitHub 仓库 | 检查 GitHub 授权：Cloudflare Dashboard → Workers 和 Pages → 设置 → Git 集成 |

---

## 联系人

- 网站代码：`https://github.com/Neehou/inertia-cn`
- 当前线上预览：`https://inertia-cn.pages.dev`
