import { useState } from 'react';
import { supabase } from '../supabaseClient'; 
import { useNavigate } from 'react-router-dom'; 

import '../css/login.css'
export default  function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    const {data , error} = await supabase.auth.signInWithPassword({email, password}); 
    if (error) console.log(error.message, data)
    else navigate('/dashboard') // redirect to the main dashboard route
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email.endsWith('@up.edu.ph')) {
      console.log('Please use your official UP mail.');
      return;
    };
    const {error}= await supabase.auth.signUp({email, password});
    if (error) console.log(error.message)
    else console.log('Success! Check your inbox.');
  };

  return (
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">chamber</h1>
        <p class="auth-subtitle">Dorm management system<br></br> designed for UPLB community</p>
        <form class="auth-form">
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" placeholder="yourname@up.edu.ph" value={email} onChange={(e => setEmail(e.target.value))}/><br></br>
            <label for="password">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e => setPassword(e.target.value))}/><br></br>
          </div>
          <button className="login-btn" onClick={handleLogin}>Log In</button>
          <div className="signup-container">
            <p class="sign-up" onClick={handleSignUp}>Sign Up</p>
          </div>
        </form>
      </div>

      <footer class="auth-footer">
        <p>By clicking "Sign in with Google" or "Continue with email"</p>
        <p> you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>
      </footer>
    </div>
  )
}
