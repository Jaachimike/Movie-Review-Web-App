import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import UserContext from "../contexts/UserContext";
import Axios from "axios";
import delete_icon from "../assets/icons/icons8-trash.svg";
import edit_icon from "../assets/icons/icons8-edit.svg";

const PersonalReviews = () => {
  const { displayUser } = useContext(UserContext);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    // console.log(displayUser);
    const fetchReviews = async () => {
      try {
        const res = await Axios.get("http://localhost:2002/personal-reviews", {
          params: {
            username: displayUser,
          },
        });
        setMyReviews(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchReviews();
  }, []);

  // console.log(myReviews);

  const deleteReview = async (id) => {
    try {
      await Axios.delete(`http://localhost:2002/delete-review/${id}`);
      // Remove the deleted review from the state
      setMyReviews(myReviews.filter((review) => review.id !== id));
      console.log("Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className=" max-w-7xl mx-auto mt-16">
      <h3 className="text-3xl font-semibold mb-10 ml-7 lg:ml-0">My Reviews</h3>
      <div className=" flex flex-col">
        {/* reviews */}
        {myReviews.map((review, index) => (
          <div
            key={index}
            className="mb-8 shadow-lg px-8 mx-7 lg:mx-0 rounded-xl py-5 bg-gray-200 "
          >
            {/* review */}
            <div className=" flex justify-between">
              {/* Review details  */}
              <div className=" flex-grow">
                <h5 className="text-3xl font-bold mb-2">{review.title}</h5>
                <div className="flex gap-4 mb-6 ">
                  <img
                    src="https://api.dicebear.com/7.x/lorelei/svg"
                    alt=""
                    className="h-8 rounded-full"
                  />

                  <div className="flex flex-col justify-center">
                    <h5 className="text-md font-semibold">{review.name}</h5>
                  </div>
                </div>
                <p className="w-2/3 text-lg font-medium text-gray-500">
                  {review.review}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-4">
                <button>
                  <Link to={`/edit-review/${review.id}`}>
                    <img src={edit_icon} alt="edit button" />
                  </Link>
                </button>
                <button onClick={() => deleteReview(review.id)}>
                  <img src={delete_icon} alt="delete button" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalReviews;
