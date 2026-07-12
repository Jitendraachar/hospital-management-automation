# 🏥 Hospital Management Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![GitHub](https://img.shields.io/badge/GitHub-Workflow-black)
![Status](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-v1.0-orange)

---

# Overview

Hospital Management Automation Framework is an enterprise-style Playwright automation framework built using **TypeScript**, **Page Object Model (POM)**, reusable utilities, and AI-assisted development practices.

The framework automates end-to-end testing of an Odoo-based Hospital Management System and includes intelligent defect reporting, screenshot capture, structured bug reports, and modular test design.

The project demonstrates real-world QA automation practices including Git feature branching, pull request workflows, documentation, reusable framework components, and scalable automation architecture.

---

# Key Features

- Playwright + TypeScript Automation Framework
- Page Object Model (POM)
- Base Page Architecture
- Modular Test Design
- Reusable Helper Functions
- Cross Browser Execution
- Screenshot Capture
- HTML Reports
- Trace Viewer Support
- AI-assisted Defect Detection
- Excel Bug Report Generation
- Structured Documentation
- Git Feature Branch Workflow
- Pull Request Based Development

---

# Technology Stack

| Technology | Purpose |
|------------|----------|
| Playwright | UI Automation |
| TypeScript | Programming Language |
| Node.js | Runtime |
| Git | Version Control |
| GitHub | Source Control & Collaboration |
| Odoo ERP | Application Under Test |
| PostQode | AI-assisted Development |

---

# Project Architecture

```
Hospital-Management-Automation
│
├── docs
│   ├── Test_Strategy.md
│   ├── Test_Plan.md
│   ├── Project_Report.md
│   ├── ReleaseNotes.md
│   └── PromptLibrary.md
│
├── pages
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── PatientPage.ts
│   ├── DoctorPage.ts
│   ├── BillingPage.ts
│   ├── PrescriptionPage.ts
│   └── ...
│
├── helpers
│
├── fixtures
│
├── excel
│
├── reports
│
├── screenshots
│
├── tests
│
├── playwright.config.ts
│
└── package.json
```

---

# Business Modules Covered

| Module | Status |
|----------|--------|
| Login | ✅ |
| Dashboard | ✅ |
| Patient | ✅ |
| Doctor | ✅ |
| Appointment | ✅ |
| Prescription | ✅ |
| Billing | ✅ |
| IPD Registration | ✅ |
| Laboratory | 🚧 Planned |
| Ward Management | 🚧 Planned |

---

# Framework Components

## BasePage

Reusable actions

- Click
- Fill
- Navigate
- Wait
- Screenshot
- Assertions

---

## Page Objects

Each module has its own Page Object.

Example:

```
LoginPage

PatientPage

DoctorPage

BillingPage

PrescriptionPage
```

---

## Test Files

Automation scripts are organized module-wise.

```
tests/

login/

patient/

doctor/

billing/

prescription/

appointment/

dashboard/
```

---

# AI Assisted Automation

This framework uses AI as an engineering accelerator.

AI was used for:

- Page Object generation
- Test scenario generation
- Test case generation
- Framework improvements
- Bug detection
- Root cause analysis
- Documentation generation
- Bug report generation

All generated outputs were reviewed, refined, and validated before integration.

---

# AI Defect Detection

The framework can identify issues such as:

- Hidden Save button
- Missing validation
- Unexpected navigation
- Console errors
- Runtime exceptions
- Broken UI
- Invisible controls
- Missing mandatory fields

Generated artifacts include:

- Screenshots
- HTML Report
- Trace File
- CSV Bug Report

---

# Reporting

Framework generates:

- HTML Report
- Playwright Trace
- Screenshots
- CSV Bug Reports
- Execution Summary

---

# Git Workflow

```
feature/*
      │
      ▼
develop
      │
      ▼
Pull Request
      │
      ▼
Code Review
      │
      ▼
develop
      │
      ▼
Release
      │
      ▼
main
```

---

# Installation

Clone repository

```bash
git clone https://github.com/<your-username>/hospital-management-automation.git
```

Move into project

```bash
cd hospital-management-automation
```

Install packages

```bash
npm install
```

---

# Running Tests

Run all tests

```bash
npx playwright test
```

Run headed mode

```bash
npx playwright test --headed
```

Run a specific test

```bash
npx playwright test tests/login.spec.ts
```

Run Chromium only

```bash
npx playwright test --project=Chromium
```

---

# View Reports

Open HTML Report

```bash
npx playwright show-report
```

Open Trace

```bash
npx playwright show-trace trace.zip
```

---

# Documentation

Project documentation is available under:

```
docs/

Test Strategy

Test Plan

Project Report

Release Notes

Prompt Library
```

---

# Team Contributions

## QA Lead

- Framework Architecture
- Test Strategy
- AI Integration
- Git Workflow
- Pull Request Review
- Release Management

## QA Engineer 1

- Doctor Module
- Prescription Module
- Appointment Module
- Dashboard Module
- Bug Report Structure

## QA Engineer 2

- IPD Registration
- Automation Extension
- Prompt Validation

---

# Lessons Learned

- Importance of reusable Page Objects
- Git Feature Branch workflow
- Merge conflict resolution
- AI-assisted automation techniques
- Modular framework design
- Structured documentation
- Code review practices

---

# Future Enhancements

- API Automation
- Jenkins Pipeline
- GitHub Actions
- Visual Regression
- Performance Testing
- Mobile Automation
- Docker Integration
- AI Test Data Generation
- AI Self-Healing Locators

---

# Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

---

# License

This project is released under the MIT License.

---

# Acknowledgements

This framework was developed using modern QA automation practices and AI-assisted engineering workflows.

AI tools such as PostQode and ChatGPT were used to accelerate development activities including Page Object generation, documentation, framework design, and defect analysis. All AI-generated outputs were reviewed, customized, and validated before being incorporated into the project.

---

# Author

**Jitendra Y**

QA Lead | Automation Engineer | Playwright | TypeScript | AI-assisted Testing

GitHub: https://github.com/Jitendraachar

---

## If you find this project useful, consider giving it a ⭐ on GitHub!
