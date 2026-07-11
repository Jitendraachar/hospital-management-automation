<<<<<<< HEAD
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
=======
<<<<<<< HEAD
## Brief overview
- Project-specific domain rules for the Hospital Management System.
- Apply these checks while creating, reviewing, or validating features, test cases, and automation scenarios.
- Focus on high-risk healthcare outcomes before standard functional coverage.

## Core hospital quality priorities
- Always evaluate **Patient Safety** impact first.
- Enforce **Data Integrity** across create, update, transfer, and delete flows.
- Validate **Role Based Access** for every sensitive action and data view.
- Preserve **Medical Record Accuracy** with complete, correct, and traceable entries.
- Verify **Billing Accuracy** for charges, discounts, taxes, and final totals.
- Ensure complete **Audit Trail** for critical actions (who, what, when).
- Require strong **Session Security** (timeouts, logout handling, unauthorized access prevention).

## Domain-specific validation requirements
- Generate and execute healthcare-focused validations, not only generic CRUD checks.
- Include scenario coverage for:
  - Duplicate Patient detection
  - Prescription Validation
  - Appointment Conflict handling
  - Doctor Availability constraints
  - Ward Capacity limits
  - Bed Availability allocation
  - Invoice Accuracy checks
  - Lab Result Integrity verification

## Implementation and test-design guidance
- Prioritize validations that can cause clinical, legal, or financial risk if missed.
- Use measurable expected outcomes (for example: “record is blocked and validation message is displayed”).
- Ensure each validation confirms both:
  - prevention of incorrect action, and
  - preservation of correct system state and data.
=======
Hospital Domain

Modules:

Login

Patient

Doctor

Appointment

Billing

Laboratory

Pharmacy

Medical Records

Each generated scenario should understand relationships between modules.
>>>>>>> 9496aa88e8e66dee1aa39e68fe258791ca992a8c
>>>>>>> 3b932712144519a8085d5edb20e45ebd61689d22
