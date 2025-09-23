import React from 'react';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

// This is a server-side component that fetches note data.
async function getNoteData(noteId: string) {
  // In a real app, you would fetch this from your API.
  // const res = await fetch(`http://localhost:3000/api/notes/${noteId}`);
  // if (!res.ok) return undefined;
  // return res.json();
  
  // Placeholder data to simulate a fetched note.
  const placeholderNote = {
    id: noteId,
    title: 'Understanding Quantum Physics',
    content_md: `# Understanding Quantum Physics\n\nThis note explores the fundamental concepts of quantum mechanics.\n\n**Key Concepts:**\n\n- **Superposition:** A particle can exist in multiple states at once.\n- **Entanglement:** Two particles can be linked, and the state of one instantly affects the other, regardless of distance.\n\n---\n\n## Wave-Particle Duality\n\nLight and matter exhibit properties of both waves and particles. This duality is a cornerstone of quantum mechanics.\n\n![Wave-Particle Duality](https://via.placeholder.com/400x200.png?text=Wave-Particle+Duality)
\n`,
    tags: ['physics', 'quantum-mechanics', 'science'],
    created_at: new Date().toISOString(),
  };

  return placeholderNote;
}

const NotePage = async ({ params }: { params: { noteId: string } }) => {
  const { noteId } = params;
  const note = await getNoteData(noteId);

  if (!note) {
    notFound(); // Triggers a 404 Not Found page if the note doesn't exist.
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose dark:prose-invert lg:prose-xl max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{note.title}</h1>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{new Date(note.created_at).toLocaleDateString()}</span>
            <div className="mt-2">
              {note.tags.map(tag => (
                <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <ReactMarkdown
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          {note.content_md}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default NotePage;
