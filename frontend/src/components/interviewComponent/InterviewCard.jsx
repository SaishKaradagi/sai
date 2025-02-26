import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const InterviewCard = ({ interview }) => {
    return (
      <div className="border shadow rounded-lg p-3 hover:border-blue-600 duration-200 hover:shadow bg-blue-50">
        <h2 className="text-lg font-semibold">{interview?.jobPosition}</h2>
        <h2>{interview?.jobExperience} years of expreience</h2>
  
        <div className="flex gap-10 mt-5">
          {/* interviewDashboard/interview/12e144ca-84ae-49dd-90cd-819028820afb/feedback */}
          <Link to={`interview/${interview.mockId}/feedback`}>
            <Button className="bg-slate-200 text-blue-600">Feedback</Button>
          </Link>
          <Link to={`interview/${interview.mockId}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">Start</Button>
          </Link>
        </div>
      </div>
    );
  };

export default InterviewCard
