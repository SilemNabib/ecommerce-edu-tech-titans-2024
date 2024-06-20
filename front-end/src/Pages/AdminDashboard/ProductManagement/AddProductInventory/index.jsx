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
      <div className="w-full border border-gray-300 p-4 rounded-md mt-4">
        <h2 className="mb-2">Inventory</h2>
        {specifications.map((_, index) => (
          <ProductSpecification
            key={index}
            index={index + 1}
            sizes={sizes}
            colors={colors}
            onRemove={() => handleRemove(index)}
          />
        ))}
        <button onClick={handleAdd} className="mt-4">
          New Inventory
        </button>
      </div>
    </div>
  );
};

export default AddProductInventory;