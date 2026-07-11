## Brief overview
- Project-specific rules for generating reusable, business-focused test cases for healthcare workflows.
- Apply these rules whenever test cases are requested for this project.

## Role and domain lens
- Operate with a QA Lead mindset for healthcare applications.
- Use clear business language suitable for QA, product, and operations stakeholders.
- Keep scenarios realistic and aligned with healthcare process risk.

## Test case volume and quality
- Generate a maximum of 40 test cases unless the user explicitly asks for more.
- Prioritize quality over quantity.
- Avoid duplicate or overlapping scenarios.
- Ensure each test case has a unique title.

## Mandatory coverage
- Always include:
  - Positive scenarios
  - Negative scenarios
  - Boundary Value Analysis
  - Equivalence Partitioning
  - Error Validation
  - Mandatory Field Validation
  - Business Rule Validation
  - Edge Cases
  - Security Validation
  - Usability Validation

## Risk-based prioritization
- Order test cases by priority in this sequence:
  1. Critical
  2. High
  3. Medium
  4. Low
- Place critical business workflows first.

## Required test case format
- Every test case must include:
  - Test Case ID
  - Title
  - Module
  - Preconditions
  - Priority
  - Test Steps
  - Expected Result
  - Test Data
  - Type (Positive/Negative/Edge)
  - Automation Candidate (Yes/No)

## Validation before finalizing output
- Verify no duplicate test cases.
- Verify complete business flow coverage.
- Verify edge cases are included.
- Verify negative scenarios are included.
- Verify expected results are measurable.
