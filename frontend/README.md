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

## Testing

### Testing Stack

This project uses:

- **Vitest** - Fast unit test framework (Vite-native)
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom matchers for DOM assertions
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM implementation for Node.js
- **@vitest/coverage-istanbul** - Code coverage reporting

### Installation Breakdown

Install all testing dependencies:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-istanbul
```

**Why each package?**

1. **vitest** - Test runner (like Jest but faster with Vite)
   - Runs your tests
   - Provides `describe`, `it`, `expect`, `vi` (mocking)

2. **@testing-library/react** - React component testing utilities
   - `render()` - Renders components for testing
   - `screen` - Queries for elements
   - `cleanup()` - Cleans up after each test

3. **@testing-library/jest-dom** - Custom matchers
   - Adds matchers like `toBeInTheDocument()`, `toHaveValue()`, etc.
   - Makes assertions more readable

4. **@testing-library/user-event** - User interaction simulation
   - `user.type()` - Simulates typing
   - `user.click()` - Simulates clicking
   - More realistic than `fireEvent`

5. **jsdom** - Browser environment for Node.js
   - Provides `window`, `document`, DOM APIs
   - Required for testing React components

6. **@vitest/coverage-istanbul** - Code coverage tool
   - Tracks which code is tested
   - Generates coverage reports

### Configuration

**vite.config.ts:**

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  // ... other config
  test: {
    setupFiles: ["./src/test/setup.ts"],
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
    },
  },
});
```

**src/test/setup.ts:**

```typescript
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui
```

### Writing Tests

Tests are co-located with components:

```
src/
├── components/
│   ├── screens/
│   │   ├── login/
│   │   │   ├── LoginForm.tsx
│   │   │   └── LoginForm.test.tsx
```

**Example test:**

```typescript
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  const mockProps = {
    register: vi.fn(),
    handleSubmit: vi.fn((fn) => fn),
    onSubmit: vi.fn(),
    errors: {},
    isLoading: false,
  };

  beforeEach(() => {
    render(<LoginForm {...mockProps} />);
  });

  it("should render form fields", () => {
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("should handle form submission", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/email/i), "test@example.com");
    await user.type(screen.getByPlaceholderText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Best Practices

1. **Test user behavior, not implementation**
   - Use `screen.getByRole()`, `getByLabelText()` over `getByTestId()`
   - Simulate real user interactions with `userEvent`

2. **Use beforeEach for setup**
   - Avoid repeating render calls
   - Keep tests DRY

3. **Mock external dependencies**
   - Use `vi.fn()` for function mocks
   - Mock API calls, router, etc.

4. **Write descriptive test names**
   - "should render login form" 

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
