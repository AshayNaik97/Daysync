// import AddEvent from './AddEvent';
// import ListCalendarEvents from './ListCalendarEvents';
import { useState, useEffect } from 'react';
import './styles.css'

function OutlookAuth(props) {

  const [outlookToken, setOutlookToken] = useState(localStorage.getItem('outlookToken'));
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
    if (session && session.user && session.user.app_metadata  && session.user.app_metadata.provider === 'azure') {
      console.log(session.user.app_metadata.provider)
      setOutlookToken(session.provider_token)
      localStorage.setItem('outlookToken', session.provider_token);
      localStorage.setItem('outlookSignInFlag', 'true');
    }
  }, [session,outlookToken]);

  if (isLoading) {
    return <></>;
  }
 
  async function SigninAzure() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'offline_access Calendars.ReadWrite email',
      },
    });
    if (error) {
      alert('Error linking to your Outlook account');
      console.log(error);
    }
    
  }
  async function signOut() {
    await supabase.auth.signOut();
  }
  function Show(){
    console.log(outlookToken)
  }
  console.log(outlookToken)
  return (
      <div className='navbar button'>
          <button onClick={() => SigninAzure()}>Link Outlook</button>
          {/* <button onClick={()=> Show()}> show </button> */}
      </div>
  );
}

export default OutlookAuth;

