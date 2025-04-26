import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Protected from "./components/Protected";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Profile from './pages/Profile'
import Discuss from "./pages/Discuss";
import Links from "./pages/Links";
import Path from './pages/Path';
import PathDetail from './pages/PathDetai';
import DetailedDiscussion from "./pages/DetailedDiscussion";
import CreateDiscussion from "./pages/CreateDiscussion";
import CodeEditor from "./pages/CodeEditor";
import {ToastContainer} from 'react-toastify'
import GenerateManually from "./pages/GenerateManually";
import GenerateWithAI from "./pages/GenerateWithAI";

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/profile" element={
          <Protected>
            <Profile />
          </Protected>
        } />
        <Route path="/" element={
          <Protected>
            <Path />
          </Protected>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/coding" element={<CodeEditor />} />
        <Route path="/discuss" element={<Discuss />} />
        <Route path="/register" element={< SignUp />} />
        <Route path="/discuss/:id" element={< DetailedDiscussion />} />
        <Route path="/login" element={< SignIn />} />
        <Route path="/link" element={
          <Protected>
            <Links />
          </Protected>
        } />
        <Route path="/path/:id" element={
          <Protected>
            <PathDetail />
          </Protected>
        } />
        <Route path="/path" element={
          <Protected>
            <Path />
          </Protected>
        } />
        <Route path="/path/generate-manually" element={
          <Protected>
            <GenerateManually />
          </Protected>
        } />
        <Route path="/path/generate-with-ai" element={
          <Protected>
            <GenerateWithAI />
          </Protected>
        } />
        <Route path="/discuss/create" element={
          <Protected>
            <CreateDiscussion />
          </Protected>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App