# Appointments Module - Manual Test Cases

## Scope
- Module: Appointments
- Application: Hospital Management System (`https://team40.qaaerp.com`)
- Focus: Appointment creation, validation, search/filter, lifecycle actions, and report-related workflows
- Techniques applied: Equivalence Partitioning, Boundary Value Analysis, Decision Table, State Transition, Error Guessing, Risk-Based Testing

## Risk Prediction (Before Execution)

1. **High Risk Areas**
   - Appointment lifecycle transitions (Draft → Confirmed → Done/Cancelled) may not enforce valid state rules.
   - Billing linkage (`Create Billing`) may be available in incorrect states.
   - Reason: State-driven workflows are typically regression-prone and business-critical.

2. **Regression Areas**
   - Search/filter/group-by behavior across status and date.
   - Actions menu operations (Print, Duplicate, Delete).
   - Reason: Shared Odoo list/search components can break after UI/view updates.

3. **Validation Risks**
   - Required fields (`Doctor`, `Date`) might not consistently block save.
   - Date/time/fee format acceptance may be too permissive.
   - Reason: Form validations often vary between create/edit flows.

4. **API Risks**
   - `web_search_read`, `get_views`, and record actions (delete/duplicate/print) can fail silently.
   - Reason: Heavy dependency on backend action endpoints and ORM methods.

5. **Performance Risks**
   - Search and filter menus may degrade with large appointment volumes.
   - Reason: Combined domain filtering + grouped list rendering is expensive at scale.

6. **Security Risks**
   - Unauthorized role access to delete, duplicate, or print actions.
   - Reason: Action menu and record operations must be role-gated.

---

## Test Cases

| Test Case ID | Title | Module | Preconditions | Priority | Test Steps | Expected Result | Test Data | Type | Automation Candidate | Automation Suitability | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|
| APT-TC-001 | Open Appointments list view successfully | Appointments | User logged in | Critical | 1. Navigate to Appointments module 2. Observe list headers and New button | Appointment list loads with columns (Appointment No, Patient, Doctor, Date, Time, Fee, Status) and New button visible | N/A | Positive | Yes | High | Core module entry validation, deterministic |
| APT-TC-002 | Open new appointment form | Appointments | On appointment list | Critical | 1. Click New 2. Verify form controls | Form opens with Doctor, Date, Time, Consultation Fee, Patient, Notes, and action buttons | N/A | Positive | Yes | High | Frequent create flow |
| APT-TC-003 | Validate mandatory fields on save | Appointments | New form open | Critical | 1. Keep Doctor and Date empty 2. Click Save | Save blocked, “Missing required fields” alert shown, required fields highlighted | Empty Doctor, Empty Date | Negative | Yes | High | Business-critical validation |
| APT-TC-004 | Create appointment with valid mandatory data | Appointments | New form open | Critical | 1. Select Doctor 2. Set Date 3. Select Patient 4. Save | Record saved and assigned appointment number | Valid doctor, valid date, existing patient | Positive | Yes | High | Primary transactional workflow |
| APT-TC-005 | Validate consultation fee accepts valid decimal | Appointments | New form open | High | 1. Enter valid decimal fee 2. Save | Fee stored correctly in list/form | `20.00` | Boundary | Yes | High | Financial field integrity |
| APT-TC-006 | Reject negative consultation fee | Appointments | New form open | High | 1. Enter negative fee 2. Save | Save blocked or business error shown; invalid value not persisted | `-10.00` | Negative | Yes | High | Financial validation risk |
| APT-TC-007 | Validate time field format behavior | Appointments | New form open | High | 1. Enter invalid time format 2. Save | Invalid time rejected or normalized with warning | `99:99` | Boundary | Yes | High | Scheduling correctness |
| APT-TC-008 | Search appointment by Appointment No | Appointments | Existing appointment present | High | 1. Enter appointment no in search 2. Apply “Search Appointment No for…” option | Matching appointment appears in results | `APT/0005` | Positive | Yes | High | Repeatable, stable search |
| APT-TC-009 | Search with non-existing appointment no | Appointments | On list page | High | 1. Search non-existing number 2. Apply appointment number search | No matching records returned; no crash | `APT/9999` | Negative | Yes | High | Robust no-result behavior |
| APT-TC-010 | Open filter menu and verify standard filters | Appointments | On list page | Medium | 1. Open search options 2. Verify Draft/Confirmed/Done/Cancelled/Today filters | All configured filters visible and selectable | N/A | UI/Functional | Yes | Medium | Important but UI-text dependent |
| APT-TC-011 | Filter by Draft status | Appointments | At least one draft record exists | High | 1. Open filters 2. Select Draft | Only Draft status records are listed | Status = Draft | Positive | Yes | High | Stable filtering behavior |
| APT-TC-012 | Filter by Done status | Appointments | At least one done record exists | High | 1. Open filters 2. Select Done | Only Done status records are listed | Status = Done | Positive | Yes | High | Stable filtering behavior |
| APT-TC-013 | Open existing draft appointment details | Appointments | Draft row exists | High | 1. Click draft row appointment number | Appointment detail form opens with correct data | Existing draft record | Positive | Yes | High | Core read/edit entry workflow |
| APT-TC-014 | Verify actions menu options on opened record | Appointments | Opened appointment form | High | 1. Click Actions menu | Appointment Receipt, Duplicate, Delete options visible | Existing record | Positive | Yes | High | Action surface validation |
| APT-TC-015 | Trigger print receipt from form button | Appointments | Opened appointment form | Medium | 1. Click Print Receipt | Print/report flow starts (new tab/dialog/download depending config) | Existing record | Positive | Yes | Medium | Environment-dependent output |
| APT-TC-016 | Trigger print receipt from actions menu | Appointments | Opened appointment form | Medium | 1. Open actions menu 2. Click Appointment Receipt | Report trigger initiated | Existing record | Positive | Yes | Medium | Similar to TC-015; alternate route |
| APT-TC-017 | Confirm appointment state transition | Appointments | Draft appointment open | Critical | 1. Click Confirm | Status changes from Draft to Confirmed | Draft appointment | Positive | Yes | High | State transition integrity |
| APT-TC-018 | Cancel appointment state transition | Appointments | Draft/Confirmed appointment open | Critical | 1. Click Cancel | Status updates to Cancelled and further invalid transitions blocked | Existing appointment | Positive | Yes | High | Clinical scheduling impact |
| APT-TC-019 | Validate duplicate record action | Appointments | Opened appointment form | Medium | 1. Open actions menu 2. Click Duplicate 3. Save duplicate | New appointment created without corrupting original | Existing appointment | Edge | Yes | Medium | Important, but data coupling risk |
| APT-TC-020 | Validate delete action with confirmation | Appointments | Opened appointment form | Critical | 1. Open actions menu 2. Click Delete 3. Confirm | Record removed and no longer appears in list | Existing test-created appointment | Negative | Yes | High | Destructive action protection |

