# cross-origin-cookies-poc

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run main.ts
# also
npx serve -l 9087 .

# Open `http://localhost:9087` and observe the cookies being set cross-origin and logged in the Bun console from `localhost:3000`.
```

This project was created using `bun init` in bun v1.2.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
