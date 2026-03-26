# Auto_Tinify - 专为设计师打造的 AE 图片压缩神器

> 还在为 AE 项目中的图片太大而发愁？这个免费工具帮你轻松解决

---

作为一名经常使用 After Effects 的设计师，你是否遇到过这些困扰？

- 导出项目时图片太大，加载慢到怀疑人生
- 客户要求优化文件大小，自己手动压缩太麻烦
- 辛辛苦苦做了几十个 G 的素材，清理起来无从下手

今天给大家介绍一个我正在用的免费工具——**Auto_Tinify**，专门解决 AE 项目中的图片压缩问题。

## 它能做什么？

简单来说，它是一个 After Effects 脚本，可以：

- **一键压缩** 项目中的 JPG、PNG、WebP 图片
- **批量处理** 整个项目的所有图片
- **多 Key 轮换** 支持同时管理多个 Tinify API Key
- **智能替换** 压缩后自动替换原图，或者保存到新目录

Tinify 是目前最流行的在线图片压缩服务，采用先进的压缩算法，可以在保证画质的前提下，将图片体积减少 **60%-80%**。

## 核心功能

### 1. 多 API Key 轮换
如果你的项目比较多，可以添加多个 API Key，系统会自动轮换使用。免费账号每月有 500 次压缩额度，多个 Key 就能叠加使用。

### 2. 灵活的路径配置
支持使用 `${projectPath}` 变量，自动定位到当前 AE 项目的目录。比如设置为 `${projectPath}/输出`，压缩后的图片就会保存在项目旁边的输出文件夹里。

### 3. 快捷操作
- **Ctrl+Shift + 点击**：压缩选中的图片文件
- **Alt + 点击**：直接替换原图

### 4. 完整的日志记录
每次操作都有详细记录，压缩前后的文件大小、节省的空间，一目了然。

## 安装方法

**推荐：使用 kbar 脚本管理器（最简单）**

1. 安装 [kbar](https://kbar.itycon.cn/) 脚本管理器
2. 在 kbar 中搜索 "Auto_Tinify"
3. 点击安装，完成！

**手动安装：**

1. 从 [GitHub Releases](https://github.com/yancongya/auto_tinify/tree/main/public) 下载最新的 `.jsxbin` 文件
2. 复制到 AE 脚本目录：
   - Windows: `C:\Program Files\Adobe\Adobe After Effects [版本]\Support Files\Scripts\`
   - Mac: `/Applications/Adobe After Effects [版本]/Scripts/`
3. 重启 AE，在 Window 菜单中找到脚本

## 使用流程

1. 打开脚本，点击「API Key 设置」，添加你的 Tinify API Key（免费注册获取）
2. 点击「路径设置」，配置要压缩的图片目录
3. 点击「开始压缩」，等待完成

## 实际效果

我自己测试了一下，压缩了一个包含 50 张图片的 AE 项目：

- 原始大小：2.3 GB
- 压缩后：780 MB
- **节省空间：66%**

而且压缩后的图片质量几乎看不出区别，导出速度也明显变快了。

## 适合谁用？

- 经常做 AE 项目的设计师
- 需要频繁交付项目文件的视频创作者
- 对文件大小有要求的甲方项目
- 想要优化素材库的文件整理者

## 总结

Auto_Tinify 是一个**免费、开源**的工具，对于经常使用 AE 的人来说，是一个不错的时间节省方案。特别是配合 kbar 使用，操作成本几乎为零。

---

**获取方式：**

- GitHub: https://github.com/yancongya/auto_tinify
- 产品官网: https://yancongya.github.io/auto_tinify/

如果对你有帮助，欢迎给个 Star ⭐️

---

*本文涉及的工具和资源均为真实使用后推荐，与作者无利益关联。*