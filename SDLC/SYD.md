System Design Document

Project: Invoice Management App

1. Architecture Overview

Given the "USE REACT ONLY" constraint, the application will be built as a Client-Side Single Page Application (SPA). State management will be handled via React Context API combined with custom hooks to interface with the browser's LocalStorage.

2. Tech Stack Recommendations

Core: React 18+ (via Vite for fast compilation).

Routing: React Router v6 (for handling List and Detail views).

Styling: Tailwind CSS (utility-first, simplifies Dark Mode and responsive design).

Form Handling: React Hook Form (for performance, minimal re-renders).

Schema Validation: Zod (integrates perfectly with React Hook Form for robust validation).

Icons: Lucide React or Phosphor Icons.

Date Formatting: date-fns (lightweight date manipulation).

3. Data Schema (Typescript / Zod equivalent)

const InvoiceItemSchema = {
  id: string,
  name: string,
  quantity: number,
  price: number,
  total: number // (quantity * price)
};

const InvoiceSchema = {
  id: string, // e.g., "RT3080"
  createdAt: string, // ISO Date
  paymentDue: string, // ISO Date
  description: string,
  paymentTerms: number, // 1, 7, 14, 30
  clientName: string,
  clientEmail: string,
  status: "draft" | "pending" | "paid",
  senderAddress: { street, city, postCode, country },
  clientAddress: { street, city, postCode, country },
  items: InvoiceItemSchema[],
  total: number // sum of all item totals
};


4. Component Hierarchy

<App>
 ├─ <ThemeProvider> (Manages Light/Dark state in DOM & LocalStorage)
 ├─ <InvoiceProvider> (Manages CRUD logic & DB synchronization)
 ├─ <Layout>
 │   ├─ <Sidebar> (Contains Logo, Theme Toggle, Avatar)
 │   └─ <MainContent>
 │       ├─ <Routes>
 │       │   ├─ <InvoiceList> (Route: "/")
 │       │   │   ├─ <Header> (Title, FilterDropdown, NewInvoiceBtn)
 │       │   │   ├─ <EmptyState> (If no invoices)
 │       │   │   └─ <InvoiceCard> (Mapped list)
 │       │   │
 │       │   └─ <InvoiceDetail> (Route: "/invoice/:id")
 │       │       ├─ <ActionHeader> (Back btn, StatusBadge, Edit/Delete/MarkPaid Btns)
 │       │       └─ <InvoicePaper> (Detailed layout of invoice data)
 │       │
 │       ├─ <InvoiceFormModal> (Slide-out drawer for Create/Edit)
 │       │   ├─ <FormFields>
 │       │   └─ <ItemListForm>
 │       │
 │       └─ <DeleteConfirmModal> (Focus-trapped dialog)


5. State Management & Storage

useInvoices Hook: Intercepts React Context. On initialization, reads localStorage.getItem('invoices'). On every mutation (CREATE, UPDATE, DELETE), it updates the Context state and immediately writes back to LocalStorage via useEffect.

Theme State: Stored as 'light' | 'dark' in LocalStorage. On load, applies class dark to the <html> element based on preference.