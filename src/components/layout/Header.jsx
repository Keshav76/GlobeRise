import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FaGlobe, FaBell, FaWrench, FaCheck, FaChevronDown, FaSearch } from 'react-icons/fa';
import Button from '../common/Button';

const Header = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="shadow-sm px-6 py-4" style={{ backgroundColor: '#071251', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 bg-[#141E5A] border-gray-100 text-white rounded-lg focus:outline-none focus:ring-2 placeholder-gray-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-300 hover:text-[#00ADB5] transition-colors">
            <FaGlobe className="w-5 h-5" />
          </button>

          <button className="relative p-2 text-gray-300 hover:text-[#00ADB5] transition-colors">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 bg-[#ef4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              9+
            </span>
          </button>

          <button className="p-2 text-gray-300 hover:text-[#00ADB5] transition-colors">
            <FaWrench className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-[#00ADB5] rounded-full flex items-center justify-center">
                <FaCheck className="w-4 h-4 text-white" />
              </div>
              <span>{user?.name || user?.username || 'admin'}</span>
              <FaChevronDown className="w-4 h-4" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-300 py-1 z-50">
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-[#ef4444] hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;

