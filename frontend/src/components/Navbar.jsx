import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../apis/authentication'; // Adjust path if needed

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logoutUser();

    if (result.success) {
      alert(result.message);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } else {
      alert(result.message);
    }
  };

  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.email === 'admin@gmail.com';

  return (
    <nav className="bg-blue-600 text-white p-4 w-full shadow-md">
      <div className="flex justify-between items-center mx-auto max-w-full px-6">
        <div className="text-xl font-bold">GOWTHAM'S APP</div>

        {isLoggedIn ? (
          <>
            <button
              className="hidden md:inline-block bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
            {isAdmin && (
              <button
                className="hidden md:inline-block bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={() => navigate('/create-challenge')}
              >
                Create Challenge
              </button>
            )}
          </>
        ) : (
          <button
            className="hidden md:inline-block bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        )}

        <button
          className="md:hidden"
          onClick={() => alert('Menu clicked')}
        >
          Menu
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
