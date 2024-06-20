import { Bars3Icon } from '@heroicons/react/24/outline';

const SidebarHeader = ({ isOpen, toggleSidebar }) => (
  <div className="flex justify-between items-center">
    {isOpen && <h2 className="text-xl font-bold text-white">Admin Panel</h2>}
    <button onClick={toggleSidebar}>
      <Bars3Icon className="w-6 h-6 text-white" />
    </button>
  </div>
);

export default SidebarHeader;
