import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Users, MessageSquare } from "lucide-react";

const MyCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock user data - replace with actual auth in production
  const userData = {
    userId: localStorage.getItem("userId") || "user123",
    email: localStorage.getItem("email") || "user@example.com",
    displayName: localStorage.getItem("displayName") || "User",
  };

  useEffect(() => {
    const fetchMyCommunities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/communities/user/${userData.userId}`
        );
        setCommunities(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user communities:", error);
        setLoading(false);
      }
    };

    fetchMyCommunities();
  }, [userData.userId]);

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
        <h1 className="text-3xl font-bold">My Communities</h1>
        <div className="space-x-3">
          <Button onClick={() => navigate("/communities")} variant="outline">
            <Users size={18} className="mr-2" />
            Browse Communities
          </Button>
          <Button onClick={() => navigate("/community/create")}>
            Create Community
          </Button>
        </div>
      </div>

      {communities.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-medium text-gray-700 mb-3">
            You haven't joined any communities yet
          </h2>
          <p className="text-gray-500 mb-4">
            Join communities to connect with peers, share resources, and grow
            together
          </p>
          <Button onClick={() => navigate("/communities")}>
            Browse Communities
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => {
            // Find user's role in this community
            const userMembership = community.members.find(
              (member) => member.userId === userData.userId
            );
            const userRole = userMembership?.role || "member";

            return (
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
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {community.description}
                  </p>

                  <div className="flex justify-between items-center">
                    {userRole !== "member" && (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                      </span>
                    )}
                    <Button
                      onClick={() => navigate(`/community/${community._id}`)}
                      className="ml-auto"
                    >
                      <MessageSquare size={18} className="mr-2" />
                      Open Chat
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCommunities;
