import React, { useState } from 'react';

const PYQAnalyzerDashboard = () => {
  // State for system components
  const [geminiEnabled, setGeminiEnabled] = useState(true);
  const [perplexityEnabled, setPerplexityEnabled] = useState(true);
  const [n8nConnected, setN8nConnected] = useState(true);
  
  // State for AI features
  const [difficultyPrediction, setDifficultyPrediction] = useState(true);
  const [explanationGeneration, setExplanationGeneration] = useState(true);
  const [questionGeneration, setQuestionGeneration] = useState(false);
  const [similaritySearch, setSimilaritySearch] = useState(true);
  
  // State for automation workflows
  const [autoIngestion, setAutoIngestion] = useState(true);
  const [scheduledSync, setScheduledSync] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  // Mock data for system status
  const systemStatus = [
    { name: 'FastAPI Backend', status: 'operational', lastUpdated: '2 mins ago' },
    { name: 'Gemini API', status: 'operational', lastUpdated: '5 mins ago' },
    { name: 'Perplexity API', status: 'operational', lastUpdated: '10 mins ago' },
    { name: 'Database', status: 'operational', lastUpdated: 'Just now' },
    { name: 'n8n Automation', status: 'operational', lastUpdated: '1 min ago' },
  ];
  
  // Mock data for recent activities
  const recentActivities = [
    { id: 1, action: 'PYQ analyzed', component: 'Gemini Service', time: '2 mins ago' },
    { id: 2, action: 'Context fetched', component: 'Perplexity Service', time: '5 mins ago' },
    { id: 3, action: 'Workflow triggered', component: 'n8n Automation', time: '10 mins ago' },
    { id: 4, action: 'New question generated', component: 'Gemini Service', time: '15 mins ago' },
  ];
  
  // Toggle functions
  const toggleGemini = () => setGeminiEnabled(!geminiEnabled);
  const togglePerplexity = () => setPerplexityEnabled(!perplexityEnabled);
  const toggleN8n = () => setN8nConnected(!n8nConnected);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">PYQ Analyzer Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your AI-powered PYQ analysis system</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - System Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Architecture Visualization */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">System Architecture</h2>
              
              <div className="flex flex-col items-center justify-center space-y-8 py-8">
                {/* Mobile App */}
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 border-2 border-purple-300 rounded-xl w-32 h-32 flex items-center justify-center shadow-md">
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                      <p className="mt-2 text-sm font-medium text-purple-800">Mobile App</p>
                      <p className="text-xs text-purple-600">Flutter</p>
                    </div>
                  </div>
                </div>
                
                {/* n8n Automation */}
                <div className="flex flex-col items-center">
                  <div className={`bg-${n8nConnected ? 'green' : 'red'}-100 border-2 border-${n8nConnected ? 'green' : 'red'}-300 rounded-xl w-32 h-32 flex items-center justify-center shadow-md`}>
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                      <p className="mt-2 text-sm font-medium text-gray-800">n8n Automation</p>
                      <p className="text-xs text-gray-600">Workflows</p>
                    </div>
                  </div>
                </div>
                
                {/* Arrows */}
                <div className="flex space-x-16">
                  <div className="w-16 h-1 bg-gray-300"></div>
                  <div className="w-16 h-1 bg-gray-300"></div>
                </div>
                
                {/* Backend and APIs */}
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 border-2 border-blue-300 rounded-xl w-48 h-48 flex items-center justify-center shadow-md relative">
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                      <p className="mt-2 text-sm font-medium text-blue-800">FastAPI Backend</p>
                      <p className="text-xs text-blue-600">Python/SQLAlchemy</p>
                      
                      {/* API Components */}
                      <div className="absolute -top-2 -right-2 bg-white rounded-lg shadow-md p-2 flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${geminiEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <p className="text-xs mt-1 text-gray-600">Gemini</p>
                      </div>
                      
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-lg shadow-md p-2 flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${perplexityEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <p className="text-xs mt-1 text-gray-600">Perplexity</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrows */}
                <div className="w-1 h-16 bg-gray-300"></div>
                
                {/* Database */}
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 border-2 border-green-300 rounded-xl w-32 h-32 flex items-center justify-center shadow-md">
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                      <p className="mt-2 text-sm font-medium text-green-800">Database</p>
                      <p className="text-xs text-green-600">SQLite</p>
                    </div>
                  </div>
                </div>
                
                {/* Arrows */}
                <div className="w-1 h-16 bg-gray-300"></div>
                
                {/* Web Frontend */}
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-100 border-2 border-indigo-300 rounded-xl w-32 h-32 flex items-center justify-center shadow-md">
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                      <p className="mt-2 text-sm font-medium text-indigo-800">Web Frontend</p>
                      <p className="text-xs text-indigo-600">Next.js</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.component}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Controls and Status */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">System Status</h2>
              <div className="space-y-4">
                {systemStatus.map((component, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{component.name}</p>
                      <p className="text-sm text-gray-500">{component.lastUpdated}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${component.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {component.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* AI Features */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Features</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Difficulty Prediction</p>
                    <p className="text-sm text-gray-600">Analyze PYQ complexity</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      checked={difficultyPrediction}
                      onChange={() => setDifficultyPrediction(!difficultyPrediction)}
                      className="sr-only" 
                      id="difficulty-toggle"
                    />
                    <label 
                      htmlFor="difficulty-toggle" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${difficultyPrediction ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${difficultyPrediction ? 'transform translate-x-4' : ''}`}></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Explanation Generation</p>
                    <p className="text-sm text-gray-600">Generate step-by-step solutions</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      checked={explanationGeneration}
                      onChange={() => setExplanationGeneration(!explanationGeneration)}
                      className="sr-only" 
                      id="explanation-toggle"
                    />
                    <label 
                      htmlFor="explanation-toggle" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${explanationGeneration ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${explanationGeneration ? 'transform translate-x-4' : ''}`}></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Question Generation</p>
                    <p className="text-sm text-gray-600">Create new practice questions</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      checked={questionGeneration}
                      onChange={() => setQuestionGeneration(!questionGeneration)}
                      className="sr-only" 
                      id="question-toggle"
                    />
                    <label 
                      htmlFor="question-toggle" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${questionGeneration ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${questionGeneration ? 'transform translate-x-4' : ''}`}></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Similarity Search</p>
                    <p className="text-sm text-gray-600">Find related questions</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      checked={similaritySearch}
                      onChange={() => setSimilaritySearch(!similaritySearch)}
                      className="sr-only" 
                      id="similarity-toggle"
                    />
                    <label 
                      htmlFor="similarity-toggle" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${similaritySearch ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${similaritySearch ? 'transform translate-x-4' : ''}`}></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Automation Workflows */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Automation Workflows</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Auto PYQ Ingestion</p>
                    <p className="text-sm text-gray-600">Process uploads automatically</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      checked={autoIngestion}
                      onChange={() => setAutoIngestion(!autoIngestion)}
                      className="sr-only" 
                      id="ingestion-toggle"
                    />
                    <label 
                      htmlFor="ingestion-toggle" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${autoIngestion ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${autoIngestion ? 'transform translate-x-4' : ''}`}></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Scheduled Sync</p>
                    <p className="text-sm text-gray-600">Regular data updates</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      checked={scheduledSync}
                      onChange={() => setScheduledSync(!scheduledSync)}
                      className="sr-only" 
                      id="sync-toggle"
                    />
                    <label 
                      htmlFor="sync-toggle" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${scheduledSync ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${scheduledSync ? 'transform translate-x-4' : ''}`}></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Notifications</p>
                    <p className="text-sm text-gray-600">Send system alerts</p>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                      className="sr-only" 
                      id="notifications-toggle"
                    />
                    <label 
                      htmlFor="notifications-toggle" 
                      className={`block h-6 w-10 rounded-full cursor-pointer ${notifications ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications ? 'transform translate-x-4' : ''}`}></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* System Controls */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">System Controls</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Gemini API</p>
                    <p className="text-sm text-gray-600">Question analysis</p>
                  </div>
                  <button 
                    onClick={toggleGemini}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${geminiEnabled ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                  >
                    {geminiEnabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Perplexity API</p>
                    <p className="text-sm text-gray-600">Context augmentation</p>
                  </div>
                  <button 
                    onClick={togglePerplexity}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${perplexityEnabled ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                  >
                    {perplexityEnabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">n8n Automation</p>
                    <p className="text-sm text-gray-600">Workflow orchestration</p>
                  </div>
                  <button 
                    onClick={toggleN8n}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${n8nConnected ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                  >
                    {n8nConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PYQAnalyzerDashboard;