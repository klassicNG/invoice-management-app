import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { InvoiceStatus } from '../../types';

interface FilterDropdownProps {
  selectedStatuses: InvoiceStatus[];
  onToggleStatus: (status: InvoiceStatus) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ selectedStatuses, onToggleStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const statuses: InvoiceStatus[] = ['draft', 'pending', 'paid'];

  // Handle Click Outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 font-bold text-[#0C0E16] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5DFA] rounded-md px-2 py-1"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="hidden md:inline">Filter by status</span>
        <span className="md:hidden">Filter</span>
        <ChevronDown 
          size={16} 
          className={`text-[#7C5DFA] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[-24px] w-48 bg-white dark:bg-[#252945] rounded-lg shadow-xl p-6 z-20 border border-transparent dark:border-[#1E2139]">
          <div className="flex flex-col gap-4" role="listbox">
            {statuses.map((status) => (
              <label 
                key={status} 
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={() => onToggleStatus(status)}
                    className="appearance-none w-4 h-4 rounded-sm bg-[#DFE3FA] dark:bg-[#1E2139] checked:bg-[#7C5DFA] dark:checked:bg-[#7C5DFA] cursor-pointer focus:ring-2 focus:ring-[#7C5DFA] focus:ring-offset-1 dark:focus:ring-offset-[#252945] transition-colors border border-transparent group-hover:border-[#7C5DFA]"
                  />
                  {selectedStatuses.includes(status) && (
                    <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 4.5L3.5 6.5L8.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="font-bold text-[#1E2139] dark:text-white capitalize pt-1 group-hover:text-[#7C5DFA] transition-colors">
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
