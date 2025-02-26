import MockInterview from "../model/mockInterview.js"


export const interviewDetails =async (req, res)=>{
    try {
        const {id} = req.params
        console.log(id)
        const details = await MockInterview.find({mockId: id});
        console.log(details)
        if (!details) {
            return res.status(404).json({ error: "Interview details not found" });
        }

        res.json(details);
    } catch (error) {
        res.status(500).json({ error: " error fetching interview details" });
    }
}