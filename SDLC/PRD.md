Product Requirements Document (PRD)

Project Name: Invoice Management App (HNG Stage 2)
Date: April 2026
Role: Frontend Developer Track

1. Overview

The Invoice Management App is a fully responsive, client-side web application built with React. It allows freelancers and small business owners to create, manage, and track invoices. The app supports comprehensive CRUD operations, local data persistence, and a seamless dark/light mode toggle, adhering strictly to a provided Figma design.

2. Core Objectives

Deliver a pixel-perfect, responsive UI (Mobile, Tablet, Desktop).

Implement robust client-side routing and state management.

Persist user data across sessions using LocalStorage.

Ensure high accessibility standards (WCAG AA).

Execute bug-free CRUD operations with complex form validations.

3. User Stories

US1: As a user, I want to view a list of my invoices so I can see what is pending, paid, or drafted.

US2: As a user, I want to filter the invoice list by status (Draft, Pending, Paid) to easily find specific records.

US3: As a user, I want to create a new invoice and save it as a Draft or Pending so I can track my work.

US4: As a user, I want to edit an existing invoice to correct mistakes or update quantities.

US5: As a user, I want to mark a Pending invoice as Paid to update my financial records.

US6: As a user, I want to delete an invoice I no longer need, with a confirmation prompt to prevent accidental deletion.

US7: As a user, I want to toggle between light and dark modes to reduce eye strain depending on my environment.

4. Functional Requirements

4.1 Form Management & Validation

Required Fields: Client Name, Client Email, Street Address, City, Post Code, Country, Invoice Date, Payment Terms, Project Description.

Item List: Must contain at least one item. Each item requires an Item Name, Quantity (positive number), and Price (positive number).

Validation UI: Invalid fields must trigger visual red borders and display contextual error messages beneath the input. Form submission is blocked until all errors are resolved.

4.2 Invoice Status Workflow

Draft: Invoices saved without full validation (optional fields allowed). Can be edited.

Pending: Invoices saved and fully validated. Can be edited or marked as Paid.

Paid: Terminal status. Cannot be edited or reverted to Draft/Pending.

4.3 Data Persistence

Data must be serialized and stored in browser LocalStorage.

Initial load should populate the state from LocalStorage, or use a default dummy dataset if empty.

5. Non-Functional Requirements

Performance: App must load instantly; state updates should not cause noticeable re-renders.

Accessibility: - Semantic HTML (<main>, <header>, <nav>, <form>).

Accessible form labels and ARIA attributes.

Modals must trap keyboard focus and close via the ESC key.

Color contrast must meet WCAG AA standards in both light and dark themes.

Responsiveness: Fluid layouts supporting breakpoints at 320px, 768px, and 1024px without horizontal scrolling.