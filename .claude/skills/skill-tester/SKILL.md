---
name: skill-tester
description: Use after editing a skill or when asked to test a skill — executes scenarios from skill-test-designer against the current agent context and reports pass/fail.
---

# Skill Tester

## Purpose

Execute scenarios produced by `skill-test-designer` against the current agent context. This is a demo version — manual / agent-driven, not automated CI.

## When to invoke

- Invoked by name within an agent session
- After editing a skill

## Procedure

1. Load the scenarios file from `.claude/skill-tests/<skill-name>.md` or `.github/skill-tests/<skill-name>.md`.
2. Walk each scenario.
3. Narrate `given → when → then`.
4. Mark pass/fail.
5. Summarise.

## Reporting format

| scenario | expected | observed | pass/fail |
| -------- | -------- | -------- | --------- |

## Limitations

This is a demo; results are non-deterministic; depend on model and conversation context. Future work: extract to a generator-side test harness.

## Anti-patterns

- Don't fix the skill mid-test; record failures, then iterate in a separate pass.
