import React, { useState, useEffect } from 'react';

const PYQAnalyzerDashboard = () => {
  // System components state
  const [geminiEnabled, setGeminiEnabled] = useState(true);
  const [perplexityEnabled, setPerplexityEnabled] = useState(true);
  const [n8nConnected, setN8nConnected] = useState(true);
  
  // AI features state
  const [difficultyPrediction, setDifficultyPrediction] = useState(true);
  const [explanationGeneration, setExplanationGeneration] = useState(true);
  const [questionGeneration, setQuestionGeneration] = useState(false);
  const [similaritySearch, setSimilaritySearch] = useState(true);
  
  // Automation workflows state
  const [autoIngestion, setAutoIngestion] = useState(true);
  const [scheduledSync, setScheduledSync] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  // System status
  const [systemStatus, setSystemStatus] = useState([
    { id: 1, name: 'FastAPI Backend', status: 'operational', lastUpdated: '2 mins ago' },
    { id: 2, name: 'Gemini API', status: 'operational', lastUpdated: '5 mins ago' },
    { id: 3, name: 'Perplexity API', status: 'operational', lastUpdated: '10 mins ago' },
    { id: 4, name: 'Database', status: 'operational', lastUpdated: 'Just now' },
    { id: 5, name: 'n8n Automation', status: 'operational', lastUpdated: '1 min ago' },
  ]);
  
  // Recent activities
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'PYQ analyzed', component: 'Gemini Service', time: '2 mins ago', status: 'success' },
    { id: 2, action: 'Context fetched', component: 'Perplexity Service', time: '5 mins ago', status: 'success' },
    { id: 3, action: 'Workflow triggered', component: 'n8n Automation', time: '10 mins ago', status: 'success' },
    { id: 4, action: 'New question generated', component: 'Gemini Service', time: '15 mins ago', status: 'success' },
  ]);
  
  // Loading states
  const [isToggling, setIsToggling] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Toggle functions
  const toggleGemini = async () => {
    setIsToggling(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setGeminiEnabled(!geminiEnabled);
      
      // Update system status
      setSystemStatus(prev => prev.map(item => 
        item.name === 'Gemini API' 
          ? { ...item, status: !geminiEnabled ? 'operational' : 'disabled', lastUpdated: 'Just now' } 
          : item
      ));
    } catch (error) {
      console.error('Failed to toggle Gemini:', error);
    } finally {
      setIsToggling(false);
    }
  };
  
  const togglePerplexity = async () => {
    setIsToggling(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPerplexityEnabled(!perplexityEnabled);
      
      setSystemStatus(prev => prev.map(item => 
        item.name === 'Perplexity API' 
          ? { ...item, status: !perplexityEnabled ? 'operational' : 'disabled', lastUpdated: 'Just now' } 
          : item
      ));
    } catch (error) {
      console.error('Failed to toggle Perplexity:', error);
    } finally {
      setIsToggling(false);
    }
  };
  
  const toggleN8n = async () => {
    setIsToggling(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setN8nConnected(!n8nConnected);
      
      setSystemStatus(prev => prev.map(item => 
        item.name === 'n8n Automation' 
          ? { ...item, status: !n8nConnected ? 'operational' : 'disabled', lastUpdated: 'Just now' } 
          : item
      ));
    } catch (error) {
      console.error('Failed to toggle n8n:', error);
    } finally {
      setIsToggling(false);
    }
  };
  
  // Sync with backend simulation
  const syncWithBackend = async () => {
    setIsSyncing(true);
    try {
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add new activity
      const newActivity = {
        id: recentActivities.length + 1,
        action: 'System synchronized',
        component: 'Backend Service',
        time: 'Just now',
        status: 'success'
      };
      
      setRecentActivities(prev => [newActivity, ...prev.slice(0, 3)]);
    } catch (error) {
      console.error('Failed to sync with backend:', error);
      
      // Add error activity
      const errorActivity = {
        id: recentActivities.length + 1,
        action: 'Sync failed',
        component: 'Backend Service',
        time: 'Just now',
        status: 'error'
      };
      
      setRecentActivities(prev => [errorActivity, ...prev.slice(0, 3)]);
    } finally {
      setIsSyncing(false);
    }
  };
  
  // Feature toggle functions
  const toggleFeature = (feature: string) => {
    switch(feature) {
      case 'difficulty':
        setDifficultyPrediction(!difficultyPrediction);
        break;
      case 'explanation':
        setExplanationGeneration(!explanationGeneration);
        break;
      case 'question':
        setQuestionGeneration(!questionGeneration);
        break;
      case 'similarity':
        setSimilaritySearch(!similaritySearch);
        break;
      case 'ingestion':
        setAutoIngestion(!autoIngestion);
        break;
      case 'sync':
        setScheduledSync(!scheduledSync);
        break;
      case 'notifications':
        setNotifications(!notifications);
        break;
    }
  };
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles = {
      operational: 'bg-green-100 text-green-800',
      disabled: 'bg-gray-100 text-gray-800',
      error: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.disabled}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">PYQ Analyzer Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your AI-powered PYQ analysis system</p>
            </div>
            <button 
              onClick={syncWithBackend}
              disabled={isSyncing}
              className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {isSyncing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Syncing...
                </>
              ) : 'Sync with Backend'}
            </button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - System Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Architecture Visualization */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">System Architecture</h2>
              
              <div className="flex flex-col items-center justify-center space-y-8 py-6">
                {/* Mobile App */}
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 border-2 border-purple-300 rounded-xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shadow-md">
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 mx-auto" />
                      <p className="mt-2 text-xs md:text-sm font-medium text-purple-800">Mobile App</p>
                      <p className="text-xs text-purple-600">Flutter</p>
                    </div>
                  </div>
                </div>
                
                {/* n8n Automation */}
                <div className="flex flex-col items-center">
                  <div className={`bg-${n8nConnected ? 'green' : 'red'}-100 border-2 border-${n8nConnected ? 'green' : 'red'}-300 rounded-xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shadow-md`}>
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 mx-auto" />
                      <p className="mt-2 text-xs md:text-sm font-medium text-gray-800">n8n Automation</p>
                      <p className="text-xs text-gray-600">Workflows</p>
                    </div>
                  </div>
                </div>
                
                {/* Arrows */}
                <div className="flex space-x-12 md:space-x-16">
                  <div className="w-12 md:w-16 h-1 bg-gray-300"></div>
                  <div className="w-12 md:w-16 h-1 bg-gray-300"></div>
                </div>
                
                {/* Backend and APIs */}
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 border-2 border-blue-300 rounded-xl w-36 h-36 md:w-48 md:h-48 flex items-center justify-center shadow-md relative">
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 mx-auto" />
                      <p className="mt-2 text-xs md:text-sm font-medium text-blue-800">FastAPI Backend</p>
                      <p className="text-xs text-blue-600">Python/SQLAlchemy</p>
                      
                      {/* API Components */}
                      <div className="absolute -top-2 -right-2 bg-white rounded-lg shadow-md p-2 flex flex-col items-center">
                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${geminiEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <p className="text-xs mt-1 text-gray-600">Gemini</p>
                      </div>
                      
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-lg shadow-md p-2 flex flex-col items-center">
                        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${perplexityEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <p className="text-xs mt-1 text-gray-600">Perplexity</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrows */}
                <div className="w-1 h-12 md:h-16 bg-gray-300"></div>
                
                {/* Database */}
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 border-2 border-green-300 rounded-xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shadow-md">
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 mx-auto" />
                      <p className="mt-2 text-xs md:text-sm font-medium text-green-800">Database</p>
                      <p className="text-xs text-green-600">SQLite</p>
                    </div>
                  </div>
                </div>
                
                {/* Arrows */}
                <div className="w-1 h-12 md:h-16 bg-gray-300"></div>
                
                {/* Web Frontend */}
                <div className="flex flex-col items-center">
                  <div className="bg-indigo-100 border-2 border-indigo-300 rounded-xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shadow-md">
                    <div className="text-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 mx-auto" />
                      <p className="mt-2 text-xs md:text-sm font-medium text-indigo-800">Web Frontend</p>
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
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="font-medium text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.component}</p>
                      </div>
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
                {systemStatus.map(component => (
                  <div key={component.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{component.name}</p>
                      <p className="text-sm text-gray-500">{component.lastUpdated}</p>
                    </div>
                    <StatusBadge status={component.status} />
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
                      onChange={() => toggleFeature('difficulty')}
                      className="sr-only" 
                      id="difficulty-toggle"
                      disabled={isToggling}
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
                      onChange={() => toggleFeature('explanation')}
                      className="sr-only" 
                      id="explanation-toggle"
                      disabled={isToggling}
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
                      onChange={() => toggleFeature('question')}
                      className="sr-only" 
                      id="question-toggle"
                      disabled={isToggling}
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
                      onChange={() => toggleFeature('similarity')}
                      className="sr-only" 
                      id="similarity-toggle"
                      disabled={isToggling}
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
                      onChange={() => toggleFeature('ingestion')}
                      className="sr-only" 
                      id="ingestion-toggle"
                      disabled={isToggling}
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
                      onChange={() => toggleFeature('sync')}
                      className="sr-only" 
                      id="sync-toggle"
                      disabled={isToggling}
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
                      onChange={() => toggleFeature('notifications')}
                      className="sr-only" 
                      id="notifications-toggle"
                      disabled={isToggling}
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
                    disabled={isToggling}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${geminiEnabled ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'} ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isToggling ? 'Processing...' : (geminiEnabled ? 'Disable' : 'Enable')}
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Perplexity API</p>
                    <p className="text-sm text-gray-600">Context augmentation</p>
                  </div>
                  <button 
                    onClick={togglePerplexity}
                    disabled={isToggling}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${perplexityEnabled ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'} ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isToggling ? 'Processing...' : (perplexityEnabled ? 'Disable' : 'Enable')}
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">n8n Automation</p>
                    <p className="text-sm text-gray-600">Workflow orchestration</p>
                  </div>
                  <button 
                    onClick={toggleN8n}
                    disabled={isToggling}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${n8nConnected ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'} ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isToggling ? 'Processing...' : (n8nConnected ? 'Disconnect' : 'Connect')}
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
