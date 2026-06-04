import { useEffect, useState } from 'react';
import {Navigate } from 'react-router-dom'; 
import { supabase } from './supabaseClient';

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current active session on load 
    supabase.auth.getSession().then(({ data: { session }}) => {
      console.log(session);
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes (9sign in, sign out)
    const { data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    }); 

    return () => subscription.unsubscribe();
  }, []);

  // show a minimal loader while supabase werifies the session token
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#242428' }}>
        Loading...
      </div>
    );
  }

  // If no session exists, redirect them to the login page immediately 
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // if a session exists, render the dashboard
  return children;

}