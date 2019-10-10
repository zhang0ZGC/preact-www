---
name: Getting Started
description: "How to get started with Preact. We'll learn how to setup the tooling (if any) and get going with writing an application."
---

# 入门

本指南可帮助你起步并开始开发 Preact 应用。这里有 3 种流行的方法。

如果你只是刚入门，我们强烈建议你使用 [preact-cli](#best-practices-powered-with-preact-cli)。

---

<toc></toc>

---

## 不使用构建工具

Preact 始终提供了可在浏览器中使用的解决方案，不需要任何构建工具。

```js
import { h, Component, render } from 'https://unpkg.com/preact?module';

// 创建你的应用
const app = h('div', null, 'Hello World!');

// 将你的应用程序注入ID为`app`的元素中。
// 请确保 dom 中存在这样的元素 ;）
render(app, document.getElementById('app'));
```

唯一的区别是因为需要编译，你不能使用 JSX 。在下一节中，我们将为你介绍其它方法。

### JSX 的替代方案

使用原始的 `h` 或者 `createElement` 方法调用来编写应用程序始终比使用 JSX 形式的乐趣要少得多。JSX 具有看起来类似 HTML 的优势，这使得许多开发人员更容易理解。不过，它需要一个构建步骤，因此我们强烈建议你使用一种名为 [htm] 的替代方案。

简而言之，[htm] 可以理解为：在不需要转译器的纯 JavaScript 中使用类似 JSX 的语法。它基于前一段时间添加到 JavaScript 中的原生的标记模板字符串，而不是使用自定义语法。

```js
import { h, Component, render } from 'https://unpkg.com/preact';
import htm from 'https://unpkg.com/htm';

// 使用 Preact 初始化 htm 
const html = htm.bind(h);

const app = html`<div>Hello World!</div>`
render(app, document.getElementById('app'));
```

这是编写 Preact 应用的一种非常流行的方法，如果你对这种方法感兴趣，我们强烈建议阅读 htm 的 [README][htm] 文件。

## `preact-cli` 最佳实践

`preact-cli` 项目是一个现成的解决方案，可以将 Preact 应用程序与最适合现代 web 应用程序的最佳配置捆绑在一起。它建立在标准工具项目之上（例如 `webpack`, `babel` 和 `postcss`）。由于使用简单，这是用户使用 Preact 的最流行的方式。


顾名思义，`preact-cli` 是一种命令行( cli )工具，可以在计算机的终端中运行。可通过运行以下命令进行全局安装：


```bash
npm install -g preact-cli
```

安装之后，你将在终端中有一个称为 `preact` 的新命令。你可以通过执行以下命令来创建新的应用程序：

```bash
preact create default my-project
```

上面的命令从 `preactjs-templates/default` 中提取模板，并提示你输入一些信息，然后在 `./my-project/` 目录生成项目。

> 提示：任何带有 `'template'` 文件夹的 Github 仓库都可以用作自定义模板：`preact create <username>/<repository> <project-name>`

### 准备开发

现在我们准备启动应用程序。要启动开发服务器，请在新生成的项目文件夹（此示例中为 `my-project`）中运行以下命令：

```bash
# 进入生成的项目文件夹  
cd my-project/

# 启动开发服务器
npm run dev
```

服务启动后，你可以通过控制台中打印的 URL 访问你的应用程序。现在你已准备好开发你的应用程序了！

### 生产环境打包

有时候你需要将应用程序部署到某个地方。 `preact` 提供了一个方便的 `build` 命令，该命令将生成高度优化的压缩包：

```bash
npm run build
```

完成后将会生成一个新的 `build/` 文件夹，可以将其直接部署到服务器。

> 有关所有可用命令的完整列表，请查看 preact-cli 的 [README 文件](https://github.com/preactjs/preact-cli#cli-options)。

## 集成到现有应用程序中

如果你已经建立了一个工程，那么很可能已经存在打包工具。目前最受欢迎的打包工具有 [webpack](https://webpack.js.org/), [rollup](https://rollupjs.org) 或 [parcel](https://parceljs.org/)。 Preact 与这些打包工具无需更改便可开箱即用！

### 配置 JSX

要转换 JSX，你需要一个 babel 插件将其转换为有效的 JavaScript 代码。目前广泛使用的是 [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) 。安装完成后，你需要指定应使用的 JSX 函数：

```json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "h",
      "pragmaFrag": "Fragment",
    }]
  ]
}
```

> [babeljs](https://babeljs.io/) 这里有最好的文档之一,我们强烈建议你在此查阅 babel 相关问题以及如何进行设置。

### 设置 React 别名指向到 Preact

有时候，你可能想要利用庞大的 react 生态系统。最初为 React 编写的库和组件可与我们的兼容层无缝协作。要使用它，我们需要将所有 `react` 和 `react-dom` 的导入都指向 Preact 。此步骤称为别名。

#### 在 webpack 中设置别名

to your config. Depending on the configuration you're using this section may
already be present, but missing the aliases for Preact.
要在webpack中为任何包添加别名，你需要将 `resolve.alias` 部分添加到配置中。根据配置的不同，你可能已经在使用此部分，但缺少 Preact 的别名。

```js
const config = { 
   //...分割
  "resolve": { 
    "alias": { 
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      // 必须在 test-utils 后面
    },
  }
}
```

#### 在 parcel 中设置别名

Parcel 使用标准的 `package.json` 文件通过 `alias` 键来读取配置项。

```json
{
  "alias": {
    "react": "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat"
  },
}
```

#### 在 jest 中设置别名


与打包工具类似，[jest](https://jestjs.io/) 允许重写模块路径，但与 webpack 不同的是，它的语法是基于正则表达式的。将下面的代码添加到你的 jest 配置文件中：

```json
{
  "moduleNameMapper": {
    "react": "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat"
  }
}
```

[htm]: https://github.com/developit/htm

