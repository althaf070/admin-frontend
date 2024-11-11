import axios from "axios"
import { Card, Spinner } from "flowbite-react"
import { HiBell } from "react-icons/hi";
import { useEffect, useState } from "react"
import { SERVER_URL } from "../lib/serverurl"
const Dashboard = () => {
  const [dashboard, setdashboard] = useState(null)
  const [loading, setLoading] = useState(false)
  const fethdashboard= async()=> {
    setLoading(true)
    try {
      const response = await axios.get(`${SERVER_URL}/dashboard`)
      setdashboard(response.data.data)
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
  fethdashboard()
  }, [])
  if(loading){
    return <Spinner color="success" size="lg"/>
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 place-items-center gap-3 row-span-2">
      <div className="col-span-1"></div>
      <div className="col-span-3">
      <Card href="#" className="max-w-sm bg-gray-700 text-white hover:bg-gray-500 border-slate-800 shadow-lg w-[17rem]">
      <h5 className="text-4xl lg:text-6xl text-center font-bold tracking-tight">
       {dashboard?.users}
      </h5>
      <p className="text-lg text-center">
       Total Users
      </p>
    </Card>
      </div>
   <div className="col-span-3">
   <Card href="#" className="max-w-sm bg-gray-700 text-white hover:bg-gray-500 border-slate-800 shadow-lg w-[17rem]">
      <h5 className="text-4xl lg:text-6xl text-center font-bold tracking-tight">
      {dashboard?.providers}
      </h5>
      <p className="text-lg text-center">
       Total Service Providers
      </p>
    </Card>
   </div>
   <div className="col-span-3">
   <Card href="#" className="max-w-sm bg-gray-700 text-white hover:bg-gray-500 border-slate-800 shadow-lg w-[17rem]">
      <h5 className="text-4xl lg:text-6xl text-center font-bold tracking-tight">
      {dashboard?.services}
      </h5>
      <p className="text-lg text-center">
       Total Services
      </p>
    </Card>
   </div>
   <div className="col-span-2"></div>
   <div className="col-span-1"></div>


   <div className="col-span-3">
      <Card className="max-w-sm bg-red-500 text-white hover:bg-gray-500 border-slate-800 shadow-lg w-[17rem]">
      <HiBell size={34}/>
      <h5 className="text-4xl lg:text-6xl text-center font-bold tracking-tight w-full">
       {dashboard?.verifiedProviders} 
      </h5>
      <p className="text-lg text-center">
       Verification Pending Providers
      </p>
    </Card>
      </div>
   <div className="col-span-3">
      <Card href="#" className="max-w-sm bg-gray-500 text-white hover:bg-gray-500 border-slate-800 shadow-lg w-[17rem]">
      <h5 className="text-4xl lg:text-6xl text-center font-bold tracking-tight">
       {dashboard?.appointments}
      </h5>
      <p className="text-lg text-center">
       Total Appointments
      </p>
    </Card>
      </div>
   <div className="col-span-3">
      <Card href="#" className="max-w-sm bg-gray-500 text-white hover:bg-gray-500 border-slate-800 shadow-lg w-[17rem]">
      <h5 className="text-4xl lg:text-6xl text-center font-bold tracking-tight">
       {dashboard?.reviews}
      </h5>
      <p className="text-lg text-center">
       Total Reviews
      </p>
    </Card>
      </div>
    </div>
  )
}

export default Dashboard