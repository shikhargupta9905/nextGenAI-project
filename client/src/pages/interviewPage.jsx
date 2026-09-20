import React, { useState } from "react";
import axios from "axios";
import Step1SetUp from "../components/Step1SetUp";

function InterviewPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleStart = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("jobRole", data.jobRole);
      formData.append("experience", data.experience);
      formData.append("interviewType", data.interviewType);
      formData.append("resume", data.resume);

      const response = await axios.post(
        "http://localhost:8000/api/interview/start",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Interview created:", response.data);

      alert("Interview started successfully!");

      // We will use this response to move to Step 2.
      setStep(2);

    } catch (error) {
      console.error(
        "Start interview error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to start interview"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {step === 1 && (
        <Step1SetUp onStart={handleStart} />
      )}

      {loading && (
        <p className="text-center mt-4">
          Analyzing your resume and preparing your interview...
        </p>
      )}

      {step === 2 && (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold">
            Step 2
          </h2>

          <p className="mt-2">
            Interview is ready.
          </p>
        </div>
      )}
    </div>
  );
}

export default InterviewPage;