import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Coins, ArrowLeft, CheckCircle,
  FileText, TrendingUp, Code, Briefcase
} from 'lucide-react';

function CoinSection() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '₹0',
      coins: 150,
      features: [
        '150 Interview Coins',
        'Resume Builder',
        'Resume Scorer',
        'Roadmap Generator'
      ],
      popular: false,
      color: 'gray'
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '₹199',
      coins: 300,
      features: [
        '300 Interview Coins',
        'Unlimited Resume Score',
        'Unlimited Roadmaps',
        'Priority AI Response'
      ],
      popular: true,
      color: 'blue'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₹499',
      coins: 750,
      features: [
        '750 Interview Coins',
        'Unlimited All Features',
        'Premium AI Responses',
        'Export Reports',
        'Dedicated Support'
      ],
      popular: false,
      color: 'purple'
    }
  ];

  const handleBuyPlan = (planId) => {
    setSelectedPlan(planId);
    alert('Redirecting to payment for ' + planId + ' plan...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
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
                <h1 className="text-2xl font-bold text-gray-800">Interview Coins</h1>
                <p className="text-sm text-gray-500">Use coins for AI features</p>
              </div>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-800">150</span>
              <span className="text-sm text-gray-500">Coins Available</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">What You Can Do with Coins</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Resume Builder</p>
              <p className="text-xs text-gray-500">20 coins</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Resume Scorer</p>
              <p className="text-xs text-gray-500">30 coins</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Code className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">AI Interview</p>
              <p className="text-xs text-gray-500">50 coins</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Briefcase className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Roadmap</p>
              <p className="text-xs text-gray-500">15 coins</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={'bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105 ' + (plan.popular ? 'border-2 border-blue-500' : '')}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center text-sm py-1">
                  ⭐ Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-sm text-gray-500">/lifetime</span>
                </div>
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  {plan.coins} Interview Coins
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleBuyPlan(plan.id)}
                  className={'mt-6 w-full py-2 rounded-lg transition ' + (
                    plan.id === 'free'
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : plan.id === 'starter'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  )}
                >
                  {plan.id === 'free' ? 'Claim Now' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoinSection;