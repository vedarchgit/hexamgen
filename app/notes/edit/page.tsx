'use client';

import React, { useState } from 'react';
import SimpleMdeEditor from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";

const NoteEditorPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL.');
      }

      const { uploadUrl, downloadUrl } = await response.json();

      await fetch(uploadUrl, { // This is a PUT request to the signed URL
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        }
      });

      setAttachmentUrl(downloadUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/notes', { // Assuming a /api/notes endpoint for creation
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content_md: content,
          tags: tags.split(',').map(tag => tag.trim()),
          attachment_url: attachmentUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save the note.');
      }

      // Redirect or show a success message
      alert('Note saved successfully!');
      // router.push(`/notes/${(await response.json()).id}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Create a New Note</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
          <SimpleMdeEditor value={content} onChange={setContent} />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Attachment</label>
          <input type="file" id="attachment" onChange={handleFileChange} className="mt-1" />
          {attachmentUrl && <p className="text-sm text-green-600 mt-2">Attachment uploaded: <a href={attachmentUrl} target="_blank" rel="noopener noreferrer">{attachmentUrl}</a></p>}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Note'}
        </button>
      </form>
    </div>
  );
};

export default NoteEditorPage;
