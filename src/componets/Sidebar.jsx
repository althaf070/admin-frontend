import {
  HiLogout,
  HiOutlineArrowLeft,
  HiOutlineArrowRight
} from "react-icons/hi";
import { useSideBar } from "../store/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "flowbite-react";
import sidebarLinks from "../lib/constants";
import { useAuthStore } from "../store/adminstore";

const SidebarCm = () => {
  const { collapsed, onCollapsed, onExpanded } = useSideBar();
  const {logout} = useAuthStore()
  const location = useLocation();
  return (
    <aside
      className={`bg-gray-800 w-48 fixed h-full"
      ${collapsed && "w-[70px]"}`}
    >
      <div className="ml-3 mt-24">
        {collapsed ? (
          <Button
            size={"icon"}
            color="cyan"
            onClick={onExpanded}
            className="hidden md:block"
          >
            <HiOutlineArrowRight />
          </Button>
        ) : (
          <>
            <Button size={"icon"} color="cyan" onClick={onCollapsed}>
              <HiOutlineArrowLeft />
            </Button>
          </>
        )}
      </div>
      <nav className="mt-5">
        {sidebarLinks.map((link) => (
          <div
            key={link.name}
            className={`flex items-center gap-2 p-2 text-silver rounded-md"
              ${collapsed && "justify-center"}`}
          >
            {/* Show icon only if collapsed, else show icon with title */}
            {collapsed ? (
              <Link to={link.path}>
                <link.icon
                  className={`text-lg h-4 w-4 ${
                    location.pathname == link.path &&
                    "bg-slate-700 p-1 rounded-lg shadow-lg"
                  }`}
                />
              </Link>
            ) : (
              <>
                <Link
                  to={link.path}
                  className={`flex gap-2
                    ${
                      location.pathname == link.path &&
                      "bg-slate-700 p-2 rounded-lg shadow-lg"
                    }`}
                >
                  <link.icon className="text-lg" />
                  <span>{link.name}</span>
                </Link>
              </>
            )}
          </div>
        ))}
        <div
          className={`flex items-center gap-2 p-2 text-silver rounded-md"
              ${collapsed && "justify-center"}`}
        >
          <Button color="red" size="xs" onClick={logout}>
            <HiLogout />
          </Button>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarCm;
