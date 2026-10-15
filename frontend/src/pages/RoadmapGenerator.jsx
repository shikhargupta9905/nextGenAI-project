import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  Sparkles,
  CheckCircle,
  Clock,
  BookOpen,
  Code,
  Database,
  BarChart3,
  FileText,
  Target,
  Download
} from 'lucide-react';

function RoadmapGenerator() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('frontend');
  const [selectedSalary, setSelectedSalary] = useState('20');
  const [file, setFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const roles = [
    { id: 'frontend', label: 'Frontend Dev', icon: <Code className="w-5 h-5" /> },
    { id: 'backend', label: 'Backend Eng', icon: <Database className="w-5 h-5" /> },
    { id: 'ml', label: 'ML Engineer', icon: <BarChart3 className="w-5 h-5" /> }
  ];

  const salaryRanges = ['10', '15', '20', '30', '40'];

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const generateRoadmap = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const roleLabel = roles.find(r => r.id === selectedRole)?.label || 'Developer';
      
      const mockRoadmap = {
        title: `${roleLabel} Roadmap`,
        targetSalary: `₹${selectedSalary} LPA`,
        duration: '6 Months',
        summary: `This roadmap is designed to help you become a ${roleLabel} with a target salary of ₹${selectedSalary} LPA.`,
        phases: [
          {
            phase: 'Phase 1: Foundations',
            duration: 'Month 1-2',
            topics: [
              'HTML & CSS Fundamentals',
              'JavaScript Essentials',
              'Git & Version Control',
              'Basic Problem Solving'
            ],
            skills: ['HTML', 'CSS', 'JavaScript', 'Git']
          },
          {
            phase: 'Phase 2: Core Technologies',
            duration: 'Month 2-4',
            topics: selectedRole === 'frontend' 
              ? ['React.js & Next.js', 'REST APIs & GraphQL', 'State Management', 'Tailwind CSS']
              : selectedRole === 'backend'
              ? ['Node.js & Express', 'Database Management', 'Authentication & Security', 'API Design']
              : ['Python & Pandas', 'Machine Learning Basics', 'Data Visualization', 'Statistics'],
            skills: selectedRole === 'frontend' 
              ? ['React', 'Next.js', 'APIs'] 
              : selectedRole === 'backend'
              ? ['Node.js', 'SQL', 'Security']
              : ['Python', 'ML', 'Data']
          },
          {
            phase: 'Phase 3: Advanced Concepts',
            duration: 'Month 4-5',
            topics: selectedRole === 'frontend'
              ? ['Performance Optimization', 'Testing & Debugging', 'CI/CD Pipeline', 'System Design']
              : selectedRole === 'backend'
              ? ['Microservices Architecture', 'Cloud Services', 'DevOps', 'Scalability']
              : ['Deep Learning', 'NLP', 'Model Deployment', 'MLOps'],
            skills: ['Advanced', 'Testing', 'CI/CD']
          },
          {
            phase: 'Phase 4: Interview Preparation',
            duration: 'Month 5-6',
            topics: [
              'DSA & Problem Solving',
              'System Design',
              'Mock Interviews',
              'Resume & Portfolio Building'
            ],
            skills: ['DSA', 'System Design', 'Communication']
          }
        ],
        resources: [
          '📚 "You Don\'t Know JS" - Book',
          '🎓 Frontend Masters - Courses',
          '💻 LeetCode - DSA Practice',
          '📝 System Design Interview - Book',
          '🎯 Pramp - Mock Interviews'
        ]
      };
      
      setRoadmap(mockRoadmap);
      setIsGenerating(false);
    }, 1500);
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={goBack}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">AI Roadmap Generator</h1>
                <p className="text-sm text-gray-500">Generate a personalised roadmap for your dream job</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">AI Powered</span>
            </div>
          </div>
        </div>

        {/* Configuration Section */}
        {!roadmap && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-8">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose your target role
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-xl border-2 transition ${
                        selectedRole === role.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`p-2 rounded-lg ${
                          selectedRole === role.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {role.icon}
                        </div>
                        <span className={`font-medium ${
                          selectedRole === role.id ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {role.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Target Salary Range
                </label>
                <div className="flex flex-wrap gap-3">
                  {salaryRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedSalary(range)}
                      className={`px-6 py-2 rounded-lg font-medium transition ${
                        selectedSalary === range
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      ₹{range} LPA
                    </button>
                  ))}
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Upload Your Resume (Optional)
                </label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
                    file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <Upload className={`w-8 h-8 mx-auto mb-2 ${
                    file ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <p className="text-sm text-gray-500">
                    {file ? file.name : 'Upload your resume to personalize the roadmap'}
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="inline-block mt-3 text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium"
                  >
                    {file ? 'Change File' : 'Choose File'}
                  </label>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateRoadmap}
                disabled={isGenerating}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg font-medium disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating Roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Roadmap
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Generated Roadmap */}
        {roadmap && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{roadmap.title}</h2>
                  <p className="text-blue-100 mt-1">{roadmap.summary}</p>
                  <div className="flex gap-4 mt-3">
                    <span className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                      <Target className="w-4 h-4" />
                      {roadmap.targetSalary}
                    </span>
                    <span className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4" />
                      {roadmap.duration}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setRoadmap(null)}
                  className="text-white hover:text-blue-200 text-sm"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* Phases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmap.phases.map((phase, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800">{phase.phase}</h3>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {phase.duration}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {phase.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Recommended Resources
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roadmap.resources.map((resource, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-blue-500">•</span>
                    {resource}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => alert('Roadmap saved!')}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Save Roadmap
              </button>
              <button
                onClick={() => alert('Downloading roadmap...')}
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapGenerator;