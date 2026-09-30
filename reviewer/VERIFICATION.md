# Verification

Verified on September 30, 2026 with Node.js 22.22.2.

- Candidate starter: type checking and production build passed.
- Starter: 6 tests passed and 4 failed intentionally (10 tests total).
- Passing component checks verify automatic search on input changes, clearing the query, and request failure/recovery.
- Three hook tests expose stale successful results and incorrect loading during overlapping requests.
- One component regression reproduces the live search bug: typing m, mu, then mug shows only the mug first, then the older m request adds Reading lamp despite the unchanged mug query.
- Browser verification confirmed the same sequence without clicking any request or search button.
- The hook remains intentionally buggy. No solution implementation was added.

Stages 2 and 3 remain candidate tasks and are deliberately not implemented in the starter.
