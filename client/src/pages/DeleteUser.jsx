import React, { useState } from "react";
import Axios from "axios";

const DeleteUser = () => {
  const [email, setEmail] = useState("");

  const deleteUser = (e) => {
    e.preventDefault();
    // console.log(email, password);
    Axios.delete("http://localhost:2002/delete-user", {
      params: {
        email: email,
      },
    })
      .then((res) => {
        console.log(res);
        setEmail("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required=""
        />
      </div>

      <button onClick={deleteUser}>DELETE USER</button>
    </div>
  );
};

export default DeleteUser;
