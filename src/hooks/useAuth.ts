"use client";

import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authState, setAuthState] = useState(0);

  const checkAuth = () => {
    const access_token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');
    const newIsAuthenticated = !!access_token;
    const newUser = userData ? JSON.parse(userData) : null;
    
    setIsAuthenticated(newIsAuthenticated);
    setUser(newUser);
    setAuthState(prev => prev + 1);
  };

  useEffect(() => {
    // Initial check
    checkAuth();

    // Listen for storage events (changes in other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token' || e.key === 'user') {
        checkAuth();
      }
    };

    // Also listen for custom auth state change events
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChange', handleAuthChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChange', handleAuthChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setAuthState(prev => prev + 1);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authStateChange'));
  };

  return { isAuthenticated, user, logout, authState };
}; 