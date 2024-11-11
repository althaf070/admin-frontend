
import { useEffect } from "react"
import { Card, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";
const Userpage = () => {
  const {fetchuser,users,isLoading,error} = useUserStore()
    useEffect(() => {
    fetchuser()
    }, [])
    if (isLoading) {
      return (
        <div className="flex justify-center w-full min-h-screen items-center">
          <Spinner color="info" />
        </div>
      );
    }
  
    if (error) {
      return <div className="text-red-500 text-center">Error: {error}</div>;
    }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {users?.length >0 ?(
            users.map((user) => (
                <Link key={user._id} to={`/admin/userdetail/${user._id}`} className="w-full">
            <Card className="p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full w-full">
              <div className="mb-3">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize">
                  {user.username}
                </h5>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 break-words">
                  {user.email}
                </p>
                <p className="text-sm text-gray-600">Phone: {user.phoneNumber}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-800 font-medium">Booked Services:{user?.appointments?.length} </span>
              </div>
            </Card>
          </Link>
            ))
        ):"No users found"}
    </div>
  )
}

export default Userpage