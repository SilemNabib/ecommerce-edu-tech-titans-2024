import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ProductsList from "../../../Components/ProductsList";
import SearchBar from "../../../Components/SearchBar";
import Sidebar from "../../../Components/Sidebar";

const ProductsManagement = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen">            
            <Sidebar />
            <div className="flex-1 overflow-y-auto m-4 md:m-8">
                <div className="flex justify-center items-center p-4 sticky top-0 bg-white z-10">
                    <div className="relative flex-grow lg:border-2 lg:rounded-lg">
                        <SearchBar className="w-full" />
                        <MagnifyingGlassIcon className="text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 lg:block hidden" />
                    </div>
                    <Link to="/admin/products/add" className="ml-4">
                        <button className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg">
                            Create New Product
                        </button>
                    </Link>
                </div>
                <ProductsList />
            </div>
        </div>
    );
}

export default ProductsManagement;