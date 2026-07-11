## Brief overview
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
  - Login
  - CRUD flows
  - Search
  - Filter
  - Navigation
  - Dashboard validations
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
