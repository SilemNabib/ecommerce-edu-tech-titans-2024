import { Bars3Icon } from '@heroicons/react/24/outline';

/**
 * SidebarHeader component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Flag indicating whether the sidebar is open or not.
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar.
 * @returns {JSX.Element} The rendered SidebarHeader component.
 */
const SidebarHeader = ({ isOpen, toggleSidebar }) => (
  <div className="flex justify-between items-center">
    {isOpen && <h2 className="text-xl font-bold text-white">Admin Panel</h2>}
    <button onClick={toggleSidebar}>
      <Bars3Icon className="w-6 h-6 text-white" />
    </button>
  </div>
);

export default SidebarHeader;
