import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Workspace from './pages/Workspace';

function App() {
  return (
    <Router basename="/json-master">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Workspace />} />
      </Routes>
    </Router>
  );
}

export default App;
