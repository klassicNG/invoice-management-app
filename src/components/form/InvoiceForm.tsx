import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useInvoices } from '../../context/InvoiceContext';
import { Invoice, InvoiceStatus } from '../../types';
import { CustomInput } from '../ui/CustomInput';
import { ItemList } from './ItemList';

// Zod Validation Schema
const addressSchema = z.object({
  street: z.string().min(1, "can't be empty"),
  city: z.string().min(1, "can't be empty"),
  postCode: z.string().min(1, "can't be empty"),
  country: z.string().min(1, "can't be empty"),
});

const itemSchema = z.object({
  name: z.string().min(1, "can't be empty"),
  quantity: z.number({ invalid_type_error: "must be a number" }).positive("must be positive"),
  price: z.number({ invalid_type_error: "must be a number" }).positive("must be positive"),
});

const invoiceSchema = z.object({
  clientName: z.string().min(1, "can't be empty"),
  clientEmail: z.string().email("invalid email"),
  createdAt: z.string().min(1, "can't be empty"),
  paymentTerms: z.number(),
  description: z.string().min(1, "can't be empty"),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(itemSchema).min(1, "An item must be added"),
});

type FormValues = z.infer<typeof invoiceSchema>;

interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceToEdit?: Invoice | null;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ isOpen, onClose, invoiceToEdit }) => {
  const { addInvoice, updateInvoice } = useInvoices();
  const isEditMode = !!invoiceToEdit;

  const { register, handleSubmit, control, formState: { errors }, reset, getValues } = useForm<FormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      createdAt: new Date().toISOString().split('T')[0],
      paymentTerms: 30,
      items: [],
    }
  });

  // Populate form if editing
  useEffect(() => {
    if (invoiceToEdit && isOpen) {
      reset(invoiceToEdit);
    } else if (!invoiceToEdit && isOpen) {
      reset({
        createdAt: new Date().toISOString().split('T')[0],
        paymentTerms: 30,
        items: [],
      });
    }
  }, [invoiceToEdit, isOpen, reset]);

  const generateId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const l1 = letters[Math.floor(Math.random() * 26)];
    const l2 = letters[Math.floor(Math.random() * 26)];
    const n = Math.floor(1000 + Math.random() * 9000);
    return `${l1}${l2}${n}`;
  };

  const mapToInvoice = (data: Partial<FormValues>, status: InvoiceStatus): Invoice => {
    const createdAtDate = new Date(data.createdAt || new Date());
    const paymentDue = new Date(createdAtDate);
    paymentDue.setDate(createdAtDate.getDate() + (data.paymentTerms || 30));

    const total = (data.items || []).reduce((acc, item) => acc + ((item.quantity || 0) * (item.price || 0)), 0);

    return {
      id: invoiceToEdit?.id || generateId(),
      createdAt: createdAtDate.toISOString().split('T')[0],
      paymentDue: paymentDue.toISOString().split('T')[0],
      description: data.description || '',
      paymentTerms: data.paymentTerms || 30,
      clientName: data.clientName || '',
      clientEmail: data.clientEmail || '',
      status,
      senderAddress: {
        street: data.senderAddress?.street || '',
        city: data.senderAddress?.city || '',
        postCode: data.senderAddress?.postCode || '',
        country: data.senderAddress?.country || '',
      },
      clientAddress: {
        street: data.clientAddress?.street || '',
        city: data.clientAddress?.city || '',
        postCode: data.clientAddress?.postCode || '',
        country: data.clientAddress?.country || '',
      },
      items: (data.items || []).map((item, idx) => ({
        id: invoiceToEdit?.items?.[idx]?.id || generateId(),
        name: item.name || '',
        quantity: item.quantity || 0,
        price: item.price || 0,
        total: ((item.quantity || 0) * (item.price || 0))
      })),
      total
    };
  };

  // Full strict validation flow
  const onSaveAndSend = (data: FormValues) => {
    const payload = mapToInvoice(data, 'pending');
    isEditMode ? updateInvoice(payload) : addInvoice(payload);
    onClose();
  };

  // Bypasses React Hook Form's strict validation
  const onSaveDraft = () => {
    const currentValues = getValues();
    const payload = mapToInvoice(currentValues, 'draft');
    isEditMode ? updateInvoice(payload) : addInvoice(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className={`fixed top-[72px] md:top-[80px] xl:top-0 left-0 xl:left-[103px] z-50 w-full md:w-[616px] xl:w-[719px] h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] xl:h-screen bg-white dark:bg-[#141625] transition-transform duration-300 transform translate-x-0 flex flex-col rounded-r-none md:rounded-r-[20px]`}>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-14 custom-scrollbar">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#0C0E16] dark:text-white mb-10">
            {isEditMode ? <>Edit <span className="text-[#888EB0]">#</span>{invoiceToEdit.id}</> : 'New Invoice'}
          </h2>

          <form id="invoice-form" onSubmit={handleSubmit(onSaveAndSend)} className="flex flex-col gap-10">

            {/* Bill From Section */}
            <section>
              <h3 className="text-[#7C5DFA] font-bold text-[15px] mb-6">Bill From</h3>
              <div className="flex flex-col gap-6">
                <CustomInput label="Street Address" {...register('senderAddress.street')} error={errors.senderAddress?.street?.message} />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <CustomInput label="City" {...register('senderAddress.city')} error={errors.senderAddress?.city?.message} />
                  <CustomInput label="Post Code" {...register('senderAddress.postCode')} error={errors.senderAddress?.postCode?.message} />
                  <CustomInput label="Country" className="col-span-2 md:col-span-1" {...register('senderAddress.country')} error={errors.senderAddress?.country?.message} />
                </div>
              </div>
            </section>

            {/* Bill To Section */}
            <section>
              <h3 className="text-[#7C5DFA] font-bold text-[15px] mb-6">Bill To</h3>
              <div className="flex flex-col gap-6">
                <CustomInput label="Client's Name" {...register('clientName')} error={errors.clientName?.message} />
                <CustomInput label="Client's Email" placeholder="e.g. email@example.com" {...register('clientEmail')} error={errors.clientEmail?.message} />
                <CustomInput label="Street Address" {...register('clientAddress.street')} error={errors.clientAddress?.street?.message} />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <CustomInput label="City" {...register('clientAddress.city')} error={errors.clientAddress?.city?.message} />
                  <CustomInput label="Post Code" {...register('clientAddress.postCode')} error={errors.clientAddress?.postCode?.message} />
                  <CustomInput label="Country" className="col-span-2 md:col-span-1" {...register('clientAddress.country')} error={errors.clientAddress?.country?.message} />
                </div>
              </div>
            </section>

            {/* Invoice Details Section */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <CustomInput type="date" label="Invoice Date" {...register('createdAt')} error={errors.createdAt?.message} />
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] tracking-wide text-[#7E88C3] dark:text-[#DFE3FA] font-medium">Payment Terms</label>
                  <select
                    {...register('paymentTerms', { valueAsNumber: true })}
                    className="w-full px-4 py-3 rounded-[4px] border border-[#DFE3FA] dark:border-[#252945] outline-none font-bold text-[15px] bg-white text-[#0C0E16] dark:bg-[#1E2139] dark:text-white focus:border-[#9277FF] dark:focus:border-[#9277FF] appearance-none"
                  >
                    <option value={1}>Net 1 Day</option>
                    <option value={7}>Net 7 Days</option>
                    <option value={14}>Net 14 Days</option>
                    <option value={30}>Net 30 Days</option>
                  </select>
                </div>
              </div>
              <CustomInput label="Project Description" placeholder="e.g. Graphic Design Service" {...register('description')} error={errors.description?.message} />
            </section>

            {/* Dynamic Items Array */}
            <ItemList control={control as any} register={register} errors={errors} />

          </form>
        </div>

        {/* Sticky Footer Action Bar */}
        <div className="bg-white dark:bg-[#141625] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] py-6 px-6 md:px-14 flex justify-between items-center rounded-br-none md:rounded-br-[20px] z-10">
          {isEditMode ? (
            <>
              <div /> {/* Spacer for flex-between */}
              <div className="flex gap-2">
                <button type="button" onClick={onClose} className="px-6 py-4 rounded-full font-bold bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] dark:hover:bg-[#1E2139] transition-colors focus:ring-2 focus:ring-[#9277FF] outline-none">
                  Cancel
                </button>
                <button type="submit" form="invoice-form" className="px-6 py-4 rounded-full font-bold bg-[#7C5DFA] text-white hover:bg-[#9277FF] transition-colors focus:ring-2 focus:ring-[#9277FF] outline-none">
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            <>
              <button type="button" onClick={onClose} className="px-6 py-4 rounded-full font-bold bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] dark:hover:bg-[#1E2139] transition-colors focus:ring-2 focus:ring-[#9277FF] outline-none">
                Discard
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={onSaveDraft} className="px-6 py-4 rounded-full font-bold bg-[#373B53] text-[#888EB0] hover:bg-[#0C0E16] dark:hover:bg-[#1E2139] transition-colors focus:ring-2 focus:ring-[#9277FF] outline-none">
                  Save as Draft
                </button>
                <button type="submit" form="invoice-form" className="px-6 py-4 rounded-full font-bold bg-[#7C5DFA] text-white hover:bg-[#9277FF] transition-colors focus:ring-2 focus:ring-[#9277FF] outline-none">
                  Save & Send
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </>
  );
};
