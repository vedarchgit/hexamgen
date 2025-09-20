import React, { useState } from 'react';
import { uploadFile } from '../services/api';

const PYQUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setMessage('');
        setError('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first.');
            return;
        }

        try {
            setMessage('Uploading...');
            const response = await uploadFile('/pyq/upload', selectedFile);
            setMessage(`File uploaded successfully: ${response.filename}`);
            setError('');
            setSelectedFile(null); // Clear the selected file after successful upload
        } catch (err) {
            setError(`Upload failed: ${err.message}`);
            setMessage('');
            console.error('Upload error:', err);
        }
    };

    return (
        <div className="pyq-upload-container">
            <h2>Upload PYQ File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PYQUpload;
