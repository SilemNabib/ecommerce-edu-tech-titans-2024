import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import InputText from "../../Components/InputText";
import Select from "../../Components/Select";

const ProductSpecification = ({ index, sizes, colors, selectedColor, selectedSize, customSize, stock, onChange }) => {

  const handleSizeChange = (value) => {
    onChange('size', value);
  };

  const handleColorChange = (value) => {
    onChange('color', value);
  };

  const handleStockChange = (value) => {
    onChange('stock', value);
  };

  const handleCustomSizeChange = (value) => {
    onChange('customSize', value);
  }

  return (
    <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-md shadow-sm">
      <div className="text-lg font-medium">#{index}</div>
      <Select
        options={[...sizes, 'Custom']}
        value={selectedSize}
        onChange={handleSizeChange}
        placeholder="Select size"
        className="flex-1"
      />
      {selectedSize === 'Custom' && (
        <InputText
          value={customSize}
          onChange={handleCustomSizeChange}
          options={{
            type: "text",
            placeholder: "Custom size",
          }}
          className="flex-1"
        />
      )}
      <Select
        options={colors.map(color => color.name)}
        value={selectedColor?.name}
        onChange={handleColorChange}
        placeholder="Select color"
        className="flex-1"
      />
      <InputText
        value={stock}
        onChange={handleStockChange}
        options={{
          type: "number",
          placeholder: "Stock",
        }}
        className="flex-1"
      />
    </div>
  );
};

export default ProductSpecification;
