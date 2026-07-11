## Brief overview
- Project-specific domain rules for the Hospital Management System.
- Ensure all development, validation, and QA decisions protect patient outcomes and operational trust.

## Core domain principles
- Always evaluate changes against patient safety impact.
- Preserve data integrity across create, update, and delete operations.
- Enforce role-based access for all sensitive workflows.
- Maintain medical record accuracy at every handoff point.
- Ensure billing accuracy before claim, invoice, or payment completion.
- Record a clear audit trail for critical business actions.
- Apply session security controls for authenticated users.

## Required validation focus
- Generate hospital domain-specific validations for all major workflows.
- Include validations that prevent silent data corruption.
- Include validations that block unauthorized access and actions.
- Include validations that surface clear, business-readable error messages.

## Mandatory domain validation scenarios
- Duplicate Patient: detect and prevent accidental duplicate patient registration.
- Prescription Validation: verify dosage, frequency, and required prescription fields.
- Appointment Conflict: prevent overlapping appointments for the same doctor, room, or patient slot.
- Doctor Availability: validate scheduling only within approved doctor availability.
- Ward Capacity: block admissions when ward capacity is reached.
- Bed Availability: assign beds only when active bed inventory is available.
- Invoice Accuracy: validate item totals, taxes, discounts, and payable amount consistency.
- Lab Result Integrity: ensure lab results are linked to the correct patient, order, and timestamp.

## Security and compliance checks
- Validate least-privilege access by user role before showing or modifying medical and billing data.
- Require auditable entries for record edits, status transitions, and financial updates.
- Enforce secure session behavior for login, timeout, and unauthorized session reuse prevention.

## Usage guidance for test/design reviews
- Use these rules as a baseline when creating test cases, writing validations, and reviewing feature scope.
- Treat any gap in patient safety, record accuracy, or access control as a high-priority issue.
