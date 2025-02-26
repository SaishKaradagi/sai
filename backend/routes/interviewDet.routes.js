import express from 'express'
import { interviewDetails } from '../controller/interviewDetails.js'
import { saveUserAnswer } from '../controller/saveUserAnswer.js'
import { getFeedBack } from '../controller/getFeedback.js'
import { previousInterview } from '../controller/previousInterview.js'

const router = express.Router()

router.get('/interviewDetails/:id', interviewDetails)
router.post('/saveUserAnswer', saveUserAnswer)
router.get('/getfeedback', getFeedBack)
router.get('/previousInterview', previousInterview)


export default router;