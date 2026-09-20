import React, { useState } from "react";

function Step1SetUp({ onStart }) {
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobRole || !experience || !interviewType || !resume) {
      alert("Please fill all fields and upload your resume.");
      return;
    }

    onStart({
      jobRole,
      experience,
      interviewType,
      resume,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Set Up Your Interview
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Job Role */}
        <div>
          <label className="block mb-2 font-medium">
            Job Role
          </label>

          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g. Frontend Developer"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-2 font-medium">
            Experience (years)
          </label>

          <input
            type="number"
            min="0"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g. 2"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Interview Type */}
        <div>
          <label className="block mb-2 font-medium">
            Interview Type
          </label>

          <select
            value={interviewType}
            onChange={(e) => setInterviewType(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select interview type</option>
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        {/* Resume */}
        <div>
          <label className="block mb-2 font-medium">
            Upload Resume (PDF)
          </label>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Start Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Start Interview
        </button>

      </form>
    </div>
  );
}

export default Step1SetUp;