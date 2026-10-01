# Progressive React assessment

One React + TypeScript exercise with **45 minutes of coding** in a **60-minute meeting**.

| Stage | Time | Task |
| --- | ---: | --- |
| 1. Debug | 10 minutes | Fix stale search results in `useLatestAsync`. |
| 2. Extend | 15 minutes | Add category filtering and a result count. |
| 3. Add | 20 minutes | Add a product using a name/category/price form and an add function. |

Reserve the other 15 minutes for introductions and discussion. Have dependencies installed and the app running before coding starts.

The page contains live search and results. Type **mug** quickly and wait 2.5 seconds to see older results overwrite the latest query. The hook intentionally remains buggy for the candidate to fix. No solution implementation is included.

## Run

```sh
cd candidate
npm ci
npm run dev
```

Use Node.js 22.12+. Full requirements are in [candidate/README.md](candidate/README.md). `npm test` runs the provided checks; four intentionally fail before stage 1 is completed. `npm run build` checks types and compiles the app.

## Share with a candidate

Share only `candidate/`, which is a standalone application. Reviewer materials contain diagnosis and evaluation guidance.

```sh
git archive --format=zip --output=react-assessment-candidate.zip HEAD:candidate
```

The archive excludes reviewer materials. See [reviewer/GUIDE.md](reviewer/GUIDE.md) for meeting structure and evaluation criteria.
