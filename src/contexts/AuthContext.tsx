import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type UserCredential,
} from 'firebase/auth';

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signIn: (e: string, p: string) => Promise<UserCredential>;
  createAccount: (e: string, p: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);
export const useAuth = () => useContext(Ctx)!;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signIn = (e: string, p: string) => signInWithEmailAndPassword(auth, e, p);
  const createAccount = (e: string, p: string) => createUserWithEmailAndPassword(auth, e, p);
  const signOut = () => firebaseSignOut(auth);

  return (
    <Ctx.Provider value={{ user, loading, signIn, createAccount, signOut }}>
      {children}
    </Ctx.Provider>
  );
};
