<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/header/gradient.svg?title=Vocab+Wallet&subtitle=Learn+Arabic+vocabulary+with+flashcards&logo=react&mode=dark" />
    <img alt="Vocab Wallet" src="https://shieldcn.dev/header/gradient.svg?title=Vocab+Wallet&subtitle=Learn+Arabic+vocabulary+with+flashcards&logo=react&mode=light" />
  </picture>
</p>

<p align="center">
  <a href="https://react.dev"><img alt="React + TypeScript" src="https://shieldcn.dev/badge/React-TypeScript-61DAFB.svg?logo=react&variant=secondary" /></a>
  <a href="https://vitejs.dev/"><img alt="Vite" src="https://shieldcn.dev/badge/Built_with-Vite-646CFF.svg?logo=vite&variant=secondary" /></a>
  <a href="https://github.com/thiernoyunus/Vocab-Wallet/commits"><img alt="Last commit" src="https://shieldcn.dev/github/last-commit/thiernoyunus/Vocab-Wallet.svg?variant=secondary" /></a>
  <a href="https://github.com/thiernoyunus/Vocab-Wallet"><img alt="Stars" src="https://shieldcn.dev/github/stars/thiernoyunus/Vocab-Wallet.svg?variant=secondary" /></a>
</p>

Vocab Wallet is a small single page application for learning Arabic vocabulary. The project was generated from a Magic Patterns design and built with [Vite](https://vitejs.dev/), React and TypeScript.

The app contains a set of short lessons and lets you review the words using flashcards. It keeps track of your progress in local storage and provides simple statistics about cards reviewed each day. A searchable dictionary view is also included so you can quickly look up words and jump back to the lesson they belong to.

## Development

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` by default.

3. Run the unit tests

   ```bash
   npm test
   ```

## Building for production

To create an optimized production build run:

```bash
npm run build
```

You can preview the built files locally with:

```bash
npm run preview
```

## Project structure

- `src/components` – React components for the lessons, review flow, stats and dictionary
- `src/utils` – helper utilities such as statistics tracking
- `src/__tests__` – sample tests using [Vitest](https://vitest.dev)

Feel free to adapt the code for your own vocabulary lists or other languages. Enjoy!
