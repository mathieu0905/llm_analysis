# Multi-Task Metrics Snapshot (results_0922)

Latest cross-model metrics harvested from `results_0922/aggregated_summary.json`. 
Structural tasks count cases whose 错误判定为 PASS（AST: 缺少语句标记/语法关键字缺失/结构错误；CFG: 冗余/臆造/结构错误；CG: 冗余/臆造/缺少调用 的容忍阈下，error_free=1）。

| Model | AST | CFG | CG | DP F1 | Taint F1 | Pointer | Mutant fewshot | Mutant zeroshot | Flaky summary | Flaky concept | Expr cases | Expr@5 | Expr@10 | Expr@20 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| GPT-5-nano | 57/75 | 56/75 | 51/75 | 0.846 | 0.761 | 0.499 | 0.895 | 0.875 | 0.246 | 0.277 | 32 | 30/32 (0.938) | 30/32 (0.938) | 30/32 (0.938) |
| GPT-5-mini | 65/75 | 64/75 | 51/75 | 0.826 | 0.592 | 0.552 | 0.925 | 0.885 | 0.323 | 0.292 | 32 | 29/32 (0.906) | 29/32 (0.906) | 29/32 (0.906) |
| GPT-o1-mini | 56/75 | 66/75 | 51/75 | 0.748 | 0.435 | 0.340 | 0.720 | 0.645 | 0.385 | 0.246 | 32 | 29/32 (0.906) | 29/32 (0.906) | 29/32 (0.906) |
| gpt-5-codex | 72/75 | 67/75 | 51/75 | 0.695 | 0.606 | 0.511 | 0.890 | 0.880 | 0.385 | 0.292 | 32 | 29/32 (0.906) | 29/32 (0.906) | 29/32 (0.906) |
| GPT-OSS-20B | 69/75 | 62/75 | 46/75 | 0.710 | 0.624 | 0.486 | 0.834 | 0.875 | 0.339 | 0.231 | 32 | 22/32 (0.688) | 22/32 (0.688) | 22/32 (0.688) |
| GPT-5 | 69/75 | 65/75 | 51/75 | 0.700 | 0.545 | 0.516 | 0.895 | 0.885 | 0.400 | 0.308 | 32 | 31/32 (0.969) | 31/32 (0.969) | 31/32 (0.969) |
| o4-mini | 73/75 | 67/75 | 51/75 | 0.705 | 0.388 | 0.494 | 0.920 | 0.920 | 0.308 | 0.215 | 32 | 30/32 (0.938) | 30/32 (0.938) | 30/32 (0.938) |
| GPT-o3-mini | 72/75 | 62/75 | 53/75 | 0.734 | 0.364 | 0.143 | 0.920 | 0.880 | 0.339 | 0.262 | 32 | 30/32 (0.938) | 30/32 (0.938) | 30/32 (0.938) |
| o3 | 69/75 | 68/75 | 52/75 | 0.710 | 0.672 | 0.499 | 0.880 | 0.860 | 0.415 | 0.323 | 32 | 30/32 (0.938) | 30/32 (0.938) | 30/32 (0.938) |
| GPT-4o-mini | 61/75 | 62/75 | 51/75 | 0.535 | 0.678 | 0.290 | 0.500 | 0.495 | 0.292 | 0.154 | 32 | 18/32 (0.562) | 18/32 (0.562) | 18/32 (0.562) |
| GPT-4o | 62/75 | 62/75 | 52/75 | 0.692 | 0.473 | 0.306 | 0.600 | 0.540 | 0.369 | 0.262 | 32 | 27/32 (0.844) | 27/32 (0.844) | 27/32 (0.844) |
| Claude-sonnet-4 | 69/75 | 68/75 | 54/75 | 0.777 | 0.725 | 0.359 | 0.700 | 0.660 | 0.431 | 0.246 | 32 | 30/32 (0.938) | 30/32 (0.938) | 30/32 (0.938) |
| Gemini-2.5-Flash-09-2025 | 71/75 | 67/75 | 46/75 | 0.898 | 0.700 | 0.352 | 0.905 | 0.925 | 0.339 | 0.246 | 32 | 31/32 (0.969) | 31/32 (0.969) | 31/32 (0.969) |
| Gemini-2.5-Pro | 65/75 | 64/75 | 52/75 | 0.887 | 0.664 | 0.366 | 0.855 | 0.755 | 0.339 | 0.292 | 32 | 32/32 (1.000) | 32/32 (1.000) | 32/32 (1.000) |
| Deepseekchat-v3 | 57/75 | 65/75 | 54/75 | 0.741 | 0.281 | 0.320 | 0.570 | 0.505 | 0.339 | 0.277 | 32 | 27/32 (0.844) | 27/32 (0.844) | 27/32 (0.844) |
| Qwen3-next-80b-a3b-instruct | 66/75 | 64/75 | 52/75 | 0.559 | 0.630 | 0.297 | 0.550 | 0.530 | 0.200 | 0.092 | 32 | 21/32 (0.656) | 21/32 (0.656) | 21/32 (0.656) |
| Qwen3-coder-plus | 70/75 | 63/75 | 50/75 | 0.607 | 0.503 | 0.343 | 0.555 | 0.520 | 0.369 | 0.339 | 32 | 27/32 (0.844) | 27/32 (0.844) | 27/32 (0.844) |
| Kimi-K2 | 53/75 | 63/75 | 52/75 | 0.746 | 0.614 | 0.325 | 0.515 | 0.510 | 0.339 | 0.262 | 32 | 31/32 (0.969) | 31/32 (0.969) | 31/32 (0.969) |
| StarChat | 37/75 | 40/75 | 35/75 | 0.699 | 0.481 | 0.150 | 0.417 | 0.591 | 0.308 | 0.108 | 32 | 0/32 (0.000) | 0/32 (0.000) | 0/32 (0.000) |
| CodeLlama-70b | 57/75 | 60/75 | 51/75 | 0.669 | 0.655 | 0.276 | 0.531 | 0.533 | 0.277 | 0.262 | 32 | 11/32 (0.344) | 11/32 (0.344) | 11/32 (0.344) |
| CodeLlama-13b | 49/75 | 36/75 | 44/75 | 0.659 | 0.616 | 0.136 | 0.500 | 0.500 | 0.169 | 0.139 | 32 | 0/32 (0.000) | 0/32 (0.000) | 0/32 (0.000) |

