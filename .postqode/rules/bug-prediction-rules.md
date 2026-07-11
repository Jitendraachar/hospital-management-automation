## Brief overview
- Project-specific rules for defect prediction during healthcare test case design.
- Apply these rules while creating test coverage to proactively identify likely failure points and add exploratory depth.

## Defect prediction requirement
- While generating test cases, explicitly predict likely defect areas for each critical workflow.
- Treat predicted defects as additional coverage inputs, not optional notes.
- Prioritize predicted defects that can impact patient safety, record correctness, security, or billing trust.

## Common predicted defect areas
- Include checks for the following likely defect categories where applicable:
  - Missing Validation
  - Incorrect Error Message
  - Duplicate Data
  - Null Handling
  - Database Failure
  - Session Timeout
  - Concurrent Update
  - Authorization Failure
  - Performance Degradation

## Exploratory test expansion
- Suggest additional exploratory tests around each predicted defect area.
- Ensure exploratory tests cover misuse patterns, unusual data sequences, and operational interruptions.
- For critical modules, include at least one exploratory scenario for concurrency, failure recovery, and access control behavior.

## Output quality expectations
- Keep predictions specific to the workflow under test; avoid generic defect lists.
- Link each exploratory suggestion to an expected observable outcome (for example: blocked action, error visibility, audit entry, rollback behavior).
- Ensure predicted-defect scenarios remain reusable and business-readable for QA, product, and operations stakeholders.
