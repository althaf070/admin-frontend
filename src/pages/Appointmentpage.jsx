import axios from "axios"
import { useEffect, useState } from "react"
import { SERVER_URL } from "../lib/serverurl"
import { Button,Table,Badge,ButtonGroup } from "flowbite-react"
const Appointmentpage = () => {
    const [appointments, setAppointments] = useState([])

    const fethAllAppointmnets = async()=> {
      try {
        const response = await axios.get(`${SERVER_URL}/appointments`)
        setAppointments(response.data.appointments)
      } catch (error) {
        console.log(error.message);
        
      }
    }
    useEffect(() => {
    fethAllAppointmnets()
    }, [])
  return (
    <>
    {appointments?.length > 0 ?(
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
          {appointments.map((booking) => (
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
    ):"NO bookings"}
    </>
  )
}

export default Appointmentpage