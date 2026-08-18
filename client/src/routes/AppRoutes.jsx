import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import NewsDetails from '../pages/NewsDetails';

import Contact from '../pages/Contact';

import CreateNews from '../pages/dashboard/CreateNews';
import Dashboard from '../pages/dashboard/Dashboard';
import EditNews from '../pages/dashboard/EditNews';
import MyNews from '../pages/dashboard/MyNews';

import ProtectedRoute from '../components/ProtectedRoute';
import News from '../pages/News';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN LAYOUT */}

        <Route path="/" element={<MainLayout />}>
          {/* PUBLIC ROUTES */}

          <Route index element={<Home />} />

          <Route path="/news" element={<News />} />

          <Route path="/news/:id" element={<NewsDetails />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-news"
            element={
              <ProtectedRoute>
                <CreateNews />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-news/:id"
            element={
              <ProtectedRoute>
                <EditNews />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-news"
            element={
              <ProtectedRoute>
                <MyNews />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
