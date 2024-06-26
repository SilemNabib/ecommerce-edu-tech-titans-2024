import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import InputText from "../../Components/InputText";
import Select from "../../Components/Select";

const ProductSpecification = ({ index, sizes, colors, onRemove }) => {
  const [stock, setStock] = useState('');

  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 bg-gray-100 p-4 rounded-md shadow-sm">
      <div className="text-lg font-medium">#{index}</div>
      <Select options={sizes} placeholder="Select size" className="flex-1 md:flex-auto md:w-1/3" />
      <Select options={colors} placeholder="Select color" className="flex-1 md:flex-auto md:w-1/3" />
      <InputText
        value={stock}
        options={{
          type: "number",
          placeholder: "Stock",
        }}
        className="w-full md:w-24"
      />
      <button onClick={onRemove} className="text-red-600 hover:text-red-800">
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProductSpecification;