import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { SERVER_URL } from "../lib/serverurl"
import { Card } from "flowbite-react"

const UserDetails = () => {
    const {id} = useParams()
    const [user, setuser] = useState(null)
    const fetchuser=async()=> {
    const response = await axios.get(`${SERVER_URL}/user/${id}`)
    setuser(response.data.user)
    }
    useEffect(() => {
    fetchuser()
    }, [id])
  return (
    <div className="grid gap-3 md:grid-cols-12">
        <Card className="w-full h-full col-span-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">{user?.username}</h1>
          <p className="text-gray-500 mb-2">{user?.email}</p>
        </div>
        <div className="mt-4 text-gray-700 space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Address:</span>
            <span>{user?.address || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phone Number:</span>
            <span>{user?.phoneNumber || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Location:</span>
            <span>{user?.district || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Last Login:</span>
            <span>{new Date(user?.lastlogin).toLocaleString() || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Joined At:</span>
            <span>{new Date(user?.createdAt).toLocaleString() || "N/A"}</span>
          </div>
         
        </div>
        </Card>
    </div>
  )
}

export default UserDetails