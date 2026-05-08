---
name: "clone-website"
description: "克隆指定网站到干净的前端代码库。Invoke when user provides URL(s) and asks to复刻/迁移/找回网站源码。"
---

# Clone Website

将一个或多个在线页面“逆向重建”为可维护的前端项目：提取设计 token、下载资产、生成组件规格、重写组件与页面并做视觉对齐。

## 何时调用

- 用户提供一个或多个 URL，并希望“复刻这个网站/把 Webflow/WordPress 迁到代码/网站活着但源码丢了”。
- 用户想学习一个生产站点的布局/动画/响应式实现方式，需要一份可读的实现。

## 输入

- 目标：`<url1> [<url2> ...]`
- 可选偏好（若用户没说，默认按本工作区的 Vite + React 习惯输出）：
  - 输出栈：Vite + React（默认）/ Next.js（用户明确要求才用）
  - 输出目录：`clones/<domain-or-slug>`
  - 复刻范围：仅首页 / 指定路由 / 多页面
  - 还原标准：像素级（尽力）/ 结构与交互一致（优先可维护）

## 约束与合规

- 不要用于钓鱼、冒充、欺骗性复刻。
- 不要复制他人的 logo、品牌资产与受版权保护的文案；需要时用占位资源替代。
- 注意目标站点的 ToS/robots 等限制。

## 输出（推荐结构）

- `clones/<slug>/`
  - `docs/research/`
    - `design-references/`（截图）
    - `tokens/`（颜色/字体/间距等 token）
    - `components/`（组件规格：CSS 计算值、状态、断点、内容）
  - `public/`（下载的图片/视频/图标/SEO 资源）
  - `src/`（可维护的实现：组件、页面、样式与工具函数）

模板：可直接复制 `.trae/skills/clone-website/templates/` 里的文件作为初始产出。

## 工作流（按阶段执行）

### 1) 侦察（Recon）

- 使用浏览器自动化打开每个 URL：
  - 依次在 375/768/1024/1440 宽度下采集全页截图（含折叠线以上与关键区块）。
  - 扫描交互：hover、active、focus、展开/收起、轮播、滚动触发等。
  - 记录页面信息架构：sections 划分、导航结构、footer、重复模块。

产出：`docs/research/design-references/` 截图 + 一份页面结构草图（markdown）。

### 2) 设计 token 提取（Tokens）

- 从计算样式与设计语言归纳：
  - 颜色：背景/前景/强调/边框/阴影（用语义命名而非“blue-500”）。
  - 字体：font-family、字号梯度、字重、行高、字间距。
  - 圆角、阴影、间距、容器宽度、断点策略。
  - 动画：持续时间、缓动、触发条件。

产出：`docs/research/tokens/tokens.json` + `tokens.md`（解释命名与映射规则）。

### 3) 资产同步（Assets）

- 下载并本地化：
  - `img`、`picture/source`、CSS background-image、SVG icons、favicons、OG 图。
  - 视频（如有）与字体（如许可）。
- 给每个资产建立可追溯命名：`<section>-<purpose>-<hash>.<ext>`。

产出：`public/` 下资源 + `docs/research/assets.md`（来源与替代说明）。

### 4) 组件规格（Component Specs）

- 以“区块/组件”为粒度写规格文件（每个文件一类组件）：
  - 结构：DOM 层级、布局方式（grid/flex/absolute）、对齐与间距。
  - 样式：关键属性用计算值（px/rem/%），包含不同断点的差异。
  - 状态：hover/focus/active/disabled/scroll-state。
  - 行为：点击、滚动、动画时序、可访问性（ARIA/键盘）。
  - 内容：文案与数据结构（允许用占位数据抽象）。

产出：`docs/research/components/<name>.md`。

### 5) 工程初始化（Foundation）

- 在 `clones/<slug>/` 初始化项目：
  - 默认：Vite + React + TS；按本工作区惯例使用 `vp` 管理依赖与检查。
  - 若用户明确要求 Next.js：创建 Next.js App Router + TS 项目。
- 建立全局样式与 token 映射：
  - CSS variables（或 Tailwind theme）映射到 tokens。
  - 字体加载、基础重置、容器与断点。

### 6) 实现（Build）

- 严格按规格实现各 section/组件：
  - 组件 API 设计优先可维护（避免把所有内容写死在 JSX）。
  - 动画与交互尽量复刻；若复杂，先实现静态布局再补交互。
  - 确保 a11y：语义标签、焦点可见、键盘可操作、对比度。

### 7) QA（对齐与回归）

- 对比截图：同断点下关键区块视觉对齐。
- 自测交互：hover/focus/滚动、移动端菜单、表单校验。
- 运行工程检查：lint/typecheck/build（根据栈选择对应命令）。

## 使用示例

- `/clone-website https://example.com/`
- `/clone-website https://example.com/ https://example.com/pricing`

## 执行偏好（默认决策）

- 未指定栈：默认产出 Vite + React 版本，以可维护与对齐为目标。
- 若站点涉及品牌资产/版权文案：默认用占位资源与抽象数据结构。
