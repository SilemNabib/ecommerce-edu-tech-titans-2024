import { useState } from "react";
import ProductSpecification from "../../../../Components/ProductSpecification";
import ProgressBar from "../../../../Components/ProgressBar";

const registerSteps = [
  <a href={"/admin/products/add"}>Product Details</a>,
  <a href={"/admin/products/add/inventory"}>Product Inventory</a>,
  <a href={"/admin/products/add/images"}>Product Images</a>,
];

// Simulate sizes and colors from backend
const sizes = ['S', 'M', 'L', 'XL'];
const colors = ['Red', 'Blue', 'Green', 'Yellow'];

const AddProductInventory = () => {
  const [specifications, setSpecifications] = useState([{}, {}, {}]);

  const handleRemove = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setSpecifications([...specifications, {}]);
  };

  return (
    <div className="container mx-auto p-4">
      <ProgressBar steps={registerSteps} currentStep={1} title="Product Creation Progress" className="mb-4" />
      <div className="w-full bg-white shadow-md rounded-lg p-6 mt-4">
        <h2 className="text-xl font-semibold mb-4">Inventory</h2>
        {specifications.map((_, index) => (
          <div key={index} className="mb-4">
            <ProductSpecification
              key={index}
              index={index + 1}
              sizes={sizes}
              colors={colors}
              onRemove={() => handleRemove(index)}
            />
          </div>
        ))}
        <button
          onClick={handleAdd}
          className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Add Inventory
        </button>
      </div>
    </div>
  );
};

export default AddProductInventory;