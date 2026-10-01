# React coding assessment: Product finder

Implementation comments marked **STAGE 1**, **STAGE 2**, and **STAGE 3** identify the places to work in the source files.

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

## Stage 3 — Add a product (20 minutes)

Implement the commented placeholder in `src/components/AddProduct.tsx` and complete `handleAddProduct` in `src/App.tsx`. The component is already imported and displayed in the app.

- Provide labeled inputs for **Product name**, **Category** (Electronics, Home, Books), and **Price**, plus an **Add** button.
- Reject an empty name or a price that is not a positive number. Show useful validation feedback.
- Give each new product a unique ID and add it to catalog state without mutating the existing array.
- After adding, the provided catalog wiring resets search and shows the updated list. Clear the form for another entry.
- Added products must remain available when typing or changing category during this session. App already owns catalog state and passes it to search; complete the immutable update in its add handler.

Example: add **Desk plant**, category **Home**, price **12**. It appears as **$12.00**. Searching for **plant** should find it.

Use the provided component and callback wiring. Edit/delete actions, persistence after page reload, and new styling are not required.

## Wrap-up

Run the existing tests and build. Explain your choices and anything unfinished during the discussion. If time remains, add one focused test for category filtering or adding a product; new tests and written notes are optional.
