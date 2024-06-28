import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../Context';
import { useAuth } from '../../Context/AuthContext';

/**
 * Renders the profile navigation component.
 *
 * @component
 * @param {Object} userInfo - The user information.
 * @returns {JSX.Element} The profile navigation component.
 */
const ProfileNavigation = ({ userInfo }) => {
    
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(GlobalContext);
  const auth = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    context.setLoading(true);
    auth.requestLogout();
    navigate('/');
    context.setLoading(false);
  };

  return (
    <nav className="w-65 p-4 mb-auto md:mb-0 mt-8 md:mr-8 shadow-lg bg-gray-200">
      <div className="relative w-60 h-40 overflow-hidden mb-4 mx-auto">
        <img
          src="/bootcamp-tech-titans-2024_ecommerce/assets/user_model.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 py-2 text-center w-full">
          <span className="text-white font-bold">Hi, {userInfo.firstName}</span>
        </div>
      </div>

      <ul>
        <li className="mb-2">
          <Link
            to="/information/profile"
            className={`text-black-700 hover:text-gray-900 ${isActive('/information/profile') ? 'font-bold' : 'hover:font-bold'}`}
          >
            Profile
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/order-history"
            className={`text-black-700 hover:text-gray-900 ${isActive('/order-history') ? 'font-bold' : 'hover:font-bold'}`}
          >
            Orders History
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/manage-profile"
            className={`text-black-700 hover:text-gray-900 ${isActive('/manage-profile') ? 'font-bold' : 'hover:font-bold'}`}
          >
            Manage Profile
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="text-black-700 hover:text-gray-900 hover:font-bold">
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileNavigation;