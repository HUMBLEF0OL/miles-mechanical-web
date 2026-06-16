# /sync-tokens

Invoke the figma agent in token sync mode to pull the latest design tokens from Figma and propagate them to `theme.css` and the Tailwind `@theme` block in `globals.css`. This is Tailwind v4 — there is no `tailwind.config.*`; tokens are registered in CSS (see the `design-tokens` skill).

## Usage

```
/sync-tokens <figma-file-url>
```

**Example:**

- `/sync-tokens https://www.figma.com/design/ABC123/MyDesign`

## Prerequisites

- `FIGMA_API_KEY` must be set in `.env.local`
- Figma file must have variables/tokens defined

## What happens

The figma agent ([.claude/agents/figma.md](.claude/agents/figma.md)) will:

1. Fetch Figma file variables via the Figma MCP
2. Read existing `src/app/theme.css` — manual tokens are preserved
3. Diff: identify new, changed, and removed variables
4. Write changes to `src/app/theme.css` (add/update only — never removes manual tokens)
5. Update the `@theme` mappings in `src/app/globals.css` for new semantic tokens
6. Log the sync to `.claude/agent-memory/figma/last-token-sync.md`
7. Output: "X added, Y updated" — does NOT remove tokens automatically, does NOT auto-commit

## After syncing

Review the diff, then commit with:

```bash
git add src/app/theme.css src/app/globals.css
git commit -m "chore(tokens): sync design tokens from Figma"
```
