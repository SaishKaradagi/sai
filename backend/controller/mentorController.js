import MentorChat from "../model/mentorChat.js";

// Get or create chat session
export const getChatSession = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const userId = req.auth.userId;

    let chatSession = await MentorChat.findOne({ mentorId, userId });

    if (!chatSession) {
      chatSession = new MentorChat({
        mentorId,
        userId,
        messages: [],
      });
      await chatSession.save();
    }

    res.status(200).json(chatSession);
  } catch (error) {
    res.status(500).json({ error: "Error getting chat session" });
  }
};

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { content, sender } = req.body;
    const userId = req.auth.userId;

    const chatSession = await MentorChat.findOneAndUpdate(
      { mentorId, userId },
      { $push: { messages: { sender, content } } },
      { new: true }
    );

    res.status(200).json(chatSession);
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
};

// Get mentor list (hardcoded for demo)
export const getMentors = async (req, res) => {
  const mentors = [
    {
      id: "1",
      name: "Sarah Johnson",
      expertise: "Tech Career Guidance",
      bio: "10+ years experience in software engineering career development",
      image: "/images/mentor1.jpg",
    },
    {
      id: "2",
      name: "Michael Chen",
      expertise: "Resume Optimization",
      bio: "Professional resume reviewer with 500+ success stories",
      image: "/images/mentor2.jpg",
    },
  ];

  res.status(200).json(mentors);
};
