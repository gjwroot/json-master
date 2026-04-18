# JSON Master

[English](./README.md) | 简体中文

**JSON Master** 是一款专为开发者打造的纯前端离线生产力工具。它能将凌乱的 JSON 接口数据一键格式化、可视化，并实时推导生成 **TypeScript Interface**、**Go Struct** 和 **Python Pydantic BaseModel** 强类型代码。

🚀 **本项目是为 [TRAE × 脉脉「AI 无限职场」SOLO 挑战赛](https://forum.trae.cn/t/topic/4988) 专门打造的开源作品！** 完全使用 TRAE SOLO 自然语言开发完成。

---

## 🎯 痛点与核心价值

作为一名后端或全栈开发者，日常对接第三方 API 或是手写 Swagger 响应结构时，经常需要手动将一大坨 JSON 翻译成业务代码中的数据模型（如 Go Struct、Python BaseModel 或 TS Interface）。这不仅枯燥耗时，还容易在嵌套对象、数组切片等类型定义上出错。

**JSON Master 的优势：**
1. **秒级推导**：左侧粘贴 JSON，右侧瞬间输出三端（TS / Go / Python）可直接复制的强类型代码。
2. **纯离线运行**：零外部 API 依赖。所有的 AST 解析与类型推导算法完全运行在本地浏览器中，彻底杜绝公司涉密业务数据外泄的风险。
3. **极客体验**：暗黑主题，沉浸式三栏布局，带正则高亮的树状结构预览。

---

## 🛠 技术栈

- **框架**: React 18 + Vite
- **语言**: TypeScript (严格的类型与 AST 解析逻辑)
- **样式**: Tailwind CSS (极客暗黑风 UI)
- **图标**: Lucide-React
- **核心算法**: 纯手工编写的递归下降类型推导器 (无需依赖重量级的外部解析库)

---

## 🚀 快速开始

如果你想在本地运行或二次开发本项目：

### 1. 克隆仓库
```bash
git clone https://github.com/gjwroot/json-master.git
cd json-master
```

### 2. 安装依赖
*(推荐使用 npm 或 pnpm)*
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

打开浏览器访问终端输出的地址（通常为 `http://localhost:5173/`），即可开始体验！

---

## 💻 核心功能解析

核心逻辑位于 [`src/utils/jsonParser.ts`](./src/utils/jsonParser.ts) 中，它包含以下两个步骤：

1. **AST 转换 (`parseJsonToAst`)**：
   将标准的 JSON 对象，递归遍历并归纳为一个轻量级的抽象语法树（包含 `type`、`children` 和数组的 `items` 类型推导）。特别处理了多维数组切片的降维识别。
2. **多语言生成器 (`generateTypeScript`, `generateGo`, `generatePython`)**：
   基于生成的 AST，拼接出对应语言的类/接口/结构体字符串。其中 Go 语言单独处理了嵌套 Struct 的提升和反向组装，以符合 Go 的最佳实践语法。

---

## 🤝 参与贡献
如果你觉得这个工具好用，或者有更好的 AST 推导逻辑想补充（比如增加 Java、Rust、C# 的生成支持），欢迎提交 PR！

如果你喜欢这个项目，请在右上角给我一个 ⭐️ **Star**，这对我参与挑战赛非常重要，谢谢支持！
