import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout({ children }) {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          "&:focus": {
            position: "static",
            width: "auto",
            height: "auto",
          },
        }}
      >
        Skip to main content
      </a>
      <AppBar
        position="static"
        elevation={0}
        role="navigation"
        sx={{
          background: "linear-gradient(90deg, #2A4365 0%, #38A169 100%)",
          mb: 2,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Community Events
          </Typography>
          {session ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/dashboard"
                aria-label="Dashboard"
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                onClick={handleSignOut}
                aria-label="Sign out of your account"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/signin"
                aria-label="Sign in to your account"
              >
                Sign In
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/signup"
                aria-label="Sign up for an account"
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {error && (
        <Typography color="error" align="center" role="alert">
          {error}
        </Typography>
      )}
      <Container maxWidth="lg" sx={{ py: 4 }} role="main" id="main-content">
        {children}
      </Container>
    </>
  );
}

export default Layout;
