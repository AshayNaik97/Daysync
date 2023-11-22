
import { useState, useEffect } from 'react';
import './styles.css';

function GoogleAuth(props) {

  const [googleToken, setGoogleToken] = useState(localStorage.getItem('googleToken'));
  const [session, setSession] = useState('');
  const [supabase, setSupabase] = useState('');
  const [isLoading, setIsLoading] = useState('');

  useEffect(() => {
    if (props) {
      setSession(props.argument1);
      setSupabase(props.argument2);
      setIsLoading(props.argument3);
    }
  }, [props]);

  useEffect(() => {
    if (session  && session.user && session.user.app_metadata  && session.user.app_metadata.provider === 'google') {
      console.log(session.user.app_metadata.provider)
      console.log("in")
      localStorage.setItem('googleToken', session.provider_token);
      localStorage.setItem('googleSignInFlag', 'true');
      setGoogleToken(session.provider_token)
    }
  }, [session,googleToken]);

  if (isLoading) {
    return <></>;
  }
  async function signinGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
      },
    });
    if (error) {
      alert('Error logging in to your Google account');
      console.log(error);
    } 
  }
 console.log(session.provider_token)
  async function signOut() {
    await supabase.auth.signOut();
  }

  function Show(){
    return googleToken
  }

  

  return (
      <div className='navbar button'>
          <button onClick={() => signinGoogle()}>Link Google</button>
       
      </div>
  );
}


export default GoogleAuth
