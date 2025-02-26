import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Webcam from 'react-webcam';

const Interview = () => {
    const { id } = useParams();
    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    console.log(id);
  
    useEffect(() => {
      getInterviewDetails();
    }, [id]);
  
    const getInterviewDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/interviewDetails/${id}`
        );
        console.log(response.data[0]);
        setInterviewData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
        <div className="p-20 flex justify-center flex-col">
          <h2 className="font-bold text-center text-2xl">
            Let's start Interview
          </h2>
  
          <div className="md:flex mt-10 w-full gap-5  ">
            <div className="md:order-1 flex flex-col md:w-1/2  justify-center items-center gap-5">
              {webCamEnabled ? (
                <Webcam
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  style={{ height: 400, width: 400 }}
                  mirrored={true}
                />
              ) : (
                <>
                  <WebcamIcon className="w-full h-60 p-10 hover:shadow-lg border rounded-lg bg-slate-100" />
                  <Button
                    className="hover:cursor-pointer bg-blue-600 hover:bg-blue-700"
                    onClick={() => setWebCamEnabled(true)}
                  >
                    Enable webCam and MicroPhone
                  </Button>
                </>
              )}
            </div>
  
            <div className=" md:w-1/2 space-y-5 mt-5  ">
              <div className="space-y-5  border bg-violet-400  rounded-lg p-4">
                <h2>
                  {" "}
                  <span className="font-semibold text-lg">
                    {" "}
                    Job Role / Position: <span className="font-bold "> {interviewData?.jobPosition}</span>
                  </span>{" "}
                </h2>
                <h2>
                  {" "}
                  <span className="font-semibold text-lg">
                    {" "}
                    Job Description/ Tech Stack:<span className="font-bold">  {interviewData?.jobDesc}</span>
                  </span>{" "}
                </h2>
                <h2>
                  {" "}
                  <span className="font-semibold text-lg">
                    {" "}
                    Years of Experience:<span className="font-bold">  {interviewData?.jobExperience}</span>
                  </span>{" "}
                </h2>
              </div>
  
              <div className="space-y-5 text-yellow-800  border bg-yellow-200 rounded-lg p-4">
                <p className="flex gap-3 text-lg font-semibold">
                  <Lightbulb /> Note:
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Distinctio quos cumque molestiae, hic doloremque eaque possimus
                  sed harum rerum ullam?
                </p>
              </div>
            </div>
          </div>
  
          <div className="flex justify-end ">
            <Link to={`/interviewDashboard/interview/${id}/start`}>
              <Button className="bg-blue-600 hover:bg-blue-700">Start Interview</Button>
            </Link>
          </div>
        </div>
      </>
    );
  };

export default Interview
