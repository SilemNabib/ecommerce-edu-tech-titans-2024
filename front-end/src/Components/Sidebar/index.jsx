import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import SidebarContent from './SidebarContent';
import SidebarHeader from './SidebarHeader';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div className={`${isOpen ? 'w-60' : 'w-16'} hidden md:flex flex-col h-screen p-3 bg-black shadow transition-all duration-300`}>
        <SidebarHeader isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
        <SidebarContent isOpen={isOpen} />
      </div>

      {/* Sidebar small screens */}
      <div className="md:hidden flex items-center justify-between p-4 bg-black text-white w-full">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-75 z-50">
          <div className="flex flex-col h-screen p-3 bg-black shadow w-60">
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsOpen(false)} className="text-white">
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
            <SidebarContent isOpen={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
