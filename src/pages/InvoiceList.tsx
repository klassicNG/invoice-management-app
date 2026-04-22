import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvoices } from '../context/InvoiceContext';
import { InvoiceCard } from '../components/dashboard/InvoiceCard';
import { FilterDropdown } from '../components/dashboard/FilterDropdown';
// 1. IMPORT THE FORM COMPONENT
import { InvoiceForm } from '../components/form/InvoiceForm';
import { InvoiceStatus } from '../types';
import { Plus, Mailbox } from 'lucide-react';

export const InvoiceList: React.FC = () => {
  const { invoices } = useInvoices();
  const navigate = useNavigate();
  const [selectedStatuses, setSelectedStatuses] = useState<InvoiceStatus[]>([]);

  // 2. ADD STATE TO TRACK IF DRAWER IS OPEN
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleStatus = (status: InvoiceStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredInvoices = invoices.filter((invoice) =>
    selectedStatuses.length === 0 || selectedStatuses.includes(invoice.status)
  );

  const getSubtitle = () => {
    if (invoices.length === 0) return 'No invoices';
    const count = filteredInvoices.length;
    return (
      <>
        <span className="hidden md:inline">There are {count} total invoices</span>
        <span className="md:hidden">{count} invoices</span>
      </>
    );
  };

  return (
    <div className="w-full relative">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-8 md:mb-14">
        <div>
          <h1 className="text-3xl md:text-[32px] font-bold text-[#0C0E16] dark:text-white tracking-tight">
            Invoices
          </h1>
          <p className="text-[#888EB0] dark:text-[#DFE3FA] text-sm md:text-base mt-1 md:mt-2">
            {getSubtitle()}
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          <FilterDropdown
            selectedStatuses={selectedStatuses}
            onToggleStatus={toggleStatus}
          />

          <button
            // 3. UPDATE ONCLICK TO OPEN DRAWER
            onClick={() => setIsFormOpen(true)}
            className="bg-[#7C5DFA] hover:bg-[#9277FF] transition-colors text-white rounded-full p-2 pr-4 md:pr-4 flex items-center gap-2 md:gap-4 font-bold text-[15px] focus:outline-none focus:ring-2 focus:ring-[#9277FF] focus:ring-offset-2 dark:focus:ring-offset-[#141625]"
          >
            <div className="bg-white rounded-full p-2.5 flex items-center justify-center">
              <Plus size={16} strokeWidth={4} className="text-[#7C5DFA]" />
            </div>
            <span className="pt-1">
              <span className="hidden md:inline">New Invoice</span>
              <span className="md:hidden">New</span>
            </span>
          </button>
        </div>
      </header>

      {/* List / Empty State Area */}
      {filteredInvoices.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredInvoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onClick={(id) => navigate(`/invoice/${id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-[102px] md:mt-[210px] animate-fade-in">
          {/* Using Lucide Mailbox as a placeholder for the Empty Illustration */}
          <div className="w-[200px] h-[200px] mb-10 flex items-center justify-center text-[#DFE3FA] dark:text-[#1E2139]">
            <Mailbox size={180} strokeWidth={1} />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-[#0C0E16] dark:text-white mb-6">
            There is nothing here
          </h2>
          <p className="text-[#888EB0] dark:text-[#DFE3FA] text-center text-[15px] max-w-[220px]">
            Create an invoice by clicking the <span className="font-bold">New Invoice</span> button and get started
          </p>
        </div>
      )}

      {/* 4. RENDER THE FORM COMPONENT */}
      <InvoiceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};