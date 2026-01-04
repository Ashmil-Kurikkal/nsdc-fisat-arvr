// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import VisionOSInterface from './features/inventory/VisionOsInterface';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<VisionOSInterface />} />
      </Routes>
    </BrowserRouter>
  );
}