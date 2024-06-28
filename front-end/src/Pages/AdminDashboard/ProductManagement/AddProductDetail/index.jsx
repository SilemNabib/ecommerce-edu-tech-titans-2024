import { useState } from "react";
import CategorySelector from "../../../../Components/CategorySelector";
import InputText from "../../../../Components/InputText";
import ProgressBar from "../../../../Components/ProgressBar";
import TextArea from "../../../../Components/TextArea";
import { NavigationCategories } from "../../../../config/NavigationCategories";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const registerSteps = [
  <a  href={"/bootcamp-tech-titans-2024_ecommerce/admin/products/add"}>Product Details</a>,
  <a  href={"/bootcamp-tech-titans-2024_ecommerce/admin/products/add/images"}>Product Images</a>,
];

const AddProductDetail = () => {
  const navigate = useNavigate();

  const initValues = JSON.parse(sessionStorage.getItem("newProductDetails"));
  const initTitle = initValues?.title;
  const initPrice = initValues?.price;
  const initDescription = initValues?.description;
  const initCategories = initValues?.selectedCategories;
  
  console.log(initTitle, initPrice, initDescription, initCategories);

  const [title, setTitle] = useState(initTitle || "");
  const [price, setPrice] = useState(initPrice || "");
  const [description, setDescription] = useState(initDescription || "");
  const [selectedCategories, setSelectedCategories] = useState(initCategories || []);

  const handleNext = (e) => {
    e.preventDefault();
    if (!title || !price || !description || selectedCategories.length === 0) {
      toast.error("Please fill all fields");
      return;
    }

    if(price <= 0){
      toast.error("Price must be greater than 0");
      return;
    }

    if(selectedCategories.length < 3){
      toast.error("Please select all categories");
      return;
    }

    if(selectedCategories.length > 3){
      toast.error("Please select only 3 categories");
      return;
    }

    if(description.length < 10){
      toast.error("Description must be at least 10 characters long");
      return;
    }

    if(description.length > 1000){
      toast.error("Description must be at most 1000 characters long");
      return;
    }

    if(title.length < 5){
      toast.error("Title must be at least 5 characters long");
      return;
    }

    if(title.length > 255){
      toast.error("Title must be at most 100 characters long");
      return;
    }

    sessionStorage.setItem("newProductDetails", JSON.stringify({ title, price, description, selectedCategories }));
    navigate("/admin/products/add/images");
  };

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
      <ToastContainer />
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
          initcategories={initCategories}
          categories={NavigationCategories.categories}
          onCategorySelect={setSelectedCategories}
          className="border-2 border-gray-200 p-2 rounded-md"
        />
        <button
          onClick={handleNext}
          className="bg-black text-white py-2 px-4 rounded-lg mt-6 w-full">
          Next
        </button>
      </div>
    </div>
  );
};

export default AddProductDetail;