import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const WriteReview = () => {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const { displayUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitReview = (e) => {
    e.preventDefault();
    console.log(title, review, displayUser);
    Axios.post("http://localhost:2002/post-review", {
      title: title,
      review: review,
      name: displayUser,
    })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="bg-gray-300  dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[91.5vh] lg:py-0">
          <div className="bg-gray-200 px-16 py-20 flex flex-col gap-y-10">
            <div className="flex gap-9">
              <label htmlFor="">TITLE</label>
              <input
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div className="flex gap-9">
              <label htmlFor="">REVIEW</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => {
                  e.preventDefault();
                  setReview(e.target.value);
                }}
              ></textarea>
            </div>

            <button
              onClick={submitReview}
              className="bg-gray-800 text-white py-3"
            >
              SUBMIT REVIEW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WriteReview;
