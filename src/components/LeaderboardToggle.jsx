'use client';

import { useState } from 'react';

export default function LeaderboardToggle() {
  const [isVisible, setIsVisible] = useState(false);

  const leaderboardData = [
    { name: 'Alice', score: 120 },
    { name: 'Bob', score: 110 },
    { name: 'Charlie', score: 95 },
    { name: 'Diana', score: 85 },
    { name: 'Ethan', score: 80 },
  ];

  const handleClick = () => setIsVisible(!isVisible);

  const maxScore = Math.max(...leaderboardData.map((u) => u.score));
  const maxBarWidth = 300;

  return (
    <div className="p-6 text-white min-h-[300px] rounded-lg max-w-xl mx-auto">
      <button
        onClick={handleClick}
        className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-full shadow hover:scale-105 transition-transform duration-300"
      >
        {isVisible ? 'Hide Leaderboard' : 'Show Leaderboard'}
      </button>

      {isVisible && (
        <div className="mt-8 bg-gray-800 border border-white/20 rounded-xl p-6 shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-center border-b border-white/10 pb-3">
            🏆 Leaderboard
          </h2>

          {leaderboardData.map((user, idx) => {
            const barWidth = (user.score / maxScore) * maxBarWidth;

            return (
              <div
                key={idx}
                className="bg-gray-900 border border-white/10 rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex justify-between mb-2 text-lg font-semibold">
                  <span>{user.name}</span>
                  <span>{user.score} pts</span>
                </div>
                <div className="bg-white/20 h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${barWidth}px` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
