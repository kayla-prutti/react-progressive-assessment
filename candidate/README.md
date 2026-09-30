# React coding assessment: Product finder

You will work on one application across three progressive stages. Aim for about 75 minutes. Prioritize correctness and clear component boundaries over visual polish. The starter includes React, TypeScript, deterministic mock data, and tests; no backend or account is required.

## Getting started

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the address printed by the development server. In another terminal:

```sh
npm test
npm run build
```

Two tests intentionally fail in the starter. The application builds successfully before you begin. The existing UI deliberately allows overlapping requests.

## Stage 1 — Debug an existing hook (20 minutes)

A user reports that the loading indicator sometimes disappears while their latest search is still running.

1. In **Request controls**, click **Fast request**, then click **Slow request** within 300 ms. Observe the loading indicator while the slow request is pending.
2. Explain why the behavior occurs.
3. Fix `src/hooks/useLatestAsync.ts` and keep the public interface `{ run, loading }` unchanged. The hook must remain generic and reusable.

Expected behavior:

- `loading` becomes true when a request starts.
- It stays true until the **most recently started** request settles, whether that request succeeds or fails.
- An older request settling must not change the loading state of a newer request.
- If a slow request starts and a later fast request finishes first, loading becomes false when that later fast request finishes, even while the older request remains pending.
- Every invocation of `run` still resolves with its own value or rejects with its own error. The hook must not swallow errors or cancel previous callers.
- A subsequent invocation uses the current `asyncFn` if that function changes.

Run the existing hook tests, then add any regression test you think is missing. The search component already guards displayed results against stale responses; focus the fix on the hook's loading behavior.

## Stage 2 — Extend the existing component (25 minutes)

Extend `ProductSearch` with category filtering.

Requirements:

- Add a labeled category selector: **All categories**, **Electronics**, **Home**, and **Books**.
- Keep the selected category in React state and pass it to the existing `searchProducts` API. Its optional `category` option is already supported.
- A normal search uses both the text query and selected category. Do not automatically search on every keystroke or category change.
- Fast and slow diagnostic requests must use the same current query and category.
- Show a result count and a useful empty state. Preserve loading and error feedback.
- Add a **Reset filters** control that clears the query, selects all categories, and reloads all products through the async API.
- Keep request controls usable during loading so overlapping requests remain possible.
- Add a meaningful component test that verifies category filtering or reset behavior.

## Stage 3 — Build a new component (30 minutes)

Build a reusable `SavedProducts` component and integrate it beside or below the search results.

Requirements:

- Add a **Save** action to each search result.
- Store saved products in the parent that coordinates search and the saved list. Pass data and callbacks into the new component.
- Saving the same product twice must not create duplicates. A saved result should visibly indicate its saved state.
- Keep saved products when a later search or filter hides them from results.
- Show each saved product's name and price, the number saved, and the combined price in USD.
- Support removing one product and clearing the list.
- Show a useful empty state and use accessible buttons and labels.
- Add a meaningful test covering duplicates, removal, or persistence across searches.

Browser persistence, routing, third-party UI libraries, and a backend are not required. Choose the component API and layout yourself.

## Submission

Include your code, passing tests, and a successful build. Add a short `NOTES.md` with the bug explanation, your main implementation decisions, and anything unfinished. Do not replace the asynchronous mock with a synchronous shortcut or remove existing test expectations.
