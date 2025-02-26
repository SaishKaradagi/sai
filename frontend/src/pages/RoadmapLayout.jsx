// src/pages/RoadmapLayout.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Roadmap from "./Roadmap";
import { MapPin, Search, Clock, Trophy, Loader2 } from "lucide-react";

const RoadmapLayout = () => {
  const [field, setField] = useState("");
  const [months, setMonths] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!field || !months) return;

    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/roadmap", {
        params: {
          field,
          months,
        },
      });

      // Log the received data structure for debugging
      console.log("API Response:", response.data);

      // Make sure we're setting data in the format Roadmap component expects
      setData(response.data);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const popularOptions = [
    {
      field: "Software Engineering",
      icon: <Trophy className="mr-2 h-4 w-4" />,
    },
    { field: "Data Science", icon: <Trophy className="mr-2 h-4 w-4" /> },
    { field: "UX/UI Design", icon: <Trophy className="mr-2 h-4 w-4" /> },
    { field: "Digital Marketing", icon: <Trophy className="mr-2 h-4 w-4" /> },
  ];

  const timeframeOptions = ["3 months", "6 months", "9 months", "12 months"];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-12 pb-20">
          <div className="bg-blue-50 p-3 rounded-full mb-6">
            <MapPin className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Career Roadmap Generator
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-xl mb-8">
            Plan your learning journey with our AI-powered roadmap generator.
            Enter your desired career field and timeframe to get started.
          </p>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Search className="mr-2 h-5 w-5" /> Generate Your Roadmap
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Your Career Roadmap</DialogTitle> 
                <DialogDescription>
                  Enter your field of interest and preferred timeframe to
                  generate a personalized learning path.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Interest</Label>
                  <Input
                    id="field"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    placeholder="e.g., Software Engineering, Data Science"
                    className="w-full"
                    required
                  />

                  <div className="flex flex-wrap gap-2 mt-2">
                    {popularOptions.map((option) => (
                      <Button
                        key={option.field}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setField(option.field)}
                      >
                        {option.icon}
                        {option.field}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="months" className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" /> Time Period (months)
                  </Label>
                  <Input
                    id="months"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    placeholder="e.g., 6"
                    type="number"
                    min="1"
                    max="24"
                    className="w-full"
                    required
                  />

                  <div className="flex flex-wrap gap-2 mt-2">
                    {timeframeOptions.map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setMonths(option.split(" ")[0])}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Generating...
                      </>
                    ) : (
                      <>Generate Roadmap</>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Showcase section */}
          <div className="mt-16 w-full">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">
              Popular Career Paths
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Software Engineering",
                  description:
                    "Become a skilled developer with a focus on modern web technologies",
                  timeframe: "9 months",
                  color: "bg-emerald-50 border-emerald-200",
                },
                {
                  title: "Data Science",
                  description:
                    "Master data analysis, visualization, and machine learning techniques",
                  timeframe: "12 months",
                  color: "bg-blue-50 border-blue-200",
                },
                {
                  title: "Product Management",
                  description:
                    "Learn to lead product development from conception to launch",
                  timeframe: "8 months",
                  color: "bg-purple-50 border-purple-200",
                },
              ].map((path, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-6 transition-all duration-200 hover:shadow-md cursor-pointer ${path.color}`}
                  onClick={() => {
                    setField(path.title);
                    setMonths(path.timeframe.split(" ")[0]);
                    setDialogOpen(true);
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {path.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {path.timeframe} timeline
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Your Career Roadmap
            </h1>
            <Button
              variant="outline"
              onClick={() => setData([])}
              className="flex items-center"
            >
              <Search className="mr-2 h-4 w-4" />
              Create New Roadmap
            </Button>
          </div>
          <Roadmap data={data} />
        </>
      )}
    </div>
  );
};

export default RoadmapLayout;
