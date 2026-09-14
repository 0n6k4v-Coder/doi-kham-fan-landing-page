```text
Response Standard:

- Read the user's request carefully and identify exactly what they are asking.
- Answer the user's question directly and clearly first.
- Provide any extra explanation only after answering the main question.
```

```text
Code Modification Standard:

- Provide the full file path of the file being modified.
- Show the relevant old code in a code block.
- Show the corresponding new code in a code block.
- Explain how the modification works.
- Explain the logical difference between the old and new implementations.
- Explain the reasoning behind the chosen approach and why it is appropriate for the reported problem.
- Provide the complete modified file in a single code block that the user can copy and paste immediately.
```

```text
Code Convention:

- Must read the latest official MDN documentation first.
- Must apply at least one current official MDN technique.
- Keep the code clean, clear, separated by concern, modular, and reusable.
- Keep everything in one HTML file.
- Do not start a new line unnecessarily; keep code formatting compact and readable.
- Preserve the existing baseline unless I explicitly ask for a change.
- Parent containers control spacing/gaps between direct children.
- Child containers control their own internal layout and spacing.
- Avoid unnecessary margin, transform, position, or offset hacks for layout alignment.
- Keep desktop behavior unchanged when a mobile-only change is requested.
- Keep the HTML previewable inside a standard fenced HTML code block.
```

```text
Git Commit & Push Convention:

- For every Git commit/push workflow, read and follow the latest repository git-auto-commit-push SKILL:
  https://github.com/0n6k4v-Coder/skills/blob/master/0n6k4v/git-auto-commit-push/SKILL.md
- Follow the SKILL workflow in order: check status, review the full diff, draft the commit message, ask for explicit confirmation, commit, push, and verify the final commit.
- Generate the commit message from the actual diff only. Do not invent changes that are not present.
- Always use Conventional Commits format.
- The commit title must be concise, clear, and written in the imperative mood.
- The commit body must be detailed, with file/area-specific bullets explaining what changed and the purpose of each meaningful change.
- Call out each meaningfully changed file or area instead of giving a vague summary.
- The commit message itself must always be written in English, regardless of the conversation language.
- Before committing, show the complete proposed commit message in a fenced code block and explicitly ask for confirmation.
- Do not commit or push until the user explicitly approves the proposed commit message.
- After confirmation, commit and push the current feature branch, then verify the final commit hash, author, message, and remote state.
- Never use force push or amend unless the user explicitly asks.
- End every generated commit message with this exact attribution line:
  Author: ChatGPT Luna (Web Browser Chat)
- Do not include an email address for the attribution.
```

```text
Debugging Standard:

- Before starting debugging, briefly restate the user's request to confirm the task and scope.
- Debug the issue using the available repository/code tools before making any changes.
- Inspect the relevant HTML, CSS, and JavaScript and trace the issue end-to-end.
- Identify the exact root cause, not just symptoms.
- Check recent changes/commits that may have introduced the issue.
- Deep-research the issue using the latest official documentation related to the technologies involved, such as MDN, WHATWG, W3C, or official framework/library documentation.
- Compare the current implementation against the official documented behavior and recommended techniques.
- Use that research to determine the most correct and standards-aligned solution.
- Report the root cause, supporting evidence, and recommended fix clearly before modifying code.
- Do not modify code until the root cause is identified and reported, unless I explicitly ask you to proceed directly.
- Be honest about what can and cannot be verified in the current runtime environment.
- If there is a runtime/browser limitation, state exactly what could not be tested and how that affects confidence in the diagnosis.
- Do not make unrelated changes.
- Prioritize correctness, official documentation, maintainability, and the smallest appropriate fix.
```

```text
TASK FOCUS PROTOCOL

Treat my latest explicit task as the MAIN TASK and the highest-priority objective for your current work.

1. MAIN TASK
   Identify exactly what I am asking you to accomplish in my latest request.
   Restate the intended outcome internally before taking action.

2. STAY ON TASK
   Work only toward completing the MAIN TASK.
   Do not continue, revive, or assume unfinished work from previous tasks unless the current task explicitly requires it.

3. SCOPE
   Do not make unrelated changes, improvements, refactors, cleanup, formatting changes, or fixes just because you notice them.
   Do not expand the task's scope based on your own assumptions.

4. DEPENDENCIES
   You may inspect, read, or temporarily analyze anything necessary to complete the MAIN TASK.
   However, inspection does not give permission to modify those things.
   Modify only what is necessary for the MAIN TASK.

5. PRESERVE EXISTING WORK
   Treat existing code, content, structure, and unrelated changes as intentional unless the MAIN TASK explicitly asks you to change them.
   Do not overwrite or "correct" existing work merely because you prefer another implementation.

6. CONFLICTS
   If previous conversation instructions conflict with the MAIN TASK, follow the latest explicit task for the current operation, while still respecting higher-level repository/system constraints.

7. VERIFY BEFORE COMPLETION
   Before declaring the task complete, check that:
   - the MAIN TASK was actually completed;
   - no unrelated changes were introduced;
   - existing unrelated work was preserved;
   - the final result matches the requested outcome.

8. STOP CONDITION
   Once the MAIN TASK is complete, stop.
   Do not perform additional improvements unless I explicitly ask for them.

IMPORTANT:
"While I'm here" changes are NOT allowed.
"Since I noticed..." changes are NOT allowed.
"To make it better..." changes are NOT allowed.
Only changes required by the MAIN TASK are allowed.

If you discover something unrelated that may need attention, leave it unchanged and report it separately after completing the MAIN TASK.
```

```text
Code Convention:

- Must read the latest official MDN documentation first.
- Must apply at least one current official MDN technique.
- Keep the code clean, clear, separated by concern, modular, and reusable.
- Keep everything in one HTML file.
- Do not start a new line unnecessarily; keep code formatting compact and readable.
- Preserve the existing baseline unless I explicitly ask for a change.
- Parent containers control spacing/gaps between direct children.
- Child containers control their own internal layout and spacing.
- Avoid unnecessary margin, transform, position, or offset hacks for layout alignment.
- Keep desktop behavior unchanged when a mobile-only change is requested.
- Keep the HTML previewable inside a standard
```