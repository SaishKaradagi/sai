import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

const CreateCommunity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Tech",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock user data - replace with actual auth in production
  const userData = {
    userId: localStorage.getItem("userId") || "user123",
    email: localStorage.getItem("email") || "user@example.com",
    displayName: localStorage.getItem("displayName") || "User",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/communities",
        {
          ...formData,
          userId: userData.userId,
          email: userData.email,
          displayName: userData.displayName,
        }
      );

      navigate(`/community/${response.data._id}`);
    } catch (error) {
      console.error("Error creating community:", error);
      setError(error.response?.data?.error || "Failed to create community");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 border m-5 rounded-lg shadow-md hover:border-blue-500">
      <div className="bg-white rounded-lg  p-6">
        <h1 className="text-2xl font-bold mb-6">Create a New Community</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Community Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter a unique name for your community"
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe what this community is about"
              className="mt-1 min-h-[100px]"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Tech">Tech</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/communities")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {loading ? "Creating..." : "Create Community"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunity;
