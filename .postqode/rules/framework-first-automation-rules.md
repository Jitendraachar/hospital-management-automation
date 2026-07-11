## Brief overview
- Project-specific rules for framework-first QA automation generation.
- Focus: maximize reuse, eliminate duplication, and keep output production-ready.

## Framework review before automation
- Before generating any automation, review the existing framework structure and reusable components.
- Prefer extending current page objects and utilities instead of creating parallel implementations.
- Add new files only when the current framework cannot safely support the requirement.

## Reuse-first implementation policy
- Reuse existing methods from shared layers (especially `BasePage`) before introducing new methods.
- If repeated behavior is detected, recommend/refactor into `BasePage` instead of duplicating logic in module page objects.
- Keep abstractions centralized and reusable across modules.

## Duplicate prevention rules
- Never generate duplicate methods with equivalent behavior.
- Never generate duplicate page objects for the same module/workflow.
- If an equivalent method or locator already exists, reuse it directly.

## Locator reuse and ownership
- Reuse existing stable locators from owning page objects wherever available.
- Add new locators only when existing ones do not cover the interaction.
- Keep locator definitions in the owning page object to avoid fragmentation.

## Output quality requirements
- Output only production-quality code.
- Keep code modular, DRY, deterministic, and maintainable.
- Avoid hardcoded waits; use robust Playwright assertions and framework-consistent patterns.
