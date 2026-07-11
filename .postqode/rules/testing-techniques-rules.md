## Brief overview
- Project-specific rules for applying structured test design techniques in Hospital Management System test case generation.
- Use these techniques wherever applicable to ensure systematic, reusable, and risk-focused coverage.

## Mandatory testing techniques
- Apply all of the following techniques during test design:
  - Boundary Value Analysis
  - Equivalence Partitioning
  - Decision Table Testing
  - State Transition Testing
  - Error Guessing
  - Pairwise Testing
  - Risk Based Testing

## Test generation approach
- Generate test cases using the mandatory techniques instead of random scenario selection.
- Map each scenario to one or more applicable techniques before finalizing test cases.
- Ensure technique usage is explicit in test design notes when traceability is required.

## Technique application guidance
- Use Boundary Value Analysis for input limits, thresholds, and numeric/date ranges.
- Use Equivalence Partitioning to group valid/invalid data classes and reduce redundant cases.
- Use Decision Table Testing for multi-condition business rules and outcomes.
- Use State Transition Testing for workflows with status progression and transition constraints.
- Use Error Guessing for likely user mistakes, invalid combinations, and operational misuse.
- Use Pairwise Testing to cover high-value combinations efficiently across multiple parameters.
- Use Risk Based Testing to prioritize depth and order of coverage by business and safety impact.

## Quality checks before finalizing
- Verify test cases are technique-driven, not randomly listed.
- Verify multiple techniques are used where the scenario complexity demands it.
- Verify critical workflows receive risk-based priority and deeper technique coverage.
