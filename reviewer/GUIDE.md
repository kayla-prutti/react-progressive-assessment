# Reviewer guide — do not share with candidates

Share only `candidate/` or the candidate-only ZIP.

## Meeting structure

| Meeting time | Activity |
| --- | --- |
| 0–5 minutes | Introductions and explain the exercise. |
| 5–15 minutes | Stage 1: debug the hook (10 minutes). |
| 15–30 minutes | Stage 2: extend search (15 minutes). |
| 30–50 minutes | Stage 3: build saved products (20 minutes). |
| 50–60 minutes | Discuss decisions, tradeoffs, and unfinished work. |

Install dependencies and check the development server before the meeting. Keep the 45-minute coding period focused on the three tasks. Additional tests, written notes, new styling, combined prices, clear-all, persistence, routing, and cancellation are not required.

The starter intentionally contains the bug and includes no solution implementation. Four of ten tests fail: three hook checks and one search-result regression. The other six tests and the build should pass.

## Stage 1: stale search results

Type **mug** quickly. Single-character queries take 2.5 seconds; longer queries take 300 ms. The mug appears first, then the older **m** result adds Reading lamp while the input still says mug. The clean UI has no request controls; this reproduces through ordinary typing.

The hook returns every response and unconditionally clears loading in `finally`. Evaluate the candidate's explanation of out-of-order results and loading. Only the latest-started request should return a usable value; superseded successful calls resolve to `undefined`. `run` returns `Promise<TResult | undefined>` and preserves generic types. Rejections still propagate. Loading follows the newest request, even if older requests remain pending. Later calls use the current callback.

The component already skips `undefined` results. The fix belongs in the reusable hook. Disabling typing during loading, removing expectations, replacing the async mock, or only guarding the calling component does not meet the task.

Use existing tests; new hook tests are optional. If the candidate is stuck, ask them to trace the order of two requests and two responses, then move to stage 2 at the time boundary.

## Stage 2: category filtering

Check a controlled, labeled category select, the existing API category option, and a result count. Typing and category changes should automatically search with current query/category values. Existing loading, error, and empty states should remain useful.

No reset button or new component test is required. A focused category test is a useful extra if time permits.

## Stage 3: saved products

Check state in the shared parent, a separate component receiving products and a removal callback, stable IDs, immutable updates, unique saved products, accessible save/remove buttons, and an empty state. Filtering a product out of search results must not remove it from the saved list.

Do not require a total, clear-all, browser persistence, or new styling. A focused duplicates/removal test is optional.

## Evaluation (100 points)

| Area | Points | Evidence |
| --- | ---: | --- |
| Debugging | 35 | Explains the race and fixes stale results plus loading with preserved callback and error behavior. |
| Search extension | 25 | Controlled category, correct API options, live search, result count. |
| New component | 30 | Parent-owned state, reusable props, uniqueness, persistence across filters, save/remove, empty state. |
| Reasoning and accessibility | 10 | Explains choices, uses clear component boundaries and accessible controls, verifies behavior. |

Use scores as supporting evidence. Existing tests and the build are sufficient baseline verification; treat added tests as extra evidence rather than mandatory work. Assess the completed behavior and the discussion without expanding scope beyond the 45-minute task.
