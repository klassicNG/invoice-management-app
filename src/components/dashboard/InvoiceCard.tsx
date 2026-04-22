import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Invoice } from '../../types';

interface InvoiceCardProps {
  invoice: Invoice;
  onClick: (id: string) => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onClick }) => {
  // Determine badge colors based on status
  const getStatusColors = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-[#33D69F]/[0.06] text-[#33D69F] dark:bg-[#33D69F]/[0.06] dark:text-[#33D69F]';
      case 'pending':
        return 'bg-[#FF8F00]/[0.06] text-[#FF8F00] dark:bg-[#FF8F00]/[0.06] dark:text-[#FF8F00]';
      case 'draft':
      default:
        return 'bg-[#373B53]/[0.06] text-[#373B53] dark:bg-[#DFE3FA]/[0.06] dark:text-[#DFE3FA]';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-[#33D69F]';
      case 'pending': return 'bg-[#FF8F00]';
      case 'draft':
      default: return 'bg-[#373B53] dark:bg-[#DFE3FA]';
    }
  };

  const formattedDate = new Date(invoice.paymentDue).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  const formattedAmount = new Intl.NumberFormat('en-GB', {
    style: 'currency', currency: 'GBP',
  }).format(invoice.total);

  return (
    <div 
      onClick={() => onClick(invoice.id)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(invoice.id)}
      tabIndex={0}
      role="button"
      aria-label={`View Invoice ${invoice.id}`}
      className="bg-white dark:bg-[#1E2139] shadow-sm rounded-lg p-6 mb-4 cursor-pointer border border-transparent hover:border-[#7C5DFA] focus:outline-none focus:ring-2 focus:ring-[#7C5DFA] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between group"
    >
      {/* Mobile Stacked Layout (Default) -> Hidden on Desktop */}
      <div className="flex justify-between items-center md:hidden mb-6">
        <span className="font-bold text-[#0C0E16] dark:text-white">
          <span className="text-[#7E88C3]">#</span>{invoice.id}
        </span>
        <span className="text-[#858BB2] dark:text-white font-medium text-sm">
          {invoice.clientName}
        </span>
      </div>

      <div className="flex justify-between items-center w-full">
        {/* Left Section Grid */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
          <span className="hidden md:block font-bold text-[#0C0E16] dark:text-white w-20">
            <span className="text-[#7E88C3]">#</span>{invoice.id}
          </span>
          <span className="text-[#888EB0] dark:text-[#DFE3FA] text-sm md:w-32">
            Due {formattedDate}
          </span>
          <span className="hidden md:block text-[#858BB2] dark:text-white font-medium text-sm md:w-32">
            {invoice.clientName}
          </span>
        </div>

        {/* Right Section Grid */}
        <div className="flex justify-between items-center w-full md:w-auto md:gap-10">
          <span className="text-lg font-bold text-[#0C0E16] dark:text-white md:w-24 md:text-right">
            {formattedAmount}
          </span>
          
          <div className="flex items-center gap-5">
            {/* Status Badge */}
            <div className={`flex items-center justify-center gap-2 w-[104px] py-3 rounded-md font-bold text-[15px] capitalize ${getStatusColors(invoice.status)}`}>
              <div className={`w-2 h-2 rounded-full ${getStatusDotColor(invoice.status)}`}></div>
              {invoice.status}
            </div>
            {/* Right Chevron (Desktop only) */}
            <ChevronRight className="hidden md:block text-[#7C5DFA] transition-transform group-hover:translate-x-1" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
