import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";

const Feedback = () => {
    const { id } = useParams();
    const [feedbackList, setFeedbackList] = useState([]);
    const [rating, setRating] = useState(0)
    console.log(id);
    console.log(feedbackList);
  
    useEffect(() => {
      getFeedback();
    }, []);
  
    useEffect(() => {
      if (feedbackList?.length) {
        averageRating();
      }
    }, [feedbackList]); 
  
    const getFeedback = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/getfeedback", {
          params: {
            id,
          },
        });
  
        console.log(data.data);
        setFeedbackList(data.data);
      } catch (error) {
        console.log(error)
      }
    };
  
    const averageRating=()=>{
      let rating = feedbackList.map((f)=> Number(f.rating))
      console.log(rating)
      let total = rating.reduce((sum, value) => sum + value, 0); 
      let avg = total / feedbackList.length;
      let finalRating = avg * 2;
      setRating(finalRating)
  
    }
    
    return (
      <div className="p-16">
        <div className=" space-y-3">
          <h2 className="text-4xl text-green-400 font-semibold">
            Congratulation 🎉
          </h2>
          <h2 className="font-semibold text-3xl">
            Here is your Interview feedback
          </h2>
          <h2 className="text-xl font-semibold">
            Yor overall feedback rating{" "}
            <strong className="text-red-400">{rating}/10</strong>
          </h2>
        </div>
  
        <div className="mt-5 space-y-3">
          <h2 className="text-lg">
            Find below interview question with correct answer, your answer and
            feedback for improvement
          </h2>
  
          {feedbackList.length === 0 && <h2 className="text-lg text-red-500">No feedback is generated (Please submit answer!)</h2>}
          {feedbackList && feedbackList.map((feedback, index) => {
            return( <Collapsible className="space-y-1 text-lg" key={index}>
              <CollapsibleTrigger className="flex justify-between bg-violet-100 text-left p-2 border rounded-lg">
                {feedback.question} <ChevronsUpDown/>
              </CollapsibleTrigger>
              <CollapsibleContent className=" text-left p-2 border rounded-lg">
               <div className="flex  flex-col gap-2">
                  <h2 className=" bg-slate-100 p-1 rounded-lg text-green-900">
                      <strong className="text-red-500">Rating: {feedback.rating} </strong>
                  </h2>
                  <h2 className=" bg-red-100 p-1 rounded-lg text-red-900">
                      <strong>Your answer: </strong>{feedback.userAns}
                  </h2>
                  <h2 className=" bg-green-100 p-1 rounded-lg text-green-900">
                      <strong>Correct answer: </strong>{feedback.correctAns}
                  </h2>
                  <h2 className=" bg-yellow-100 p-1 rounded-lg text-yellow-900">
                      <strong>Feedback: </strong>{feedback.feedback}
                  </h2>
               </div>
              </CollapsibleContent>
            </Collapsible>)
          })}
        </div>
  
        <Link to={'/'}>
          <Button>Home</Button>
        </Link>
      </div>
    );
  };
export default Feedback
