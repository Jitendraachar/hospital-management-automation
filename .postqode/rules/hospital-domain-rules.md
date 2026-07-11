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
