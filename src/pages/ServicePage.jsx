import { Spinner,Card, Button } from "flowbite-react";
import { useServicesStore } from "../store/serviceStore"
import { useEffect } from "react";

const ServicePage = () => {
const {services,isLoading,error,fetchServices,deleteServices} = useServicesStore()

const handleDelete =async (id,pid) =>{
try {
  deleteServices(id,pid)
} catch (error) {
  console.log(error);
  
}
}

useEffect(() => {
  fetchServices()
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
    {services?.length >0 ?(
        services.map((service) => (
        <Card className="p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full w-full" key={service._id}>
          <div className="mb-3">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize">
              {service.servicename}
            </h5>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 break-words">
            ₹{service.price}
            </p>
            <p className="text-sm text-gray-600">Description: {service.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-800 font-medium">Provider:{service.providerId.username} </span>
          </div>
          <span className="text-sm text-gray-800 font-medium">Created At:{new Date(service.createdAt).toDateString()} </span>
          <Button color="failure" onClick={()=> handleDelete(service._id,service.providerId._id)}>Delete</Button>
        </Card>
        ))
    ):"No users found"}
</div>
  )
}

export default ServicePage