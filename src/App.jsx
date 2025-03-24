import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import EventPage from "./pages/EventPage";
import CreateEvent from "./components/CreateEvent";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </LocalizationProvider>
  );
}

export default App;
