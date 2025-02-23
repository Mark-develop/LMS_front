import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <Router basename="/LMS_front">
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/*"
            element={
              <>
                <Navigation />
                <main className="max-w-[2000px] mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/profile" element={<h1>Profil użytkownika</h1>} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/courses/:id" element={<CoursePage />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
