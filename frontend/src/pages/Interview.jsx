import { useState } from 'react';
import { Mic, Send, ArrowLeft } from 'lucide-react';

function Interview() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const questions = [
    'Explain the virtual DOM in React and how it improves performance.',
    'What is the difference between controlled and uncontrolled components?',
    'Explain the useEffect hook and its dependency array.',
  ];

  const handleSubmit = () => {
    // Submit answer and move to next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button className="text-gray-500 hover:text-gray-700 flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 rounded-full h-2 transition-all"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {questions[currentQuestion]}
            </h2>
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows="6"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`absolute bottom-4 right-4 p-3 rounded-full transition ${
                  isRecording ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Submit Answer <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;