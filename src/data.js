import { useState } from 'react'
import {supabase} from './client'
const googleToken = localStorage.getItem('googleToken')
const outlookToken = localStorage.getItem('outlookToken')
const googleSignInFlag = localStorage.getItem('googleSignInFlag');
const outlookSignInFlag = localStorage.getItem('outlookSignInFlag');

async function GetEvents(email){
    // if(flag_g){}
    let reqdata = []
    let googleeventData = []
    let outlookeventData = []

    console.log(email)
    const { data, error } = await supabase
    .from('Events')
    .select('id,title,start,end,email')
    if(error){
        console.log(error)
        alert(error)
    }
    if(data){
        reqdata = data.filter(item=> item.email === email)
       //console.log(reqdata)
    }

    const parseRRule = rruleString => {
        const ruleParts = rruleString.split(';');
        const daysOfWeekPart = ruleParts.find(part => part.startsWith('BYDAY='));
    
        if (!daysOfWeekPart) {
          return null;
        }
    
        const daysOfWeek = daysOfWeekPart.substring('BYDAY='.length).split(',');
    
        // Map FullCalendar days to RRULE days
        const dayMap = {
          MO: '1',
          TU: '2',
          WE: '3',
          TH: '4',
          FR: '5',
          SA: '6',
          SU: '0',
        };
    
        return daysOfWeek.map(day => dayMap[day]);
      };

    if(googleSignInFlag){
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events",{
            method : "GET",
            headers: {
                'Authorization':'Bearer ' +googleToken,
                 //'api':'AIzaSyAm4rpFmCcbJV6vmHZxrTPGDag7fpEPJNY'
            }
            }).then((google_data)=>{
                return google_data.json()
            }).then((google_data)=>{
               let  googlerecurdata = google_data.items.filter(item=> item.recurrence)
               googlerecurdata = googlerecurdata.map(item => ({
                    title: item.summary,
                    startTime: item.start.dateTime ? item.start.dateTime.split('T')[1] : null,
                    endTime: item.end.dateTime ? item.end.dateTime.split('T')[1] : null,
                    allDay: !item.start.dateTime,
                    daysOfWeek: item.recurrence ? parseRRule(item.recurrence[0]) : null,
               }))
                let googlenonrecdata =   google_data.items.filter(item=> !item.recurrence)
                    googlenonrecdata = googlenonrecdata.map(item => ({
                    title: item.summary,
                    start: item.start.dateTime || item.start.date,
                    end: item.end.dateTime || item.end.date, 
                    allDay: !item.start.dateTime,
                    daysOfWeek: item.recurrence ? parseRRule(item.recurrence[0]) : null,
                }))
                googleeventData = [...googlenonrecdata,... googlerecurdata]
                console.log(googleeventData)
                  
            })
    }
    //console.log(googleToken)
   // console.log(googleToken)




        const convertDaysToNumbers = (days) => {
            const dayMap = {
              sunday: '0',
              monday: '1',
              tuesday: '2',
              wednesday: '3',
              thursday: '4',
              friday: '5',
              saturday: '6',
            };
          
            return days.map(day => {
              const lowercasedDay = day.toLowerCase();
              return dayMap[lowercasedDay] || null;
            }).filter(dayNumber => dayNumber !== null);
          };

        if(outlookSignInFlag){
            await fetch("https://graph.microsoft.com/v1.0/me/calendar/events",{
            method : "GET",
            headers: {
                'Authorization':'Bearer ' +outlookToken,
                 //'api':'AIzaSyAm4rpFmCcbJV6vmHZxrTPGDag7fpEPJNY'
            }
            }).then((outlook_data)=>{
                return outlook_data.json()
            }).then((outlook_data)=>{
                let  outlookrecurdata = outlook_data.value.filter(item=> item.recurrence)
               outlookrecurdata = outlookrecurdata.map(item => ({
                    title: item.subject,
                    startTime: item.start.dateTime ? item.start.dateTime.split('T')[1] : null,
                    endTime: item.end.dateTime ? item.end.dateTime.split('T')[1] : null,
                    allDay: item.isAllDay,
                    daysOfWeek: item.recurrence ?convertDaysToNumbers(item.recurrence.pattern.daysOfWeek) : null,
               }))
                let outlooknonrecdata =   outlook_data.value.filter(item=> !item.recurrence)
                    outlooknonrecdata = outlooknonrecdata.map(item => ({
                    title: item.subject,
                    start: item.start.dateTime || item.start.date,
                    end: item.end.dateTime || item.end.date, 
                    allDay: item.isAllDay,
                    daysOfWeek: item.recurrence ?convertDaysToNumbers(item.recurrence.pattern.daysOfWeek) : null,
                }))
                outlookeventData = [...outlooknonrecdata,... outlookrecurdata]
                console.log(outlook_data)
                  
                  
            })
        }


       if(reqdata)
       { 
        const allEventData = [...reqdata, ...googleeventData, ...outlookeventData];
        console.log(allEventData)
        return allEventData;
        }
        else{
            return [];
        }

}

async function GetEventsByEmailAndId(email, eventId) {
    const { data, error } = await supabase
      .from('Events')
      .select('*')
      .eq('email', email)
      .eq('id', eventId);
  
    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  
    return data;
  }
  
async function InsertEvent(event){
    console.log(event)
    const {res, error } = await supabase
    .from('Events')
    .insert(event)
    console.log(res)
    if(error){ 
        console.log(error)
        alert(error)
    }
}

async function UpdateEvent(event){    
    const { data, error } = await supabase
    .from('Events')
    .upsert(event)
    console.log(data)
    if(error){
        console.log(error)
        alert(error)
    }
}

async function DeleteEvent(id){
    console.log(id)
    const { data, error } = await supabase
    .from('Events')
    .delete()
    .eq('id',id)
    console.log(data)
    if(error){
        console.log(error)
        alert(error)
    }
}


{/* <button></button>
<button></button>
<button></button> */}

export { GetEvents, GetEventsByEmailAndId,InsertEvent, UpdateEvent, DeleteEvent }; 