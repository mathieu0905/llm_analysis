# Multi-Task Metrics Snapshot (results)

Latest cross-model metrics harvested from `results/aggregated_summary.json`. 
Structural tasks count cases whose 错误判定为 PASS（AST: 缺少语句标记/语法关键字缺失/结构错误；CFG: 冗余/臆造/结构错误；CG: 冗余/臆造/缺少调用 的容忍阈下，error_free=1）。

| Model | AST | CFG | CG | DP F1 | Taint F1 | Pointer | Mutant fewshot | Mutant zeroshot | Flaky summary | Flaky concept | Expr cases | Expr@5 | Expr@10 | Expr@20 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| GPT-5-mini | 72/75 | 66/75 | 51/75 | 0.823 | 0.613 | 0.585 | 0.915 | 0.850 | 0.200 | 0.173 | 32 | 32/32 (1.000) | 32/32 (1.000) | 32/32 (1.000) |

## Notes on Missing Entries
- `Mutant` remains blank when evaluation failed (e.g. corrupt XLSX) or produced zero valid rows.
- `Flaky` appears only for models with `flakytest` spreadsheets present.
- Pointer parsing tolerates fenced JSON and trims narration; remaining blanks indicate genuinely empty files.
- Expression columns use CodeBERT similarity ≥ 0.96 with token-coverage fallback; missing outputs count as failures.

Re-run this script after refreshing task outputs to keep the dashboard current.

## Expression Matching QA Checklist
- CodeBERT similarity threshold固定为0.96，结合算子归一化与token覆盖兜底；所有模型的统计均来自 `evaluation/metrics/expression_similarity.py`。
- 与人工逐条核对的参考模型：`gpt-5`、`gpt-4o-mini`。请在核对完成后把结果登记到 `docs/revision/expression_manual_vs_auto.md`（详见表格模板）。
- 异常输出（如缺失JSON、空列表）被计为失败；对应 case 可通过 `results/<model>/expression_match/<case>/expression.txt` 追踪。

## 结构任务判定核验计划
- 当前 pass/fail 完全由错误诊断驱动：AST/CFG 看 `*_error_free`，CG 采用 `_cg_auto_pass`（抽象结构通过 + 无缺失或幻觉边 + 入口/核心覆盖有信号）。
- 拟手动核验模型：`gpt-5`、`gpt-4o-mini`、`CodeLlama-70b`（覆盖强/中/弱三个段位）。
- 核验方法：对每项任务随机抽取或逐条检查 10 个边界用例（含失败样例），记录人工判断与自动诊断是否一致。核验表格请放在 `docs/revision/structure_manual_vs_auto.md`。
- 若发现系统性偏差，请在表格中备注原因（模型输出问题 vs. 解析失败 vs. 诊断规则过严），以便迭代判定逻辑。

## Flaky Test Confusion Analysis
- 使用 `scripts/generate_flaky_confusion.py` + `scripts/analyse_flaky_confusion.py` 生成并汇总混淆矩阵（输出位于 `results/<model>/flakytest/confusion`）。
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
