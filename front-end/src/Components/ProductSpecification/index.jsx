import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import InputText from "../../Components/InputText";
import Select from "../../Components/Select";

const ProductSpecification = ({ index, sizes, colors, onRemove }) => {
  const [stock, setStock] = useState('');

  const handleBlur = (event) => {
    let value = event.target.value;

    // Ensure the value is a positive integer
    if (value < 0) {
      value = 0;
    } else if (!Number.isInteger(value)) {
      value = Math.floor(value);
    }

    setStock(value);
  };

  return (
    <div className="flex items-center space-x-4">
      <div>#{index}</div>
      <Select options={sizes} placeholder="Select size" />
      <Select options={colors} placeholder="Select color" />
      <InputText
        value={stock}
        onBlur={handleBlur}
        options={{
          type: "number",
          min: 0,
          step: 1,
          placeholder: "Stock",
        }}
        className="w-full"
      />
      <button onClick={onRemove}>
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProductSpecification;