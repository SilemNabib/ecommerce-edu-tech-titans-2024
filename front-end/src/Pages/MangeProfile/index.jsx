import { useEffect, useState } from 'react';
import ProfileNavigation from '../../Components/ProfileNavigation';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';
import { toast, ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const ManageProfile = () => {
  const [editingField, setEditingField] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleInputChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const renderField = (label, field, type = "text", editable = true, editForm, onSave) => {
    const [loading, setLoading] = useState(false);

    return (
    <div className="flex justify-between items-center border-b p-4">
      <div className="flex-1">
        <label className="block font-bold" htmlFor={field}>
          {label}
        </label>
        {editingField === field ? (
          editForm
        ) : (
          <span>{field === 'password' ? '********' : userInfo[field]}</span>
        )}
      </div>
      {editable && (
        <div>
          { loading ? <CircularProgress /> : editingField === field ? (
            <button
              onClick={() =>{
                setLoading(true);
                onSave(setLoading);
              }}
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
};
  return (
    <div className="flex flex-row items-start p-8">
      <ToastContainer/>
      <ProfileNavigation userInfo={userInfo} />
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl ml-8">
        <h2 className="text-xl font-bold p-4 border-b">Manage My Account</h2>
        <div>
          {renderField("Name", "firstName", "text", false)}
          {renderField("Surname", "lastName", "text", false)}
          {renderField("Email", "email", "email", false)}

          {renderField("Phone", "phone", "tel", true, (
            <input
              type="tel"
              id="phone"
              value={userInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              className='border rounded-lg p-2'
            />),
            async (setLoading) => {
              try {
                const response = await auth.authFetch(ApiConfig.change_phone, {
                  method: "POST",
                  data: JSON.stringify({ newPhone: userInfo.phone }),
                });
                if(response.status === 200) {
                  setEditingField(null);
                  setLoading(false);
                  toast.success("Phone updated successfully");
                }else{
                  toast.error("Failed to update password", response.data.message);
                  setLoading(false);
                }
              } catch (error) {
                toast.error("Failed to update phone", error);
                setLoading(false);
              }
            }
          )}

          {renderField("Password", "password", "password", true,
            (<div className='flex flex-col w-2/4'>
              <input
              type="password"
              id="oldPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='border rounded-lg p-2 m-2'
              placeholder='Old Password'
              />
              <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className='border rounded-lg p-2 m-2'
              placeholder='New Password'
              />
              <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='border rounded-lg p-2 m-2'
              placeholder='Confirm Password'
              />
            </div>),
            async (setLoading) => {
              try {
                const response = await auth.authFetch(ApiConfig.change_password, {
                  method: "POST",
                  data: JSON.stringify({ oldPassword: password, newPassword: newPassword, confirmPassword: confirmPassword}),
                });
                if(response.status === 200) {
                  setEditingField(null);
                  setLoading(false);
                  toast.success("Password updated successfully");
                }else{
                  toast.error("Failed to update password", response.data.message);
                  setLoading(false);
                }
              } catch (error) {
                toast.error("Failed to update password", error);
                setLoading(false);
              }
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;