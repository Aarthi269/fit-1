'use client';

import { useRouter } from 'next/navigation';
import { createChallenge } from '../actions';
import { useState } from 'react';

export default function AddChallengePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.target);
    try {
      await createChallenge(formData);
      router.push('/challenges'); 
    } catch (error) {
      console.error('Failed to create challenge', error);
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-lg text-white flex flex-col gap-6"
      >
        <a
          href="/challenges"
          className="text-blue-400 hover:text-blue-600 mb-4 inline-block"
        >
          ← Back to Challenges
        </a>

        <h1 className="text-4xl font-extrabold mb-4 border-b border-gray-700 pb-3">
          Add New Challenge
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Challenge Title"
          required
          className="bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting}
        />

        <textarea
          name="description"
          placeholder="Challenge Description"
          required
          rows={4}
          className="bg-gray-800 border border-gray-700 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting}
        />

        <input
          type="number"
          name="durationDays"
          placeholder="Duration in Days"
          required
          className="bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting}
        />

        <input
          type="text"
          name="type"
          placeholder="Type (e.g., strength, cardio)"
          required
          className="bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting}
        />

        <textarea
          name="rules"
          placeholder="Rules (Markdown or plain text)"
          required
          rows={3}
          className="bg-gray-800 border border-gray-700 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={submitting}
        />

        <button
          type="submit"
          disabled={submitting}
          className={`bg-blue-600 hover:bg-blue-700 transition rounded-md py-3 font-semibold text-white ${
            submitting ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Creating...' : 'Create Challenge'}
        </button>
      </form>
    </div>
  );
}
