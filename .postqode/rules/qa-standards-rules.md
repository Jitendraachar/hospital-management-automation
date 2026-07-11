## Brief overview
- Project-specific QA execution rules aligned with ISTQB and enterprise QA quality standards.
- Apply these rules while drafting, reviewing, and finalizing healthcare test assets.

## QA standards baseline
- Follow ISTQB-aligned principles: clarity, traceability, repeatability, and measurable outcomes.
- Ensure enterprise QA readiness by requiring complete and reviewable test artifacts before execution.
- Use business-readable language so QA, product, and operations teams interpret outcomes consistently.

## Avoidance rules
- Do not produce duplicate test cases.
- Do not use generic or vague scenario wording.
- Do not keep ambiguous expected results; outcomes must be observable and measurable.
- Do not omit preconditions required to execute the scenario.
- Do not omit test data needed to reproduce the test reliably.

## Preferred test design practices
- Prefer business-oriented scenarios over component-only checks.
- Prefer end-user workflow coverage for real operational paths.
- Prefer realistic healthcare-aligned data inputs.
- Ensure tests are repeatable across runs with the same expected behavior.
- Ensure each test case is independent and can run without dependency on another test.

## Defect intelligence output requirement
- After generating test cases, provide:
  - Top 10 Risk Areas
  - Modules likely to fail
  - Suggested regression suite
  - Suggested smoke suite
  - Automation priority
  - Business impact
- Keep defect intelligence tied to the generated test scope and hospital workflow risk.

## Output quality checks
- Verify expected results are measurable and unambiguous.
- Verify each case includes explicit preconditions and test data.
- Verify scenarios remain independent and non-duplicative.
- Verify defect intelligence sections are complete and business-actionable.
