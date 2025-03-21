import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [signOutError, setSignOutError] = useState("");

  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      setSignOutError(error.message);
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {session?.user?.email}</h2>
      <div>
        <button
          onClick={handleSignOut}
          className="hover:cursor-pointer border inline-block px-4 py-3 mt-4"
        >
          Sign Out
        </button>
      </div>
      {signOutError && (
        <p className="text-red-500 text-center mt-2">{signOutError}</p>
      )}
    </div>
  );
};

export default Dashboard;
