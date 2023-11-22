import React from 'react'
import {useState,useEffect} from 'react'
import './LoginSignup.css'
import { useNavigate } from 'react-router-dom'
import user_icon from './Assets/person.png'
import email_icon from './Assets/email.png'
import password_icon from './Assets/password.png'
import {supabase} from './client'

function LoginSignup(props){
    const [action,setAction] = useState("Sign Up");
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const [name,setName]=useState('');

    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === "PASSWORD_RECOVERY") {
            const newPassword = prompt("What would you like your new password to be?");
            try {
              const { data, error } = await supabase.auth.updateUser(
                {
                  password: newPassword,
                },
                {
                  headers: {
                    'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6a3NnZnZvbWRkbWN5ZHdxbXZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NDE0MjYsImV4cCI6MjAxNTAxNzQyNn0.aGunEf6CpnK82VJOMLwm94ogwuSFgHQojAmMwSHnbEM',
                  },
                }
              );
      
              if (data) alert("Password updated successfully!");
              if (error) alert("There was an error updating your password.");
            } catch (error) {
              console.error("Error updating password:", error);
              alert("There was an error updating your password.");
            }
          }
        });
      }, []);
      
        
    async function handleSignUp() {
        if(action === 'Sign Up'){
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: pass,
                    data: {
                        frist_name: name,
                    },
                    headers: {
                        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6a3NnZnZvbWRkbWN5ZHdxbXZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NDE0MjYsImV4cCI6MjAxNTAxNzQyNn0.aGunEf6CpnK82VJOMLwm94ogwuSFgHQojAmMwSHnbEM',
                    },
                });
                alert("Verify Your Email");
            } catch (error) {
                alert(error.message);
            }
        }
    }
    
    async function handleLogin() {
        if(action==='Login'){
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: pass,
                    headers: {
                        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6a3NnZnZvbWRkbWN5ZHdxbXZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NDE0MjYsImV4cCI6MjAxNTAxNzQyNn0.aGunEf6CpnK82VJOMLwm94ogwuSFgHQojAmMwSHnbEM',
                    },
                });
                if(error){
                    alert(error.message)
                }
                else{
                    localStorage.setItem('email', email);
                    navigate('/')
                }
    
            } catch (error) {
                alert(error.message);
            }
        }
       
    }
    

    async function Handleforgotpassword(email) {
        
        const { data, error } = await supabase.auth
        .resetPasswordForEmail(email)
        
    }

    function getEmail() {
        return email ;
      }
    
    
    
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                    <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action==='Login'?<div></div>:<div className='input'>
                <img src={user_icon} alt=''></img>
                <input type='text' placeholder='Name' onChange={(event)=>{setName(event.target.value)}}></input>
            </div>}
            
            <div className='input'>
                <img src={email_icon} alt=''></img>
                <input type='email' placeholder='Email' onChange={(event)=>{setEmail(event.target.value) }}></input>
            </div>
            <div className='input'>
                <img src={password_icon} alt=''></img>
                <input type='password' placeholder='Password' onChange={(event)=>{setPass(event.target.value)}}></input>
            </div>
            {action==='Sign Up'?<></>:<div className='forgot-password' onClick={()=>Handleforgotpassword(email)}>Trouble logging in ?</div>}
            
            <div className='submit-container'>
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{handleSignUp(email,pass);setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{handleLogin(email,pass);setAction("Login");}}>Login</div>
            </div>
            </div>
        </div>
    )
}




export default LoginSignup