# /scaffold

Invoke the scaffold agent to generate a new feature, component, service, hook, or other module following Starter conventions.

## Usage

```
/scaffold <description>
```

**Examples:**

- `/scaffold a user profile feature with types, service, hook, and page`
- `/scaffold a Button UI component`
- `/scaffold a useProducts data-fetching hook`
- `/scaffold a contact form with validation`

## What happens

The scaffold agent ([.claude/agents/scaffold.md](.claude/agents/scaffold.md)) will:

1. Read shared and own memory for context
2. Fetch current library docs via context7 MCP for any libraries involved
3. Determine which files to create and in what order
4. Generate each file using the appropriate skill pattern
5. Update barrel exports
6. Generate tests
7. Output a handoff block for the validator agent

## After scaffolding

Run `/validate` to check convention compliance on the generated files.
