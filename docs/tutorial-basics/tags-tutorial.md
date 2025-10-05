
# docs/tags.yml是用来做什么的

`docs/tags.yml` 是 Docusaurus 文档系统中的一个**可选配置文件**，主要用来 **统一定义和管理文档标签（tags）** 的显示信息。

---

## 🧭 一句话解释

> `docs/tags.yml` 让你可以在一个地方集中定义文档标签的「名字、颜色、说明、图标等元数据」，
> 然后在每篇文档的 frontmatter 里使用这些标签名称，Docusaurus 就会自动应用相应样式和信息。

---

## 📘 举个例子

假设你有多个文档，比如：

```
docs/
├─ react/intro.md
├─ react/hooks.md
├─ node/setup.md
└─ node/fs.md
```

你希望这些文档带有标签：

* React 技术相关 → 蓝色标签
* Node.js 技术相关 → 绿色标签

---

### ✅ 1. 在 `docs/tags.yml` 中定义标签

```yaml
react:
  label: React
  permalink: /docs/tags/react
  description: 所有与 React 技术相关的文档
  color: "#61dafb"

node:
  label: Node.js
  permalink: /docs/tags/node
  description: 所有与 Node.js 技术相关的文档
  color: "#43853d"
```

---

### ✅ 2. 在文档中使用标签

在 `docs/react/hooks.md` 文件的开头（frontmatter）加上：

```yaml
---
title: React Hooks 入门
tags: [react]
---
```

同样，在 `docs/node/setup.md`：

```yaml
---
title: Node.js 环境搭建
tags: [node]
---
```

---

### ✅ 3. Docusaurus 会自动：

* 在页面显示对应颜色的标签；
* 生成每个标签的独立页面（比如 `/docs/tags/react`）；
* 该标签页会列出所有使用了 `react` 标签的文档。

---

## 🧩 文件路径说明

| 文件                              | 作用         |
| ------------------------------- | ---------- |
| `docs/tags.yml`                 | 定义标签元数据    |
| 文档 frontmatter 中的 `tags: [...]` | 给单篇文档打标签   |
| `/docs/tags/` 页面                | 自动生成的标签聚合页 |

---

## 💡 可选字段解释

| 字段            | 含义          | 是否必填 |
| ------------- | ----------- | ---- |
| `label`       | 标签显示名称      | ✅    |
| `permalink`   | 标签页面 URL 路径 | ✅    |
| `description` | 标签页面描述      | ❌    |
| `color`       | 标签颜色（16进制）  | ❌    |

---

## 🧠 小总结

| 你想做的事                         | 是否需要 `tags.yml` |
| ----------------------------- | --------------- |
| 只想在文档中随意加标签（无特殊样式）            | ❌ 不需要           |
| 想自定义每个标签的颜色、描述、链接             | ✅ 建议使用          |
| 想让 `/docs/tags/xxx` 页面更精美、更可控 | ✅ 必须使用          |

---

👉 总结一句话：

> **`docs/tags.yml` = 标签的全局样式配置中心。**
> 它让标签更可控、更美观、更统一。

---

是否希望我帮你写一个 `tags.yml + 配套文档模板` 的示例结构？
比如自动生成 “语言 / 框架 / 工具” 三类标签页的那种？
