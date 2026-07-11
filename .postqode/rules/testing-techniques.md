## Brief overview
<<<<<<< HEAD
- Project-specific rule to standardize test case design using defined testing techniques.
- Apply these techniques wherever applicable to ensure systematic, risk-aware, and non-random coverage.

## Technique application policy
- Generate test cases using structured testing techniques instead of random scenario selection.
- Select one or more techniques per workflow based on business rules, inputs, and state behavior.
- Document the chosen technique(s) for each test case set when preparing QA artifacts.

## Mandatory testing techniques
- Boundary Value Analysis (BVA): validate minimum, maximum, and just-inside/outside boundaries.
- Equivalence Partitioning (EP): group valid and invalid input classes and test representative values.
- Decision Table Testing: cover combinations of conditions and resulting actions.
- State Transition Testing: validate allowed and blocked transitions between system states.
- Error Guessing: include likely failure scenarios based on domain risk and user behavior.
- Pairwise Testing: reduce combinational explosion by covering high-value parameter pairs.
- Risk-Based Testing: prioritize coverage based on patient safety, compliance, and business impact.

## Execution guidance
- Apply BVA and EP for input-heavy forms and calculation workflows.
- Apply Decision Table Testing for multi-condition business logic (for example: billing rules, approval criteria).
- Apply State Transition Testing for status-driven modules (for example: appointment, admission, discharge).
- Apply Risk-Based Testing first for critical healthcare workflows, then extend to medium and low risk.

## Quality checks before finalizing test cases
- Confirm every major workflow maps to at least one mandatory technique.
- Confirm technique usage improves coverage depth, not just test case count.
- Confirm no random or duplicate scenarios are included.
- Confirm expected outcomes remain measurable and business-readable.
=======
- Project-specific testing-technique rules for generating structured and reusable test cases.
- Apply these techniques wherever applicable across functional, workflow, and validation scenarios.
- Avoid random scenario generation; select scenarios by technique fit and business risk.

## Mandatory testing techniques
- Boundary Value Analysis (BVA)
- Equivalence Partitioning (EP)
- Decision Table Testing
- State Transition Testing
- Error Guessing
- Pairwise Testing
- Risk Based Testing

## Test design application rules
- Every test set must explicitly use one or more mandatory techniques.
- Prefer the technique that best matches the feature behavior:
  - Use **BVA** for limits (min/max counts, lengths, ranges).
  - Use **EP** for valid/invalid input classes.
  - Use **Decision Table Testing** for multi-condition business rules.
  - Use **State Transition Testing** for status/lifecycle workflows.
  - Use **Error Guessing** for likely failure points based on domain and past defects.
  - Use **Pairwise Testing** to reduce combinations while keeping interaction coverage.
  - Use **Risk Based Testing** to prioritize high-impact scenarios first.
- Do not generate ad-hoc or random cases that cannot be mapped to a technique.

## Coverage and traceability expectations
- While drafting test cases, tag each case with the applied technique(s).
- Ensure technique coverage is balanced across the module, not concentrated in only one area.
- For high-risk workflows, combine **Risk Based Testing** with at least one structural technique (BVA, EP, Decision Table, or State Transition).

## Output quality checks
- Before finalizing, confirm each test case can answer: “Which mandatory technique does this case represent?”
- Reject or rewrite test cases that have no clear technique mapping.
- Keep outcomes measurable and business-verifiable.
>>>>>>> 3b932712144519a8085d5edb20e45ebd61689d22
