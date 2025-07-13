import { useAuth } from '../contexts/AuthContext';

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Welcome, {user?.email}</h1>
      <p className="mt-4">
        This is the <b>Dashboard</b>.
      </p>
    </div>
  );
};
