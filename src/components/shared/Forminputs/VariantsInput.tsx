
import { Plus, X } from "lucide-react";
import React, { useState } from "react";

interface Variant {
  price: number;
  size: string;
}

interface VariantsInputProps {
  setVariants: (variants: Variant[]) => void;
  variants: Variant[];
  itemTitle: string;
}

const VariantsInput: React.FC<VariantsInputProps> = ({
  setVariants,
  variants,
  itemTitle,
}) => {
  const [price, setPrice] = useState<string>(""); // Store as string for input handling
  const [size, setSize] = useState<string>("");
  const [showVariantForm, setShowVariantForm] = useState<boolean>(false);

  function addVariant() {
    if (!price || !size) return; // Ensure both fields are filled
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0) return; // Validate price
    setVariants([...variants, { price: priceValue, size }]);
    setPrice("");
    setSize("");
    setShowVariantForm(false); // Hide form after adding
  }

  function removeVariant(index: number) {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  }

  return (
    <div className="sm:col-span-2">
      {showVariantForm ? (
        <div className="flex items-center max-w-lg mx-auto">
          <div className="relative w-full space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 2v6m0 0v6m0-6h6m-6 0H4"
                  />
                </svg>
              </div>
              <input
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(e.target.value)
                }
                type="number"
                step="0.01"
                min="0"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter price (e.g., 19.99)"
                required
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 2h10M7 2v16M13 2v16"
                  />
                </svg>
              </div>
              <input
                value={size}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSize(e.target.value)
                }
                type="text"
                id="size"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter size (e.g., Small)"
                required
              />
            </div>
          </div>
          <button
            onClick={addVariant}
            type="button"
            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-lime-700 rounded-lg border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
          >
            <Plus className="w-4 h-4 me-2" />
            Add
          </button>
          <button
            onClick={() => setShowVariantForm(false)}
            className="ml-3 shrink-0 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowVariantForm(true)}
          className="flex items-center space-x-2 text-slate-800 dark:text-slate-300"
        >
          <Plus />
          <span>Add {itemTitle}</span>
        </button>
      )}
      <div className="flex flex-wrap gap-4 mt-4">
        {variants.map((variant, i) => (
          <div
            key={i}
            className="flex space-x-2 dark:text-slate-300 text-slate-800 bg-slate-200 items-center dark:bg-slate-400 px-4 py-2 rounded-lg"
          >
            <p>
              {variant.size} - ${variant.price.toFixed(2)}
            </p>
            <button onClick={() => removeVariant(i)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantsInput;
;
