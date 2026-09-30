# Reviewer guide — do not share with candidates

The candidate starter lives entirely in `candidate/`. Send only that directory or the candidate-only archive described in the repository README.

## Scope and timing

Allow approximately 75 minutes: 20 minutes debugging, 25 extending the search, and 30 building saved products. Setup time should not count against the candidate. Ask the candidate to narrate their reasoning and mention what they would improve with more time. All stages belong to one product-finder application.

The original hook implementation supplied by the assessment author is preserved in the starter. Two of eight starter tests intentionally fail. The remaining six tests and the production build should pass.

## Stage 1: root cause and contract

Every invocation sets loading to true and unconditionally sets it to false in `finally`. With overlapping calls, an older call can clear loading while the newest call is pending. The defect occurs on success and rejection; removing `console.log` does not fix it.

The intended contract is latest-started-request loading, not an in-flight request counter. If A is pending and later B finishes, loading should stop even if A is still pending. Every caller retains its own result or error.

The consuming search component already has a monotonically increasing ID to protect displayed results. That does not fix the shared hook's loading state; the candidate must change the hook itself.

A small reference fix is in [useLatestAsync.reference.ts](useLatestAsync.reference.ts). Increment a ref synchronously when each invocation starts, capture the ID in that invocation, and only clear loading if it is still the latest ID. Keep the `asyncFn` callback dependency and use `finally` so failure behaves the same way as success. Removing the debug log is optional.

Useful regression coverage: a third request starts after the second finishes but before the first settles; the first settling must not clear the third request's loading state. Test callback changes during a pending request if time permits. Requests should use deferred promises or fake timers, rather than real-time sleeps.

Reject fixes that disable overlapping requests, remove tests, swallow rejections, return the newest result to all callers, or only address the calling component. Unmount protection and cancellation are optional discussions, outside the required contract.

## Stage 2: extension

Look for a controlled and labeled category select, correct use of the existing API's category option, a result count, useful empty state, and preservation of loading/error behavior. Reset should pass explicit cleared filter values into the next search; setting state and immediately reading stale state is a common error. Diagnostic requests should honor current filters.

A useful test selects Books, submits a search, waits for the mock request, and confirms books appear while electronics do not. Another tests reset after an active filter. Do not require automatic searches; submission is the defined behavior.

## Stage 3: composition

Look for saved state in the shared parent, a reusable component that accepts products and callbacks, stable IDs, immutable updates, no duplicates, accessible save/remove/clear actions, and a correct USD total. Search results disappearing must not delete saved products. Do not require localStorage, routing, or external libraries.

A useful test saves an item twice, confirms a single entry, searches for another item, confirms the original remains saved, then removes it. Accept different component APIs if responsibilities are clear.

## Rubric (100 points)

| Area | Points | Evidence |
| --- | ---: | --- |
| Bug diagnosis | 10 | Explains the older request's unconditional `finally` and overlapping calls. |
| Hook correctness | 20 | Latest-request semantics, success/error propagation, stable behavior with changed callbacks. |
| Hook regression coverage | 10 | Understands existing tests and adds a meaningful scenario. |
| Search extension | 20 | Category, reset, counts, empty/error/loading states, correct async options. |
| Saved-products component | 25 | Parent state, reusable API, uniqueness, persistence across searches, removal/clear, accurate total. |
| Component test coverage | 10 | At least one meaningful test for each of stages 2 and 3. |
| Communication and accessibility | 5 | Clear notes, sensible tradeoffs, labeled controls and keyboard operation. |

Use the score as supporting evidence, not a substitute for the conversation. Record completed behavior and remaining gaps rather than rewarding speed or unnecessary abstraction.
