import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Briefcase, Users, ArrowRight } from 'lucide-react';

function Setup() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to interview page with data
    navigate('/interview/1');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Setup Your Interview</h1>
          <p className="text-gray-500 mb-8">Configure your AI-powered technical interview</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {file ? file.name : 'Click or drag to upload PDF'}
                </p>
                <input 
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="resume-upload"
                />
                <label 
                  htmlFor="resume-upload"
                  className="inline-block mt-2 text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* Job Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Role
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
                >
                  <option value="">Select a role</option>
                  <option value="frontend">Frontend Developer</option>
                  <option value="backend">Backend Developer</option>
                  <option value="fullstack">Full Stack Developer</option>
                  <option value="devops">DevOps Engineer</option>
                  <option value="data">Data Scientist</option>
                </select>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select 
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
                >
                  <option value="">Select experience</option>
                  <option value="fresher">Fresher (0-1 years)</option>
                  <option value="junior">Junior (1-3 years)</option>
                  <option value="mid">Mid-Level (3-5 years)</option>
                  <option value="senior">Senior (5+ years)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Start Interview <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Setup;