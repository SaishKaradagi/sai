import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { Label } from "../ui/label";

const AddInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExprience, setJobExprience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResp, setJsonResp] = useState([]);
  const { user } = useUser();
  const userName = user.firstName;
  const navigateTo = useNavigate();

  console.log(userName);
  const handleOnSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExprience);
      try {
        const { data } = await axios.get(
          "http://localhost:3000/interviewQuestion",
          {
            params: {
              jobPosition,
              jobDesc,
              jobExprience,
              userName
            },
          }
        );

        console.log(data);
        setJsonResp(data[0])
        if(data){
          setOpenDialog(false)
          navigateTo(`interview/${data[1]}`)
        }

        setLoading(false);

        setJobDesc("");
        setJobExprience("");
        setJobPosition("");
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
  };
  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-10 bg-slate-200 flex justify-center items-center hover:scale-105 mt-2 hover:border duration-200 border-green-300 w-80 h-40 text-center rounded-xl hover:shadow-xl"
      >
        <h2 className="text-lg font-bold">+ Add Interview</h2>
      </div>

      <Dialog className="w-full" open={openDialog}>
        <DialogContent>
          {/* <DialogTrigger className=" border border-slate-500 p-1 rounded-lg hover:bg-slate-500 hover:text-white">
              d
            </DialogTrigger> */}
          <DialogHeader>
            <form onSubmit={handleOnSubmit}>
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-2xl">
                  Tell us about job interview
                </h1>
                <h2 className="text">
                  Add more details about your position/role, Job description and
                  years of experience
                </h2>

                <div className="flex flex-col">
                  <label className="font-medium">Job Role/Positon</label>
                  <Input
                    onChange={(e) => setJobPosition(e.target.value)}
                    placeholder="Ex: Full stack developer, Devops Engineer"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label  className="font-medium">Job description / Tech Stack (in short)</label>
                  <Textarea
                    className="h-26"
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Ex: React, Angular, Node.js etc"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label  className="font-medium">Years of Experience</label>
                  <Input
                    onChange={(e) => setJobExprience(e.target.value)}
                    type="number"
                    max="50"
                    placeholder="Ex: 4 "
                    required
                  />
                </div>
              </div>
              <div className=" mt-5 flex justify-end gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700" type="button" onClick={() => setOpenDialog(false)}>
                  cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" disabled={loading} type="submit">
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      'Generating AI'
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddInterview;
