## Brief overview
- Project-specific rule to generate defect intelligence insights after test case generation.
- Convert test coverage output into risk-focused recommendations for release confidence and planning.

## Defect intelligence output requirements
- After generating test cases, provide a concise defect intelligence summary.
- Keep the summary structured, measurable, and actionable for QA and business teams.
- Base insights on workflow criticality, data sensitivity, user impact, and failure likelihood.

## Mandatory reporting sections
- Top 10 Risk Areas: list the highest-risk business or technical areas with short rationale.
- Modules Likely to Fail: identify modules with probable instability and likely defect patterns.
- Suggested Regression Suite: recommend must-run regression scenarios for broad impact coverage.
- Suggested Smoke Suite: recommend critical pass/fail checks for build acceptance.
- Automation Priority: classify scenarios by automation value (high, medium, low) using risk and repeatability.
- Business Impact: describe operational, financial, compliance, or patient-safety impact if failures occur.

## Prioritization and traceability guidance
- Rank risks by business impact first, then likelihood.
- Map each listed risk area to at least one related test case or validation focus.
- Clearly separate immediate-release blockers from monitor-and-follow-up risks.

## Quality checks before finalizing intelligence report
- Confirm exactly 10 risk areas are listed unless the user asks for a different count.
- Confirm regression and smoke suggestions are distinct and not duplicated.
- Confirm automation priority is justified by frequency, stability, and criticality.
- Confirm business impact statements are specific and not generic.
