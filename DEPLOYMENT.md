# GitHub Pages 部署配置

本项目已配置自动部署到 GitHub Pages。

## 配置说明

### 1. Vite 配置
- 在 `vite.config.ts` 中设置了 `base: '/nad-am.github.io/'` 以适配 GitHub Pages 的子路径
- 构建输出目录设置为 `dist`

### 2. GitHub Actions 工作流
- 工作流文件位置：`.github/workflows/deploy.yml`
- 触发条件：推送到 `main` 或 `master` 分支
- 自动构建和部署到 GitHub Pages

### 3. 部署步骤

#### 自动部署（推荐）
1. 将代码推送到 GitHub 仓库的 `main` 或 `master` 分支
2. GitHub Actions 会自动触发构建和部署流程
3. 部署完成后，网站将在 `https://nad-am.github.io/nad-am.github.io/` 访问

#### 手动部署
```bash
npm run deploy
```

## 设置 GitHub Pages

1. 进入 GitHub 仓库设置页面
2. 找到 "Pages" 部分
3. 在 "Source" 中选择 "GitHub Actions"
4. 确保仓库有 `GITHUB_TOKEN` 权限

## 注意事项

- 确保仓库名称与 GitHub Pages 域名匹配
- 首次部署可能需要几分钟时间
- 如果遇到 404 错误，请检查 `base` 路径配置是否正确
