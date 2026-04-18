# JSON Master

English | [简体中文](./README.zh-CN.md)

**JSON Master** is a pure frontend, offline productivity tool designed for developers. It formats, visualizes, and instantly infers **TypeScript Interfaces**, **Go Structs**, and **Python Pydantic BaseModels** from messy JSON API data.

🚀 **This project is an open-source entry created exclusively for the [TRAE × Maimai "AI Infinite Workplace" SOLO Challenge](https://forum.trae.cn/t/topic/4988)!** Developed entirely using TRAE SOLO natural language.

---

## 🎯 Pain Points & Core Value

As a backend or full-stack developer, when integrating third-party APIs or writing Swagger response structures, manually translating a massive JSON payload into data models (like Go Structs, Python BaseModels, or TS Interfaces) in business code is often required. This is not only tedious and time-consuming but also prone to errors, especially with nested objects and array slices.

**Advantages of JSON Master:**
1. **Instant Inference**: Paste JSON on the left, and instantly get strongly-typed code for three platforms (TS / Go / Python) on the right, ready to be copied.
2. **Pure Offline Operation**: Zero reliance on external APIs. All AST parsing and type inference algorithms run entirely in the local browser, completely eliminating the risk of leaking confidential company business data.
3. **Geek Experience**: Dark theme, immersive three-column layout, with regex-highlighted tree structure preview.

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript (Strict typing and AST parsing logic)
- **Styling**: Tailwind CSS (Geek dark mode UI)
- **Icons**: Lucide-React
- **Core Algorithm**: Hand-written recursive descent type inferencer (No heavy external parsing libraries required)

---

## 🚀 Quick Start

If you want to run or further develop this project locally:

### 1. Clone the repository
```bash
git clone https://github.com/gjwroot/json-master.git
cd json-master
```

### 2. Install dependencies
*(npm or pnpm is recommended)*
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open your browser and visit the address output in the terminal (usually `http://localhost:5173/`) to start exploring!

---

## 💻 Core Feature Breakdown

The core logic is located in [`src/utils/jsonParser.ts`](./src/utils/jsonParser.ts), which involves the following two steps:

1. **AST Conversion (`parseJsonToAst`)**:
   Recursively traverses standard JSON objects and reduces them into a lightweight Abstract Syntax Tree (AST) containing `type`, `children`, and array `items` type inference. It specifically handles dimension reduction recognition for multi-dimensional array slices.
2. **Multi-language Generators (`generateTypeScript`, `generateGo`, `generatePython`)**:
   Based on the generated AST, it concatenates strings for classes/interfaces/structs in the corresponding languages. Notably, for Go, it separately handles the hoisting and reverse assembly of nested Structs to conform to Go's best practice syntax.

---

## 🤝 Contributing
If you find this tool useful, or have better AST inference logic to add (e.g., adding support for Java, Rust, C# generation), PRs are welcome!

If you like this project, please give me a ⭐️ **Star** in the top right corner. It's very important for my participation in the challenge. Thank you for your support!
