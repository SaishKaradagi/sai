import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { Mic, StopCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '../ui/button';
import Webcam from 'react-webcam';
import { toast } from "sonner";

const RecordAnsSection = ({
    mockInterviewQuestion,
    activeQuestionIndex,
    interviewData,
  }) => {
    const { user } = useUser();
    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const {
      error,
      interimResult,
      isRecording,
      results,
      startSpeechToText,
      stopSpeechToText,
      setResults,
    } = useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });
  
    useEffect(() => {
      results.map((res) => {
        setUserAnswer((preAns) => preAns + res?.transcript);
      });
    }, [results]);
  
    useEffect(() => {
      if (!isRecording && userAnswer.length > 10) {
        console.log("updating answer");
        UpdateUserAnswer();
      }
    }, [userAnswer, isRecording   ]);
  
    const UpdateUserAnswer = async () => {
      setLoading(true);
      console.log(userAnswer);
      try {
        const result = await axios.get(
          "http://localhost:3000/getRatingFeedback",
          {
            params: {
              question: mockInterviewQuestion[activeQuestionIndex]?.question,
              userAnswer: userAnswer,
            },
          }
        );
        console.log(result.data);
  
        const {data}  = await axios.post(
          "http://localhost:3000/saveUserAnswer",
          {
            mockIdRef: interviewData?.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: result?.data?.feedback,
            rating: result?.data?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
          }
        );
        toast.success("User answer recorder successfully");
  
        console.log("Save response:", data);
      } catch (error) {
          console.error("Error updating answer:", error);
          toast.error("Failed to save your answer. Please try again.");
      } finally{
          setUserAnswer("");
          setLoading(false)
          setResults([])
      }
  
    };
  
    const StartStopRecording = async () => {
      if (isRecording) {
        stopSpeechToText();
  
      //   if (userAnswer?.length < 10) {
      //     console.log(userAnswer);
      //     setLoading(false);
      //     toast("Error while saving your answer recore again");
      //     return;
      //   }
      //   console.log(userAnswer);
        //   setUserAnswer("")
      } else {
        startSpeechToText();
      }
    };
  
    return (
      <>
        <div className="flex justify-center items-center flex-col">
          <div className="flex rounded-lg justify-center items-center bg-black">
            <img
              className="absolute"
              src="/webcamImg.gif"
              width={200}
              height={200}
              alt=""
            />
            <Webcam
              mirrored={true}
              style={{ width: "100%", height: 320, zIndex: 10 }}
            />
          </div>
          <Button
            disabled={loading}
            onClick={StartStopRecording}
            className="mt-5 bg-slate-200 hover:border-blue-500 m-5 hover:bg-slate-200"
          >
            {isRecording ? (
              <h2 className="flex gap-2 items-center text-red-600">
                <StopCircle />
                Stop
              </h2>
            ) : (
              <h2 className=" flex gap-2 items-center text-red-600">
                <Mic />
                Start Recording
              </h2>
            )}
          </Button>
  
          {/* <Button onClick={() => console.log(userAnswer)}>
              show user answer
              </Button> */}
        </div>
      </>
    );
  };

export default RecordAnsSection
