# Prescription Module - Manual Test Cases (Hospital Management System)

## 1) Business Workflow Understanding (Prescription Module)

- Prescription records are created from Prescription list view using **New**.
- Core form dependencies:
  - **Patient** selection
  - **Appointment** selection (linked to patient context)
  - **Date**
  - **Medicines** grid (Medicine, Qty, Unit, Dosage, Duration, Notes)
  - **Prescription Notes**
- Record-level actions observed:
  - Save
  - Discard
  - Print Prescription button
  - Actions menu: Print report, Duplicate
- List-level capabilities observed:
  - Search
  - Filter (Custom Filter)
  - Group By (Appointment, Patient, Date, etc.)
  - Favorites (Save current search)

---

## 2) Risk Analysis (Top Risk Areas)

1. **Missing Validation**: Empty or incomplete medicine instructions can lead to unsafe treatment.
2. **Incorrect Data Mapping**: Wrong patient-appointment association can attach prescription to incorrect patient.
3. **Duplicate Data**: Duplicate records through copy/duplicate flows may create treatment confusion.
4. **Null Handling**: Empty dosage/duration/notes fields may pass silently and break downstream print/reporting.
5. **Session/Autosave Risk**: Unsaved data loss or partial save under navigation/discard.
6. **Print Integrity Risk**: Printed prescription may not match on-screen values.
7. **Search/Filter Reliability**: Clinicians may fail to find records quickly during care.
8. **Authorization Risk**: Unauthorized roles could edit/delete prescription records.
9. **Concurrent Update Risk**: Multiple users editing same prescription can overwrite details.
10. **Performance Risk**: Large prescription datasets may degrade search/list load performance.

---

## 3) Test Cases

