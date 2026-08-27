# ChinaLLM OpenAI 兼容 API 示例

[English](README.md)

这是一组默认 dry run 的可运行示例，覆盖 ChinaLLM 的 OpenAI 兼容对话、Responses、Embedding、Rerank、图片、音频和异步视频任务。

- API Base URL：`https://chinallmapi.com/v1`
- 实时模型与价格：[ChinaLLM 模型广场](https://chinallmapi.com/pricing)
- 完整文档：[ChinaLLM 文档](https://chinallmapi.com/docs)

模型和价格会调整。生产调用前应查询 `/v1/models` 并查看实时模型广场，不要依赖过期的静态价格表。

## 安全设计

- 所有可运行示例默认只预览请求。
- 只有显式加入 `--send` 才会访问 API。
- 真实调用只从 `CHINALLM_API_KEY` 环境变量读取密钥。
- 输出中的 Authorization 始终显示为 `Bearer ***`。
- 图片和视频示例不自动重试、不自动重复提交任务。
- 不要把 API 密钥、`.env`、用户提示词或私有生成资产提交到仓库。

## 三种请求预览

对话：

```bash
npm run example -- --kind chat --prompt "解释异步任务轮询"
```

Seedream 图片：

```bash
npm run example -- --kind image \
  --model seedream_5.0Pro \
  --resolution 1K \
  --ratio 1:1 \
  --prompt "白底商品主图"
```

HappyHorse 图生视频：

```bash
npm run example -- --kind video \
  --model happyhorse-1.0-i2v \
  --image-url "https://example.com/first-frame.png" \
  --prompt "镜头缓慢推进"
```

以上命令不会发送网络请求，也不会产生生成费用。

## 显式发送

```bash
export CHINALLM_API_KEY='your_api_key_here'
npm run example -- --kind chat --prompt '你好' --send
```

PowerShell：

```powershell
$env:CHINALLM_API_KEY = 'your_api_key_here'
npm run example -- --kind chat --prompt '你好' --send
```

图片和视频调用可能产生费用。发送前请确认模型、账号分组、参数和模型广场实时价格。

## 查询已有任务

将图片或视频提交返回的 `poll_url` 传给查询脚本：

```bash
npm run poll -- --poll-url "/v1/images/generations/climg_sync_xxxxx"
```

默认只打印请求；加入 `--send` 才执行一次 GET。示例不会自动循环，也不会重新提交原生成任务。

## 正式教程

- [OpenAI 兼容 API 国内迁移](https://chinallmapi.com/guides/openai-compatible-api-china)
- [OpenAI SDK 兼容接入](https://chinallmapi.com/guides/openai-sdk-compatible-api)
- [Python 图片生成 API](https://chinallmapi.com/guides/python-image-generation-api)
- [Node.js 视频生成 API](https://chinallmapi.com/guides/nodejs-video-generation-api)
- [图生视频图片参数](https://chinallmapi.com/guides/image-to-video-image-parameters)
- [视频任务轮询与失败处理](https://chinallmapi.com/guides/video-generation-task-polling)
- [401 Invalid token 排查](https://chinallmapi.com/guides/401-invalid-token-api-error)
- [429 限流错误排查](https://chinallmapi.com/guides/429-too-many-requests-api-error)
- [余额和计费异常排查](https://chinallmapi.com/guides/api-balance-billing-errors)

## 本地测试

```bash
npm test
npm run check
```

测试只验证请求结构和语法，不访问 API。

## 许可证

MIT，见 [LICENSE](LICENSE)。
