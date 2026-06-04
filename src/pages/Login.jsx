import { useState } from 'react';
import { supabase } from '../supabaseClient'; 
import { useNavigate } from 'react-router-dom'; 

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
    <div style={{padding: '20px'}}>
      <h2>chamber</h2>
      <form>
        <input type="email" placeholder="yourname@up.edu.ph" value={email} onChange={(e => setEmail(e.target.value))}/><br></br>
        <input type="password" placeholder="Password" value={password} onChange={(e => setPassword(e.target.value))}/><br></br>
        <button onClick={handleLogin}>Log In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  )
}
