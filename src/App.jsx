import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ImagePage } from './pages/ImagePage';
import { VideoPage } from './pages/VideoPage';
import Login from './pages/loginPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload-image" element={<ImagePage />} />
        <Route path='/upload-video' element={<VideoPage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;