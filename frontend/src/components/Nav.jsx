import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            MERN Blog
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            {!token ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/create"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Create Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
                {user && (
                  <div
                    className="relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {showTooltip && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-10">
                        <p className="font-semibold text-gray-800">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
