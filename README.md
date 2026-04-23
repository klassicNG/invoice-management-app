Invoice Management Application

🚀 Setup Instructions

To run this application locally, ensure you have Node.js installed, then follow these steps:

Clone the repository:

git clone <repository-url>
cd invoice-management-app


Install dependencies:

npm install


Start the development server:

npm run dev


View the app: Open your browser and navigate to http://localhost:5173/

🏗️ Architecture Explanation

The application is built as a Single Page Application (SPA) utilizing a modern, scalable frontend stack:

Core: React 18 with TypeScript running on Vite for rapid HMR and optimized builds.

Routing: React Router v6 handles declarative navigation using an <Outlet /> layout pattern, allowing the sidebar to remain static while page views swap seamlessly.

State Management: The React Context API (InvoiceContext and ThemeContext) manages global state. InvoiceContext abstracts the complex CRUD operations and syncs directly with the browser's localStorage to ensure data persistence across sessions without a backend.

Form Engineering: React Hook Form is paired with Zod schema validation. This architecture was chosen to handle the deeply nested data structures (like dynamic item arrays) efficiently, preventing unnecessary re-renders of the entire form when a single input changes.

Styling: Tailwind CSS is used via PostCSS for utility-first, responsive, and maintainable styling.

⚖️ Trade-offs

Context API vs. Redux/Zustand: We opted for React Context for state management. Trade-off: While Context can cause broader re-renders than specialized atomic state libraries, it eliminated the need for external dependencies and boilerplate, which was ideal for the scope of this client-side CRUD app.

Local Storage vs. Backend Database: We utilized localStorage for data persistence. Trade-off: This makes the app entirely serverless and blazingly fast, but restricts data to the user's specific browser. Cross-device syncing would require a migration to a BaaS like Firebase or Supabase later.

React Hook Form vs. Controlled Inputs: Trade-off: RHF adds a learning curve and complex TypeScript generic typing (especially with useFieldArray), but it drastically out-performs standard React controlled inputs by keeping fields uncontrolled until submission, preventing input lag on massive forms.

♿ Accessibility Notes

Accessibility (a11y) was treated as a primary requirement, not an afterthought:

Semantic HTML: The DOM utilizes proper semantic tags (<main>, <nav>, <header>, <section>) for screen reader compatibility.

Keyboard Navigation: All interactive elements (buttons, custom dropdowns) are fully tabbable. focus:ring utilities are applied to provide clear visual indicators of focus states.

Contrast & Theming: The Dark/Light mode toggle isn't just aesthetic; colors were explicitly mapped to maintain WCAG-compliant contrast ratios across both themes.

ARIA Labels: Icon-only buttons (like the Theme toggle and Item Delete trash cans) include descriptive aria-label attributes.

✨ Improvements Beyond Requirements

To elevate the application to production readiness, several features were implemented beyond basic CRUD operations:

Strict Type Safety: Zod schemas guarantee data integrity before it ever reaches the Context state, preventing corrupt data injections.

Dynamic Calculations: The Item List dynamically calculates line-item totals in real-time as users adjust quantity or price, removing cognitive load from the user.

Zero-Configuration Persistence: Full data persistence is achieved out-of-the-box via localStorage synchronization, meaning users never lose their drafted invoices on an accidental page refresh.