const SidebarItem = ({ isOpen, Icon, label }) => (
    <li className="rounded-sm">
      <a href="#" className="flex items-center p-2 space-x-3 rounded-md text-gray-100 hover:bg-gray-700">
        <Icon className="w-6 h-6" />
        {isOpen && <span>{label}</span>}
      </a>
    </li>
  );
  
  export default SidebarItem;
  