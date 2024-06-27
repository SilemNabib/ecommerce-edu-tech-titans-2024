import { useState } from "react";
import CategorySelector from "../../../../Components/CategorySelector";
import InputText from "../../../../Components/InputText";
import ProgressBar from "../../../../Components/ProgressBar";
import TextArea from "../../../../Components/TextArea";
import { NavigationCategories } from "../../../../config/NavigationCategories";

const registerSteps = [
  <a  href={"/admin/products/add"}>Product Details</a>,
  <a  href={"/admin/products/add/images"}>Product Images</a>,
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
    <div className="container mx-auto p-4 w-full">
      <ProgressBar steps={registerSteps} currentStep={0} title="Product Creation Progress" className="mb-6 w-full" />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-5">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <InputText
              options={{
                type: "text",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: "Title",
              }}
              className="w-full border-2 border-gray-200 p-2 rounded-md"
            />
          </div>
          <div>
            <InputText
              options={{
                type: "text",
                value: price,
                onChange: handlePriceChange,
                placeholder: "Price",
              }}
              SideDecoration={() => <span className="p-2">$$</span>}
              className="w-full border-2 border-gray-200 p-2 rounded-md"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-5">Description</h2>
        <TextArea
          options={{
            value: description,
            onChange: (e) => setDescription(e.target.value),
            placeholder: "Description",
          }}
          className="w-full border-2 border-gray-200 p-2 rounded-md mb-6"
        />
        <h2 className="text-2xl font-semibold mb-5">Categories</h2>
        <CategorySelector
          categories={NavigationCategories.categories}
          onCategorySelect={setSelectedCategories}
          className="border-2 border-gray-200 p-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default AddProductDetail;