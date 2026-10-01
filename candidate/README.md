# React coding assessment: Product finder

This is a **45-minute coding exercise** within a **60-minute meeting**. You will work on one application across three progressive stages. Focus on working behavior and clear React code. The starter includes React, TypeScript, mock data, and tests; no backend is required.

## Getting started

Use Node.js 22.12 or newer. Have the app running before the coding timer starts.

```sh
npm ci
npm run dev
```

Open the address printed by the development server. Search updates immediately as you type.

```sh
npm test
npm run build
```

Four tests intentionally fail because of the stage 1 bug. The starter builds successfully.

## Stage 1 — Fix the search bug (10 minutes)

Type **mug** quickly. Only the mug appears first. After about 2.5 seconds, other products such as **Reading lamp** incorrectly appear even though the query still says **mug**. The mock makes single-character queries slower to reproduce out-of-order responses.

Explain the issue and fix `src/hooks/useLatestAsync.ts`.

- Keep the public interface `{ run, loading }` and the generic argument/result types.
- Only the most recently started request returns its result. A superseded successful request resolves to `undefined`, whether it finishes before or after the newest request. `run` returns `Promise<TResult | undefined>`; the search component already skips `undefined` results.
- Loading follows the most recently started request. Older requests settling must not change its loading state.
- Keep errors propagating to callers and continue using the current `asyncFn` after it changes.
- Fix the hook itself. Keep live search and overlapping requests working.

Use the existing tests to verify the fix. Do not add the solution to the calling component or replace the asynchronous mock.

## Stage 2 — Extend product search (15 minutes)

Add category filtering to `src/components/ProductSearch.tsx`.

- Add a labeled category selector: **All categories**, **Electronics**, **Home**, **Books**.
- Keep the category in React state and pass it to `searchProducts` using its existing `category` option.
- Typing or changing the category automatically searches with both current values.
- Show the result count. Preserve existing loading, error, and empty states.

## Stage 3 — Build a saved-products component (20 minutes)

Create `src/components/SavedProducts.tsx` and integrate it through `src/App.tsx`.

- Add a **Save** action to each search result and keep saved state in the shared parent.
- Pass saved products and a removal callback to the new component. Display each saved product's name and price, with a **Remove** button and a useful empty state.
- Avoid duplicates and show when a search result is already saved.
- Keep saved products when a search or filter hides them from results.

Use accessible labels and buttons. You do not need a combined price, a clear-all action, browser persistence, routing, or new styling.

## Wrap-up

Run the existing tests and build. Explain your choices and anything unfinished during the discussion. If time remains, add one focused test for category filtering or saved products; new tests and written notes are optional.
