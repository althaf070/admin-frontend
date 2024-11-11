import axios from "axios"
import { useEffect, useState } from "react"
import { SERVER_URL } from "../lib/serverurl"
import { Button, Card } from "flowbite-react"

const Reviewpage = () => {
    const [reviews, setReviews] = useState([])
    const fetchreviews = async () => {
       try {
        const response = await axios.get(`${SERVER_URL}/reviews`)
        setReviews(response.data.reviews)
       } catch (error) {
        console.log(error.message);
       }
    }
    const handleDelete=async(id)=> {
         try {
            await axios.delete(`${SERVER_URL}/reviews/delete/${id}`)
            setReviews(prevReviews => prevReviews.filter(review => review._id !== id));
         } catch (error) {
            console.log(error);
            
         }
    }
    useEffect(() => {
    fetchreviews()
    }, [])
  return (
    <>
        <h1>Reviews</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {reviews?.length > 0 ? (
            reviews.map((review) =>(
                <Card key={review._id} className="p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full w-full text-gray-700">
                 <h2 className="text-xl font-semibold">Reviewd By <span className="text-lg font-semibold"> {review?.userId.username}</span></h2>
                 <h2 className="text-lg font-semibold">
                comment: {review.feedback}
                 </h2>
                 <p>Rating: <span className="text-yellow-300">{review.rating}/5</span></p>
                 <Button color="failure" onClick={()=>handleDelete(review._id)}>Delete</Button>
                </Card>
            ))
        ):"No reviews havnt been added"}
    </div>
    </>
  )
}

export default Reviewpage