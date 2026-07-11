## Brief overview
- Project-specific rules for classifying automation suitability for each generated test case.
- Apply these rules during test design to prioritize automation effort and maximize ROI.

## Automation classification requirement
- For every generated test case, assign an automation suitability level:
  - High
  - Medium
  - Low
- Record the classification explicitly in the test output so prioritization is visible to QA and engineering teams.

## High automation suitability
- Mark as **High** when scenarios are stable, repeatable, and business-critical, such as:
  - Login
  - CRUD flows
  - Search
  - Filter
  - Navigation
  - Dashboard checks
  - API Validation
- Prioritize these for immediate automation implementation.

## Medium automation suitability
- Mark as **Medium** for scenarios that are automatable but involve moderate complexity or changing dependencies, such as:
  - Complex workflows
  - Reports
  - Multi-user workflow paths
- Automate selectively based on risk, maintenance cost, and release frequency.

## Low automation suitability
- Mark as **Low** for scenarios better suited to manual judgment or human observation, such as:
  - Exploratory Testing
  - UI Look & Feel
  - Accessibility (where human evaluation is primary)
  - Visual Validation
- Keep these primarily manual, with targeted automation support only where practical.

## Automation framework guidance
- Suggest Playwright automation wherever possible for High and applicable Medium scenarios.
- Prefer reusable, stable Playwright locators and workflow-level scripts for long-term maintainability.
- Include a short implementation note when recommending Playwright (for example: candidate flow, key assertions, and execution scope).
