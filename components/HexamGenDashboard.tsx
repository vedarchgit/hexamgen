import { useState } from 'react';
import { FiUpload, FiBook, FiFileText, FiCheckSquare, FiCalendar, FiDatabase, FiCopy, FiDownload, FiChevronDown, FiChevronUp } from 'react-icons/fi';

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
  
  // Loading states
  const [loading, setLoading] = useState<Record<string, boolean>>({
    topics: false,
    concepts: false,
    quiz: false,
    flashcards: false,
    studyPlan: false
  });
  
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

  // Handle API calls
  const callAPI = async (type: string) => {
    setLoading(prev => ({ ...prev, [type]: true }));
    
    try {
      if (!file) {
        alert('Please select a file to upload.');
        return;
      }
      if (!contentType) {
        alert('Please select a content type.');
        return;
      }

      switch (type) {
        case 'topics':
          const topicsFormData = new FormData();
          topicsFormData.append('file', file);
          topicsFormData.append('subject_code', contentType); // Using contentType as subject_code for now
          topicsFormData.append('exam_year', examDate ? new Date(examDate).getFullYear().toString() : '2025'); // Default to 2025 if no examDate

          const topicsResponse = await fetch('http://localhost:8000/api/v1/pyq/upload-pyq', {
            method: 'POST',
            body: topicsFormData,
          });

          if (!topicsResponse.ok) {
            const errorData = await topicsResponse.json();
            throw new Error(errorData.detail || 'Failed to upload content and extract topics.');
          }

          const topicsData = await topicsResponse.json();
          setTopicsOutput({ topics: topicsData.topics });
          break;
        case 'concepts':
          const conceptsFormData = new FormData();
          conceptsFormData.append('file', file);
          conceptsFormData.append('subject_code', contentType); // Using contentType as subject_code for now

          const conceptsResponse = await fetch('http://localhost:8000/api/v1/notes/analyze-concepts-gemini', {
            method: 'POST',
            body: conceptsFormData,
          });

          if (!conceptsResponse.ok) {
            const errorData = await conceptsResponse.json();
            throw new Error(errorData.detail || 'Failed to upload content and extract concepts.');
          }

          const conceptsData = await conceptsResponse.json();
          setConceptsOutput({ concepts: conceptsData.concepts });
          break;
      case 'quiz':
        // Existing logic for quiz
        setQuizOutput({ quiz: quizData.quiz });
        break;
      case 'flashcards':
        const flashcardsFormData = new FormData();
        flashcardsFormData.append('file', file);
        flashcardsFormData.append('subject_code', contentType); // Using contentType as subject_code for now

        const flashcardsResponse = await fetch('http://localhost:8000/api/v1/notes/generate-flashcards-gemini', {
          method: 'POST',
          body: flashcardsFormData,
        });

        if (!flashcardsResponse.ok) {
          const errorData = await flashcardsResponse.json();
          throw new Error(errorData.detail || 'Failed to upload content and generate flashcards.');
        }

        const flashcardsData = await flashcardsResponse.json();
        setFlashcardsOutput({ flashcards: flashcardsData.flashcards });
        break;
      case 'studyPlan':
        const studyPlanFormData = new FormData();
        studyPlanFormData.append('file', file);
        studyPlanFormData.append('subject_code', contentType); // Using contentType as subject_code for now
        studyPlanFormData.append('exam_date', examDate);

        const studyPlanResponse = await fetch('http://localhost:8000/api/v1/study-plan/generate-study-plan-gemini', {
          method: 'POST',
          body: studyPlanFormData,
        });

        if (!studyPlanResponse.ok) {
          const errorData = await studyPlanResponse.json();
          throw new Error(errorData.detail || 'Failed to upload content and generate study plan.');
        }

        const studyPlanData = await studyPlanResponse.json();
        setStudyPlanOutput({ study_plan: studyPlanData.study_plan });
        break;
        default:
          console.warn(`Unknown API type: ${type}`);
          break;
      }

    } catch (error: any) {
      console.error('API call failed:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
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

  // Format JSON for display
  const formatOutput = (output: any, type: string) => {
    if (!output) return null;
    
    switch(type) {
      case 'topics':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Questions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {output.topics.map((topic: any, idx: number) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">{topic.topic}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">{topic.frequency}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      <ul className="list-disc pl-5 space-y-1">
                        {topic.questions.slice(0, 2).map((q: string, i: number) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'concepts':
        return (
          <div className="space-y-3">
            {output.concepts.map((concept: any, idx: number) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-medium text-gray-900">{concept.concept}</div>
                <div className="text-gray-600 mt-1">{concept.definition}</div>
              </div>
            ))}
          </div>
        );
      
      case 'quiz':
        return (
          <div className="space-y-4">
            {output.quiz.map((q: any, idx: number) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-medium text-gray-900 mb-2">{q.question}</div>
                <div className="space-y-2">
                  {q.options.map((option: string, i: number) => (
                    <div 
                      key={i} 
                      className={`p-2 rounded ${option === q.answer ? 'bg-green-100 border border-green-500' : 'bg-white border border-gray-200'}`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-sm text-green-600 font-medium">
                  Correct Answer: {q.answer}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'flashcards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {output.flashcards.map((card: any, idx: number) => (
              <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="font-medium text-gray-900 mb-2">{card.front}</div>
                <div className="text-gray-600">{card.back}</div>
              </div>
            ))}
          </div>
        );
      
      case 'studyPlan':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topics</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {output.study_plan.map((day: any, idx: number) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">{day.date}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      <ul className="list-disc pl-5 space-y-1">
                        {day.topics.map((topic: string, i: number) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return (
          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
            {JSON.stringify(output, null, 2)}
          </pre>
        );
    }
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
                <div className="flex space-x-2">
                  {['PYQ', 'Notes', 'Slides'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setContentType(type as 'PYQ' | 'Notes' | 'Slides')}
                      className={`px-3 py-2 rounded-lg transition-colors text-sm ${contentType === type ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
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
                  onClick={() => contentType && callAPI('topics')}
                >
                  Process Content
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiDatabase className="mr-2 text-indigo-600" /> Database Schema
                </h2>
                <button 
                  onClick={() => setShowSchema(!showSchema)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  {showSchema ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              
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
                  onClick={() => callAPI('topics')}
                  disabled={!contentType || loading.topics}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center ${contentType && !loading.topics ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {loading.topics ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Run Prompt'}
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
                  {formatOutput(topicsOutput, 'topics')}
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
                  onClick={() => callAPI('concepts')}
                  disabled={!contentType || loading.concepts}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center ${contentType && !loading.concepts ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {loading.concepts ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Run Prompt'}
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
                  {formatOutput(conceptsOutput, 'concepts')}
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
                  onClick={() => callAPI('quiz')}
                  disabled={!contentType || loading.quiz}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center ${contentType && !loading.quiz ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {loading.quiz ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Run Prompt'}
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
                  {formatOutput(quizOutput, 'quiz')}
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
                  onClick={() => callAPI('flashcards')}
                  disabled={!contentType || loading.flashcards}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center ${contentType && !loading.flashcards ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {loading.flashcards ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Run Prompt'}
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
                  {formatOutput(flashcardsOutput, 'flashcards')}
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
                  onClick={() => callAPI('studyPlan')}
                  disabled={!contentType || !examDate || loading.studyPlan}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center ${contentType && examDate && !loading.studyPlan ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {loading.studyPlan ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Run Prompt'}
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
                  {formatOutput(studyPlanOutput, 'studyPlan')}
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