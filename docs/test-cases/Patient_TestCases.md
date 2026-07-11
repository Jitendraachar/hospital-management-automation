## Brief overview
- Senior QA Lead review and revision for Patient module manual test coverage.
- This revision addresses missing edge/negative cases, removes overlap, corrects priorities, and identifies automation candidates.

## QA Lead review findings

### Missing edge cases identified
- Boundary checks for phone length and UHID format behavior.
- Long text handling for name/address fields.
- Duplicate patient detection using critical identifiers.
- Mandatory relation behavior when linking doctor to patient (if required by business rule).

### Missing negative scenarios identified
- Invalid phone/email formats.
- Blank mandatory fields with save attempt.
- Invalid special characters in constrained fields.
- Search with malformed or injection-like payloads.

### Duplicate test cases removed/merged
- Repeated “create patient with valid data” variants merged into one full-happy-path + one minimum-data case.
- Redundant search checks merged into a single coverage case with valid/invalid search terms.

### Incorrect priority corrections
- Data integrity and patient identity validations moved to **High**.
- Pure presentation checks kept **Medium**.
- Rare non-critical layout variations kept **Low/Medium**.

### Test cases that should be automated
- Patient create/edit/search critical journeys.
- Mandatory validation and format validation checks.
- Integration checks (patient linked doctor visibility in list).
- Access control and data persistence checks.

### Assumptions made
- Patient module includes fields such as UHID, Name, Phone, Email, Related Doctors.
- UHID may be system-generated and unique.
- Name is mandatory; other mandatory fields depend on module configuration.
- User role has create/edit permissions for Patient module.

---

## Revised Patient Test Cases

| Test ID | Test Title | Preconditions | Test Data | Steps | Expected Result | Priority | Automation Candidate |
|---|---|---|---|---|---|---|---|
| PAT-001 | Open Patients module and verify list load | Logged in user with patient access | N/A | Navigate to Patients module | List view loads with columns and records/pager/search controls | High | Yes |
| PAT-002 | Create patient with minimum mandatory data | Patients list open | Name: `Rahul Sharma` | Click New → fill mandatory fields → Save | Patient saved successfully and visible in list | High | Yes |
| PAT-003 | Create patient with complete valid data | Patients list open | Name, Phone, Email, Related Doctor valid | New → fill all fields → Save | Full record saved and data persists on reopen | High | Yes |
| PAT-004 | Edit patient demographic details and save | Existing patient record | Updated name/address/phone | Open patient → edit details → Save | Updated values persist and appear in list/detail | High | Yes |
| PAT-005 | Discard patient edits | Existing patient record | Temporary field changes | Modify fields → click Discard | No updates committed; original data retained | High | Yes |
| PAT-006 | Mandatory field validation for blank name | New patient form open | Name blank | Leave mandatory fields blank → Save | Save blocked with field validation message | High | Yes |
| PAT-007 | Phone validation with alphabetic chars | New/edit patient form | Phone: `98AB12CD` | Enter invalid phone → Save | Save blocked; phone format validation shown | High | Yes |
| PAT-008 | Phone boundary - below minimum length | New/edit patient form | Phone: short length (e.g., `12345`) | Enter short phone → Save | Validation error; record not saved | High | Yes |
| PAT-009 | Phone boundary - above maximum length | New/edit patient form | Phone: long length (e.g., `123456789012345`) | Enter long phone → Save | Validation error; record not saved | High | Yes |
| PAT-010 | Email format validation invalid domain | New/edit patient form | Email: `test@invalid` | Enter invalid email → Save | Save blocked with email validation error | High | Yes |
| PAT-011 | Duplicate patient prevention | Existing patient with same identity attrs | Same Name + Phone/Email | Attempt to create duplicate record | Duplicate is blocked or explicitly flagged as per business rule | High | Yes |
| PAT-012 | Related doctor linkage and display integrity | Doctor record exists | Select doctor from relation field | Assign doctor to patient → Save → view list | Related Doctors column reflects assigned doctor | High | Yes |
| PAT-013 | Search patient by UHID | Patients list contains known UHID | Existing UHID | Use search bar with UHID | Matching patient returned correctly | Medium | Yes |
| PAT-014 | Search patient with no-match query | Patients list open | Random string | Search unknown value | Empty/no-match state shown safely | Medium | Yes |
| PAT-015 | Sort by Name ascending/descending | Patients list with multiple names | N/A | Click Name header to sort both orders | Ordering changes correctly and deterministically | Medium | Yes |
| PAT-016 | Pagination behavior and record continuity | More than one page of records | N/A | Navigate Next/Previous pages | Correct page index and row set displayed | Medium | Yes |
| PAT-017 | SQL-like payload handling in patient search | Patients list open | `' OR '1'='1` | Enter payload in search | No crash/no data leak; treated as text | High | Yes |
| PAT-018 | XSS payload handling in patient text field | Patient form open | `<script>alert(1)</script>` in Name/Address | Enter payload → Save/open view | Payload sanitized/escaped; no execution | High | Yes |
| PAT-019 | Unauthorized create/edit access (role-based) | Read-only user role available | N/A | Login as restricted user → open Patients | New/Edit actions hidden or blocked as per permissions | High | Yes |
| PAT-020 | Accessibility keyboard-only patient creation | Patient form open | Valid data | Complete form using keyboard only | Logical focus traversal; save possible without mouse | Medium | Yes |
| PAT-021 | Accessibility labels and error readability | Patient form open | Invalid + blank inputs | Trigger validation errors | Fields have accessible labels and readable error text | Medium | Yes |
| PAT-022 | Data persistence after refresh/relogin | Existing updated patient record | Updated fields | Save patient → refresh/relogin → reopen record | Saved data remains consistent across sessions | High | Yes |
