import UserAnswer from "../model/userAnswer.model.js";

export const getFeedBack=async(req, res)=>{
    try {
        const {id} = req.query;
        console.log(id, "mock id")

        const feedback = await UserAnswer.find({mockIdRef: id});
        console.log(feedback);

        if (!feedback) {
            return res.status(404).json({ error: "Interview feedback not found" });
        }

        res.status(201).json({ message: "Feedback found successfully", data: feedback  });

    } catch (error) {
        res.status(500).json({ error: " error fetching interview feedback" });
    }
}