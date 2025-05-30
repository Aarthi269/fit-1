'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firestore.jsx';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'challenges'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      {/* Add Challenge button aligned to the right (inside flow) */}
      <div className="flex justify-end mb-6">
        <Link 
          href='/challenges/add' 
          className="bg-white text-black font-semibold px-5 py-2 rounded-full shadow hover:shadow-xl hover:scale-105 transition-transform"
        >
          + Add Challenge
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-3">
        All Challenges
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {challenges.map(challenge => (
          <div 
            key={challenge.id} 
            className="p-6 rounded-lg bg-gray-900 shadow-lg flex flex-col justify-between border border-gray-700 hover:border-white transition"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2">{challenge.title}</h2>
              <p className="text-gray-400 text-sm mb-2 line-clamp-3">{challenge.description}</p>
              <p className="text-gray-400 text-sm mb-1">Duration: {challenge.durationDays} days</p>
              <p className="text-gray-400 text-sm mb-1">Type: {challenge.type}</p>
              <p className="text-gray-400 text-sm">Public: {challenge.isPublic ? 'Yes' : 'No'}</p>
            </div>

            <Link
              href={`/challenges/${challenge.id}`}
              className="mt-4 px-5 py-2 bg-white text-black rounded-md font-semibold text-center hover:bg-gray-300 transition"
            >
              Show Challenge
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
