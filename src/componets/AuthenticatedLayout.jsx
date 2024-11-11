import { Navigate, Outlet } from "react-router-dom";
import Container from "./Container";
import SidebarCm from "./Sidebar";
import Header from "./Header";
import { useAuthStore } from "../store/adminstore";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";

const AuthenticatedLayout = () => {
  const { checkAuth, isAuthenticated,isCheckingAuth } = useAuthStore(); 

  useEffect(() => {
    // to check loged in or not
    checkAuth();
  }, [checkAuth]);

  // loading
  if (isCheckingAuth) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Spinner color="warning" size={54}/>
    </div>; 
  }

  // redirect to login if not authenticated after the check
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  return (
    <>
      {isAuthenticated && (
        <div className="w-full h-screen flex overflow-hidden">
          <SidebarCm />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4">
              <Container>
                <Outlet />
              </Container>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthenticatedLayout;
