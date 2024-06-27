import { useEffect, useState } from 'react';
import ProfileNavigation from '../../Components/ProfileNavigation';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

/**
 * Renders the profile page with user information.
 *
 * @returns {JSX.Element} The profile page component.
 */
const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    registrationDate: '',
  });
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

  return (
    <div className="flex flex-col md:flex-row items-start p-8">
      <ProfileNavigation userInfo={userInfo} />      
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row mt-8">
        <div className="flex-1 p-4 flex flex-col justify-between">
          <section>
            <h2 className="text-xl font-bold mb-4">PERSONAL INFORMATION</h2>
            <div>
              <h3 className="text-lg font-bold mb-2">IDENTIFICATION DATA</h3>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold" htmlFor="firstName">
                    Name
                  </label>
                  <span>{userInfo.firstName}</span>
                </div>
                <div>
                  <label className="block font-bold" htmlFor="lastName">
                    Surname
                  </label>
                  <span>{userInfo.lastName}</span>
                </div>
                <div>
                  <label className="block font-bold" htmlFor="lastName">
                    Email
                  </label>
                  <span>{userInfo.email}</span>
                </div>
                <div>
                  <label className="block font-bold" htmlFor="phone">
                    Phone
                  </label>
                  <span>{userInfo.phone}</span>
                </div>
                <div>
                  <label className="block font-bold" htmlFor="registrationDate">
                    Registration Date
                  </label>
                  <span>{new Date(userInfo.registrationDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
