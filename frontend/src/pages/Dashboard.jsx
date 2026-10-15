import { Link } from 'react-router-dom';
import { 
  FileText, 
  TrendingUp, 
  Award, 
  PlusCircle,
  Code,
  Coins,
  Briefcase,
  BarChart3,
  Clock
} from 'lucide-react';

function Dashboard() {
  const stats = {
    totalInterviews: 0,
    questionsSolved: 0,
    completed: 0,
    performance: 0
  };

  const features = [
    {
      title: 'Resume Builder',
      icon: <FileText className="w-6 h-6" />,
      description: 'Create and edit your professional resume',
      link: '/resume-builder',
      color: 'bg-blue-500'
    },
    {
      title: 'Resume Scorer',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Get AI-powered resume analysis',
      link: '/resume-scorer',
      color: 'bg-green-500'
    },
    {
      title: 'Roadmap Builder',
      icon: <Briefcase className="w-6 h-6" />,
      description: 'Generate your learning roadmap',
      link: '/roadmap',
      color: 'bg-purple-500'
    },
    {
      title: 'Interview Coins',
      icon: <Coins className="w-6 h-6" />,
      description: 'Manage your coins and subscriptions',
      link: '/coins',
      color: 'bg-yellow-500'
    }
  ];

  const recentInterviews = [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Welcome to your AI Interview Platform</p>
          </div>
          <Link 
            to="/setup"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Create Interview
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-500">Total Interviews</p>
            </div>
            <p className="text-3xl font-bold">{stats.totalInterviews}</p>
            <p className="text-xs text-gray-400 mt-1">All Time Interviews Created</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Code className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-500">Questions Solved</p>
            </div>
            <p className="text-3xl font-bold">{stats.questionsSolved}</p>
            <p className="text-xs text-gray-400 mt-1">Answered Across All Interviews</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <p className="text-3xl font-bold">{stats.completed}</p>
            <p className="text-xs text-gray-400 mt-1">Interviews Completed</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-sm text-gray-500">Performance</p>
            </div>
            <p className="text-3xl font-bold">{stats.performance}%</p>
            <p className="text-xs text-gray-400 mt-1">Average Score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition group"
            >
              <div className={feature.color + ' w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4'}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
              <span className="text-blue-600 text-sm font-medium mt-2 inline-block group-hover:translate-x-1 transition">
                Get Started →
              </span>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Interview History</h2>
            <Link to="/history" className="text-sm text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          
          {recentInterviews.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-3">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No interviews yet</p>
              <Link 
                to="/setup"
                className="inline-block mt-2 text-blue-600 hover:underline text-sm"
              >
                Create your first interview →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentInterviews.map((interview, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                  <div>
                    <p className="font-medium text-gray-800">{interview.role}</p>
                    <p className="text-sm text-gray-500">{interview.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={'px-3 py-1 rounded-full text-sm font-medium ' + (
                      interview.score >= 80 ? 'bg-green-100 text-green-700' :
                      interview.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    )}>
                      {interview.score}%
                    </span>
                    <Link 
                      to={'/report/' + interview.id}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Report
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;