# Reviewer guide — do not share with candidates

The candidate starter lives entirely in `candidate/`. Send only that directory or the candidate-only archive described in the repository README.

## Scope and timing

Allow approximately 75 minutes: 20 minutes debugging, 25 extending the search, and 30 building saved products. Setup time should not count against the candidate. Ask the candidate to narrate their reasoning and mention what they would improve with more time. All stages belong to one product-finder application.

The starter hook remains intentionally buggy; no solution implementation is included. Four of ten starter tests intentionally fail. The remaining six tests and the production build should pass.

## Stage 1: root cause and contract

The original hook returns every successful response. A slow older search can finish after a faster newer search and overwrite the displayed results. It also unconditionally clears loading in `finally`, allowing an older request to clear the newest request's loading indicator.

Reproduce by typing **mug** quickly. Requests run on every input change. Single-character queries take 2.5 seconds; longer queries take 300 ms. The mug appears first, then older **m** results add products such as Reading lamp while the input still says mug. Normal search does not require a button click.

The intended contract is that only the latest-started request returns a usable value. Superseded successful calls resolve to `undefined`; the consumer already skips that value. `run` must have a return type of `Promise<TResult | undefined>`. Rejections still propagate to their individual callers. Requests are not cancelled.

Loading follows the most recently started request, rather than the number of pending requests. If later request B finishes while older A remains pending, loading should stop. If A finishes while B is pending, loading should continue.

No solution implementation is included. Evaluate both stale results and loading behavior against the candidate tests. The starter must retain the intentionally buggy hook.

Useful regression coverage: a third request starts after the second finishes but before the first settles; the first must return `undefined` and must not clear the third request's loading state. Test callback changes during a pending request if time permits. Requests should use deferred promises or fake timers, rather than real-time sleeps.

Reject fixes that disable overlapping requests, remove tests, swallow rejections, return stale values, return the newest result to all callers, or only address the calling component. Unmount protection and cancellation are optional discussions, outside the required contract.

## Stage 2: extension

Look for a controlled and labeled category select, correct use of the existing API's category option, a result count, useful empty state, and preservation of loading/error behavior. Reset should pass explicit cleared filter values into the next search; setting state and immediately reading stale state is a common error. Diagnostic requests should honor current filters.

A useful test selects Books, waits for the automatic mock request, and confirms books appear while electronics do not. Another tests reset after an active filter. Typing and category changes must automatically trigger searches.

## Stage 3: composition

Look for saved state in the shared parent, a reusable component that accepts products and callbacks, stable IDs, immutable updates, no duplicates, accessible save/remove/clear actions, and a correct USD total. Search results disappearing must not delete saved products. Do not require localStorage, routing, or external libraries.

A useful test saves an item twice, confirms a single entry, searches for another item, confirms the original remains saved, then removes it. Accept different component APIs if responsibilities are clear.

## Rubric (100 points)

| Area | Points | Evidence |
| --- | ---: | --- |
| Bug diagnosis | 10 | Explains out-of-order responses overwriting newer results and the loading race. |
| Hook correctness | 20 | Latest result returned, stale successes resolve to undefined, correct loading/errors and changed callbacks. |
| Hook regression coverage | 10 | Understands existing tests and adds a meaningful scenario. |
| Search extension | 20 | Category, reset, counts, empty/error/loading states, correct async options. |
| Saved-products component | 25 | Parent state, reusable API, uniqueness, persistence across searches, removal/clear, accurate total. |
| Component test coverage | 10 | At least one meaningful test for each of stages 2 and 3. |
| Communication and accessibility | 5 | Clear notes, sensible tradeoffs, labeled controls and keyboard operation. |

Use the score as supporting evidence, not a substitute for the conversation. Record completed behavior and remaining gaps rather than rewarding speed or unnecessary abstraction.
