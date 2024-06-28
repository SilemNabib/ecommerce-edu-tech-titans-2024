import { CogIcon, HomeIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import SidebarItem from '../SiderItem';

const SidebarContent = ({ isOpen }) => {
  const auth = useAuth();

  const onLogout = () => {
    auth.requestLogout();
    window.location.href = "/bootcamp-tech-titans-2024_ecommerce/login";
  };

  return (<>
    <div className="flex-1 mt-5 space-y-3">
      <ul className="space-y-1 text-sm">
        <Link to="/admin/dashboard"><SidebarItem isOpen={isOpen} Icon={HomeIcon} label="Orders" /></Link>
        <Link to="/admin/products"><SidebarItem isOpen={isOpen} Icon={ShoppingCartIcon} label="Products" /></Link>
        <Link to="/admin/users"><SidebarItem isOpen={isOpen} Icon={UserIcon} label="Users" /></Link>
        <Link to="/admin/customize"><SidebarItem isOpen={isOpen} Icon={CogIcon} label="Customize" /></Link>
      </ul>
    </div>
    <div className="mt-auto p-2 space-x-4 flex items-center justify-self-end">
      <button onClick={onLogout}>
        <Logout className="w-6 h-6 text-gray-100" />
        {isOpen && <span className="text-gray-100">Logout</span>}
      </button>
    </div>
  </>
)};

export default SidebarContent;