## Notes on Missing Entries
- `Mutant` remains blank when evaluation failed (e.g. corrupt XLSX) or produced zero valid rows.
- `Flaky` appears only for models with `flakytest` spreadsheets present.
- Pointer parsing tolerates fenced JSON and trims narration; remaining blanks indicate genuinely empty files.
- Expression columns use CodeBERT similarity ≥ 0.96 with token-coverage fallback; missing outputs count as failures.

Re-run this script after refreshing task outputs to keep the dashboard current.

## Expression Matching QA Checklist
- CodeBERT similarity threshold固定为0.96，结合算子归一化与token覆盖兜底；所有模型的统计均来自 `evaluation/metrics/expression_similarity.py`。
- 与人工逐条核对的参考模型：`gpt-5`、`gpt-4o-mini`。请在核对完成后把结果登记到 `docs/revision/expression_manual_vs_auto.md`（详见表格模板）。
- 异常输出（如缺失JSON、空列表）被计为失败；对应 case 可通过 `results_0922/<model>/expression_match/<case>/expression.txt` 追踪。

## 结构任务判定核验计划
- 当前 pass/fail 完全由错误诊断驱动：AST/CFG 看 `*_error_free`，CG 采用 `_cg_auto_pass`（抽象结构通过 + 无缺失或幻觉边 + 入口/核心覆盖有信号）。
- 拟手动核验模型：`gpt-5`、`gpt-4o-mini`、`CodeLlama-70b`（覆盖强/中/弱三个段位）。
- 核验方法：对每项任务随机抽取或逐条检查 10 个边界用例（含失败样例），记录人工判断与自动诊断是否一致。核验表格请放在 `docs/revision/structure_manual_vs_auto.md`。
- 若发现系统性偏差，请在表格中备注原因（模型输出问题 vs. 解析失败 vs. 诊断规则过严），以便迭代判定逻辑。

## Flaky Test Confusion Analysis
- 使用 `scripts/generate_flaky_confusion.py` + `scripts/analyse_flaky_confusion.py` 生成并汇总混淆矩阵（输出位于 `results_0922/<model>/flakytest/confusion`）。
- 主要观察：
  1. **`async wait` 与 `test case timeout` 互扰**：出现在 `gpt-5`、`gemini-2.5-pro`、`qwen3-coder-plus` 等多款模型；`async wait` 易被误判为 `test case timeout`（模型倾向将任何延迟归为超时）。
  2. **I/O 与排序相关标签记忆弱**：`io ↔ test order dependency`、`unordered collection ↔ platform dependency` 常见，说明模型难以分辨 I/O 侧效与执行顺序问题。
  3. **长尾类别 recall 极低**：`resource leak`、`network` 在大多数模型 recall < 0.2；需要在文本提示里强化“资源释放/网络”线索，或补充 Few-shot 示例。
- 写作时可引用下述代表性数字（summary split）：
  - `gpt-5`: overall 40% 准确率；`test order dependency` recall 0.8，但 `resource leak` 0.0。
  - `gemini-2.5-pro`: overall 33.8%；`test case timeout` recall 0.6，却常混淆 `concurrency`。
  - `qwen3-coder-plus`: overall 36.9%；`io`、`test case timeout` recall 均达 0.8，但 `concurrency`、`resource leak` 近乎 0。
- 可在补充材料附上各模型 `confusion_summary.csv`，并在回复中说明我们据此定位最易混淆的标签并调整 prompt。

## Prompt Strategy Diagnostics
- Prompt 模板与稳健性诊断方案详见 `docs/revision/5.prompts.md`：当前将指令拆分为 system framing / domain hints / output schema / few-shot 示例，并设计 role / CoT / self-consistency / schema enforcement 等因素的析因实验。
- 已完成工作：
  1. 将现用 prompt 整理进 YAML prompt bank（带版本号与变量位），配套脚本记录 seed 与解码参数；
  2. 通过 `experiments/prompts/` 目录的跑批，测量 across-prompt variance、worst-case score 与排名稳定性，以回应“prompt 随意性”疑虑；
  3. 在补充材料中附上 `prompt_ablation_summary.csv`（若尚未生成，可复用文档中的示例脚本）。
- 后续计划：在主文中加入 Prompt Robustness 小节，报告各因素对代表任务（如 CFG、flaky reasoning）的贡献及显著性检测结果。
