import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, ArrowLeft, Award, AlertCircle, BarChart3, Download,
  CheckCircle
} from 'lucide-react';

function ResumeScorer() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [scoring, setScoring] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  const sampleScore = {
    overall: 78,
    sections: {
      content: 85,
      format: 75,
      skills: 82,
      experience: 70,
      education: 80
    },
    strengths: [
      'Strong technical skills section',
      'Clear project descriptions',
      'Good use of action verbs'
    ],
    improvements: [
      'Add more quantifiable achievements',
      'Improve formatting consistency',
      'Include a professional summary'
    ],
    suggestions: [
      'Use bullet points for better readability',
      'Add links to GitHub/LinkedIn',
      'Include a portfolio link'
    ]
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setTimeout(() => {
        setScoring(true);
        setTimeout(() => {
          setScoreResult(sampleScore);
          setScoring(false);
        }, 2000);
      }, 500);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Resume Scorer</h1>
                <p className="text-sm text-gray-500">Get AI-powered resume analysis</p>
              </div>
            </div>
          </div>
        </div>

        {!scoreResult && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div 
              className={`border-3 border-dashed rounded-2xl p-12 text-center transition ${
                file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <Upload className={`w-16 h-16 mx-auto mb-4 ${
                file ? 'text-green-500' : 'text-gray-400'
              }`} />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {file ? 'Resume Uploaded!' : 'Upload Your Resume'}
              </h3>
              <p className="text-gray-500 mb-4">
                {file ? file.name : 'Upload your PDF resume to get AI-powered scoring'}
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition"
              >
                {file ? 'Change File' : 'Choose PDF File'}
              </label>
            </div>

            {scoring && (
              <div className="mt-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Analyzing your resume...</p>
              </div>
            )}
          </div>
        )}

        {scoreResult && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <div className={`inline-block ${getScoreBg(scoreResult.overall)} p-6 rounded-full`}>
                  <Award className={`w-16 h-16 ${getScoreColor(scoreResult.overall)}`} />
                </div>
                <h2 className="text-4xl font-bold mt-4">
                  <span className={getScoreColor(scoreResult.overall)}>
                    {scoreResult.overall}%
                  </span>
                </h2>
                <p className="text-gray-500">Overall Resume Score</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Section-wise Analysis</h3>
              <div className="space-y-3">
                {Object.entries(scoreResult.sections).map(([section, score]) => (
                  <div key={section}>
                    <div className="flex justify-between text-sm">
                      <span className="capitalize text-gray-700">{section}</span>
                      <span className={`font-semibold ${getScoreColor(score)}`}>{score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${getScoreBg(score)} h-2 rounded-full transition-all`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {scoreResult.strengths.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-700 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {scoreResult.improvements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Expert Suggestions
              </h3>
              <ul className="space-y-2">
                {scoreResult.suggestions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setScoreResult(null)}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Score Another Resume
              </button>
              <button
                onClick={() => alert('Report downloaded!')}
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeScorer;