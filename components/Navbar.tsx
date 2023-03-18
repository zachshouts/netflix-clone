import { useCallback, useState, useEffect } from 'react';
import { NavbarItem, MobileMenu, AccountMenu } from '@/components';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [ mobileMenuVisible, setMobileMenuVisible ] = useState(false);
  const [ accountMenuVisible, setAccountMenuVisible ] = useState(false);
  const [ showBackground, setShowBackground ] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuVisible((currentValue) => !currentValue);
  }, []);
  
  const toggleAccountMenu = useCallback(() => {
    setAccountMenuVisible((currentValue) => !currentValue);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${ showBackground ? 'bg-zinc-900 bg-opacity-90' : '' }`}>
        <img src='/images/logo.png' alt='Netflix Logo' className='h-4 lg:h-7' />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label='Home' />
          <NavbarItem label='TV Shows' />
          <NavbarItem label='Movies' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by Languages' />
        </div>
        <div className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative' onClick={toggleMobileMenu}>
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown className={`text-white transition ${mobileMenuVisible ? 'rotate-180': 'rotate-0'}`} />
          <MobileMenu visible={mobileMenuVisible}/>
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsBell />
          </div>
          <div className='flex flex-row items-center gap-2 cursor-pointer relative' onClick={toggleAccountMenu}>
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <img src='/images/default-blue.png' alt='Profile Picture' />
            </div>
            <BsChevronDown className={`text-white transition ${accountMenuVisible ? 'rotate-180': 'rotate-0'}`} />
            <AccountMenu visible={accountMenuVisible}/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;