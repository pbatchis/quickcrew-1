import { ReactNode } from 'react';
import { NavBar } from './NavBar';

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <div className="app-layout">
      <NavBar />
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};
