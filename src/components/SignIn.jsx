import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import MuiLink from "@mui/material/Link";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

const SignIn = () => {
  const { signIn } = UserAuth();
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    if (!formData.email || !formData.password) {
      setError({ submit: "Please fill in all fields" });
      return;
    }
    e.preventDefault();
    setIsLoading(true);
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
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body2" gutterBottom>
          Don't have an account?
          <MuiLink component={Link} to="/signup" sx={{ ml: 1 }}>
            Sign up
          </MuiLink>
        </Typography>

        <Box component="form" onSubmit={handleSignIn} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
            margin="normal"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 3 }}
          >
            {isLoading ? (
              <>
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          {error.submit && (
            <Typography
              color="error"
              align="center"
              sx={{ mt: 2 }}
              role="alert"
            >
              {error.submit}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
export default SignIn;
