import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export const SignUpPage = () => {
  const { createAccount } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      await createAccount(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container container-narrow page-center">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button 
            type="submit" 
            className={`button button-block ${isSubmitting ? 'button-disabled' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>
      </form>

      {error && <p className="form-error">{error}</p>}

      <p className="mt-lg text-center">
        Already have an account?{' '}
        <Link to="/signin" className="link">
          Sign In
        </Link>
      </p>
    </div>
  );
};
