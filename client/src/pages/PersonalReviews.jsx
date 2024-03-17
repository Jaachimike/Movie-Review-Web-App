import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import Axios from "axios";

const PersonalReviews = () => {
  const { displayUser } = useContext(UserContext);
  const [myReviews, setMyReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await Axios.get("http://localhost:2002/personal-reviews", {
          username: displayUser,
        });
        setMyReviews(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchReviews();
  }, []);
  return (
    <div className=" max-w-7xl mx-auto">
      <h3 className="text-3xl font-semibold mb-10">Movie Reviews</h3>
      <div className=" flex flex-col">
        {/* reviews */}
        {myReviews.map((review, index) => (
          <div
            key={index}
            className="mb-8 shadow-lg pl-8 rounded-xl py-5 bg-gray-200 "
          >
            {/* profile */}

            {/* review */}
            <div className=" col-span-3">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalReviews;
