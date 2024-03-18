import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const EditReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await Axios.get(`http://localhost:2002/get-review/${id}`);
        setReview(res.data);
        setNewTitle(res.data.title);
        setNewReview(res.data.review);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    fetchReview();
  }, [id]);

  const updateReview = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:2002/update-review/${id}`, {
      title: newTitle,
      review: newReview,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-gray-300  dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[91.5vh] lg:py-0">
        <div className="bg-gray-200 px-16 py-20 flex flex-col gap-y-10">
          <h2 className="text-2xl font-bold">Edit Review</h2>

          <form className="flex flex-col space-y-10">
            <div className="flex space-x-7">
              <label>Title:</label>
              <input
                type="text"
                defaultValue={review.title}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
              />
            </div>

            <div className="flex space-x-3">
              <label>Review:</label>
              <textarea
                defaultValue={review.review}
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
            </div>

            <button type="submit" onClick={updateReview}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditReview;
