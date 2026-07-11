## Brief overview
- Senior QA Lead review and revision for Login module manual test coverage.
- This revision addresses missing edge cases, missing negative scenarios, duplicates, priority corrections, and automation suitability.

## QA Lead review findings

### Missing edge cases identified
- Leading/trailing whitespace handling in username.
- Session timeout and re-login behavior.
- Browser back navigation after logout.
- Enter key submit behavior.
- Concurrent login/session replacement behavior.

### Missing negative scenarios identified
- Invalid username + valid password.
- Valid username + invalid password.
- SQL/XSS-style payload input handling in username/password fields.
- Locked/inactive user behavior (if supported by backend policy).

### Duplicate test cases removed/merged
- Multiple “valid login” checks were consolidated into one core happy-path test with clear assertions.
- Repeated invalid credential checks were consolidated into parameterized negative coverage.

### Incorrect priority corrections
- Authentication and security validations moved to **High**.
- Cosmetic UI checks moved to **Medium**.
- Niche compatibility checks kept **Low/Medium** depending on business impact.

### Test cases that should be automated
- All high-priority authentication and access-control scenarios.
- Critical negative paths and input validation checks.
- Session persistence/logout redirect checks.

### Assumptions made
- Login URL redirects from `/odoo` to `/web/login`.
- Username/password authentication is primary for this role.
- Generic error message is expected for invalid credentials.
- Account lock policy may depend on environment config.

---

## Revised Login Test Cases

| Test ID | Test Title | Preconditions | Test Data | Steps | Expected Result | Priority | Automation Candidate |
|---|---|---|---|---|---|---|---|
| LOG-001 | Valid login with active user | User exists and is active | Username: valid, Password: valid | Open login page → enter valid credentials → click Log in | User lands on dashboard/home; authenticated header visible | High | Yes |
| LOG-002 | Invalid username with valid password | Login page accessible | Username: invalid, Password: valid | Enter data → submit | Login blocked; generic authentication error shown | High | Yes |
| LOG-003 | Valid username with invalid password | Login page accessible | Username: valid, Password: invalid | Enter data → submit | Login blocked; generic authentication error shown | High | Yes |
| LOG-004 | Invalid username and invalid password | Login page accessible | Username: invalid, Password: invalid | Enter data → submit | Login blocked; generic authentication error shown | High | Yes |
| LOG-005 | Empty username and password validation | Login page accessible | Username: blank, Password: blank | Click Log in without input | Required field validation shown; request not submitted or rejected safely | High | Yes |
| LOG-006 | Username with leading/trailing spaces | Login page accessible | Username: `"  valid_user  "`, Password: valid | Enter credentials with spaces → submit | Username is trimmed or clearly rejected per rule; no silent corruption | High | Yes |
| LOG-007 | Password masking and visibility toggle behavior | Login page accessible | Valid/any password text | Enter password → toggle visibility icon twice | Default masked, visibility toggle works, value remains unchanged | Medium | Yes |
| LOG-008 | Login submit via Enter key | Login page accessible | Valid credentials | Fill fields → press Enter in password field | Login request submitted and successful navigation occurs | Medium | Yes |
| LOG-009 | SQL injection payload handling | Login page accessible | Username/Password: `' OR '1'='1` | Enter payload → submit | Login blocked; no crash/no unexpected access | High | Yes |
| LOG-010 | XSS payload handling in login fields | Login page accessible | `<script>alert(1)</script>` payload | Enter payload → submit | Payload treated as text; no script execution | High | Yes |
| LOG-011 | Logout then browser back access control | Logged in session | N/A | Logout → hit browser Back | Protected pages not accessible without re-authentication | High | Yes |
| LOG-012 | Session timeout handling | Logged in session with timeout policy | N/A | Stay idle beyond timeout → perform action | User redirected to login/session-expired flow safely | High | Yes |
| LOG-013 | Locked/inactive user login attempt | Locked/inactive account available | Username: locked user, Password: correct | Submit credentials | Access denied with policy-compliant message | High | Yes |
| LOG-014 | Accessibility: keyboard-only login | Login page accessible | Valid credentials | Navigate with Tab/Shift+Tab, submit using keyboard | Focus order logical; login possible without mouse | Medium | Yes |
| LOG-015 | Accessibility: labels and error announcement | Login page accessible | Invalid credentials/blank fields | Trigger validation/error states | Inputs have accessible names; errors are readable and announced appropriately | Medium | Yes |
