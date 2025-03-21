import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
    submit: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({});
    try {
      await signIn(formData);
      navigate("/dashboard");
    } catch (error) {
      setError({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignIn} className="max-w md m-auto pt-24">
        <h2 className="font-bold pb-2">Sign In</h2>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <div className="flex flex-col py-4">
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
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {error?.submit && (
            <p className="text-red-500 text-center mt-2">{error.submit}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
