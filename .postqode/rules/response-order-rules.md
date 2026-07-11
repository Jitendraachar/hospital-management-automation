## Brief overview
- Project-specific response-structure rule.
- Purpose: enforce a consistent output sequence for all future QA/automation responses.

## Required response order
- Always return responses in the following exact order:
  1. Understanding
  2. Assumptions
  3. Risks
  4. Test Cases
  5. Automation Candidates
  6. Page Objects
  7. Playwright Code
  8. Improvements
  9. Score
  10. Recommendation

## Formatting expectations
- Use clear section headings matching the required order names.
- Do not skip sections; if a section is not applicable, state `N/A` briefly.
- Do not reorder sections based on context or preference.

## Consistency and quality checks
- Verify section order before sending any response.
- Ensure content remains concise, structured, and non-duplicative within each section.
- Keep outputs aligned with framework-first, production-quality QA automation standards.
