import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import WriteReview from "./pages/WriteReview";
import UserContext from "./contexts/UserContext";
import PersonalReviews from "./pages/PersonalReviews";
import DeleteUser from "./pages/DeleteUser";
import EditReview from "./pages/EditReview";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/write" element={<WriteReview />} />
          <Route path="/my-reviews" element={<PersonalReviews />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/edit-review/:id" element={<EditReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
