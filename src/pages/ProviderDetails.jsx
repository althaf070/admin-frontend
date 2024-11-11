import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../lib/serverurl";
import { Badge, Card, Button, Table, ButtonGroup,Toast } from "flowbite-react";
import { HiExclamation, HiX } from "react-icons/hi";
import { useProviderStore } from "../store/providerStore";
const ProviderDetails = () => {
  const { pid } = useParams();
  const navigate = useNavigate()
  const [provider, setProvider] = useState(null);
  const {deleteProvider} = useProviderStore()
  const fetchProviderDetails = async () => {
    const response = await axios.get(`${SERVER_URL}/provider/${pid}`);
    setProvider(response.data.provider);
  };
  const verifyProvider = async (id) => {
    const response = await axios.patch(`${SERVER_URL}/verify/${id}`)
    setProvider(response.data.provider);
    fetchProviderDetails()
  }
  const handleDelete = async (id)=> {
    try {
      await deleteProvider(id);
        <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Item has been deleted.</div>
        <Toast.Toggle />
      </Toast>
      navigate('/admin/providers')
      
    } catch (error) {
      console.log(error);
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
          <HiExclamation className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{error.message}</div>
        <Toast.Toggle />
      </Toast>
      
    }
  }
  useEffect(() => {
    fetchProviderDetails();
  }, [pid]);

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-12 px-4 md:px-8">
      {/* Provider Details Card */}
      <Card className="w-full shadow-md rounded-lg col-span-11 lg:col-span-5 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">{provider?.username}</h1>
          <p className="text-gray-500 mb-2">{provider?.email}</p>
          <Badge color={provider?.verified ? "success" : "warning"} className="mb-4">
            {provider?.verified ? "Verified" : "Not Verified"}
          </Badge>
        </div>

        <div className="mt-4 text-gray-700 space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Address:</span>
            <span>{provider?.address || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phone Number:</span>
            <span>{provider?.phoneNumber || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Location:</span>
            <span>{provider?.district || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Services:</span>
            <span>{provider?.services.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Bookings:</span>
            <span>{provider?.appointments.length || 0}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          {!provider?.verified && (
            <>
              <Button color="success" onClick={()=>verifyProvider(provider._id)}>Approve</Button>
            </>
          )}
           <Button color="failure" onClick={()=>handleDelete(provider._id)}>Delete</Button>
        </div>
      </Card>

      {/* Services Section */}
      <div className="w-full lg:col-span-7 col-span-12 mt-6 lg:mt-0">
        <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">{provider?.services?.length > 0&&" Services Offered"}</h2>
        {provider?.services?.length > 0 ? (
          provider.services.map((service) => (
            <Card key={service._id} className="mb-4 p-4 shadow-md rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 capitalize">{service.servicename}</h3>
              <p className="text-gray-600 mt-1">Description: {service.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Price: ${service.price}</span>
                <Badge color={service.available ? "success" : "failure"}>
                  {service.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center">No services added for this provider</p>
        )}
      </div>

      {/* Appointments Section */}
      <div className="col-span-12 mt-8">
        <h2 className="text-xl font-semibold mb-4 text-center">{provider?.appointments.length > 0 && "Current Bookings"}</h2>
        {provider?.verified && provider?.appointments.length>0 && (
          <div className="overflow-x-auto">
            <Table className="min-w-full text-sm text-gray-500">
              <Table.Head className="bg-gray-100">
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Service</Table.HeadCell>
                <Table.HeadCell>Scheduled Date</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {provider.appointments.map((booking) => (
                  <Table.Row key={booking._id} className="bg-white">
                    <Table.Cell className="font-medium text-gray-900">{booking.users.username}</Table.Cell>
                    <Table.Cell>{booking.service.servicename}</Table.Cell>
                    <Table.Cell>{new Date(booking.appointmentDate).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Badge color={booking.status === "pending" ? "warning" : "success"}>
                        {booking.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>${booking.service.price}</Table.Cell>
                    <Table.Cell>
                      <ButtonGroup>
                        <Button size="sm" color="info" className="mr-2">Edit</Button>
                        <Button size="sm" color="failure">Cancel</Button>
                      </ButtonGroup>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>

        {/* reviews */}
        <h1 className="text-3xl font-semibold text-center">{provider?.reviews?.length > 0 &&'Reviews'}</h1>
       {provider?.reviews?.length > 0 && (
         <div className="flex gap-3 flex-wrap col-span-12">
          {provider?.reviews.map((review) => (
            <Card key={review._id } className="text-black w-[12rem] h-[10rem]">
              <h1 className="texr-2xl font-semibold">Reviewed By:{review?.userId.username}</h1>
              <h1 className="texr-xl font-semibold">FeedBack:{review?.feedback}</h1>
            <h3>Rating <span className="text-yellow-300">{review?.rating} /5</span></h3>
            </Card>
         ) )}
         </div>
       )}
    </div>
  );
};

export default ProviderDetails;
