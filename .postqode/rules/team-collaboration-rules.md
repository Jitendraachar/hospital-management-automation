## Brief overview
- Project-specific collaboration rules for a multi-engineer QA automation team.
- Purpose: keep changes modular, avoid overlap, and maintain merge-friendly delivery in shared Playwright/POM framework work.

## Team ownership and module boundaries
- Assume parallel development by QA Lead, Automation Engineer 1, and Automation Engineer 2 at all times.
- Do not modify another engineer’s assigned module unless there is explicit cross-team agreement.
- Keep scope tightly limited to the requested module or test area.

## Shared framework change policy
- Do not duplicate framework code in page objects, tests, or helpers.
- If repeated behavior is needed across modules, recommend adding a reusable method to `BasePage` instead of creating local duplicates.
- Avoid modifying shared files unless absolutely necessary for the requested task.
- When shared-file edits are necessary, keep diffs minimal and backward-compatible.

## Merge-friendly implementation standards
- Prefer small, isolated, low-conflict changes.
- Keep method names clear and consistent with existing framework conventions.
- Avoid broad refactors during feature/test delivery.
- Preserve existing interfaces where possible to reduce downstream merge risk.

## QA automation delivery expectations
- Follow POM with reusable methods and DRY design.
- Prioritize maintainability and team-safe extensibility over quick one-off implementations.
- Before introducing new utility logic, check whether equivalent capability already exists in shared framework layers.
