import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  
  // Это временные данные, позже они будут браться из контекста авторизации
  const currentUser = {
    firstName: "Jan",
    lastName: "Kowalski",
    role: "admin"
  };

  const handleLogout = () => {
    // Здесь будет логика выхода (очистка токена, состояния и т.д.)
    console.log('Logout clicked');
    // Перенаправление на страницу логина
    navigate('/login');
  };

  const getRoleName = (role) => {
    const roles = {
      'admin': 'Administrator',
      'teacher': 'Wykładowca',
      'student': 'Student'
    };
    return roles[role] || role;
  };

  return (
    <nav className="w-full bg-gray-800 text-white">
      <div className="max-w-[2000px] mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">System LMS</Link>
          <div className="flex items-center space-x-8">
            <Link to="/courses" className="hover:text-gray-300 transition-colors">
              Przedmioty
            </Link>
            <Link to="/profile" className="hover:text-gray-300 transition-colors">
              Profil
            </Link>
            <Link to="/admin" className="hover:text-gray-300 transition-colors">
              Panel administratora
            </Link>
            
            {/* Информация о пользователе */}
            <div className="flex items-center space-x-3 pl-8 border-l border-gray-600">
              <div className="text-sm">
                <div className="font-medium">{currentUser.firstName} {currentUser.lastName}</div>
                <div className="text-gray-300 text-xs">{getRoleName(currentUser.role)}</div>
              </div>
              <button 
                className="text-sm text-gray-300 hover:text-white"
                onClick={handleLogout}
              >
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 