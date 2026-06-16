---
name: skill-test-designer
description: Use when a new skill is added or an existing skill behaves incorrectly — turns a skill into behaviour-verifying scenarios via a structured interview protocol.
---

# Skill Test Designer

## Purpose

Turn a skill into a set of behaviour-verifying scenarios by interviewing the user. Use this skill when a new skill is added or when an existing skill behaves incorrectly in practice.

## When to invoke

- When a new skill is added to the project
- When an existing skill behaves incorrectly in practice

## Interview protocol

Ask one question at a time:

1. "What's the trigger that should cause this skill to fire?"
2. "What's the wrong behaviour we're trying to prevent?"
3. "Show me an example of correct behaviour."
4. "Show me an edge case where the rule shouldn't apply."

## Scenario shape

```
{ name, given, when, then, skip_if }
```

## Output location

- Claude: `.claude/skill-tests/<skill-name>.md`
- Copilot: `.github/skill-tests/<skill-name>.md`

Created on first use; **committed** to the project so PRs can review scenarios.

## Anti-patterns

- Don't write scenarios without interviewing.
- Don't conflate skill-correctness with library-correctness.
