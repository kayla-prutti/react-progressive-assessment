# Progressive React assessment

One connected React + TypeScript exercise with three stages, designed for approximately 75 minutes.

1. **Debug (20 minutes):** reproduce and fix stale search results in `useLatestAsync`.
2. **Extend (25 minutes):** add category filtering to the existing product search.
3. **Build (30 minutes):** create a saved-products component and integrate it into the page.

Search runs as you type. Type **mug** quickly and wait 2.5 seconds to see older results overwrite the latest query. The starter deliberately includes the supplied buggy hook. The candidate must fix it; the starter is not a completed solution.

## Run the starter

```sh
cd candidate
npm ci
npm run dev
```

Node.js 22.12+ is required. Candidate instructions are in [candidate/README.md](candidate/README.md). Run `npm run build` for type checking and production compilation, and `npm test` for automated checks. Four tests intentionally fail before stage 1 is completed: three hook checks and one search-result regression.

## Give the assessment to a candidate

Share only the `candidate/` directory. It is a standalone application with its own instructions, dependency lockfile, and test suite. Do not give a candidate access to this entire repository: the reviewer directory includes diagnosis and scoring guidance.

To create a candidate-only archive from a committed checkout:

```sh
git archive --format=zip --output=react-assessment-candidate.zip HEAD:candidate
```

The archive contains the application at its root and excludes reviewer materials.

## Review

See [reviewer/GUIDE.md](reviewer/GUIDE.md) for interview prompts and the evaluation rubric. No solution implementation is included. There are no completed implementations of stages 2 or 3 in the starter.
