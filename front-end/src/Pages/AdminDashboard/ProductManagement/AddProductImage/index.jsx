import { PlusCircleIcon } from '@heroicons/react/24/outline';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagePreview from '../../../../Components/ImagePreview';
import ImagesList from '../../../../Components/ImagesList';
import ProgressBar from "../../../../Components/ProgressBar";
import { ImageFormatValidator } from '../../../../utils/ImageFormatValidator';

const registerSteps = [
  <a href={"/admin/products/add"}>Product Details</a>,
  <a href={"/admin/products/add/inventory"}>Product Inventory</a>,
  <a href={"/admin/products/add/images"}>Product Images</a>,
];

const AddProductImage = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!ImageFormatValidator(file.type)) {
      toast.error('Invalid file format. Only jpg, jpeg, png, and svg are allowed.');
      return;
    }

    setImages([...images, URL.createObjectURL(file)]);
    toast.success('Image uploaded successfully');
  };

  const handleConfirm = () => {
    // Agregar la lógica para enviar la solicitud de creación del producto al backend
    toast.success("Product created successfully!");
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <ToastContainer />
      <ProgressBar steps={registerSteps} currentStep={2} title="Product Creation Progress" className="mb-6 w-full" />
      <div className="flex w-full h-96 mb-6 space-x-4">
        <ImagesList images={images} onSelect={setSelectedImage} />
        <ImagePreview selectedImage={selectedImage} />
      </div>
      <div className="flex w-full justify-between items-center mt-4">
        <label htmlFor="upload-image" className="flex items-center cursor-pointer p-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          <span>Add Image</span>
          <input id="upload-image" type="file" className="hidden" onChange={handleUpload} />
        </label>
        <button 
          onClick={handleConfirm} 
          className="p-3 bg-black text-white rounded-md flex items-center hover:bg-gray-800 transition"
        >
          <SaveIcon className="mr-2" />
          <span>Create New Product</span>
        </button>
      </div>
    </div>
  );
};

export default AddProductImage;