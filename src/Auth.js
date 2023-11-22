// import AddEvent from './AddEvent';
// import ListCalendarEvents from './ListCalendarEvents';
import { useState, useEffect } from 'react';
import GoogleAuth from './GoogleAuth';
import OutlookAuth from './OutlookAuth';
// import {GetEvents} from './Data'
import { useLocation } from 'react-router-dom';
import Fullcalendar from './Fullcalendar';
import './styles.css';
import Navbar from './Navbar'

function Auth(props) {

  const [session, setSession] = useState('');
  const [supabase, setSupabase] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const { state } = useLocation();
  const emailFromState = state?.email;

  useEffect(() => {
    if (props) {
      setSession(props.argument1);
      setSupabase(props.argument2);
      setIsLoading(props.argument3);
    }
  }, [props]);

  if (isLoading) {
    return <></>;
  }
  return (
    <div>
      <div className='navbar'>
        <Navbar argument1={session} argument2= {supabase} argument3={isLoading}></Navbar>
      </div>
        <Fullcalendar></Fullcalendar>
    </div>
  );
}

export default Auth;


//data={GetEvents(emailFromState)}