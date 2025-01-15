import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { MdMenu, MdClose } from 'react-icons/md';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 915);
  const [barangayName, setBarangayName] = useState('');
  const [barangayLogo, setBarangayLogo] = useState('');
  const navbarRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setMenuOpened(!menuOpened);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMenuOpened(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 915);
      if (window.innerWidth > 915) {
        setMenuOpened(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchBarangayInfo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/barangay-info`);
        if (response.ok) {
          const data = await response.json();
          setBarangayLogo(data.logoUrl || '');
          setBarangayName(data.name || 'Balon Anito');
        } else {
          console.error('Failed to fetch barangay info');
        }
      } catch (error) {
        console.error('Error fetching barangay info:', error);
      }
    };

    fetchBarangayInfo();
  }, []);

  return (
    <header className="bg-white fixed top-0 left-0 w-screen h-fit max-w-screen-xxl mx-auto px-10 z-50 border-b-2">
      <div className="flex justify-between items-center py-3">
        <div className="flex items-center justify-center gap-x-1">
          <img src={barangayLogo || '/default-logo.png'} alt="Logo" className="h-10" />
          <p className="text-xl text-green-700">{barangayName || 'Barangay Name'}</p>
        </div>

        {/* Desktop Navbar */}
        {!isMobile && (
          <Navbar containerStyles="flex gap-x-3 xl:gap-x-10 medium-15" />
        )}

        {/* Mobile Navbar */}
        {isMobile && (
          <>
            <div
              ref={navbarRef}
              className={`${
                menuOpened
                  ? 'flex items-center text-center flex-col gap-y-5 fixed top-20 right-3 p-5 bg-white rounded-xl shadow-xl w-60 medium-16 transition-all duration-300'
                  : 'hidden'
              }`}
            >
              <Navbar containerStyles="flex flex-col gap-y-5" />
            </div>

            {/* Menu Buttons */}
            {!menuOpened ? (
              <MdMenu
                onClick={toggleMenu}
                aria-label="Open menu"
                className="cursor-pointer hover:text-green-700 hover:ring-orange-400 mr-2 p-1 h-8 w-8 rounded-full"
              />
            ) : (
              <MdClose
                onClick={toggleMenu}
                aria-label="Close menu"
                className="cursor-pointer hover:text-green-700 hover:ring-orange-400 mr-2 p-1 h-8 w-8 rounded-full"
              />
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
