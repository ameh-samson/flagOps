# FlagOps Frontend

Frontend application for FlagOps feature flag management system built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## Prerequisites

- Node.js (v20+)
- npm or yarn

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000
```

## Development

Start the development server:
```bash
npm run dev
```

Server runs on `http://localhost:5173`

## Production

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## Testing Setup

### Installation

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-istanbul
```

**Note:** All testing packages are already installed in this project.

### Configuration

**vite.config.ts:**
```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  // ... other config
  test: {
    setupFiles: ["./test-setup.js"],
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
    },
  },
});
```

**test-setup.js:**
```javascript
import "@testing-library/jest-dom/vitest";
import { afterEach } from 'vitest'
import { cleanup } from "@testing-library/react";

afterEach(() => {
    cleanup();
});
```

### Writing Tests

Tests are co-located with components:

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── store/          # Redux store
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── test-setup.js       # Test configuration
└── vite.config.ts      # Vite configuration
```

## Features

- React Compiler enabled for optimized performance
- Redux Toolkit for state management
- Tailwind CSS for styling
- TypeScript for type safety
- Vitest + React Testing Library for testing
- ESLint for code quality

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
