## Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sanity

Running the `pnpm dev` will also lauch Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio).

To deploy new version of sanity we should use:

```bash
pnpm sanity:deploy
```

## Env

Required env variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
```
