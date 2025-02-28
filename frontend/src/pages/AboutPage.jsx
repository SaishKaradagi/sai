import React from "react";
import {
  ArrowRight,
  Users,
  Award,
  Sparkles,
  Code,
  BookOpen,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AboutPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    navigate("/roadmap"); // Redirect to the Roadmap page
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-blue-50 rounded-full mb-4">
          <Users className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Career Path Navigator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering learners to chart their professional growth with
          personalized, AI-powered roadmaps tailored to their ambitions.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-full mr-4">
              <Target className="h-6 w-6 text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-700 mb-4">
            To democratize career development by providing accessible,
            structured learning paths that adapt to individual goals, timelines,
            and skill levels.
          </p>
          <p className="text-gray-700">
            We believe everyone deserves a clear roadmap to their professional
            aspirations, regardless of their background or starting point.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-full mr-4">
              <Sparkles className="h-6 w-6 text-purple-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
          </div>
          <p className="text-gray-700 mb-4">
            To create a world where every individual can confidently navigate
            their professional journey with personalized guidance and support.
          </p>
          <p className="text-gray-700">
            We envision a future where career transitions are smoother, learning
            is more efficient, and opportunities are accessible to all.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How Career Path Navigator Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Code className="h-10 w-10 text-emerald-600" />,
              title: "AI-Powered Roadmaps",
              description:
                "Our intelligent algorithms analyze industry trends and learning requirements to generate personalized learning paths.",
            },
            {
              icon: <BookOpen className="h-10 w-10 text-blue-600" />,
              title: "Curated Resources",
              description:
                "Each topic comes with handpicked learning resources, verified by industry experts to ensure quality and relevance.",
            },
            {
              icon: <Award className="h-10 w-10 text-amber-600" />,
              title: "Progress Tracking",
              description:
                "Monitor your journey with interactive progress tracking, celebrating milestones as you advance toward your goals.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-3 bg-gray-50 rounded-full inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team/Story Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-10 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Our Story
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
          Career Path Navigator was born from a simple observation: too many
          talented individuals struggle to navigate their career development due
          to information overload and lack of structured guidance.
        </p>
        <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
          Founded in 2024 by a team of educators, technologists, and career
          development experts, we set out to create a tool that combines the
          power of AI with human expertise to provide clear, actionable roadmaps
          for professional growth.
        </p>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto">
          Today, we're proud to help thousands of learners across the globe
          chart their path to success in fields ranging from software
          engineering to product management, data science, and beyond.
        </p>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Map Your Career Journey?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover your personalized learning roadmap today and take the first
          step toward your professional goals.
        </p>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 px-8"
          onClick={handleClick} // Attach click handler
        >
          Generate Your Roadmap <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
