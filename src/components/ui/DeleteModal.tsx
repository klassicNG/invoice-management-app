import React, { useEffect, useRef } from 'react';

interface DeleteModalProps {
  invoiceId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ invoiceId, isOpen, onClose, onConfirm }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on ESC
      if (e.key === 'Escape') {
        onClose();
      }

      // Focus trap logic
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling on the main body while modal is open
      document.body.style.overflow = 'hidden';
      
      // Auto-focus the modal when opened for accessibility
      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector('button');
        firstFocusable?.focus();
      }, 10);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Semi-transparent Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Box */}
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-white dark:bg-[#1E2139] rounded-lg shadow-xl w-full max-w-[480px] mx-6 p-8 md:p-12 z-10 animate-fade-in"
      >
        <h2 id="modal-title" className="text-2xl font-bold text-[#0C0E16] dark:text-white mb-4">
          Confirm Deletion
        </h2>
        <p className="text-[#888EB0] dark:text-[#DFE3FA] text-[13px] leading-[22px] mb-8">
          Are you sure you want to delete invoice <span className="font-bold">#{invoiceId}</span>? This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-6 py-4 rounded-full font-bold bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] dark:hover:bg-[#1E2139] transition-colors focus:ring-2 focus:ring-[#9277FF] outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-4 rounded-full font-bold bg-[#EC5757] text-white hover:bg-[#FF9797] transition-colors focus:ring-2 focus:ring-[#EC5757] outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
