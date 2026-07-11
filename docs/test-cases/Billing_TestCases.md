## Brief overview
- Senior QA Lead review and revision for Billing module manual test coverage.
- This revision addresses missing edge/negative cases, duplicate reduction, corrected priority, and automation suitability.

## QA Lead review findings

### Missing edge cases identified
- Zero-value and large-value billing amounts.
- Partial payment and overpayment behavior.
- Rounding/tax precision handling.
- Billing record behavior for cancelled/voided transactions.

### Missing negative scenarios identified
- Attempt to create bill without mandatory patient reference.
- Invalid numeric format in amount fields.
- Negative amount entry.
- Unauthorized billing modification attempts.

### Duplicate test cases removed/merged
- Duplicate “create invoice successfully” scenarios consolidated into one core positive flow + one boundary amount flow.
- Repeated payment status checks merged into a single state-transition scenario.

### Incorrect priority corrections
- Financial correctness, status transitions, and access control moved to **High**.
- Non-critical UI alignment checks moved to **Medium**.
- Rare display-only checks moved to **Low/Medium**.

### Test cases that should be automated
- Bill creation/edit/payment status transitions.
- Financial validation rules (negative/zero/rounding).
- Search, filter, and persistence validations.
- Role-based restrictions and integration with patient/appointment modules.

### Assumptions made
- Billing module is available via Management menu.
- Billing is linked to patient and possibly appointment/service context.
- Fields include bill amount/payment status and related patient metadata.
- Currency used in the environment is INR-like formatting.

---

## Revised Billing Test Cases

| Test ID | Test Title | Preconditions | Test Data | Steps | Expected Result | Priority | Automation Candidate |
|---|---|---|---|---|---|---|---|
| BIL-001 | Open Billing module and verify list view | Logged in user with billing access | N/A | Navigate to Billing | Billing list loads with search, table, pager and action controls | High | Yes |
| BIL-002 | Create bill with valid mandatory data | Billing module open; valid patient exists | Patient + valid amount | Click New → fill mandatory fields → Save | Bill created successfully with unique identifier/status | High | Yes |
| BIL-003 | Create bill with complete valid data | Billing module open | Patient, services/items, amount, notes, status | New → fill all fields → Save | Complete record saved and values persist on reopen | High | Yes |
| BIL-004 | Mandatory validation for missing patient | Billing form open | Amount only, no patient | Leave patient blank → Save | Save blocked with required-field validation | High | Yes |
| BIL-005 | Amount validation for negative value | Billing form open | Amount: `-100` | Enter negative amount → Save | Save blocked; negative amounts not allowed | High | Yes |
| BIL-006 | Amount boundary test with zero value | Billing form open | Amount: `0` | Enter zero → Save | System handles boundary per rule (reject or allow with explicit policy) | High | Yes |
| BIL-007 | Amount boundary test with very large value | Billing form open | Amount: large (e.g., `999999999`) | Enter large amount → Save | System validates/accepts based on max rule without overflow/crash | High | Yes |
| BIL-008 | Decimal precision and rounding validation | Billing form open | Amount: `1234.567` | Save bill with high precision decimal | Value rounded/stored per business rule with correct display | High | Yes |
| BIL-009 | Invalid characters in numeric field | Billing form open | Amount: `12AB34` | Enter invalid amount format → Save | Validation error shown; save blocked | High | Yes |
| BIL-010 | Edit existing bill and save | Existing bill record present | Update notes/amount within allowed state | Open bill → edit allowed fields → Save | Updates persist and audit/status integrity maintained | High | Yes |
| BIL-011 | Discard billing form changes | Existing/new billing form open | Temporary edits | Make changes → Discard | Changes not persisted; record remains unchanged | High | Yes |
| BIL-012 | Payment state transition: Draft → Paid | Bill exists in payable state | Payment input valid | Perform payment/post action | Status transitions correctly to Paid; amount due updates | High | Yes |
| BIL-013 | Payment state transition guard for invalid transition | Bill in final/paid state | Attempt disallowed state change | Try changing to invalid prior state | Invalid transition blocked with clear message | High | Yes |
| BIL-014 | Partial payment handling | Bill with total > payment amount | Total: 1000, Payment: 400 | Apply partial payment | Outstanding balance computed correctly; status set appropriately (partial) | High | Yes |
| BIL-015 | Overpayment handling | Bill with known total | Total: 1000, Payment: 1200 | Attempt overpayment | Overpayment blocked or handled per policy with explicit result | High | Yes |
| BIL-016 | Search bill by patient name or bill ID | Billing list has known records | Existing patient/bill ID | Use search input | Correct matching billing records displayed | Medium | Yes |
| BIL-017 | Search with no-match query | Billing list open | Random string | Search unknown value | No-match state appears safely | Medium | Yes |
| BIL-018 | Sort and pagination behavior on billing list | Multi-record billing data present | N/A | Sort by amount/date/status and paginate | Sorting and pagination produce correct deterministic ordering | Medium | Yes |
| BIL-019 | Integration: Billing linked to patient record | Patient + bill exist | Existing patient bill | Open patient context and billing context | Patient-bill linkage remains consistent across modules | High | Yes |
| BIL-020 | Integration: Appointment/service to bill flow | Appointment/service data available | Completed appointment/service | Generate/open related bill | Correct bill generated with expected charge mapping | High | Yes |
| BIL-021 | Security: SQL-like payload in search | Billing list open | `' OR '1'='1` | Enter payload in search | No crash/no unauthorized data exposure; treated as text | High | Yes |
| BIL-022 | Security: XSS payload in notes/comment fields | Billing form open | `<script>alert(1)</script>` | Save bill with payload and reopen views | Payload escaped/sanitized; no script execution | High | Yes |
| BIL-023 | Access control: read-only user cannot create/edit bill | Read-only billing role available | N/A | Login as restricted user → open Billing | Create/edit actions hidden or blocked by permissions | High | Yes |
| BIL-024 | Accessibility: keyboard-only bill creation | Billing form open | Valid billing data | Complete form and save using keyboard only | Focus order logical; form operable without mouse | Medium | Yes |
| BIL-025 | Accessibility: label association and validation readability | Billing form open | Invalid/blank inputs | Trigger validation | Inputs expose accessible labels; errors readable and understandable | Medium | Yes |
| BIL-026 | Data persistence after refresh/relogin | Existing updated bill | Updated status/amount | Save changes → refresh/relogin → reopen bill | Billing data/status persists accurately | High | Yes |
