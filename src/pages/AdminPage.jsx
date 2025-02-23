import { useState } from 'react';

function AdminPage() {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'student', // только student или teacher
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      email: 'profesor@example.com',
      firstName: 'Jan',
      lastName: 'Kowalski',
      role: 'teacher',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      email: 'student@example.com',
      firstName: 'Anna',
      lastName: 'Nowak',
      role: 'student',
      status: 'active',
      createdAt: '2024-01-16'
    }
  ]);

  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error('Błąd podczas tworzenia użytkownika');
      }

      const createdUser = await response.json();
      setUsers(prevUsers => [...prevUsers, createdUser]);
      setNewUser({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'student'
      });
      
      // Показать уведомление об успехе
      setNotification({
        type: 'success',
        message: 'Użytkownik został pomyślnie utworzony'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message
      });
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const getRoleName = (role) => {
    const roles = {
      'teacher': 'Wykładowca',
      'student': 'Student'
    };
    return roles[role] || role;
  };

  const validateForm = () => {
    const errors = {};
    
    if (!newUser.email.includes('@')) {
      errors.email = 'Nieprawidłowy format adresu email';
    }
    if (newUser.password.length < 8) {
      errors.password = 'Hasło musi mieć co najmniej 8 znaków';
    }
    if (newUser.firstName.length < 2) {
      errors.firstName = 'Imię musi mieć co najmniej 2 znaki';
    }
    if (newUser.lastName.length < 2) {
      errors.lastName = 'Nazwisko musi mieć co najmniej 2 znaki';
    }
    
    return errors;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel Administratora</h1>

      {/* Форма создания нового пользователя */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Dodaj nowego użytkownika</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imię
              </label>
              <input
                type="text"
                name="firstName"
                value={newUser.firstName}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nazwisko
              </label>
              <input
                type="text"
                name="lastName"
                value={newUser.lastName}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hasło
              </label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rola
              </label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Wykładowca</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Tworzenie...' : 'Dodaj użytkownika'}
            </button>
          </div>
        </form>
      </div>

      {/* Таблица пользователей */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-900 p-6 border-b">Lista użytkowników</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '35%' }}>
                  Użytkownik
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>
                  Rola
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>
                  Status
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '20%' }}>
                  Data utworzenia
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4" style={{ width: '35%' }}>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ width: '15%' }}>
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {getRoleName(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4" style={{ width: '15%' }}>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Aktywny' : 'Nieaktywny'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500" style={{ width: '20%' }}>
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4" style={{ width: '15%' }}>
                    <button
                      onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                      className={`text-sm font-medium ${
                        user.status === 'active'
                          ? 'text-red-600 hover:text-red-900'
                          : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {user.status === 'active' ? 'Dezaktywuj' : 'Aktywuj'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
}

function Notification({ type, message }) {
  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg ${
      type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {message}
    </div>
  );
}

export default AdminPage; 