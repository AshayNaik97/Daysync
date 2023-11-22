import { useState, useEffect } from 'react';
import GoogleAuth from './GoogleAuth';
import OutlookAuth from './OutlookAuth';
import { useLocation } from 'react-router-dom';
import './styles.css';


function Navbar(props) {

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

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <div className='navbar button'>
        <GoogleAuth argument1={session} argument2= {supabase} argument3={isLoading}></GoogleAuth>
      </div>
      <p>DaySync</p>
      <div className='navbar button'>
        <OutlookAuth argument1={session} argument2= {supabase} argument3={isLoading}></OutlookAuth>
     </div>
     </>
  );
}

export default Navbar;