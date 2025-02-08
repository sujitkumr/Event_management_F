import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, LogOut, User, Menu, X, Home, Info, Contact, Users, Plus, LayoutDashboard, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

function Navbar() {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const success = await logout();
    if (success === true) {
      navigate('/login');
      setIsMobileMenuOpen(false);
    }
  };

  const handleRedirectToLogin = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Menu Toggle */}
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </label>
          {isMobileMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* Common Links for All Users */}
              <li>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Home className="w-4 h-4 mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  <Info className="w-4 h-4 mr-2" /> About
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Contact className="w-4 h-4 mr-2" /> Contact
                </Link>
              </li>
              <li>
                {authUser ? (
                  <Link to="/events" onClick={() => setIsMobileMenuOpen(false)}>
                    <Users className="w-4 h-4 mr-2" /> Events
                  </Link>
                ) : (
                  <button onClick={handleRedirectToLogin} className="flex items-center">
                    <Users className="w-4 h-4 mr-2" /> Events
                  </button>
                )}
              </li>

              {/* Conditional Links Based on Auth */}
              {authUser && (
                <>
                  <li>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/createevent" onClick={() => setIsMobileMenuOpen(false)}>
                      <Plus className="w-4 h-4 mr-2" /> Create Event
                    </Link>
                  </li>
                </>
              )}

              {/* Auth Links */}
              {authUser ? (
                <li>
                  <button onClick={handleLogout} className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button onClick={handleRedirectToLogin} className="flex items-center">
                      <User className="w-4 h-4 mr-2" /> Login
                    </button>
                  </li>
                  <li>
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <UserPlus className="w-4 h-4 mr-2" />
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>

        {/* Brand Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <Film className="mr-2" />
          Event
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {/* <li>
            <Link to="/" className="btn btn-ghost">
              <Home className="w-4 h-4 mr-2" /> Home
            </Link>
          </li> */}
          <li>
            <Link to="/about" className="btn btn-ghost">
              <Info className="w-4 h-4 mr-2" /> About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="btn btn-ghost">
              <Contact className="w-4 h-4 mr-2" /> Contact
            </Link>
          </li>
          <li>
            {authUser ? (
              <Link to="/events" className="btn btn-ghost">
                <Users className="w-4 h-4 mr-2" /> Events
              </Link>
            ) : (
              <button onClick={handleRedirectToLogin} className="btn btn-ghost">
                <Users className="w-4 h-4 mr-2" /> Events
              </button>
            )}
          </li>

          {/* Show "Dashboard" and "Create Event" for authenticated users */}
          {authUser && (
            <>
              <li>
                <Link to="/dashboard" className="btn btn-ghost">
                  <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/createevent" className="btn btn-ghost">
                  <Plus className="w-4 h-4 mr-2" /> Create Event
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Desktop Auth Links */}
      <div className="navbar-end hidden md:flex">
        {authUser ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
              <div className="w-10 rounded-full bg-secondary text-secondary-content">
                <span>{authUser.name?.charAt(0) || 'A'}</span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/createevent">Create Event</Link>
              </li> */}
              <li>
                <button onClick={handleLogout} className="flex items-center">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={handleRedirectToLogin} className="btn btn-ghost btn-sm normal-case flex items-center">
              <User className="w-4 h-4 mr-2" /> Login
            </button>
              <Link to="/register" className="btn btn-primary btn-sm normal-case">
                <UserPlus className="w-4 h-4 mr-2" />
                Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;