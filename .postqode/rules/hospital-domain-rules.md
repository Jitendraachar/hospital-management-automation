## Brief overview
- Project-specific domain rules for Hospital Management System validation.
- Apply these rules when generating test cases, reviewing requirements, and designing automated checks.

## Core domain priorities
- Always evaluate scenarios through these mandatory quality lenses:
  - Patient Safety
  - Data Integrity
  - Role Based Access
  - Medical Record Accuracy
  - Billing Accuracy
  - Audit Trail
  - Session Security
- If a scenario conflicts with patient safety or medical record accuracy, treat it as critical risk.

## Domain-specific validation requirements
- Include hospital-focused validations in both manual and automation-ready test coverage.
- Mandatory validation themes:
  - Duplicate Patient detection and handling
  - Prescription Validation against diagnosis, dosage, and patient context
  - Appointment Conflict checks (provider, room, time slot)
  - Doctor Availability enforcement before booking or reassignment
  - Ward Capacity enforcement during admissions/transfers
  - Bed Availability checks with real-time occupancy accuracy
  - Invoice Accuracy across services, medicines, discounts, and taxes
  - Lab Result Integrity for correct patient mapping and result consistency

## Risk and priority expectations
- Prioritize domain-critical workflows first where failure can impact care, legal compliance, or billing trust.
- Mark scenarios as Critical when they affect:
  - Clinical decisions
  - Active treatment continuity
  - Patient identity matching
  - Financial finalization or settlement
  - Security or auditability of sensitive operations

## Test design guidance
- Generate measurable expected results for each hospital validation.
- Ensure negative and edge tests explicitly cover misuse, data mismatch, unauthorized actions, and concurrency conflicts.
- Prefer reusable, business-readable wording that QA, product, operations, and compliance teams can interpret consistently.