---

## Edge Cases (Focused)
1. Save with Doctor selected but Date missing (partial mandatory completion).
2. Extremely long doctor/patient names in list row rendering and search.
3. Special characters in notes and referred-by values.
4. Duplicate click on Confirm/Cancel action buttons.
5. Search term with leading/trailing spaces.
6. Concurrent update: same appointment edited in two sessions.
7. Session timeout while saving appointment.
8. Print action invoked before first save (new unsaved form).
9. Create Billing action clicked for invalid appointment state.
10. Upload non-supported identity document type and verify handling.

---

## Defect Intelligence Summary

### Top 10 Risk Areas
1. Mandatory field enforcement (Doctor/Date)
2. Appointment state transitions
3. Consultation fee validation logic
4. Search + domain mapping consistency
5. Status filter correctness
6. Delete confirmation safety
7. Duplicate action data integrity
8. Print/report trigger reliability
9. Billing creation gating by status
10. Role-based access on destructive actions

### Modules Likely to Fail
- Appointments (form validation + state transitions)
- Billing integration touchpoint (Create Billing trigger)
- Reporting/print endpoint integration

### Suggested Regression Suite
- APT-TC-001, 002, 003, 004, 008, 011, 012, 013, 014, 017, 018, 020

### Suggested Smoke Suite
- APT-TC-001, 002, 003, 004, 013

### Automation Priority
- **High:** Create, mandatory validation, search by appointment no, status filters, open/edit, confirm/cancel, delete
- **Medium:** Print, duplicate, advanced filter/group-by
- **Low:** Purely visual checks and exploratory concurrency without dedicated tooling

### Business Impact
- Failures in Appointments can cause missed visits, billing leakage, clinician schedule conflicts, and patient dissatisfaction; state/validation defects can directly affect operational and financial accuracy.
