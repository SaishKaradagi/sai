
import UserAnswer from "../model/userAnswer.model.js";

export const saveUserAnswer = async (req, res) => {
  try {
    const {
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
    } = req.body;

    console.log(
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail
    );

    if (
      !mockIdRef ||
      !question ||
      !correctAns ||
      !userAns ||
      !feedback ||
      !rating ||
      !userEmail
    ) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const newAnswer  = new UserAnswer({
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
    });

    await newAnswer.save();

    console.log(newAnswer , "new user answer");
    if(newAnswer){
        res.status(201).json({ message: "Answer saved successfully", data: newAnswer  });
    }
  } catch (error) {
    res.status(500).json({ error: " error in saving user answer" });
  }
};
