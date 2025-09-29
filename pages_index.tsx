import { useState } from 'react';
import { FiUpload, FiBook, FiFileText, FiCheckSquare, FiCalendar, FiDatabase, FiCopy, FiDownload } from 'react-icons/fi';

const HexamGenDashboard = () => {
  // State for file upload
  const [file, setFile] = useState<File | null>(null);
  const [contentType, setContentType] = useState<'PYQ' | 'Notes' | 'Slides' | ''>('');
  const [examDate, setExamDate] = useState<string>('');

  // State for AI outputs
  const [topicsOutput, setTopicsOutput] = useState<any>(null);
  const [conceptsOutput, setConceptsOutput] = useState<any>(null);
  const [quizOutput, setQuizOutput] = useState<any>(null);
  const [flashcardsOutput, setFlashcardsOutput] = useState<any>(null);
  const [studyPlanOutput, setStudyPlanOutput] = useState<any>(null);

  // State for SQL schema
  const [showSchema, setShowSchema] = useState(false);

  // Mock data for demonstration
  const mockTopics = {
    topics: [
      { topic: "Deadlocks", frequency: 12, questions: ["Explain Deadlocks with example", "Deadlock prevention methods"] },
      { topic: "Paging", frequency: 6, questions: ["Define Paging", "Advantages of Paging"] },
      { topic: "OSI Model", frequency: 8, questions: ["Layers of OSI Model", "Functions of each layer"] }
    ]
  };

  const mockConcepts = {
    concepts: [
      { concept: "OSI Model", definition: "7-layer architecture for networking" },
      { concept: "TCP", definition: "Reliable transport layer protocol" },
      { concept: "Deadlock", definition: "A state where processes wait indefinitely for resources" }
    ]
  };

  const mockQuiz = {
    quiz: [
      { question: "What is the function of TCP?", options: ["Reliable transport", "Unreliable transport", "Data link layer protocol", "Application layer protocol"], answer: "Reliable transport" },
      { question: "Which layer does OSI Model start with?", options: ["Physical", "Transport", "Session", "Application"], answer: "Physical" }
    ]
  };

  const mockFlashcards = {
    flashcards: [
      { front: "Define TCP", back: "Reliable transport layer protocol" },
      { front: "What is Deadlock?", back: "A state where processes wait indefinitely for resources" },
      { front: "Layers in OSI Model", back: "7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application" }
    ]
  };

  const mockStudyPlan = {
    study_plan: [
      { date: "2025-09-29", topics: ["Deadlocks", "Paging"] },
      { date: "2025-09-30", topics: ["OSI Model", "TCP"] },
      { date: "2025-10-01", topics: ["Memory Management", "Process Scheduling"] }
    ]
  };

  // Simulate AI processing
  const simulateProcessing = (type: string) => {
    switch(type) {
      case 'topics':
        setTopicsOutput(mockTopics);
        break;
      case 'concepts':
        setConceptsOutput(mockConcepts);
        break;
      case 'quiz':
        setQuizOutput(mockQuiz);
        break;
      case 'flashcards':
        setFlashcardsOutput(mockFlashcards);
        break;
      case 'studyPlan':
        setStudyPlanOutput(mockStudyPlan);
        break;
      default:
        break;
    }
  };

  // Copy JSON to clipboard
  const copyToClipboard = (json: any) => {
    navigator.clipboard.writeText(JSON.stringify(json, null, 2));
  };

  // Download JSON as file
  const downloadJSON = (json: any, filename: string) => {
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">HexamGen AI Assistant</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Modular academic content analysis with topic extraction, quiz generation, and study planning
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Upload and Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiUpload className="mr-2 text-indigo-600" /> Upload Academic Content
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <div className="flex space-x-4">
                  {['PYQ', 'Notes', 'Slides'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setContentType(type as 'PYQ' | 'Notes' | 'Slides')}
                      className={`px-4 py-2 rounded-lg transition-colors ${contentType === type ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Date (Optional)</label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, DOC, TXT (MAX. 10MB)</p>
                    </div>
                    <input type="file" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                  </label>
                </div>
                {file && <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>}
              </div>

              <div className="flex justify-center mt-6">
                <button 
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
                  onClick={() => contentType && simulateProcessing('topics')}
                >
                  Process Content
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiDatabase className="mr-2 text-indigo-600" /> Database Schema
              </h2>
              <p className="text-gray-600 mb-4">MariaDB table schemas for HexamGen data storage</p>
              <button 
                onClick={() => setShowSchema(!showSchema)}
                className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                {showSchema ? 'Hide Schema' : 'Show Schema'}
              </button>

              {showSchema && (
                <div className="mt-4 bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
                  <pre>{`-- Topics table
CREATE TABLE topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(255),
  topic VARCHAR(255),
  frequency INT,
  questions JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Concepts table
CREATE TABLE concepts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(255),
  concept VARCHAR(255),
  definition TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quizzes table
CREATE TABLE quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(255),
  quiz JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Flashcards table
CREATE TABLE flashcards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(255),
  flashcards JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Study Plans table
CREATE TABLE study_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(255),
  exam_date DATE,
  study_plan JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - AI Prompts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Topics Extraction */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiBook className="mr-2 text-indigo-600" /> Topic Extraction
                </h2>
                <button 
                  onClick={() => simulateProcessing('topics')}
                  disabled={!contentType}
                  className={`px-4 py-2 rounded-lg font-medium ${contentType ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Run Prompt
                </button>
              </div>
              <p className="text-gray-600 mb-4">Extract topics and their frequencies from PYQs</p>

              {topicsOutput && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Output:</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => copyToClipboard(topicsOutput)}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center"
                      >
                        <FiCopy className="mr-1" /> Copy
                      </button>
                      <button 
                        onClick={() => downloadJSON(topicsOutput, 'topics.json')}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center"
                      >
                        <FiDownload className="mr-1" /> Download
                      </button>
                    </div>
                  </div>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {JSON.stringify(topicsOutput, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Concept Extraction */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiFileText className="mr-2 text-indigo-600" /> Concept Extraction
                </h2>
                <button 
                  onClick={() => simulateProcessing('concepts')}
                  disabled={!contentType}
                  className={`px-4 py-2 rounded-lg font-medium ${contentType ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Run Prompt
                </button>
              </div>
              <p className="text-gray-600 mb-4">Extract key concepts and definitions from notes/slides</p>

              {conceptsOutput && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Output:</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => copyToClipboard(conceptsOutput)}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center"
                      >
                        <FiCopy className="mr-1" /> Copy
                      </button>
                      <button 
                        onClick={() => downloadJSON(conceptsOutput, 'concepts.json')}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center"
                      >
                        <FiDownload className="mr-1" /> Download
                      </button>
                    </div>
                  </div>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {JSON.stringify(conceptsOutput, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Quiz Generation */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiCheckSquare className="mr-2 text-indigo-600" /> Quiz Generation
                </h2>
                <button 
                  onClick={() => simulateProcessing('quiz')}
                  disabled={!contentType}
                  className={`px-4 py-2 rounded-lg font-medium ${contentType ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Run Prompt
                </button>
              </div>
              <p className="text-gray-600 mb-4">Generate multiple-choice questions from topics/concepts</p>

              {quizOutput && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Output:</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => copyToClipboard(quizOutput)}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center"
                      >
                        <FiCopy className="mr-1" /> Copy
                      </button>
                      <button 
                        onClick={() => downloadJSON(quizOutput, 'quiz.json')}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center"
                      >
                        <FiDownload className="mr-1" /> Download
                      </button>
                    </div>
                  </div>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {JSON.stringify(quizOutput, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Flashcard Generation */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiCheckSquare className="mr-2 text-indigo-600" /> Flashcard Generation
                </h2>
                <button 
                  onClick={() => simulateProcessing('flashcards')}
                  disabled={!contentType}
                  className={`px-4 py-2 rounded-lg font-medium ${contentType ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Run Prompt
                </button>
              </div>
              <p className="text-gray-600 mb-4">Generate flashcards for quick revision</p>

              {flashcardsOutput && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Output:</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => copyToClipboard(flashcardsOutput)}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center"
                      >
                        <FiCopy className="mr-1" /> Copy
                      </button>
                      <button 
                        onClick={() => downloadJSON(flashcardsOutput, 'flashcards.json')}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center"
                      >
                        <FiDownload className="mr-1" /> Download
                      </button>
                    </div>
                  </div>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {JSON.stringify(flashcardsOutput, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Study Plan */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiCalendar className="mr-2 text-indigo-600" /> Study Plan Generator
                </h2>
                <button 
                  onClick={() => simulateProcessing('studyPlan')}
                  disabled={!contentType || !examDate}
                  className={`px-4 py-2 rounded-lg font-medium ${contentType && examDate ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Run Prompt
                </button>
              </div>
              <p className="text-gray-600 mb-4">Create a personalized study plan based on topics and exam date</p>

              {studyPlanOutput && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Output:</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => copyToClipboard(studyPlanOutput)}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center"
                      >
                        <FiCopy className="mr-1" /> Copy
                      </button>
                      <button 
                        onClick={() => downloadJSON(studyPlanOutput, 'study_plan.json')}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center"
                      >
                        <FiDownload className="mr-1" /> Download
                      </button>
                    </div>
                  </div>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {JSON.stringify(studyPlanOutput, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>HexamGen AI - Modular Academic Content Analysis System</p>
          <p className="mt-2">Each prompt can be called individually via API for integration with n8n workflows or FastAPI</p>
        </footer>
      </div>
    </div>
  );
};

export default HexamGenDashboard;
