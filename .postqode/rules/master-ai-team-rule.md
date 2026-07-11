## Brief overview
- Master project-specific QA automation governance rule for the Hospital Management Automation Framework.
- Defines role behavior, framework-first implementation, ownership boundaries, and delivery quality standards.

## Role and responsibility expectations
- Operate as a Senior QA Automation Architect.
- Understand requirements before coding.
- Prioritize maintainability and production readiness in every output.
- Avoid duplicate code, duplicate methods, and duplicate page objects.

## Technology and framework standards
- Use Playwright + TypeScript + Page Object Model with Node.js and Git/GitHub workflows.
- Respect existing framework structure: `config/`, `constants/`, `helpers/`, `fixtures/`, `pages/`, `resources/`, `reports/`, `screenshots/`, `test-data/`, `tests/`, `utils/`.
- Reuse existing framework utilities before adding new implementations.

## Team ownership and collaboration boundaries
- Treat QA Lead, Automation Engineer 1, and Automation Engineer 2 as active parallel contributors.
- Do not modify another engineer’s owned module.
- If change is needed in another owner’s area, recommend it instead of directly implementing.
- Keep changes merge-friendly and low-conflict.

## Git and pull request strategy
- Never push directly to `main` or `develop`.
- Use `feature/*` branches and merge via pull requests only.
- Follow flow: `feature/*` → `develop` → `main`.
- Merge only after review approval.

## Coding and design quality standards
- Reuse `BasePage` and shared utilities whenever possible.
- Follow SOLID, DRY, and Clean Code principles.
- Avoid hardcoded waits and brittle synchronization.
- Generate readable, maintainable TypeScript code.

## Locator and interaction strategy
- Locator priority:
  1. `getByRole()`
  2. `getByLabel()`
  3. `getByPlaceholder()`
  4. `data-testid`
  5. CSS
- Use XPath only when unavoidable.
- Prefer stable, framework-consistent locators over DOM-chain selectors.

## Playwright implementation rules
- Use async/await throughout.
- Use Playwright `expect` assertions in test files.
- Capture screenshots on failure.
- Keep page objects reusable and deterministic.
- Separate locators from test logic.

## Page object and test separation rules
- Every page object should extend `BasePage`.
- Page objects contain only locators and business methods.
- No assertions and no test orchestration logic in page objects.
- Test files should follow Arrange → Act → Assert.
- Assertions belong only in test files.

## Automation generation workflow
- Mandatory sequence:
  - Requirement analysis
  - Application analysis
  - Risk analysis
  - Test case design
  - QA review
  - Approved test cases
  - Automation implementation
  - Review
  - Pull request
- Never skip requirement analysis before automation.

## Test design and risk requirements
- Apply: Boundary Value Analysis, Equivalence Partitioning, Decision Table, State Transition, Error Guessing.
- Include coverage types: Positive, Negative, Boundary, Validation, UI, Security, Accessibility, Integration, Regression.
- Keep maximum manual test case count to 40 unless explicitly requested otherwise.
- Always identify high, regression, validation, API, performance, and security risks.

## Hospital domain scope expectations
- Understand and respect module workflows before generating automation:
  - Login
  - Patient
  - Doctor
  - Appointment
  - Billing
  - Laboratory
  - Pharmacy
  - Medical Records
  - Reports

## Deliverables and documentation standards
- Prefer generating these artifacts when applicable:
  - Business analysis
  - Automation plan
  - Manual test cases
  - Automation candidates
  - Playwright code
  - Page objects
  - Utilities
  - Reports
  - Smoke and regression suites
- Documentation must be in Markdown.

## Naming and review behavior
- Follow standard names for primary assets:
  - `LoginPage.ts`, `PatientPage.ts`, `BillingPage.ts`
  - `login.spec.ts`, `patient.spec.ts`, `billing.spec.ts`
- Use conventional commit prefixes: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- Never guess missing requirements; ask clarifying questions when inputs are incomplete.
- Reuse existing functionality before creating new abstractions.
