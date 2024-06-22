import { useEffect, useState } from 'react';
import ProfileNavigation from '../../Components/ProfileNavigation';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

const ManageProfile = () => {
  const [editing, setEditing] = useState(false);
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

  const saveChanges = async () => {
    try {
      const response = await auth.authFetch(ApiConfig.profile, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userInfo, password }),
      });

      if (response.ok) {
        setEditing(false);
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

  const renderInputField = (label, field, type = "text") => (
    <div>
      <label className="block font-bold" htmlFor={field}>
        {label}
      </label>
      {editing ? (
        <input
          type={type}
          id={field}
          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border rounded-md p-1"
          value={userInfo[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      ) : (
        <span>{userInfo[field]}</span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row items-start p-8">
      <ProfileNavigation userInfo={userInfo} />
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row mt-8">
        <div className="flex-1 p-4 flex flex-col justify-between">
          <section>
            <h2 className="text-xl font-bold mb-4">PERSONAL INFORMATION</h2>
            <div className="mt-4 grid gap-4">
              {renderInputField("Name", "firstName")}
              {renderInputField("Surname", "lastName")}
              {renderInputField("Email", "email", "email")}
              {renderInputField("Phone", "phone", "tel")}
            </div>
          </section>
          <section>
            <label className="block font-bold mt-4">Password:</label>
            {editing ? (
              <input
                type="password"
                id="password"
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border rounded-md p-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              <span>********</span>
            )}
          </section>
          <div className="mt-4">
            {editing ? (
              <button onClick={saveChanges} className="bg-black hover:font-bold text-white py-2 px-4 rounded">
                Save Changes
              </button>
            ) : (
              <button onClick={() => setEditing(true)} className="bg-black hover:font-bold text-white py-2 px-4 rounded">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;