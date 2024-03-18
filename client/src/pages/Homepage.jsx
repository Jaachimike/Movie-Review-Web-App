import React, { useEffect, useState, useContext } from "react";
import heroImage from "../assets/images/Poster.png";
import Axios from "axios";
import UserContext from "../contexts/UserContext";

// const movieReviews = [
//   {
//     profilePicture: "https://xsgames.co/randomusers/avatar.php?g=pixel",
//     name: "Jaachimike Okafor",
//     location: "Lagos, Nigeria",
//     title: "Spiderman",
//     review:
//       "John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.",
//   },
//   {
//     profilePicture: "https://xsgames.co/randomusers/avatar.php?g=male",
//     name: "Chidinma Okafor",
//     location: "Ogun, Nigeria",
//     title: "Dune",
//     review:
//       "John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.",
//   },
//   {
//     profilePicture: "https://api.dicebear.com/7.x/pixel-art/svg",
//     name: "Ekene Okafor",
//     location: "London, UK",
//     title: "Looney Tunes",
//     review:
//       "John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.",
//   },
//   {
//     profilePicture: "https://xsgames.co/randomusers/avatar.php?g=pixel",
//     name: "Ifeyinwa Okafor",
//     location: "Abuja, Nigeria",
//     title: "LimeHead",
//     review:
//       "John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.",
//   },
//   {
//     profilePicture: "https://api.dicebear.com/7.x/lorelei/svg",
//     name: "Ife Oladosu",
//     location: "Koln, Germany",
//     title: "Tribe called Judah",
//     review:
//       "John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.",
//   },
//   {
//     profilePicture: "https://xsgames.co/randomusers/avatar.php?g=pixel",
//     name: "Sharon Darer",
//     location: "Munich, Germany",
//     title: "Spiderman 3",
//     review:
//       "John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.",
//   },
//   {
//     profilePicture: "https://api.dicebear.com/7.x/lorelei/svg",
//     name: "Somtoo Okafor",
//     location: "Lagos, Nigeria",
//     title: "Spiderman",
//     review:
//       "John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.",
//   },
// ];

const Homepage = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const { displayUser } = useContext(UserContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await Axios.get("http://localhost:2002/movie-reviews");
        setMovieReviews(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <div className="">
        {/* hero section  */}
        <div
          className="bg-cover bg-center h-[86dvh] text-white mb-20"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="backdrop-brightness-50 h-full  flex items-center pl-44 pb-24 ">
            <div className=" flex flex-col gap-y-9">
              {/* title  */}
              <h1 className="text-8xl font-semibold">
                John Wick 3: <br /> Parabellum
              </h1>
              {/* description  */}
              <p className="text-xl w-2/3">
                John Wick is on the run after killing a member of the
                international assassins' guild, and with a $14 million price tag
                on his head, he is the target of hit men and women everywhere.
              </p>
              {/* trailer button  */}
              <div>
                <button className="bg-[#BE123C] px-6 py-3 rounded-sm text-xl font-medium">
                  <a
                    target="_blank"
                    href="https://youtu.be/M7XM597XO94?si=rRzFlVr6GmuVRNPa"
                  >
                    Watch Trailer
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* rest of page */}
        <div className=" max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold mb-10">Movie Reviews</h3>
          <div className=" flex flex-col">
            {/* reviews */}
            {movieReviews.map((review, index) => (
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
      </div>
    </>
  );
};

export default Homepage;
