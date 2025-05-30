'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firestore';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import LeaderboardToggle from './../../../components/LeaderboardToggle';

export default function ChallengeDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const challengeId = params?.challengeId;
  const router = useRouter();

  const [challenge, setChallenge] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeId) return;

      const docRef = doc(db, 'challenges', challengeId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setNotFound(true);
      } else {
        setChallenge(docSnap.data());
      }
    };

    fetchChallenge();
  }, [challengeId]);

  const handleAcceptChallenge = async () => {
    if (!session) {
      alert('You must be signed in to accept a challenge.');

      return;
    }

    const userId = session.user.id;

    try {
      const response = await fetch(`/api/auth/user/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Challenge accepted!');
        router.push(`/profile/${userId}`);
      } else {
        console.error('Error response:', result);
        alert(`Failed to accept challenge: ${result.error}`);
      }
    } catch (err) {
      console.error('Request failed:', err);
      alert('An error occurred while accepting the challenge.');
    }
  };

  if (notFound)
    return (
      <div className="p-6 text-center text-red-500 text-xl font-semibold">
        Challenge not found.
      </div>
    );

  if (!challenge)
    return (
      <div className="p-6 text-center text-white text-lg animate-pulse">
        Loading challenge details...
      </div>
    );

  const handleBack = () => router.push('/challenges');

  return (
    <div className="p-8 w-full mx-auto bg-black min-h-screen text-white">
      <div className="bg-neutral-900 p-8 rounded-xl shadow-xl ring-1 ring-white/10 space-y-6">
        <button
          onClick={handleBack}
          className="mt-6 inline-flex items-center gap-2 text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black px-5 py-2 rounded-full shadow-md hover:scale-105 hover:bg-opacity-80 transition-transform duration-300"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold tracking-tight">
          🧩 {challenge.title}
        </h1>
        <p className="text-gray-300 italic">{challenge.description}</p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <InfoCard
            label="📆 Duration"
            value={`${challenge.durationDays} days`}
          />
          <InfoCard label="📌 Type" value={challenge.type} />
          <InfoCard label="📜 Rules" value={challenge.rules} />
          <InfoCard
            label="🌐 Public"
            value={challenge.isPublic ? 'Yes' : 'No'}
          />
          <InfoCard label="🧑 Created By" value={challenge.creatorId} />
          <InfoCard
            label="🕒 Created At"
            value={challenge.createdAt?.toDate?.().toLocaleString?.() ?? 'N/A'}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleAcceptChallenge}
            className="bg-white text-black font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-200 transition duration-300"
          >
            ✅ Accept Challenge
          </button>

          <button
            onClick={() =>
              document
                .getElementById('leaderboard')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-transparent border border-white font-semibold text-white py-3 px-6 rounded-full hover:bg-white hover:text-black transition duration-300"
          >
            🏆 View Leaderboard
          </button>
        </div>
      </div>

      <div id="leaderboard" className="mt-12">
        <LeaderboardToggle />
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-gray-800/60 border border-white/10 p-4 rounded-xl shadow-md">
      <div className="text-sm text-gray-400 font-semibold">{label}</div>
      <div className="text-lg font-bold mt-1">{value}</div>
    </div>
  );
}
