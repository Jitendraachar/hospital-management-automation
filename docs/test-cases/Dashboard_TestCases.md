## Brief overview
- Detailed manual test cases for **Dashboard** module in Hospital Management System.
- Focused on KPIs, top navigation links, quick-access workflows, search, security, session behavior, and accessibility.
- Includes priority, test type, automation suitability, and automation candidate guidance.

---

## Predicted high-risk areas for Dashboard
- **Missing Validation Risk:** KPI cards may render blank/incorrect if backend fields are null or mis-mapped.
- **Regression Risk:** Navigation links and quick-access cards are highly likely to break after menu or route updates.
- **API Risk:** Dashboard counts depend on multiple model endpoints; one failing call can silently skew summaries.
- **Session/Auth Risk:** Expired sessions may redirect to public/login pages and break dashboard workflows.
- **Authorization Risk:** Users without required roles may still see restricted KPI or module access.
- **Performance Risk:** Dashboard loads multiple summaries at once; slow response can degrade user trust and operations.

---

## Dashboard Test Cases

| Test Case ID | Title | Module | Preconditions | Priority | Test Steps | Expected Result | Test Data | Type | Technique(s) | Automation Candidate | Automation Suitability | Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DASH-001 | Dashboard loads successfully after login | Dashboard | Valid user account exists | Critical | Login → open `/odoo/action-372` | Dashboard page loads with header/menu/quick access visible | Valid credentials | Positive | State Transition, Risk-Based | Yes | High | Core entry flow, stable and business-critical |
| DASH-002 | KPI cards are visible with labels | Dashboard | User logged in | High | Open dashboard → verify all KPI labels | Total Patients, OPD Appointments, Pending Lab Tests, Paid Revenue, Active Doctors are visible | N/A | UI/Validation | Checklist Validation | Yes | High | Stable UI contract for core metrics |
| DASH-003 | KPI values are numeric/currency formatted | Dashboard | User logged in | High | Open dashboard → inspect KPI values | Count KPIs are numeric; revenue has currency format and not broken text | Existing production data | Validation | EP, Error Guessing | Yes | High | Prevents incorrect medical/business reporting |
| DASH-004 | Dashboard handles zero-data scenario safely | Dashboard | Environment with zero records (or filtered test tenant) | High | Open dashboard with no data | KPI values show 0/₹0 safely; no crash or NaN/undefined | Zero-data tenant | Negative | EP, Error Guessing | Yes | High | Common early-env condition; deterministic |
| DASH-005 | Top nav: Patients redirects correctly | Dashboard | Logged in | High | Click top nav **Patients** | URL routes to patients list and list search is visible | N/A | Navigation | State Transition | Yes | High | Core workflow jump |
| DASH-006 | Top nav: Doctors redirects correctly | Dashboard | Logged in | High | Click top nav **Doctors** | URL routes to doctors list and list search is visible | N/A | Navigation | State Transition | Yes | High | Core workflow jump |
| DASH-007 | Top nav: Prescriptions redirects correctly | Dashboard | Logged in | High | Click top nav **Prescriptions** | URL routes to prescriptions list and list search is visible | N/A | Navigation | State Transition | Yes | High | Core workflow jump |
| DASH-008 | Top nav: Appointments redirects correctly | Dashboard | Logged in | High | Click top nav **Appointments** | URL routes to appointments list and list search is visible | N/A | Navigation | State Transition | Yes | High | Core workflow jump |
| DASH-009 | Top nav: Billings redirects correctly | Dashboard | Logged in | High | Click top nav **Billings** | URL routes to billing list and list search is visible | N/A | Navigation | State Transition | Yes | High | Core workflow jump |
| DASH-010 | Quick access card: Patients opens patients workflow | Dashboard | Logged in | High | Click quick access **Patients** card | Redirects to Patients module list | N/A | Navigation | State Transition | Yes | High | Frequent user path |
| DASH-011 | Quick access card: Doctors opens doctors workflow | Dashboard | Logged in | High | Click quick access **Doctors** card | Redirects to Doctors module list | N/A | Navigation | State Transition | Yes | High | Frequent user path |
| DASH-012 | Quick access card: Prescriptions opens prescription workflow | Dashboard | Logged in | High | Click quick access **Prescriptions** card | Redirects to Prescriptions module list | N/A | Navigation | State Transition | Yes | High | Frequent user path |
| DASH-013 | Quick access card: Appointments opens appointment workflow | Dashboard | Logged in | High | Click quick access **Appointments** card | Redirects to Appointments module list | N/A | Navigation | State Transition | Yes | High | Frequent user path |
| DASH-014 | Quick access card: Billing opens billing workflow | Dashboard | Logged in | High | Click quick access **Billing** card | Redirects to Billing module list | N/A | Navigation | State Transition | Yes | High | Frequent user path |
| DASH-015 | Module search accepts normal keyword | Dashboard | Logged in on dashboard | Medium | Type module keyword in search field and submit | Search field accepts input without UI break or forced logout | `Patients` | Functional | EP | Yes | Medium | Stable but lower risk than core nav |
| DASH-016 | Module search handles SQL-like payload safely | Dashboard | Logged in on dashboard | High | Enter `' OR '1'='1` and submit | No crash, no script execution, user remains in authenticated dashboard context | `' OR '1'='1` | Security/Negative | Error Guessing, Risk-Based | Yes | High | Security-sensitive, deterministic |
| DASH-017 | Module search handles XSS payload safely | Dashboard | Logged in on dashboard | High | Enter `<script>alert(1)</script>` and submit | Payload treated as text; no popup/script execution | `<script>alert(1)</script>` | Security/Negative | Error Guessing, Risk-Based | Yes | High | Security-critical |
| DASH-018 | Session timeout behavior from dashboard | Dashboard | Login timeout policy enabled | High | Stay idle till timeout → interact with dashboard link/card | Redirect to login/session flow without exposing restricted data | N/A | Security/State | State Transition | Yes | High | Critical auth control |
| DASH-019 | Unauthorized user role access to dashboard | Dashboard | User with restricted role | High | Login as restricted user → open dashboard and try module navigation | Access enforced per role; restricted modules hidden/blocked with proper message | Restricted user credentials | Security | Decision Table, Risk-Based | Yes | Medium | Role matrix may vary by env |
| DASH-020 | Dashboard back navigation after logout | Dashboard | Logged in user | High | Login → logout → browser back | Dashboard data not accessible after logout; redirected to login | N/A | Security/Regression | State Transition | Yes | High | Prevents sensitive data exposure |
| DASH-021 | KPI and quick access render responsiveness (common desktop resolutions) | Dashboard | Logged in | Medium | Verify dashboard on 1366x768 and 1920x1080 | Cards/labels visible, no overlap/clipping for core controls | Desktop resolutions | UI | Pairwise | No | Low | Visual-heavy; manual better |
| DASH-022 | Revenue card handles very large amount without overflow | Dashboard | Test data with large paid amount | Medium | Load dashboard with high billing totals | Revenue value remains readable; no clipping/truncation overlap | Large currency sample | UI/Boundary | BVA | Yes | Medium | Known regression-prone formatting issue |
| DASH-023 | Quick access card keyboard accessibility | Dashboard | Logged in | Medium | Navigate via Tab/Shift+Tab and activate card using Enter/Space | Focus is visible and actionable; navigation works keyboard-only | N/A | Accessibility | Accessibility Heuristic | Yes | Medium | Repeatable and valuable |
| DASH-024 | Search field accessible name and focus behavior | Dashboard | Logged in | Medium | Focus module search by keyboard and inspect accessible label | Search has meaningful accessible name and usable focus behavior | N/A | Accessibility | Accessibility Heuristic | Yes | Medium | Stable and automatable |
| DASH-025 | Dashboard load performance sanity | Dashboard | Logged in | Medium | Open dashboard from authenticated session | Initial interactive dashboard load within agreed SLA (e.g., <= 3s in QA baseline) | N/A | Performance | Baseline Comparison | Yes | Medium | Important but environment-dependent |
| DASH-026 | API partial failure resilience for KPI widgets | Dashboard | Network mocking/tooling available | High | Simulate one KPI API failure while others succeed | Dashboard remains usable; failed widget shows safe fallback/error handling | Mock one failed API | API/Negative | Error Guessing, Risk-Based | Yes | Medium | Needs controlled mocks |
| DASH-027 | Multi-click protection on top navigation | Dashboard | Logged in | Medium | Rapidly click same nav link multiple times | No duplicate unstable state, no crash, final route consistent | Repeated click burst | Negative | Error Guessing | Yes | Medium | Reproducible flakiness guard |
| DASH-028 | Dashboard URL direct access when authenticated | Dashboard | Logged in | High | Directly hit `/odoo/action-372` in new tab | Dashboard loads directly without unexpected public-page redirect | Direct URL | Functional/Regression | State Transition | Yes | High | Core deep-link behavior |
| DASH-029 | Dashboard URL direct access when unauthenticated | Dashboard | Logged out session | High | Directly hit `/odoo/action-372` | Redirect to login; dashboard data not exposed | Direct URL | Security | State Transition | Yes | High | Access-control critical |
| DASH-030 | Module count consistency spot-check against list views | Dashboard | Stable test dataset | Medium | Capture dashboard count → open target module list and compare | Counts are consistent within expected definition rules | Example: patients count | Integration | Decision Table, Risk-Based | No | Low | Data-dependent; good manual audit |

---

## Suggested Smoke Suite (Dashboard)
- DASH-001, DASH-002, DASH-005, DASH-008, DASH-009, DASH-010, DASH-014, DASH-029

## Suggested Regression Suite (Dashboard)
- DASH-001 to DASH-020, DASH-022, DASH-023, DASH-024, DASH-028, DASH-029

## Automation priority summary
- **High:** Core login-to-dashboard, KPI presence/format basics, top nav routes, quick access routes, payload safety, auth/session checks.
- **Medium:** Accessibility checks, performance sanity, API partial-failure behavior, large currency rendering.
- **Low:** Highly visual/manual comparison checks and heavy data reconciliation spot-checks.

## Business impact summary
- Dashboard failures can mislead hospital operations (wrong counts/revenue), delay patient flow routing, and expose sensitive data if auth/session checks fail.  
- Highest priority is accurate KPI integrity, reliable navigation, and strict access/session control.
