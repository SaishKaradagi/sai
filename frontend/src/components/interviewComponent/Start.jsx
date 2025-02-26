import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import QuestionsSection from './QuestionsSection';
import RecordAnsSection from './RecordAnsSection';

const Start = () => {
    const { id } = useParams();
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    useEffect(() => {
      getInterviewDetails();
    }, [id]);
  
    const getInterviewDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/interviewDetails/${id}`
        );
        console.log(response.data[0].jsonMockResp);
        const jsonMockResp = JSON.parse(response.data[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className="p-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Questions */}
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
          />
          {/* video / audio recoding */}
          <RecordAnsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
          />
        </div>
        <div className="flex justify-end gap-3">
          {activeQuestionIndex != 0 && (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            >
              Previous Question
            </Button>
          )}
          {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
            <Button
            className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next Question
            </Button>
          )}
          {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
            <Link to={`/interviewDashboard/interview/${id}/feedback`}>
            
            <Button className="bg-blue-600 hover:bg-blue-700">End Interview</Button>
            </Link>
          )}
        </div>
      </div>
    );
  };

export default Start
