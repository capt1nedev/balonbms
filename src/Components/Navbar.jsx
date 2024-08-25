import { HashLink } from 'react-router-hash-link';
import { useContext, useEffect, useState } from 'react';
import { ActiveSectionContext } from './ActiveSectionContext';
import { NavLink } from 'react-router-dom';

const Navbar = ({ containerStyles }) => {
  const [ActiveTab, setActiveTab] = useState();

  const { activeSection, setActiveSection } = useContext(ActiveSectionContext);

  const isActive = (hash) => activeSection === hash;

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash || '#home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setActiveSection]);

  return (
    <nav className={containerStyles}>
      {/* {['home', 'about', 'services', 'track-request', 'location'].map((section) => (
        <HashLink
          key={section}
          smooth
          to={`/#${section}`}
          onClick={() => setActiveSection(`#${section}`)}
          className={isActive(`#${section}`) ? 'text-green-400 text-sm font-semibold flex-1 border-b-2 border-b-green-400' : 'text-sm font-semibold transform hover:scale-110'}
        >
          <div className='p-2 flex items-center justify-center gap-1'>
            {section.toUpperCase().replace('-', ' ')}
          </div>
        </HashLink>

      ))} */}

      <NavLink to={'/pages/home'}>
        {({isActive}) => (
          <button className={`${isActive ? 'text-green-400 text-sm font-semibold flex-1 border-b-2 border-b-green-400' : 'hover:text-green-500'} p-2`}>
            Home
          </button>
        )}
      </NavLink>

      <NavLink to={'/pages/about'}>
        {({isActive}) => (
          <button className={`${isActive ? 'text-green-400 text-sm font-semibold flex-1 border-b-2 border-b-green-400' : 'hover:text-green-500'} p-2`}>
            About
          </button>
        )}
      </NavLink>

      <NavLink to={'/pages/services'}>
        {({isActive}) => (
          <button className={`${isActive ? 'text-green-400 text-sm font-semibold flex-1 border-b-2 border-b-green-400' : 'hover:text-green-500'} p-2`}>
            Services
          </button>
        )}
      </NavLink>

      <NavLink to={'/pages-faq'}>
        {({isActive}) => (
          <button className={`${isActive ? 'text-green-400 text-sm font-semibold flex-1 border-b-2 border-b-green-400' : 'hover:text-green-500'} p-2`}>
            FAQ
          </button>
        )}
      </NavLink>

      <NavLink to={'/pages/track-request'}>
        {({isActive}) => (
          <button className={`${isActive ? 'text-green-400 text-sm font-semibold flex-1 border-b-2 border-b-green-400' : 'hover:text-green-500'} p-2`}>
            Track Request
          </button>
        )}
      </NavLink>

    </nav>
  );
};

export default Navbar;
