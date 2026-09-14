import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Setup from './pages/Setup';
import Interview from './pages/Interview';
import Report from './pages/Report';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeScorer from './pages/ResumeScorer';
import CoinSection from './pages/CoinSection';
import RoadmapGenerator from './pages/RoadmapGenerator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/interview/:id" element={<Interview />} />
        <Route path="/report/:id" element={<Report />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-scorer" element={<ResumeScorer />} />
        <Route path="/coins" element={<CoinSection />} />
        <Route path="/roadmap" element={<RoadmapGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;