## Brief overview
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
