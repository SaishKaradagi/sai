import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react'

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
    console.log(mockInterviewQuestion);
  
    const textToSpeech=(text)=>{
      if('speechSynthesis' in window){
        const speech = new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(speech)
      }
      else{
        alert('sorry, your browser does not support text to speech ')
      }
    }
    return (
      mockInterviewQuestion && (
        <div className="border p-5 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {mockInterviewQuestion &&
              mockInterviewQuestion.map((question, index) => {
                return (
                  <h2
                    className={`border p-1 w-30 rounded-lg font-semibold ${
                      activeQuestionIndex == index && "bg-green-400 text-white"
                    }`}
                    key={index}
                  >
                    # Question {index+1}
                  </h2>
                );
              })}
          </div>
          <h2 className="mt-4 text-sm md:text-lg font-semibold">
            {mockInterviewQuestion[activeQuestionIndex]?.question}
          </h2>
          <Volume2 className="cursor-pointer" onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} />
  
          <div className="space-y-5  mt-10  border bg-blue-200 rounded-lg p-4">
            <p className="flex gap-3 text-lg font-semibold">
              <Lightbulb /> Note:
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio
              quos cumque molestiae, hic doloremque eaque possimus sed harum rerum
              ullam?
            </p>
          </div>
        </div>
      )
    );
  };

export default QuestionsSection
