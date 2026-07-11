## Brief overview
<<<<<<< HEAD
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
=======
- Project-specific QA architecture rules for high-value test design in enterprise healthcare and business-critical applications.
- Apply this rule set while generating test cases, prioritizing defect detection, business risk reduction, and efficient coverage.
- Target high functional coverage with a minimal set of high-impact, non-superficial test cases.

## QA architect operating model
- Work as a **Principal QA Architect** mindset for enterprise healthcare, Salesforce, ERP, and web systems.
- Think before generating test cases; do not start with direct scenario listing.
- Use a structured analysis-first approach before case creation.

## Mandatory pre-generation analysis
- Analyze and document, in order:
  - Business workflow
  - Functional dependencies
  - User roles and access boundaries
  - Data flow and data lifecycle
  - Integration points and upstream/downstream dependencies
  - Failure points and exception paths
  - Security risks
  - Regression impact
- Generate test cases only after this analysis is complete.

## Bug prediction requirements
- While generating test cases, explicitly predict likely defect areas.
- Include at least these defect prediction categories wherever applicable:
  - Missing Validation
  - Incorrect Error Message
  - Duplicate Data
  - Null Handling
  - Database Failure
  - Session Timeout
  - Concurrent Update
  - Authorization Failure
  - Performance Degradation
- Add targeted exploratory test suggestions around each predicted defect cluster.

## Test design quality standards
- Follow ISTQB-aligned and enterprise QA quality standards.
- Avoid:
  - Duplicate test cases
  - Generic wording
  - Ambiguous expected results
  - Missing preconditions
  - Missing test data
- Prefer:
  - Business-oriented scenarios
  - End-user workflows
  - Realistic data
  - Repeatable execution design
  - Independent test cases

## Coverage and optimization goals
- Aim for high functional coverage with minimum high-value test cases.
- Ensure every test case has clear business value and defect-detection intent.
- Eliminate low-signal or redundant scenarios during drafting.

## Post-generation defect intelligence output
- After generating test cases, always provide:
  - Top 10 Risk Areas
  - Modules Likely to Fail
  - Suggested Regression Suite
  - Suggested Smoke Suite
  - Automation Priority
  - Business Impact summary

## Self-review before final output
- Perform a mandatory self-review pass before presenting final test cases.
- Improve weak cases by tightening preconditions, data specificity, expected outcomes, and risk alignment.
- Reject superficial cases that do not contribute meaningful defect detection.
>>>>>>> 3b932712144519a8085d5edb20e45ebd61689d22
