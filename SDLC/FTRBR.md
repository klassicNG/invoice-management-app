Feature Breakdown Document

Project: Invoice Management App
Methodology: Agile / Epic-based implementation

Epic 1: Project Setup & Global Architecture

Task 1.1: Initialize Vite + React + TypeScript (optional but recommended) project.

Task 1.2: Configure Tailwind CSS and setup custom theme colors (Purple, Dark Blue, Gray, Red) mapped to Figma.

Task 1.3: Implement React Router for basic / and /invoice/:id navigation.

Task 1.4: Setup Global Context Providers (ThemeContext, InvoiceContext).

Epic 2: Theming & Global Components

Task 2.1: Build ThemeProvider and integrate Dark/Light toggle logic with localStorage and Tailwind's dark: class.

Task 2.2: Build Layout components (Sidebar / Header).

Task 2.3: Build generic UI components: Button, StatusBadge, CustomInput.

Epic 3: Invoice List & Filtering

Task 3.1: Create dummy data.json to seed LocalStorage on first load.

Task 3.2: Build InvoiceList view and map InvoiceCard components.

Task 3.3: Implement FilterDropdown component.

Task 3.4: Write logic in InvoiceList to filter mapped invoices based on selected statuses.

Task 3.5: Implement Empty State UI when filters yield zero results.

Epic 4: Invoice Detail & Actions

Task 4.1: Build InvoiceDetail view fetching data from context via URL parameter :id.

Task 4.2: Implement "Mark as Paid" logic updating the context and LocalStorage.

Task 4.3: Build DeleteModal with focus-trap and ESC-to-close behavior.

Task 4.4: Implement Delete logic and redirect to /.

Epic 5: Invoice Form (The core challenge)

Task 5.1: Build the visual Slide-out Form Drawer layout.

Task 5.2: Integrate React Hook Form for state management of inputs.

Task 5.3: Implement dynamic useFieldArray for the Invoice Items list (add/remove items).

Task 5.4: Write validation rules (required fields, > 0 for numbers, valid email format).

Task 5.5: Implement "Save as Draft" bypass logic vs. "Save & Send" strict validation logic.

Task 5.6: Connect form submission to Context CREATE and UPDATE functions.

Epic 6: Polish & Accessibility

Task 6.1: Audit form labels and add aria-live regions for error messages.

Task 6.2: Test all interactive elements across Mobile, Tablet, and Desktop breakpoints.

Task 6.3: Verify Hover states on Buttons, Cards, and Inputs.

Task 6.4: Final clean up (remove console logs, write README.md).