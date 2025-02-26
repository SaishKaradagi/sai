import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';

const InterviewList = () => {
    const { user } = useUser();
    const email = user.firstName;
    const [interviewList, setInterviewList] = useState([])
    console.log(interviewList)
    // console.log(user.primaryEmailAddress.emailAddress)
    useEffect(() => {
        user && GetInterviewList();
      },
      [user]);
    const GetInterviewList = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/previousInterview",
        {
          params: {
            email,
          },
        }
      );
  
      setInterviewList(data.data)
    };
    return (
      <div>
        <h2 className='text-red-600 hover:text-red-700 font-medium'>Previous Mock Interview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {interviewList&&interviewList.map((interview,index)=>{
              return <InterviewCard interview={interview} key={index}/>
          })}
        </div>
      </div>
    );
  };

export default InterviewList
