import React from 'react';
import { useFieldArray, Control, UseFormRegister, FieldErrors, useWatch } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { CustomInput } from '../ui/CustomInput';

interface ItemListProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const ItemList: React.FC<ItemListProps> = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // Watch items to calculate line totals dynamically
  const watchItems = useWatch({
    control,
    name: 'items',
  });

  // Cast the items errors to 'any' once here to satisfy TypeScript
  const itemErrors = errors.items as any;

  return (
    <div className="mt-8">
      <h3 className="text-[18px] font-bold text-[#777F98] mb-4">Item List</h3>

      {/* Table Header (Desktop Only) */}
      <div className="hidden md:grid grid-cols-[3fr_1fr_1.5fr_1fr_auto] gap-4 mb-4 text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] tracking-wide font-medium">
        <span>Item Name</span>
        <span>Qty.</span>
        <span>Price</span>
        <span>Total</span>
        <span className="w-4"></span>
      </div>

      <div className="flex flex-col gap-12 md:gap-4 mb-8">
        {fields.map((field, index) => {
          const qty = watchItems?.[index]?.quantity || 0;
          const price = watchItems?.[index]?.price || 0;
          const total = (qty * price).toFixed(2);

          return (
            <div key={field.id} className="grid grid-cols-[1fr_1fr_1fr_auto] md:grid-cols-[3fr_1fr_1.5fr_1fr_auto] gap-4 items-end">
              <div className="col-span-4 md:col-span-1">
                <CustomInput
                  label="Item Name"
                  {...register(`items.${index}.name` as const)}
                  error={itemErrors?.[index]?.name?.message}
                  className="md:[&>div:first-child]:hidden"
                />
              </div>

              <div className="col-span-1">
                <CustomInput
                  label="Qty."
                  type="number"
                  step="1"
                  {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                  error={itemErrors?.[index]?.quantity?.message}
                  className="md:[&>div:first-child]:hidden"
                />
              </div>

              <div className="col-span-1">
                <CustomInput
                  label="Price"
                  type="number"
                  step="0.01"
                  {...register(`items.${index}.price` as const, { valueAsNumber: true })}
                  error={itemErrors?.[index]?.price?.message}
                  className="md:[&>div:first-child]:hidden"
                />
              </div>

              <div className="col-span-1 flex flex-col justify-end pb-3 h-full">
                <span className="text-[#7E88C3] dark:text-[#DFE3FA] text-[13px] md:hidden mb-2">Total</span>
                <span className="font-bold text-[#888EB0] dark:text-[#DFE3FA] text-[15px] pt-1">
                  {total}
                </span>
              </div>

              <div className="col-span-1 flex justify-end pb-3">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-[#888EB0] hover:text-[#EC5757] transition-colors focus:outline-none"
                  aria-label="Delete item row"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => append({ name: '', quantity: 0, price: 0 })}
        className="w-full bg-[#F9FAFE] dark:bg-[#252945] hover:bg-[#DFE3FA] dark:hover:bg-[#1E2139] text-[#7E88C3] dark:text-[#DFE3FA] font-bold py-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#9277FF]"
      >
        + Add New Item
      </button>

      {/* Fixed root array error checking for Zod */}
      {itemErrors?.message && (
        <p className="text-[#EC5757] text-[11px] font-semibold mt-4">
          {itemErrors.message}
        </p>
      )}
    </div>
  );
};