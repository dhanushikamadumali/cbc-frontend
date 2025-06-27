import './App.css'
import LoginPage from './pages/loginPage';
import AdminPage from './pages/adminPage';
import Testing  from './pages/testing';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/client/register';
import HomePage from './pages/homePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResponsiveTesting  from './pages/test';

function App() {
  return (
    // <LoginPage/>
  <GoogleOAuthProvider clientId='384325350141-1mfdr3s2l8nbrcoks8pn0bscqesefv2o.apps.googleusercontent.com'>
    <BrowserRouter>
    <Toaster position='top-right'/>
    <Routes path='/*'>
    <Route path='/admin/*' element={<AdminPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/testing' element={<Testing/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
   <Route path="/r" element={<ResponsiveTesting/>}/>
    <Route path='/*' element={<HomePage/>}/>
    </Routes>   
    </BrowserRouter>
  </GoogleOAuthProvider>
  )
}

export default App
