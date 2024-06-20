import { useState } from "react";
import CategorySelector from "../../../../Components/CategorySelector";
import InputText from "../../../../Components/InputText";
import ProgressBar from "../../../../Components/ProgressBar";
import TextArea from "../../../../Components/TextArea";
import { NavigationCategories } from "../../../../config/NavigationCategories";

const registerSteps = [
  <a href={"/admin/products/add"}>Product Details</a>,
  <a href={"/admin/products/add/images"}>Product Images</a>,
  <a href={"/admin/products/add/inventory"}>Product Inventory</a>,
];

const AddProductDetail = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const hasComma = value.includes(',');
    const hasDot = value.includes('.');
    
    if (/^[\d.,]*$/.test(value) && !(hasComma && hasDot)) {
      const parts = value.split(/[,\.]/);
      if (parts.length <= 2) {
        setPrice(value);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ProgressBar steps={registerSteps} currentStep={0} title="Product Creation Progress" className="mb-4" />
      <div className="w-full border border-gray-300 p-4 rounded-md mt-4">
        <h2 className="mb-2">Details</h2>
        <div className="flex space-x-4 mb-4 w-full">
          <div className="flex-grow">
            <InputText
              options={{
                type: "text",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: "Title",
              }}
              className="w-full"
            />
          </div>
          <div className="w-1/4">
            <InputText
              options={{
                type: "text",
                value: price,
                onChange: handlePriceChange,
                placeholder: "Price",
              }}
              SideDecoration={() => <span className="p-2">$$</span>}
              className="w-full"
            />
          </div>
        </div>
        <h2 className="mb-2">Description</h2>
        <TextArea
          options={{
            value: description,
            onChange: (e) => setDescription(e.target.value),
            placeholder: "Description",
          }}
          className="w-full mb-4"
        />
        <h2 className="mt-4 mb-2">Categories</h2>
        <CategorySelector
          categories={NavigationCategories.categories}
          onCategorySelect={setSelectedCategories}
        />
      </div>
    </div>
  );
};

export default AddProductDetail;