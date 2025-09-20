import React, { useState } from 'react';
import { authenticatedRequest } from '../services/api';

const QuizGenerator = () => {
    const [title, setTitle] = useState('');
    const [pyqIds, setPyqIds] = useState('');
    const [quiz, setQuiz] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setQuiz(null);

        const idsArray = pyqIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

        if (!title || idsArray.length === 0) {
            setError('Please provide a quiz title and at least one valid PYQ ID.');
            return;
        }

        try {
            setMessage('Generating quiz...');
            const response = await authenticatedRequest('/quiz/', 'POST', { title, pyq_ids: idsArray });
            setQuiz(response);
            setMessage('Quiz generated successfully!');
        } catch (err) {
            setError(`Failed to generate quiz: ${err.message}`);
            console.error('Quiz generation error:', err);
        }
    };

    return (
        <div className="quiz-generator-container">
            <h2>Generate Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="quizTitle">Quiz Title:</label>
                    <input
                        type="text"
                        id="quizTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pyqIds">PYQ IDs (comma-separated):</label>
                    <input
                        type="text"
                        id="pyqIds"
                        value={pyqIds}
                        onChange={(e) => setPyqIds(e.target.value)}
                        placeholder="e.g., 1, 2, 3"
                        required
                    />
                </div>
                <button type="submit">Generate Quiz</button>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>

            {quiz && (
                <div className="generated-quiz">
                    <h3>{quiz.title}</h3>
                    {quiz.questions.map((q, index) => (
                        <div key={q.id || index} className="quiz-question">
                            <p><strong>{index + 1}. {q.question_text}</strong></p>
                            <ul>
                                {q.options.map(option => (
                                    <li key={option.id}>{option.id}. {option.option_text}</li>
                                ))}
                            </ul>
                            <p>Correct Answer: {q.correct_option_id}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuizGenerator;
