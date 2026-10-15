import { Link } from 'react-router-dom';
import { Award, FileText, Home } from 'lucide-react';

function Report() {
  const scores = {
    overall: 85,
    technical: 90,
    communication: 82,
    problemSolving: 88,
    strengths: ['Strong React knowledge', 'Good communication skills'],
    gaps: ['System Design concepts need work', 'Testing experience limited']
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <Award className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Interview Report</h1>
            <p className="text-gray-500">Your AI-powered interview analysis</p>
          </div>

          {/* Overall Score */}
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-50 px-8 py-4 rounded-xl">
              <p className="text-sm text-gray-500">Overall Score</p>
              <p className="text-5xl font-bold text-blue-600">{scores.overall}%</p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Technical</p>
              <p className="text-2xl font-bold text-gray-800">{scores.technical}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Communication</p>
              <p className="text-2xl font-bold text-gray-800">{scores.communication}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Problem Solving</p>
              <p className="text-2xl font-bold text-gray-800">{scores.problemSolving}%</p>
            </div>
          </div>

          {/* Strengths & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-3">💪 Strengths</h3>
              <ul className="space-y-2">
                {scores.strengths.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <h3 className="font-semibold text-yellow-800 mb-3">📈 Areas to Improve</h3>
              <ul className="space-y-2">
                {scores.gaps.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link 
              to="/dashboard"
              className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
            <Link 
              to="/setup"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              New Interview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;