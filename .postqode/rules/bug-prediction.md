## Brief overview
- Project-specific rule to predict likely defect areas while generating test cases.
- Use defect prediction to improve risk coverage and guide exploratory testing.

## Prediction objective
- Identify probable failure points before execution.
- Prioritize predicted defects by business impact and likelihood.
- Link every prediction to at least one planned validation or exploratory test.

## Mandatory predicted defect areas
- Missing Validation: required checks are absent or incomplete.
- Incorrect Error Message: error text is unclear, wrong, or not business-readable.
- Duplicate Data: duplicate records created due to weak uniqueness controls.
- Null Handling: null/empty inputs cause crashes or inconsistent behavior.
- Database Failure: transaction failure, timeout, or partial write scenarios.
- Session Timeout: expired sessions not handled correctly or safely.
- Concurrent Update: simultaneous edits cause overwrite or stale data issues.
- Authorization Failure: unauthorized users can view or modify restricted data.
- Performance Degradation: response delays under realistic load or peak usage.

## Test design guidance for predicted defects
- For each predicted defect area, add focused negative and edge test cases.
- Include trigger conditions, expected system behavior, and recovery behavior.
- Ensure expected results are measurable (for example: exact error message, blocked action, rollback confirmation).

## Exploratory testing extension
- Suggest additional exploratory tests around each high-risk predicted defect.
- Use charters such as "break validation flow," "stress concurrent edits," and "force session expiry mid-transaction".
- Record findings with reproducible steps and business impact.

## Quality checks before finalizing
- Confirm all mandatory defect areas were assessed.
- Confirm exploratory tests are added for high-risk predictions.
- Confirm no random or duplicate defect predictions are included.
- Confirm defect predictions improve practical test coverage.
