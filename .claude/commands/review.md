# /review

Run a full code review on recent changes or specified files. Combines Starter convention checks (validator agent) with automated tooling.

## Usage

```
/review [files or PR description]
```

**Examples:**

- `/review` — review all uncommitted changes
- `/review src/features/user/` — review a specific directory
- `/review the authentication refactor`

## What happens

1. Runs the validator agent ([.claude/agents/validator.md](.claude/agents/validator.md)) for Starter-specific checks
2. Executes `npm run lint`, `npm run format:check`, `npm run test:run`, `npm run build`
3. Produces a scored report (0–100) across Convention / Quality / Security / Performance
4. Optionally posts inline review comments via GitHub MCP if reviewing a PR

## Review scope

| Check                                                  | Owner                                      |
| ------------------------------------------------------ | ------------------------------------------ |
| Naming, barrel exports, `@/` aliases, `cn()`, no `any` | Validator agent                            |
| `npm run lint`                                         | ESLint                                     |
| `npm run format:check`                                 | Prettier                                   |
| `npm run test:run`                                     | unit test runner (selected `testing` slot) |
| `npm run build`                                        | Next.js                                    |
| General logic, security, performance                   | Superpowers' requesting-code-review        |
