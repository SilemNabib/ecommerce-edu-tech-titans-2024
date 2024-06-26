import { PlusCircleIcon } from '@heroicons/react/24/outline';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import ProductSpecification from "../../../../Components/ProductSpecification";

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

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving changes...");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full p-6 mt-4">
        <h2 className="text-xl font-semibold mb-4">Inventory</h2>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleAdd}
            className="p-2 bg-black text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Add Inventory"
          >
            <PlusCircleIcon className="h-6 w-6" />
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <SaveIcon style={{ color: 'white', marginRight: '4px' }} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductInventory;