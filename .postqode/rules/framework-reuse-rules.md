## Brief overview
- Project-specific rules to enforce framework-first automation development in the existing Playwright + POM codebase.
- Goal: prevent duplication, maximize reuse, and keep output production-ready.

## Framework-first review policy
- Before generating any automation code, review existing framework classes, utilities, and page objects.
- Prefer extending or consuming existing components over introducing new files.
- Create new files only when no suitable existing component can be safely extended.

## Reuse and deduplication rules
- Reuse existing methods from `BasePage` wherever applicable.
- If duplicate logic is found across page objects or tests, refactor toward `BasePage` reusable methods.
- Never generate duplicate methods with equivalent behavior under different names.
- Never generate duplicate page objects for the same functional module.

## Locator reuse standards
- If a stable locator already exists in an existing page object, reuse it instead of redefining it.
- Keep locator definitions centralized in the owning page object for maintainability.
- Only introduce new locators when existing ones do not cover the required interaction.

## File and change strategy
- Prefer minimal, merge-friendly updates to existing framework files.
- Avoid broad refactors while delivering module-level automation changes.
- Shared-file updates must be intentional, scoped, and backward-compatible.

## Output quality bar
- Output only production-quality code.
- Ensure code is modular, DRY, and consistent with existing project conventions.
- Maintain deterministic automation design (no hardcoded waits, use robust assertions and reusable abstractions).
