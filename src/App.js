import React from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './App.css';
import Auth from './Auth';
// import FullCalendar from '@fullcalendar/react';
import Fullcalendar from './Fullcalendar';
import LoginSignup from './LoginSignup';
// import { Getevents } from './Data';


function App() {
  const session = useSession(); //kinda like user + has tokens 
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();
  // console.log(session)

  const router = createBrowserRouter([
    {
      path:'/LoginSignup',
      element:<LoginSignup></LoginSignup>
      // element:<p>/LoginSignup</p>
    },
    {
      path:'/',
      element:<Auth argument1={session} argument2= {supabase} argument3={isLoading}></Auth>
      //element:<Fullcalendar></Fullcalendar>
        // element:<p>path /</p>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;