import { UserIcon } from '@heroicons/react/24/outline';
import { TruckIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationCategories } from '../../config/NavigationCategories.js';
import SearchBar from '../SearchBar';
import './styles.css';
'@heroicons/react/24/solid';

import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Logout } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';
import { Fragment, useContext } from 'react';
import { GlobalContext } from '../../Context';
import { useAuth } from '../../Context/AuthContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Navigation component for the website.
 * 
 * @returns {JSX.Element} The rendered Navigation component.
 */
export default function Navigation() {
  const context = useContext(GlobalContext);
  const auth = useAuth();
  const [open, setOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false);
  const [executeSearch, setExecuteSearch] = useState(null);

  const handleSearchCallback = useCallback((searchFunction) => {
    setExecuteSearch(() => searchFunction);
  }, []);

  const handleSearchClick = () => {
    if (showSearch && executeSearch) {
      executeSearch();
    } else {
      setShowSearch(!showSearch);
    }
  };

  const onLogout = () => {
    context.setLoading(true);
    auth.requestLogout();
    window.location.reload();
    context.setLoading(false);
  }

  return (
    <div>
      <div className='bg-white'>
      {/* Mobile menu */}
      <Transition show={open}>
        <Dialog className='relative z-40 lg:hidden' onClose={setOpen}>
          <TransitionChild
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </TransitionChild>

          <div className='fixed inset-0 z-40 flex'>
            <TransitionChild
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <DialogPanel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
                <div className='flex px-4 pb-2 pt-5'>
                  <button
                    type='button'
                    className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                    onClick={() => setOpen(false)}
                  >
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Links */}
                <TabGroup className='mt-2'>
                  <div className='border-b border-gray-200'>
                    <TabList className='-mb-px flex space-x-8 px-4'>                
                      {NavigationCategories.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-b-2 border-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-xl font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </TabList>
                  </div>
                  <TabPanels as={Fragment}>
                    {NavigationCategories.categories.map((category) => (
                      <TabPanel key={category.name} className='space-y-10 px-4 pb-8 pt-10'>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className='font-medium text-gray-900'>
                              {section.name}
                            </p>
                            <ul
                              role='list'
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className='mt-6 flex flex-col space-y-6'
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className='flow-root'>
                                  <a href={item.href} className='-m-2 block p-2 text-gray-500'>
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </TabPanel>
                    ))}
                  </TabPanels>
                </TabGroup>

                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                  {NavigationCategories.pages.map((page) => (
                    <div key={page.name} className='flow-root'>
                      <a href={page.href} className='-m-2 block p-2 font-medium text-gray-900'>
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                {/* Sign in / Create account */}
                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                  <div className='flow-root'>
                    <NavLink to='/login' className='-m-2 block p-2 font-medium text-gray-900'>
                      Sign in
                    </NavLink>
                  </div>
                  <div className='flow-root'>
                    <NavLink to='/email-verification' className='-m-2 block p-2 font-medium text-gray-900'>
                      Create account
                    </NavLink>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <header className='relative bg-white'>
      <p className='flex h-10 items-center justify-center bg-black px-4 text-sm sm:text-base md:text-lg font-medium text-white sm:px-6 lg:px-8'>
      <TruckIcon className='h-6 w-6 mr-2'/> Shop now and enjoy free shipping on all your orders!
      </p>

        <nav aria-label='Top' className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              <button
                type='button'
                className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
                onClick={() => setOpen(true)}
              >
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Open menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>

              {/* Logo */}
              <div className='h-6 w-6 items-center md:h-10 md:w-10 ml-4 flex lg:ml-0 lg:block'>
                <a href='/'>
                  <span className='sr-only'>Sunflowers</span>
                  <img
                    className='h-8 w-auto'
                    src='/assets/sunflower.svg'
                    alt=''
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className='navigation hidden lg:ml-8 lg:block lg:self-stretch' style={{ zIndex: 1000 }}>
                <div className='flex h-full space-x-8'>
                  {NavigationCategories.categories.map((category) => (
                    <Popover key={category.name} className='flex'>
                      {({ open }) => (
                        <>
                          <div className='relative flex'>
                            <PopoverButton
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-lg font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </PopoverButton>
                          </div>

                          <Transition
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                          <PopoverPanel className='absolute inset-x-0 top-full text-sm text-gray-500'>
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div className='absolute inset-0 top-1/2 bg-white shadow' aria-hidden='true' />
                            <div className='relative bg-white'>
                              <div className='mx-auto max-w-7xl px-8'>
                                <div className='grid grid-cols-2 gap-x-8 gap-y-10 py-16'>
                                  <div className='row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm'>
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p id={`${section.name}-heading`} className='font-medium text-gray-900'>
                                          {section.name}
                                        </p>
                                        <ul
                                          role='list'
                                          aria-labelledby={`${section.name}-heading`}
                                          className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'
                                        >
                                          {section.items.map((item) => (
                                            <li key={item.name} className='flex'>
                                              <a href={item.href} className='hover:text-gray-800'>
                                                {item.name}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {NavigationCategories.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className='flex items-center text-lg font-medium text-gray-700 hover:text-gray-800'
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              <div className='ml-auto flex items-center'>
              
              {auth.isAuthenticated() && (
                <div className="flex flex-1 items-center justify-end space-x-6 mr-3">
                  <NavLink onClick={onLogout} className="text-gray-400 hover:text-gray-500 p-2 sm:p-0">
                    <Logout className="h-6 w-6" />
                  </NavLink>
                </div>
              )}
                
              {auth.isAuthenticated() ? (
                <div className='flex flex-1 items-center justify-end space-x-6'>
                  <NavLink to='/information/profile' className='text-gray-400 hover:text-gray-500 p-2 sm:p-0'>
                    <UserIcon className='h-6 w-6' />
                  </NavLink>
                </div>
              ) : (
                <div className='flex flex-1 items-center justify-end space-x-6'>
                  <NavLink to='/login' className='text-gray-400 hover:text-gray-500 p-2 sm:p-0'>
                    <UserIcon className='h-6 w-6' />
                  </NavLink>
                </div>
              )}

              {/* Search */}
              <div className='flex items-center lg:ml-6'>
                <button onClick={handleSearchClick} className='p-2 text-gray-400 hover:text-gray-500 lg:block hidden'>
                  <span className='sr-only'>Search</span>
                  <MagnifyingGlassIcon className='h-6 w-6' aria-hidden='true' />
                </button>
                {showSearch && (
                  <SearchBar 
                    className='p-1 ml-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 md:w-full sm:w-1/2' 
                    onSearch={handleSearchCallback}
                  />
                )}
              </div>

              {/* Cart */}
              <div className='ml-4 flow-root lg:ml-6'>
                <a href='/cart' className='group -m-2 flex items-center p-2'>

                  <ShoppingBagIcon
                    className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  <span className='ml-2 text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-800 hidden md:block'>0</span>
                  <span className='sr-only'>items in cart, view bag</span>
                </a>
              </div>
              
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    {context.loading && <LinearProgress />}
    </div>
  );
}