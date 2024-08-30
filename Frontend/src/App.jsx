import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import PostApplication from './pages/PostApplication';
import Register from './pages/Register';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './store/slices/userSlice';
function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser())
  },[])
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/jobs" element={<Jobs/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/post/application/:jobId" element={<PostApplication/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
    <Footer/>
    <ToastContainer position="top-right" theme={"dark"}/>
    </BrowserRouter>
    </>
  )
}

export default App
