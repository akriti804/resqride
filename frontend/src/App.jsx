import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/UserDashboard";
import MechanicDashboard from "./pages/MechanicDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import RequestService from "./pages/user/RequestService";
import MyRequests from "./pages/user/MyRequests";
import TrackRequest from "./pages/user/TrackRequest";

import MechanicSubscription from "./pages/mechanic/MechanicSubscription";
import FeaturedListing from "./pages/mechanic/FeaturedListing";
import IncomingRequests from "./pages/mechanic/IncomingRequests";
import UpdateJobStatus from "./pages/mechanic/UpdateJobStatus";
import ShareLiveLocation from "./pages/mechanic/ShareLiveLocation";

function ProtectedRoute({ children }) {
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/request-service"
          element={
            <ProtectedRoute>
              <RequestService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/my-requests"
          element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/track-request"
          element={
            <ProtectedRoute>
              <TrackRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mechanic/dashboard"
          element={
            <ProtectedRoute>
              <MechanicDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mechanic/subscription"
          element={
            <ProtectedRoute>
              <MechanicSubscription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mechanic/featured-listing"
          element={
            <ProtectedRoute>
              <FeaturedListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mechanic/incoming-requests"
          element={
            <ProtectedRoute>
              <IncomingRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mechanic/update-job-status"
          element={
            <ProtectedRoute>
              <UpdateJobStatus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mechanic/share-live-location"
          element={
            <ProtectedRoute>
              <ShareLiveLocation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;