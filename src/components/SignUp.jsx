import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    submit: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({});
    try {
      await signUp(formData);
      navigate("/dashboard");
    } catch (error) {
      setError({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp} className="max-w md m-auto pt-24">
        <h2 className="font-bold pb-2">Sign Up</h2>
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
        <div className="flex flex-col py-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 mt-6"
            type="text"
            placeholder="Name"
          />
          {error?.name && (
            <p className="text-red-500 text-sm mt-1">{error.name}</p>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 mt-6"
            type="email"
            placeholder="Email"
          />
          {error?.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 mt-6"
            type="password"
            placeholder="Password"
          />
          {error?.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
          <button
            className="p-3 mt-6 w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          {error?.submit && (
            <p className="text-red-500 text-center mt-2">{error.submit}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
