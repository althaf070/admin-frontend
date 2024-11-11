import { HiOutlineMenu, HiBell, HiUserCircle, HiOutlineCog } from "react-icons/hi";
import { useState } from "react";
import { useAuthStore } from "../store/adminstore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user} = useAuthStore()
  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-lg top-0 w-full h-20 z-20">
      {/* Left: Logo / App Name */}
      <div className="flex items-center">
        <button
          className="lg:hidden text-2xl mr-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <HiOutlineMenu />
        </button>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Right: Notification, Settings, Profile */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <HiBell className="text-2xl cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>
        <HiOutlineCog className="text-2xl cursor-pointer" />
        <div className="flex items-center space-x-2">
          <div className="hidden lg:block">
            <span className="text-sm">{user?.username}</span>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-14 left-0 w-full bg-gray-700 shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            <button className="flex items-center">
              <HiBell className="text-xl mr-2" />
              Notifications
            </button>
            <button className="flex items-center">
              <HiOutlineCog className="text-xl mr-2" />
              Settings
            </button>
            <button className="flex items-center">
              <HiUserCircle className="text-xl mr-2" />
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
