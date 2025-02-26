import React from 'react'
import AddInterview from './AddInterview';
import InterviewList from './InterviewList';

const InterviewDashboard = () => {
    return (
        <div className="  px-28  mt-10 space-y-3 h-full">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <p>Create and Start Your AI Mock Interview</p>
    
          <div>
            <AddInterview />
          </div>

          <div className='mt-10 mb-10' >

          <InterviewList/>
          </div>
        </div>
      );
}

export default InterviewDashboard
