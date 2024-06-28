/**
 * SidebarItem component represents an item in the sidebar menu.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the sidebar is open or not.
 * @param {React.ElementType} props.Icon - The icon component to be displayed.
 * @param {string} props.label - The label text for the sidebar item.
 * @returns {JSX.Element} The rendered SidebarItem component.
 */
const SidebarItem = ({ isOpen, Icon, label }) => (
    <li className="rounded-sm">
      <a href="#" className="flex items-center p-2 space-x-3 rounded-md text-gray-100 hover:bg-gray-700">
        <Icon className="w-6 h-6" />
        {isOpen && <span>{label}</span>}
      </a>
    </li>
  );
  
  export default SidebarItem;
  