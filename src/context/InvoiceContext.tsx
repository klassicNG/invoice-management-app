import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Invoice } from '../types';

interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

// Dummy dataset used if LocalStorage is empty on first load
const DUMMY_INVOICES: Invoice[] = [
  {
    id: 'RT3080',
    createdAt: '2021-08-18',
    paymentDue: '2021-08-19',
    description: 'Re-branding',
    paymentTerms: 1,
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    status: 'paid',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '106 Kendell Street',
      city: 'Sharrington',
      postCode: 'NR24 5WQ',
      country: 'United Kingdom',
    },
    items: [
      {
        id: '1',
        name: 'Brand Guidelines',
        quantity: 1,
        price: 1800.90,
        total: 1800.90,
      },
    ],
    total: 1800.90,
  },
];

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const localData = localStorage.getItem('invoices');
      return localData ? JSON.parse(localData) : DUMMY_INVOICES;
    } catch (error) {
      console.error("Failed to parse invoices from localStorage:", error);
      return DUMMY_INVOICES;
    }
  });

  // Sync state to LocalStorage whenever the invoices array changes
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [invoice, ...prev]);
  };

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv))
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const markAsPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id && (inv.status === 'pending' || inv.status === 'draft')
          ? { ...inv, status: 'paid' }
          : inv
      )
    );
  };

  return (
    <InvoiceContext.Provider
      value={{ invoices, addInvoice, updateInvoice, deleteInvoice, markAsPaid }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

// Custom hook to easily consume the context
export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
};
