import MockInterview from "../model/mockInterview.js";

export const previousInterview= async(req, res)=>{
    try {
        const{email} = req.query
        console.log(email)

        const prevInterview = await MockInterview.find({ createdBy: email})
        .sort({ _id: -1 });


        
        res.status(201).json( {data: prevInterview } );

    } catch (error) {
        res.status(500).json({ error: " error fetching interview feedback" });
    }
}