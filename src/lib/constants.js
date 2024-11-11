import { HiOutlineHome, HiOutlineUserGroup, HiOutlineClipboardList, HiOutlineBriefcase, HiOutlineStar, HiOutlineDocumentReport, HiOutlineCog, HiClipboard } from "react-icons/hi";

const sidebarLinks = [
  {
    name: "Dashboard",
    icon: HiOutlineHome , // Using the react-icons component
    path: "/",
  },
  {
    name: "Users",
    icon: HiOutlineUserGroup,
    path: "/admin/users",
  },
  {
    name: "Providers",
    icon: HiClipboard,
    path: "/admin/providers",
  },
  {
    name: "Services",
    icon: HiOutlineBriefcase ,
    path: "/admin/services",
  },
  {
    name: "Bookings",
    icon: HiOutlineClipboardList,
    path: "/admin/bookings",
  },
  {
    name: "Reviews",
    icon: HiOutlineStar,
    path: "/admin/reviews",
  },
  {
    name: "Reports",
    icon: HiOutlineDocumentReport ,
    path: "/admin/logs",
  },
  {
    name: "Settings",
    icon: HiOutlineCog ,
    path: "/admin/settings",
  },
];

export default sidebarLinks;
