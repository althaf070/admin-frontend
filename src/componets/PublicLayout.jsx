import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/adminstore"
import { useEffect } from "react"
import { Spinner } from "flowbite-react"

const PublicLayout = () => {
    const { checkAuth, isAuthenticated,isCheckingAuth } = useAuthStore(); 

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);
  
    // loading
    if (isCheckingAuth) {
      return <div className="w-full h-screen flex justify-center items-center">
        <Spinner color="warning" size={54}/>
      </div>; 
    }
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  return (
    <>
  <Outlet/>   
    </>
  )
}

export default PublicLayout