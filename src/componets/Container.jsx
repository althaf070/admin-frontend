/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSideBar } from "../store/sidebar";
import { cn } from "../lib/utils";

const Container = ({ children }) => {
  const { collapsed, onCollapsed, onExpanded } = useSideBar((state) => state);
  const matches = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    if (matches) {
      onCollapsed();
    } else {
      onExpanded();
    }
  }, [matches, onCollapsed, onExpanded]);

  return (
    <div className={cn("mt-2 ml-20 transition-all", !collapsed && "ml-56")}>
      {children}
    </div>
  );
};

export default Container;
