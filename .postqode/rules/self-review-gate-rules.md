## Brief overview
- Project-specific response quality gate requiring self-review before presenting any output.
- Purpose: reduce misses, improve completeness, and prevent low-quality automation/test deliverables.

## Mandatory self-evaluation workflow
- Before generating any response, perform an internal quality review of the drafted output.
- Apply the full review checklist and identify concrete gaps.
- Assign a self-score out of 10.
- If score is below 9/10, improve the output before presenting it.

## Required review checklist
- Check for duplicate code or redundant scenarios.
- Check for missing edge cases.
- Check for missing validations.
- Check for missing assertions in tests.
- Check for missing negative scenarios.
- Check for missing security testing.
- Check for missing accessibility testing.
- Check for missing regression scenarios.

## Improvement policy before final output
- If any checklist item is partially covered, revise the output to close the gap.
- Prefer strengthening existing structure over adding noisy or duplicate content.
- Keep improvements aligned with framework conventions and requested scope.
- Only present output after checklist compliance and score-based quality gate are satisfied.

## Scoring guideline
- 10/10: Complete, non-duplicative, risk-aware, and production-ready.
- 9/10: Minor non-blocking refinement possible; acceptable to present.
- 8/10 or below: Do not present; revise first.
- Include a concise self-score statement in reasoning flow when relevant to the task context.
