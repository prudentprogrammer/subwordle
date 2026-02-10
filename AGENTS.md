You are writing a Devvit web application (SubWordle) that will be executed on Reddit.com.

## Tech Stack

- **Frontend**: React 19, Tailwind CSS 4, Vite
- **Backend**: Node.js v22 serverless environment (Devvit), Hono
- **Storage**: Redis (via Devvit)
- **Game**: Wordle-style 5-letter word guessing game with categories

## Layout & Architecture

- `/src/server`: **Backend Code**. This runs in a secure, serverless environment.
  - `routes/api.ts`: Game API endpoints (init, guess, stats, leaderboard, submit-word).
  - `routes/menu.ts`: Moderator menu handler (opens category form).
  - `routes/forms.ts`: Form submission handler (creates game with category).
  - `routes/triggers.ts`: App install trigger (auto-creates first game).
  - `services/wordService.ts`: Daily word selection and guess validation.
  - `services/statsService.ts`: Leaderboard and stats tracking.
  - `core/post.ts`: Game post creation logic.
  - `index.ts`: Main server entry point (Hono app).
  - Access `redis`, `reddit`, and `context` here via `@devvit/web/server`.
- `/src/client`: **Frontend Code**. This is executed inside of an iFrame on reddit.com
  - Entrypoints:
    - `game.html`: The main game view (Expanded View) with board, keyboard, modals.
    - `splash.html`: The inline feed view showing tile preview and "tap to play".
  - `components/`: Board, Row, Tile, Keyboard, Key, Header, Stats, Leaderboard, HowToPlay, SubmitWord.
  - `hooks/`: useGame (game state management), useAnimations (tile animations).
  - `utils/`: share (emoji grid generation, clipboard).
- `/src/shared`: **Shared Code**. Types, constants, game logic, word lists.
  - `api.ts`: All TypeScript types and constants (MAX_GUESSES, WORD_LENGTH, CATEGORIES).
  - `gameLogic.ts`: Wordle evaluation algorithm (evaluateGuess, isWin, isGameOver).
  - `words.ts`: Valid guess words and answer words by category.
- `/src/test`: **Tests**. Unit tests for game logic.

## Frontend

### Rules

- Instead of `window.location` or `window.assign`, use `navigateTo` from `@devvit/web/client`

### Limitations

- `window.alert`: Use `showToast` or `showForm` from `@devvit/web/client`
- File downloads: Use clipboard API with `showToast` to confirm
- Geolocation, camera, microphone, and notifications web APIs: No alternatives
- Inline script tags inside of `html` files: Use a script tag and separate js/ts file

## Commands

- `npm run type-check`: Check typescript types
- `npm run lint`: Check the linter
- `npm run test -- my-file-name`: Run tests isolated to a file

## Code Style

- Prefer type aliases over interfaces when writing typescript
- Prefer named exports over default exports
- Never cast typescript types

## Global Rules

- You may find code that references blocks or `@devvit/public-api` while building a feature. Do NOT use this code as this project is configured to use Devvit web only.
- Whenever you add an endpoint for a new menu item action, ensure that you've added the corresponding mapping to `devvit.json` so that it is properly registered

Docs: https://developers.reddit.com/docs/llms.txt.
