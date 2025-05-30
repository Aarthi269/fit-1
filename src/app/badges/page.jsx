'use client';

import { useEffect, useState } from 'react';

export default function BadgesPage() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await fetch('/api/badges');
        const data = await res.json();
        setBadges(data);
      } catch (error) {
        console.error('Error fetching badges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading badges...</p>;
  }

  return (
    <div className="p-4 m-5">
      <h1 className="text-2xl font-bold mb-6 text-center">Earnable Badges</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="border transition duration-500 hover:scale-105 rounded-xl shadow-md p-4 flex flex-col gap-2 justify-between bg-white"
          >
            <h2 className="text-lg font-semibold">{badge.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
            <p className="text-sm text-gray-600 italic">{badge.criteria}</p>
            <button className='bg-blue-500 text-white px-3 py-1 w-fit rounded-md cursor-pointer'>Get Badge</button>
          </div>
        ))}
      </div>
    </div>
  );
}
