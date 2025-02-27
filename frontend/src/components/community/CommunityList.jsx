import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/ui/button";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/communities"
        );
        setCommunities(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching communities:", error);
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const handleJoinCommunity = async (communityId) => {
    try {
      // In a real app, you would get user data from auth context
      const userData = {
        userId: localStorage.getItem("userId") || "user123",
        email: localStorage.getItem("email") || "user@example.com",
        displayName: localStorage.getItem("displayName") || "User",
      };

      await axios.post(
        `http://localhost:3000/api/communities/${communityId}/join`,
        {
          userId: userData.userId,
          email: userData.email,
          displayName: userData.displayName,
        }
      );

      navigate(`/community/${communityId}`);
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Tech: "bg-blue-500",
      Finance: "bg-green-500",
      Marketing: "bg-purple-500",
      Design: "bg-pink-500",
      Other: "bg-gray-500",
    };
    return colors[category] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Career Communities</h1>
        <Button onClick={() => navigate("/community/create")}>
          Create Community
        </Button>
      </div>

      {communities.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            No communities found. Be the first to create one!
          </p>
          <Button
            onClick={() => navigate("/community/create")}
            className="mt-4"
          >
            Create a Community
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <div
              key={community._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">
                  {community.name}
                </h3>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <span
                    className={`${getCategoryColor(
                      community.category
                    )} px-2 py-1 rounded text-xs text-white`}
                  >
                    {community.category}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">
                    {community.members?.length || 0} members
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{community.description}</p>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => navigate(`/community/${community._id}`)}
                    variant="outline"
                  >
                    View
                  </Button>
                  <Button onClick={() => handleJoinCommunity(community._id)}>
                    Join Community
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityList;
