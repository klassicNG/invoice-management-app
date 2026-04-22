import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useInvoices } from '../context/InvoiceContext';
import { DeleteModal } from '../components/ui/DeleteModal';
import { InvoiceForm } from '../components/form/InvoiceForm';

export const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, markAsPaid } = useInvoices();
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const invoice = invoices.find(inv => inv.id === id);

  // 404 Fallback
  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0C0E16] dark:text-white mb-6">
          Invoice Not Found
        </h2>
        <Link to="/" className="px-6 py-4 rounded-full font-bold bg-[#7C5DFA] text-white hover:bg-[#9277FF] transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (invoice.id) {
      deleteInvoice(invoice.id);
      navigate('/');
    }
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-[#33D69F]/[0.06] text-[#33D69F] dark:bg-[#33D69F]/[0.06] dark:text-[#33D69F]';
      case 'pending': return 'bg-[#FF8F00]/[0.06] text-[#FF8F00] dark:bg-[#FF8F00]/[0.06] dark:text-[#FF8F00]';
      case 'draft': default: return 'bg-[#373B53]/[0.06] text-[#373B53] dark:bg-[#DFE3FA]/[0.06] dark:text-[#DFE3FA]';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-[#33D69F]';
      case 'pending': return 'bg-[#FF8F00]';
      case 'draft': default: return 'bg-[#373B53] dark:bg-[#DFE3FA]';
    }
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const formatAmount = (num: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(num);

  const actionButtons = (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => setIsFormOpen(true)}
        className="px-6 py-4 rounded-full font-bold bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] dark:hover:bg-[#1E2139] transition-colors focus:ring-2 focus:ring-[#9277FF] outline-none"
      >
        Edit
      </button>
      <button 
        onClick={() => setIsDeleteModalOpen(true)}
        className="px-6 py-4 rounded-full font-bold bg-[#EC5757] text-white hover:bg-[#FF9797] transition-colors focus:ring-2 focus:ring-[#EC5757] outline-none"
      >
        Delete
      </button>
      {(invoice.status === 'pending' || invoice.status === 'draft') && (
        <button 
          onClick={() => markAsPaid(invoice.id)}
          className="px-6 py-4 rounded-full font-bold bg-[#7C5DFA] text-white hover:bg-[#9277FF] transition-colors focus:ring-2 focus:ring-[#9277FF] outline-none"
        >
          Mark as Paid
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="w-full relative">
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-6 font-bold text-[#0C0E16] dark:text-white hover:text-[#7E88C3] transition-colors mb-8 focus:outline-none focus:ring-2 focus:ring-[#7C5DFA] rounded-md p-1">
          <ChevronLeft size={16} className="text-[#7C5DFA]" />
          Go back
        </Link>

        {/* Action Header Card */}
        <div className="bg-white dark:bg-[#1E2139] rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center justify-between w-full md:w-auto md:gap-4">
            <span className="text-[#858BB2] dark:text-[#DFE3FA] text-[13px]">Status</span>
            <div className={`flex items-center justify-center gap-2 w-[104px] py-3 rounded-md font-bold text-[15px] capitalize ${getStatusColors(invoice.status)}`}>
              <div className={`w-2 h-2 rounded-full ${getStatusDotColor(invoice.status)}`}></div>
              {invoice.status}
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:block">
            {actionButtons}
          </div>
        </div>

        {/* Detail Paper (Content Card) */}
        <div className="bg-white dark:bg-[#1E2139] rounded-lg shadow-sm p-6 md:p-12 mb-[88px] md:mb-0">
          
          {/* Header Grid */}
          <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-12">
            <div className="mb-8 md:mb-0">
              <h3 className="font-bold text-[#0C0E16] dark:text-white text-xl mb-2">
                <span className="text-[#888EB0]">#</span>{invoice.id}
              </h3>
              <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px]">{invoice.description}</p>
            </div>
            
            <div className="text-left md:text-right text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] leading-[18px]">
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>

          {/* Middle Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col justify-between">
              <div className="mb-8 md:mb-0">
                <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] mb-3">Invoice Date</p>
                <p className="font-bold text-[#0C0E16] dark:text-white text-[15px]">{formatDate(invoice.createdAt)}</p>
              </div>
              <div>
                <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] mb-3">Payment Due</p>
                <p className="font-bold text-[#0C0E16] dark:text-white text-[15px]">{formatDate(invoice.paymentDue)}</p>
              </div>
            </div>
            
            <div>
              <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] mb-3">Bill To</p>
              <p className="font-bold text-[#0C0E16] dark:text-white text-[15px] mb-2">{invoice.clientName}</p>
              <div className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] leading-[18px]">
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] mb-3">Sent to</p>
              <p className="font-bold text-[#0C0E16] dark:text-white text-[15px] break-all">{invoice.clientEmail}</p>
            </div>
          </div>

          {/* Itemized Table Container */}
          <div className="bg-[#F9FAFE] dark:bg-[#252945] rounded-t-lg p-6 md:p-8">
            <div className="hidden md:grid grid-cols-5 gap-4 mb-8 text-[#7E88C3] dark:text-[#DFE3FA] text-[13px]">
              <span className="col-span-2">Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>
            
            <div className="flex flex-col gap-6 md:gap-8">
              {invoice.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center md:grid md:grid-cols-5 md:gap-4">
                  <div className="flex flex-col md:col-span-2">
                    <span className="font-bold text-[#0C0E16] dark:text-white text-[15px]">{item.name}</span>
                    <span className="md:hidden text-[#7E88C3] dark:text-[#888EB0] font-bold mt-2">
                      {item.quantity} x {formatAmount(item.price)}
                    </span>
                  </div>
                  <span className="hidden md:block text-[#7E88C3] dark:text-[#DFE3FA] text-center font-bold">
                    {item.quantity}
                  </span>
                  <span className="hidden md:block text-[#7E88C3] dark:text-[#DFE3FA] text-right font-bold">
                    {formatAmount(item.price)}
                  </span>
                  <span className="font-bold text-[#0C0E16] dark:text-white text-right text-[15px]">
                    {formatAmount(item.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Table Footer */}
          <div className="bg-[#373B53] dark:bg-[#0C0E16] rounded-b-lg p-6 md:px-8 md:py-6 flex items-center justify-between text-white">
            <span className="text-[13px] font-medium">Amount Due</span>
            <span className="text-2xl font-bold">{formatAmount(invoice.total)}</span>
          </div>
          
        </div>
      </div>

      {/* Mobile Fixed Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E2139] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] p-6 z-10 flex justify-center w-full">
        {actionButtons}
      </div>

      {/* Modals & Forms */}
      <DeleteModal 
        invoiceId={invoice.id} 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDelete} 
      />
      
      <InvoiceForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        invoiceToEdit={invoice} 
      />
    </>
  );
};
