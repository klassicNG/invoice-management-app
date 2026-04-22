UI/UX Wireframe & Layout Guide

Project: Invoice Management App (Figma Spec)

This document outlines the structural layout, component hierarchy, and responsive behaviors required to match the provided Figma design.

1. Global Navigation & Layout Container

The application features a persistent navigation bar containing the brand logo, theme toggle, and user avatar.

Desktop (1024px+):

Sidebar: Fixed to the left edge. Height is 100vh.

Layout: Top section contains a purple logo box with a curved bottom edge. Bottom section contains the Sun/Moon theme toggle icon, a horizontal divider line, and the user avatar profile picture.

Main Content: Centered horizontally to the right of the sidebar with a max-width (approx 730px) to maintain readability.

Tablet (768px - 1023px) & Mobile (320px - 767px):

Top Bar: Sidebar becomes a horizontal top navigation bar.

Layout: Logo is on the far left. On the far right is the theme toggle, a vertical divider, and the user avatar.

Main Content: Flows beneath the top bar with responsive padding (reduced padding on mobile to maximize space).

2. Screen 1: Invoice Dashboard (List View)

Header Section:

Left Side:

Heading: "Invoices" (Large, bold).

Subtitle: Desktop/Tablet shows "There are X total invoices" or "There are X pending invoices". Mobile simplifies to "X invoices".

Right Side:

Filter Dropdown: Text "Filter by status" (Desktop) or just "Filter" (Mobile) with a downward chevron. Clicking opens a small popup with checkboxes for Draft, Pending, and Paid.

New Invoice Button: A primary purple button. Contains a white circle with a purple '+' icon on the left, and text "New Invoice" (Desktop) or "New" (Mobile).

Invoice List Cards (per item):

Desktop Layout (Grid/Flex row): [#ID (bold)] [Due Date (light text)] [Client Name (light text)] [Amount (bold)] [Status Badge] [Right Chevron Icon]

Mobile Layout (Stacked):

Row 1: #ID (left), Client Name (right).

Row 2: Due Date & Amount stacked (left), Status Badge (right).

Empty State:

Centered illustration of a person/mailbox with a magnifying glass.

Heading: "There is nothing here".

Subtitle text instructing the user to create an invoice by clicking the "New Invoice" button.

3. Screen 2: Invoice Detail View

Navigation:

A simple "< Go back" link text at the top left, returning the user to the dashboard.

Action Header Card:

Layout: White background (or dark slate in dark mode), rounded corners, shadow.

Left (Status): Text "Status" followed by the <StatusBadge> component.

Right (Action Buttons): * "Edit" button (Light gray/secondary).

"Delete" button (Red/danger).

"Mark as Paid" button (Purple/primary). Only visible if status is pending/draft.

Mobile Note: Action buttons move to a fixed bottom bar on mobile screens.

Main Detail Paper (Content Card):

Header Grid:

Left: #ID and Description.

Right (text-right): Sender's full address (Street, City, Post Code, Country).

Middle Grid (3 Columns):

Col 1: Invoice Date and Payment Due date stacked.

Col 2: Bill To (Client Name and full address).

Col 3: Sent to (Client Email address).

Itemized Table Container:

Table Body (Light gray/Dark slate): Lists Item Name, QTY, Price, and Total. (On mobile, QTY and Price are combined under the Item Name, and the Total is right-aligned).

Table Footer (Dark contrasting color, e.g., nearly black or deep purple): Text "Amount Due" (left) and the Grand Total (Large font, right).

4. Screen 3: Slide-out Invoice Form (Drawer)

Behavior: * Desktop/Tablet: Slides in from the left edge, sitting under the sidebar but covering the main content. Includes a dark semi-transparent overlay over the rest of the app. Clicking the overlay closes the drawer.

Mobile: Slides up or takes over the full screen.

Content:

Heading: "New Invoice" or "Edit #ID".

Section 1: Bill From (Sender Address) - Street, City, Post Code, Country.

Section 2: Bill To (Client Info) - Client Name, Email, Street, City, Post Code, Country.

Section 3: Details - Invoice Date (DatePicker), Payment Terms (Select Dropdown: Net 1, 7, 14, 30 Days), Project Description.

Section 4: Item List - Dynamic rows with Item Name, Qty, Price, and a calculated Total. Includes a trash icon to delete the row, and a full-width "+ Add New Item" button at the bottom.

Sticky Footer Action Bar:

Create Mode: "Discard" (left), "Save as Draft" (right-secondary), "Save & Send" (right-primary).

Edit Mode: "Cancel" (right-secondary), "Save Changes" (right-primary).

5. Components & Theming Specifics

Status Badges:

Paid: Soft green background, dark green dot, dark green text.

Pending: Soft orange background, dark orange dot, dark orange text.

Draft: Soft gray/white background, black/dark gray dot, black/dark gray text.

Inputs & Validation States:

Default: 1px solid light gray border.

Focus: 1px solid purple (primary) border.

Error: 1px solid red border. Red text label "can't be empty" (or specific error) appears horizontally opposite the input label.

Typography: Typically uses a geometric sans-serif font (e.g., League Spartan). Form labels are small, uppercase, and slightly tracked out.

6. Delete Confirmation Modal

Overlay: Dark transparent background.

Box: Centered vertically and horizontally.

Content: Large heading "Confirm Deletion". Paragraph text confirming if they want to delete #ID and stating the action cannot be undone.

Actions (Right-aligned): "Cancel" (secondary) and "Delete" (red).