import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("/api/mentors");
        setMentors(response.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
    fetchMentors();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Career Mentors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.expertise}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{mentor.bio}</p>
            <Button onClick={() => navigate(`/mentors/${mentor.id}`)}>
              Start Chat
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorList;