| Test Case ID | Title | Module | Preconditions | Priority | Test Steps | Expected Result | Test Data | Type | Automation Candidate | Automation Suitability |
|---|---|---|---|---|---|---|---|---|---|---|
| RX-TC-001 | Open Prescription list view | Prescription | User logged in with valid credentials | Critical | 1. Navigate to Prescriptions module | List screen loads with New, Search, and table headers | N/A | Positive | Yes | High |
| RX-TC-002 | Open New Prescription form | Prescription | On Prescription list page | Critical | 1. Click New | New form opens with Patient, Appointment, Date, Medicines grid, Notes, Save/Discard | N/A | Positive | Yes | High |
| RX-TC-003 | Discard unsaved prescription changes | Prescription | New prescription form open | High | 1. Enter notes 2. Click Discard | Form closes/returns to list without persisting changes | Notes: "Discard check" | Negative | Yes | High |
| RX-TC-004 | Verify default medicines row behavior | Prescription | New form open | High | 1. Inspect medicines grid | Default editable row available with Qty and input cells | N/A | Positive | Yes | High |
| RX-TC-005 | Add medicine line in grid | Prescription | New form open | High | 1. Click Add a line | Additional medicine line is added and editable | N/A | Positive | Yes | High |
| RX-TC-006 | Delete medicine line from grid | Prescription | New form with at least one medicine row | High | 1. Click delete row icon | Selected medicine row is removed | N/A | Positive | Yes | High |
| RX-TC-007 | Save prescription with complete data | Prescription | Valid patient and appointment exist | Critical | 1. Select patient 2. Select appointment 3. Fill medicine dosage/duration/notes 4. Save | Prescription saved successfully and remains retrievable | Patient: existing, Dosage: 1-0-1, Duration: 5 days | Positive | Yes | High |
| RX-TC-008 | Attempt save with missing patient | Prescription | New form open | Critical | 1. Leave patient empty 2. Save | Validation shown; record not saved | Patient: blank | Negative | Yes | High |
| RX-TC-009 | Attempt save with missing appointment | Prescription | New form open | Critical | 1. Select patient only 2. Save | Validation shown; record not saved | Appointment: blank | Negative | Yes | High |
| RX-TC-010 | Edit existing prescription notes | Prescription | At least one prescription exists | High | 1. Open existing record 2. Update notes 3. Save | Updated note persists on reload | Notes: updated text | Positive | Yes | High |
| RX-TC-011 | Update medicine dosage/duration for existing record | Prescription | Existing prescription available | High | 1. Open record 2. Edit dosage/duration 3. Save | New dosage/duration persists | Dosage: 1-1-1, Duration: 7 days | Positive | Yes | High |
| RX-TC-012 | Open Actions menu options for prescription form | Prescription | Prescription form open | Medium | 1. Open Actions menu | Print report and Duplicate options visible | N/A | Positive | Yes | Medium |
| RX-TC-013 | Duplicate prescription record | Prescription | Existing prescription open | Medium | 1. Actions > Duplicate | New duplicated draft/opened record generated | Existing record | Positive | Yes | Medium |
| RX-TC-014 | Print Prescription from button | Prescription | Prescription form open | High | 1. Click Print Prescription | Print/report flow is triggered without JS/UI error | N/A | Positive | Yes | Medium |
| RX-TC-015 | Print Prescription from Actions menu | Prescription | Prescription form open | Medium | 1. Actions > Prescription report | Report action triggered | N/A | Positive | Yes | Medium |
| RX-TC-016 | Search with exact reference | Prescription | At least one prescription exists | High | 1. Enter exact reference in search 2. Submit | Matching record displayed | Reference: known value | Positive | Yes | High |
| RX-TC-017 | Search with no-match keyword | Prescription | On list page | High | 1. Search impossible token | No matching row returned; app remains stable | NO_MATCH_RX_99999 | Negative | Yes | High |
| RX-TC-018 | Clear search and recover list | Prescription | Search applied | Medium | 1. Clear search 2. Submit | List returns to default view | N/A | Positive | Yes | High |
| RX-TC-019 | Open filter dropdown sections | Prescription | On list page | Medium | 1. Open search options | Filters, Group By, Favorites sections displayed | N/A | Positive | Yes | High |
| RX-TC-020 | Open Custom Filter builder | Prescription | Filter dropdown open | Medium | 1. Click Custom Filter | Custom filter UI opens | N/A | Positive | Yes | Medium |
| RX-TC-021 | Use Group By option (Patient) | Prescription | Filter dropdown open | Medium | 1. Select Group By Patient | List groups by patient | Group: Patient | Positive | Yes | Medium |
| RX-TC-022 | Save current search in Favorites | Prescription | Filter/search applied | Medium | 1. Click Save current search | Favorite is saved and reusable | Search term + group | Positive | Yes | Medium |
| RX-TC-023 | Delete prescription via Actions menu | Prescription | Existing record, delete permission available | High | 1. Open record 2. Actions > Delete 3. Confirm | Record removed from list/search | Existing reference | Negative | Yes | High |
| RX-TC-024 | Validate role-based access for delete action | Prescription | Login as restricted role | Critical | 1. Open prescription | Delete action hidden/blocked for unauthorized role | Restricted user | Security | Partially | Medium |
| RX-TC-025 | Session timeout during draft editing | Prescription | Session timeout configured | Medium | 1. Open form 2. Enter data 3. Let session expire 4. Save | User redirected or warned; no silent data corruption | Draft data | Negative | Partially | Medium |
| RX-TC-026 | Concurrent update conflict handling | Prescription | Same record open in 2 sessions | High | 1. Update/save in session A 2. Update/save in session B | Conflict handled gracefully (warning/last-write policy visible) | Same record | Negative | Partially | Low |
| RX-TC-027 | Boundary: very long prescription notes | Prescription | New or existing form | Medium | 1. Enter max-length notes 2. Save | Save/validation behaves correctly; no truncation issues | Long text block | Boundary | Yes | Medium |
| RX-TC-028 | Boundary: invalid dosage format | Prescription | Form open | High | 1. Enter invalid dosage characters 2. Save | Validation shown or controlled normalization | Dosage: "@@@###" | Boundary/Negative | Yes | Medium |
| RX-TC-029 | Verify date control interaction | Prescription | Form open | Medium | 1. Open date control 2. Change date/time 3. Save | Date updated and persisted | Valid date/time | Positive | Yes | Medium |
| RX-TC-030 | UI stability: open/close form repeatedly | Prescription | On list page | Low | 1. New 2. Discard (repeat) | No UI freeze or state leakage | N/A | Exploratory | No | Low |

---

## 4) Suggested Smoke Suite

- RX-TC-001, RX-TC-002, RX-TC-003, RX-TC-007, RX-TC-016, RX-TC-019

## 5) Suggested Regression Suite

- RX-TC-001 to RX-TC-024, RX-TC-027, RX-TC-028, RX-TC-029

---

## 6) Automation Priority

- **Immediate (High):** RX-TC-001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 011, 016, 017, 018, 019, 023
- **Phase-2 (Medium):** RX-TC-012, 013, 014, 015, 020, 021, 022, 024, 025, 027, 028, 029
- **Manual-focused (Low):** RX-TC-026, RX-TC-030

---

## 7) Business Impact Summary

Prescription defects directly affect treatment safety, legal compliance, and patient trust.  
High-priority automation should focus on validation integrity, data persistence, retrieval/search reliability, and secure lifecycle operations (edit/delete/print).
