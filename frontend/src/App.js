import React from 'react';
import './App.css';
import PYQUpload from './components/PYQUpload';
import QuizGenerator from './components/QuizGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>HexamGen Frontend (Test Mode)</h1>
      </header>
      <main>
        <div className="dashboard">
          <PYQUpload />
          <QuizGenerator />
        </div>
      </main>
    </div>
  );
}

export default App;
