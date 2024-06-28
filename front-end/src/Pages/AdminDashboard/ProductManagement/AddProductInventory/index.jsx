import { PlusCircleIcon } from '@heroicons/react/24/outline';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import ProductSpecification from "../../../../Components/ProductSpecification";
import { useParams } from "react-router";
import { useEffect } from "react";
import { ApiConfig } from "../../../../config/ApiConfig";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../../../Context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddProductInventory = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [specifications, setSpecifications] = useState([{}]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchFilters = async () => {
        try {
          const response = await fetch(`${ApiConfig.inventory}unique`);
          const data = await response.json();
          setColors(data.colors || []);
          setSizes(data.sizes || []);
        } catch (error) {
          toast.error("Error fetching data:", error);
        }
      };

      const fetchProduct = async () => {
        try {
          const response = await fetch(`${ApiConfig.products}${id}`);
          const data = await response.json();
          setProduct(data);
          setSpecifications(data.inventories || [{}]);
        } catch (error) {
          toast.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
      fetchFilters();
    }, []);

  const handleAdd = () => {
    setSpecifications([...specifications, {}]);
    console.log(specifications)
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const newSpecifications = specifications.map(spec => ({ ...spec, productId: id }));

      newSpecifications.forEach(spec => {
        if (spec.color && spec.color.name) {
          spec.color = spec.color.name;
        }
        if (spec.customSize && spec.size === 'Custom') {
          spec.size = spec.customSize;
        }
      });

      console.log(newSpecifications)

      const response = await auth.authFetch(`${ApiConfig.add_product_inventory}`, {
        method: "POST",
        data: JSON.stringify(newSpecifications),
      });
      
      if (response.status === 200) {
        toast.success("Inventory updated successfully.");
        setTimeout(() => {
          navigate(`/admin/products`);
        }, 2000);
      }
    }
    catch (error) {
      toast.error("Error updating inventory:", error);
    } finally {
      setLoading(false);
    }
  }

  if(!product || product === null) return (<CircularProgress/>);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer/>
      <div className="w-full bg-white shadow-md rounded-lg p-6 mt-4">
        <div className="flex flex-row mb-4">
          <img src={product?.productImages[0].url} alt={product.name} className="w-32 h-32 object-contain rounded-md bg-gray-100" />
          <div className="flex flex-col ml-4">
            <h2 className="text-xl font-semibold mb-4">Inventory for "{product.name}"</h2>
            <p className="text-lg font-light">Add inventory for different sizes and colors of the product.</p>
            <p>Total variants: {specifications.length}</p>
          </div>
        </div>
        {specifications.map((_, index) => (
          <div key={index} className="mb-4">
            <ProductSpecification
              key={index}
              index={index + 1}
              sizes={sizes}
              colors={colors}
              selectedColor={specifications[index].color}
              selectedSize={specifications[index].size}
              customSize={specifications[index].customSize}
              stock={specifications[index].stock}
              onChange={(key, value) => {
                const newSpecifications = [...specifications];
                newSpecifications[index][key] = value;
                setSpecifications(newSpecifications);
              }}
            />
          </div>
        ))}
        <div className="flex flex-row w-full justify-between">
          <button
            onClick={handleAdd}
            className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Add Inventory
          </button>
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Save changes
          </button>

        </div>
        <div className="w-full flex justify-center">
          {loading && <CircularProgress />}
        </div>
      </div>
    </div>
  );
};

export default AddProductInventory;