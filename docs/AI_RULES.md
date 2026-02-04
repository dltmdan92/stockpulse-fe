# AI Critical Rules & Behavioral Guidelines

These are the **NON-NEGOTIABLE** rules that every AI assistant working on this project must follow.
Failure to follow these rules will result in incorrect implementation and wasted iterations.

## 1. Safety & Integrity (Zero Harm)

- **Do NOT delete or overwrite files** unless explicitly instructed or part of a confirmed refactoring plan.
- **Do NOT hallucinate file paths**. Always use `list_dir` or `find_by_name` to confirm a file exists before trying to read or edit it.
- **Do NOT invent libraries**. Use strictly what is defined in `package.json`. If a new library is needed, **ask the user first**.

## 2. Technical Accuracy (Zero Hallucination)

- **Verify before you write**: Do not assume a function exists in `utils.ts` or a component exists in `components/`. Check the file content first.
- **Type Safety is Paramount**: Do not use `any` or `// @ts-ignore` to bypass errors. Fix the underlying type issue.
- **Import Paths**: Always verify imports. Do not import from non-existent index files.

## 3. User Alignment

- **Ask before assuming**: If a requirement is vague (e.g., "fix the layout"), ask for clarification or propose a specific plan before executing multiple edits.
- **Respect User Preferences**: If the user prefers "Human Readable" over "Optimized Code" in a specific context, follow that.
- **Context Awareness**: Read `docs/PROJECT_SPEC.md` and `docs/CONVENTIONS.md` before writing code to ensure it fits the architectural pattern.

## 4. Iterative Excellence Cycle (The Loop)

Success is not defined by "attempting", but by "completing with quality".
You must follow this cycle until the task is **100% complete and bug-free**:

1.  **Plan**: Analyze the requirement and state of the codebase. Define the steps.
2.  **Execute**: Implement the changes.
3.  **Verify**: Run the code, check for errors, and verify the UI.
    - _If failed_: Analyze the error -> Adjust Plan -> Go back to Execute.
4.  **Improve**: Look for optimization or refactoring opportunities.
    - _If improvement needed_: Adjust Plan -> Go back to Execute.
5.  **Docs Update**: Update `docs/*` and `GEMINI.md` if _anything_ changed (Logic, Stack, Rules).
6.  **Finalize**: Only when verification passes AND docs are updated, mark the task as done.

> **Never stop at "it should work". Confirm that "it DOES work".**

## 5. Living Documentation Policy

Documentation is **not** an afterthought. It is part of the code.

- **Rule**: If you change the code, you **MUST** update the corresponding documentation.
- **Scope**:
  - Added a library? -> Update `TECH_STACK.md`.
  - Changed file structure? -> Update `PROJECT_SPEC.md` or `TECH_STACK.md`.
  - New convention? -> Update `CONVENTIONS.md`.
  - New feature? -> Update `PROJECT_SPEC.md`.
- **Verdict**: A PR/Task is **incomplete** if the documentation is stale.
