## Brief overview
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
