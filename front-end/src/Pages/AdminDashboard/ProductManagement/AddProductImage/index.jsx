import { PlusCircleIcon } from '@heroicons/react/24/outline';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagePreview from '../../../../Components/ImagePreview';
import ImagesList from '../../../../Components/ImagesList';
import ProgressBar from "../../../../Components/ProgressBar";
import { ApiConfig } from '../../../../config/ApiConfig';
import { useAuth } from '../../../../Context/AuthContext';
import { ImageFormatValidator } from '../../../../utils/ImageFormatValidator';
import { CircularProgress } from '@mui/material';

const registerSteps = [
  <a  href={"/admin/products/add"}>Product Details</a>,
  <a  href={"/admin/products/add/images"}>Product Images</a>,
];

const AddProductImage = () => {

  const { initImages } = JSON.parse(sessionStorage.getItem("newProductImages")) || [];

  const [images, setImages] = useState(initImages || []);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const auth = useAuth();

  const handleUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) return;
  
    if (!ImageFormatValidator(file.type)) {
      toast.error('Invalid file format. Only jpg, jpeg, png, and svg are allowed.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); 
  

    try {
      const response = await auth.authFetchFile(ApiConfig.admin.uploadimg, {
        method: 'POST',
        data: formData,
      });
      console.log("Image upload response:", response);
      if (response.status === 201) {
        const newImages = [...images, response.data];
        setImages(newImages);
        sessionStorage.setItem("newProductImages", JSON.stringify({initImages: newImages}));
        setSelectedImage(response.data);
        toast.success("Product created successfully!");
      } else {
        toast.error("Failed to create product.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("An error occurred while uploading images.");
    } finally {
      setLoading(false);
    }

  };

  const handleConfirm = async () => {
    setLoading(true);
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }
    
    const imageIds = images.map((image) => image.id);
    const { title, price, description, selectedCategories } = JSON.parse(sessionStorage.getItem("newProductDetails"));
    const data = {
      name: title,
      price: price,
      description: description,
      categories: selectedCategories,
      imageIds: imageIds,
    };

    console.log(data);
    try {
      const response = await auth.authFetch(ApiConfig.admin.create_product, {
        method: "POST",
        data: data,
      });

      if (response.status === 201) {
        toast.success("Product created successfully!");
      } else {
        toast.error("Failed to create product.");
      }
    } catch (error) {
      toast.error("An error occurred while creating product.");
    } finally {
      sessionStorage.removeItem("newProductDetails");
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/admin/products";
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <ToastContainer />
      <ProgressBar steps={registerSteps} currentStep={1} title="Product Creation Progress" className="mb-6 w-full" />
      <div className="flex w-full h-96 mb-6 space-x-4">
        <ImagesList images={images} onSelect={setSelectedImage} />
        <ImagePreview selectedImage={selectedImage} />
      </div>
      <div className="flex w-full justify-between items-center mt-4">
        <label htmlFor="upload-image" className="flex items-center cursor-pointer p-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          <span>Add Image</span>
          <input id="upload-image" type="file" className="hidden" onChange={handleUpload} disabled={loading}/>
        </label>
        <button 
          onClick={handleConfirm}
          disabled={loading}
          className="p-3 bg-black text-white rounded-md flex items-center hover:bg-gray-800 transition"
        >
          <SaveIcon className="mr-2" />
          <span>Create New Product</span>
        </button>
      </div>
      <CircularProgress className="mt-4" style={{ display: loading ? "block" : "none" }} />
    </div>
  );
};

export default AddProductImage;