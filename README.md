# Your Name — Portfolio

一个轻量的个人作品集网站，纯 HTML/CSS/JS，无需构建工具，可直接部署到 GitHub Pages。

## 文件结构
```
portfolio-site/
├── index.html      # 页面结构与所有文字内容
├── style.css       # 样式（深/浅色自动适配系统主题）
├── script.js       # 导航、滚动显现动画、作品筛选交互
├── assets/
│   ├── images/     # 放头像等通用图片
│   └── projects/   # 放作品封面图/视频
└── README.md
```

## 本地预览
直接双击打开 `index.html`，或在本目录运行：
```bash
open index.html        # macOS 用默认浏览器打开
# 或
python3 -m http.server 8000   # 然后访问 http://localhost:8000
```

## 接下来要做的事（内容替换清单）
在 `index.html` 里搜索并替换：
- [ ] `Your Name` → 你的名字（出现在 `<title>`、导航 logo、Hero 标题、页脚）
- [ ] Hero 区域的一句话简介
- [ ] 「关于我」段落文字、所在地、状态
- [ ] 四个 `.card` 作品区块 → 换成你真实的项目：
  - 把图片/视频放进 `assets/projects/`，把 `placeholder-media` 换成
    `<img src="assets/projects/xxx.jpg" alt="...">`
  - 修改标题、描述、标签（`.card-tags`）
  - 复制整个 `<article class="card" ...>` 块即可新增作品
  - `data-category="visual"` 或 `"dev"` 决定筛选分类（也可以加新分类，
    同时在 `#filterBar` 里加对应按钮）
- [ ] 「技能」区块的工具列表
- [ ] 「联系」区块的邮箱、GitHub、Instagram 等链接

## 部署到 GitHub Pages
1. 在 GitHub 上新建一个仓库（例如 `portfolio`）
2. 在本目录执行：
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```
3. 进入仓库 Settings → Pages → Source 选择 `main` 分支 / `/ (root)`，保存
4. 几分钟后即可通过 `https://<你的用户名>.github.io/<仓库名>/` 访问
5. （可选）如果想用 `https://<你的用户名>.github.io/` 这个根域名，把仓库名改成
   `<你的用户名>.github.io`

需要我帮你执行 git 初始化、创建仓库并推送吗？跟我说一声就行。
