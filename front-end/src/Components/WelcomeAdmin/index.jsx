import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

const WelcomeAdmin = () => {
  const [adminInfo, setAdminInfo] = useState({ firstName: '', lastName: '' });
  const auth = useAuth();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await auth.authFetch(ApiConfig.profile);
        const { firstName, lastName } = response.data;
        setAdminInfo({ firstName, lastName });
      } catch (error) {
        console.error("Failed to fetch admin profile", error);
      }
    };

    fetchAdminProfile();
  }, [auth]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, 👋 {adminInfo.firstName} {adminInfo.lastName}</h2>        
        <p className="mt-2 text-gray-600">You are in the Admin Dashboard. Here are some of the things you can do:</p>
            <ul className="list-disc pl-5 mt-4 text-gray-600">
                <li><strong>Manage Orders:</strong> View and update orders.</li>
                <li><strong>Upload Products:</strong> Add new products to the store.</li>
                <li><strong>Users List:</strong> View all registered users.</li>
                <li><strong>Customize Banners:</strong> Update the homepage banners to highlight promotions or new products.</li>
            </ul>
          <div className="mt-6">
            <p className="text-gray-600">Use the navigation menu to access these features. If you need any assistance, please reach out to support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAdmin;