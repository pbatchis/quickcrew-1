import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const NavBar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          My App
        </Link>
        
        {user && (
          <div className="navbar-account">
            <span className="navbar-text">
              {user.email}
            </span>
            <button 
              onClick={signOut} 
              className="navbar-button"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
