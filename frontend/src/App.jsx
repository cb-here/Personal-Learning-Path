import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Protected from "./components/Protected";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Discuss from "./pages/Discuss";
import Links from "./pages/Links";
import Path from "./pages/Path";
import PathDetail from "./pages/PathDetai";
import DetailedDiscussion from "./pages/DetailedDiscussion";
import CreateDiscussion from "./pages/CreateDiscussion";
import CodeEditor from "./pages/CodeEditor";
import { ToastContainer } from "react-toastify";
import GenerateManually from "./pages/GenerateManually";
import GenerateWithAI from "./pages/GenerateWithAI";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          {/* Auth Routes - No Layout */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />

          {/* Main Routes - With MainLayout */}
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Protected>
                  <Profile />
                </Protected>
              </MainLayout>
            }
          />
          <Route
            path="/"
            element={
              <MainLayout>
                <Protected>
                  <Path />
                </Protected>
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/coding"
            element={
              <MainLayout>
                <CodeEditor />
              </MainLayout>
            }
          />
          <Route
            path="/discuss"
            element={
              <MainLayout>
                <Discuss />
              </MainLayout>
            }
          />
          <Route
            path="/discuss/:id"
            element={
              <MainLayout>
                <DetailedDiscussion />
              </MainLayout>
            }
          />

          <Route
            path="/path/:id"
            element={
              <MainLayout>
                <Protected>
                  <PathDetail />
                </Protected>
              </MainLayout>
            }
          />
          <Route
            path="/path"
            element={
              <MainLayout>
                <Protected>
                  <Path />
                </Protected>
              </MainLayout>
            }
          />
          <Route
            path="/path/generate-manually"
            element={
              <MainLayout>
                <Protected>
                  <GenerateManually />
                </Protected>
              </MainLayout>
            }
          />
          <Route
            path="/path/generate-with-ai"
            element={
              <MainLayout>
                <Protected>
                  <GenerateWithAI />
                </Protected>
              </MainLayout>
            }
          />
          <Route
            path="/discuss/create"
            element={
              <MainLayout>
                <Protected>
                  <CreateDiscussion />
                </Protected>
              </MainLayout>
            }
          />
          <Route
            path="*"
            element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
