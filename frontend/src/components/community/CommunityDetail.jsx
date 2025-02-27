import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { UserPlus, Users, LogOut } from "lucide-react";
import CommunityChat from "../../components/community/CommunityChat";

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Mock user data - replace with actual auth in production
  const userData = {
    userId: localStorage.getItem("userId") || "user123",
    email: localStorage.getItem("email") || "user@example.com",
    displayName: localStorage.getItem("displayName") || "User",
  };

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/communities/${id}`
        );
        setCommunity(response.data);

        // Check if current user is a member
        const userMembership = response.data.members.find(
          (member) => member.userId === userData.userId
        );
        setIsMember(!!userMembership);
        setIsAdmin(userMembership?.role === "admin");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching community:", error);
        setError("Failed to load community details");
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [id, userData.userId]);

  const handleJoin = async () => {
    try {
      await axios.post(`http://localhost:3000/api/communities/${id}/join`, {
        userId: userData.userId,
        email: userData.email,
        displayName: userData.displayName,
      });

      // Refresh community data
      const response = await axios.get(
        `http://localhost:3000/api/communities/${id}`
      );
      setCommunity(response.data);
      setIsMember(true);
    } catch (error) {
      console.error("Error joining community:", error);
      setError(error.response?.data?.error || "Failed to join community");
    }
  };

  const handleLeave = async () => {
    if (window.confirm("Are you sure you want to leave this community?")) {
      try {
        await axios.post(`http://localhost:3000/api/communities/${id}/leave`, {
          userId: userData.userId,
        });

        // Redirect to communities list
        navigate("/communities");
      } catch (error) {
        console.error("Error leaving community:", error);
        setError(error.response?.data?.error || "Failed to leave community");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <Button
            onClick={() => navigate("/communities")}
            className="mt-3"
            variant="outline"
          >
            Back to Communities
          </Button>
        </div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            Community not found
          </h2>
          <Button onClick={() => navigate("/communities")} className="mt-3">
            Back to Communities
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Community Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{community.name}</h1>
              <p className="mt-2 opacity-90">{community.description}</p>

              <div className="flex items-center mt-4 space-x-4">
                <div className="bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full text-sm">
                  {community.category}
                </div>
                <div className="flex items-center text-sm">
                  <Users size={16} className="mr-1" />
                  {community.members.length} members
                </div>
              </div>
            </div>

            <div>
              {!isMember ? (
                <Button
                  onClick={handleJoin}
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  <UserPlus size={18} className="mr-2" />
                  Join Community
                </Button>
              ) : (
                <Button
                  onClick={handleLeave}
                  variant="outline"
                  className="border-white text-white hover:bg-blue-700"
                >
                  <LogOut size={18} className="mr-2" />
                  {isAdmin ? "Leave (Admin)" : "Leave Community"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Chat section (only visible to members) */}
        {isMember ? (
          <CommunityChat communityId={id} />
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-3">
              Join this community to participate in discussions
            </h2>
            <p className="text-gray-500 mb-4">
              Connect with peers, share resources, and grow together
            </p>
            <Button onClick={handleJoin}>
              <UserPlus size={18} className="mr-2" />
              Join Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;
