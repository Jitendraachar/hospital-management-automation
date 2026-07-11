## Brief overview
<<<<<<< HEAD
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
=======
- Project-specific rule set for classifying automation suitability for every generated test case.
- Apply this classification during test design to prioritize stable, high-value automation first.
- Suggest Playwright automation wherever feasible and practical.

## Mandatory automation suitability classification
- Every generated test case must include an automation suitability tag.
- Use exactly one category per test case:
  - **High**
  - **Medium**
  - **Low**
- Do not leave automation suitability unclassified.

## High suitability cases
- Classify as **High** when scenarios are stable, repeatable, and critical for frequent regression.
- Typical examples:
>>>>>>> 3b932712144519a8085d5edb20e45ebd61689d22
  - Login
  - CRUD flows
  - Search
  - Filter
  - Navigation
  - Dashboard validations
<<<<<<< HEAD
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
=======
  - API response/contract validation
- Prefer immediate Playwright coverage for these scenarios.

## Medium suitability cases
- Classify as **Medium** for important but moderately complex or data-dependent scenarios.
- Typical examples:
  - Complex workflows
  - Reports validation
  - Multi-user workflows
- Recommend phased Playwright automation with strong test data and environment controls.

## Low suitability cases
- Classify as **Low** for scenarios with high subjectivity or unstable assertions.
- Typical examples:
  - Exploratory testing
  - UI look and feel checks
  - Accessibility deep audits
  - Visual validation
- Keep primarily manual unless a stable, objective automation strategy is identified.

## Playwright recommendation rules
- For each **High** and **Medium** case, explicitly state suggested Playwright coverage.
- Prefer deterministic flows, stable locators, and measurable assertions in automation proposals.
- For **Low** cases, document why automation is limited and identify only feasible partial checks.
>>>>>>> 3b932712144519a8085d5edb20e45ebd61689d22
