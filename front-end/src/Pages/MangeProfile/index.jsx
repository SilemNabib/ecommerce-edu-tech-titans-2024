import { useEffect, useState } from 'react';
import ProfileNavigation from '../../Components/ProfileNavigation';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

const ManageProfile = () => {
  const [editingField, setEditingField] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [password, setPassword] = useState(''); 
  const auth = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await auth.authFetch(ApiConfig.profile);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, [auth]);

  const saveChanges = async (field) => {
    try {
      const response = await auth.authFetch(ApiConfig.profile, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(field === 'password' ? { password } : { [field]: userInfo[field] }),
      });

      if (response.ok) {
        setEditingField(null);
        setPassword('');
      } else {
        console.error("Failed to save changes", response.statusText);
      }
    } catch (error) {
      console.error("Error saving changes", error);
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const renderField = (label, field, type = "text", editable = true) => (
    <div className="flex justify-between items-center border-b p-4">
      <div className="flex-1">
        <label className="block font-bold" htmlFor={field}>
          {label}
        </label>
        {editingField === field ? (
          <input
            type={type}
            id={field}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border rounded-md p-1"
            value={field === 'password' ? password : userInfo[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        ) : (
          <span>{field === 'password' ? '********' : userInfo[field]}</span>
        )}
      </div>
      {editable && (
        <div>
          {editingField === field ? (
            <button
              onClick={() => saveChanges(field)}
              className="bg-black text-white py-2 px-4 rounded">
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditingField(field)}
              className="bg-black text-white py-2 px-4 rounded">
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-row items-start p-8">
      <ProfileNavigation userInfo={userInfo} />
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl ml-8">
        <h2 className="text-xl font-bold p-4 border-b">Manage My Account</h2>
        <div>
          {renderField("Name", "firstName", "text", false)}
          {renderField("Surname", "lastName", "text", false)}
          {renderField("Email", "email", "email")}
          {renderField("Phone", "phone", "tel")}
          {renderField("Password", "password", "password")}
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;