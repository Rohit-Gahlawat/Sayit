

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import BlogHome from './pages/BlogHome';
import BlogPage from './pages/BlogPage';
import { CreateBlog } from './pages/CreateBlog';
import ProtectedRoute from './components/protectedRoute';



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/signup"} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/blog/:id' element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
          <Route path='/createblog' element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
          <Route path='/bloghome' element={<ProtectedRoute><BlogHome /></ProtectedRoute>} />




        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
