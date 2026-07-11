## Brief overview
- Project-specific rule to classify automation suitability for every generated test case.
- Ensure test planning clearly marks what should be automated first and what should remain manual.
- Prefer Playwright automation for stable, repeatable, high-value scenarios.

## Automation classification requirement
- For every generated test case, assign one automation suitability level:
  - High
  - Medium
  - Low
- Do not leave automation suitability unclassified.
- Use classification based on repeatability, stability, business criticality, and maintenance effort.

## High automation suitability
- Classify as High when scenarios are deterministic, frequent, and business-critical.
- Include:
  - Login
  - CRUD flows
  - Search
  - Filter
  - Navigation
  - Dashboard validations
  - API validation checks
- Prioritize immediate Playwright coverage for High scenarios.

## Medium automation suitability
- Classify as Medium when scenarios are important but involve moderate variability or setup complexity.
- Include:
  - Complex workflows
  - Reports validation
  - Multi-user workflows
- Automate in Playwright after core High suite is stable, using controlled test data and clear preconditions.

## Low automation suitability
- Classify as Low when scenarios are subjective, highly visual, or exploratory by nature.
- Include:
  - Exploratory testing
  - UI look and feel checks
  - Accessibility checks (unless standardized tooling is in place)
  - Visual validation
- Prefer manual execution; automate only selective repeatable sub-parts where practical.

## Playwright recommendation guidance
- Suggest Playwright automation wherever possible, especially for High and stable Medium scenarios.
- Use role-based or data-testid locators for reliability.
- Use deterministic assertions and avoid fixed waits.
- Keep automated scenarios independent and repeatable across environments.

## Quality checks before finalizing test cases
- Confirm every test case has exactly one automation suitability category.
- Confirm High scenarios are mapped first into automation backlog.
- Confirm Medium and Low classifications are justified, not arbitrary.
- Confirm Playwright recommendations are provided for all feasible scenarios.
