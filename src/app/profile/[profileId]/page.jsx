"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default  function ProfilePage({ params }) {
  const { profileId } = params;
  const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleBack = () => router.push("/");

  useEffect(() => {
    async function getUserAndChallenges() {
      try {
        setError("");
        setUser(null);
        setChallenges([]);
        setLoading(true);

        const userRes = await fetch(`/api/auth/user/${profileId}`);
        if (!userRes.ok) {
          setError("User not found");
          setLoading(false);
          return;
        }
        const userData = await userRes.json();
        setUser(userData);

        if (userData.enrolledChallengeIds?.length > 0) {
          const challengePromises = userData.enrolledChallengeIds.map(async (challengeId) => {
            const res = await fetch(`/api/challenge/${challengeId}`);
            if (!res.ok) throw new Error(`Challenge ${challengeId} not found`);
            return res.json();
          });

          const challengesData = await Promise.all(challengePromises);
          setChallenges(challengesData);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (profileId) getUserAndChallenges();
  }, [profileId]);

  if (error)
    return (
      <section
        role="alert"
        className="p-6 max-w-4xl mx-auto mt-10 bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white rounded-lg shadow-lg"
      >
        <strong className="block text-xl mb-2">Error:</strong>
        {error}
      </section>
    );

  if (loading || !user)
    return (
      <section className="flex items-center justify-center min-h-screen bg-black text-white">
        <svg
          className="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <p className="text-xl font-semibold">Loading user profile...</p>
      </section>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans select-none px-6 py-10 w-full mx-auto">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-8 inline-flex items-center gap-2 text-white bg-gradient-to-r from-indigo-700 via-indigo-900 to-indigo-700 px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-opacity-90 transition-transform duration-300"
      >
        ← Back to Home
      </button>

      <div className="flex flex-col lg:flex-row gap-14">
        {/* Profile Sidebar */}
        <aside className="flex-shrink-0 w-full lg:w-96 bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-700">
          <h1 className="text-4xl font-extrabold mb-10 flex items-center gap-3 border-b border-indigo-600 pb-4">
            <span>🧑‍💼</span> Profile Info
          </h1>

          <div className="space-y-10">
            {/* Name */}
            <div className="flex items-center gap-5">
              <div className="text-indigo-400 text-3xl">👤</div>
              <div>
                <p className="uppercase text-xs tracking-widest text-gray-400">
                  Full Name
                </p>
                <p className="text-2xl font-semibold text-white">{user.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-5">
              <div className="text-indigo-400 text-3xl">📧</div>
              <div>
                <p className="uppercase text-xs tracking-widest text-gray-400">
                  Email Address
                </p>
                <p
                  className="text-lg font-medium text-white truncate"
                  title={user.email}
                >
                  {user.email}
                </p>
              </div>
            </div>

            {/* Age */}
            <div className="flex items-center gap-5">
              <div className="text-indigo-400 text-3xl">🎂</div>
              <div>
                <p className="uppercase text-xs tracking-widest text-gray-400">
                  Age
                </p>
                <p className="text-lg font-medium text-white">{user.age}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Challenges Section */}
        <section className="flex-1">
          <h2 className="flex items-center text-4xl font-bold border-b border-indigo-600 pb-4 mb-12 tracking-tight">
            <span className="mr-3">🏆</span> Enrolled Challenges
          </h2>

          {challenges.length === 0 ? (
            <p className="italic text-gray-500 text-lg max-w-xl">
              This user has not enrolled in any challenges yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {challenges.map((challenge) => (
                <article
                  key={challenge.id}
                  tabIndex={0}
                  aria-label={`Challenge: ${challenge.title}`}
                  className="relative group p-8 rounded-3xl bg-gradient-to-tr from-indigo-900 via-indigo-800 to-indigo-700 border border-indigo-600 shadow-xl transform transition-transform duration-300 hover:scale-[1.04] focus:scale-[1.04] focus:outline-none focus:ring-4 focus:ring-indigo-500"
                >
                  <header className="mb-5">
                    <h3 className="text-3xl font-extrabold text-white drop-shadow-md">
                      {challenge.title}
                    </h3>
                  </header>
                  <p className="text-indigo-200 mb-6 line-clamp-5 leading-relaxed">
                    {challenge.description}
                  </p>
                  <ul className="space-y-3 text-sm text-indigo-100">
                    <li>
                      <strong className="text-indigo-300">Duration:</strong>{" "}
                      {challenge.durationDays} days
                    </li>
                    <li>
                      <strong className="text-indigo-300">Type:</strong>{" "}
                      {challenge.type}
                    </li>
                    <li>
                      <strong className="text-indigo-300">Rules:</strong>{" "}
                      {challenge.rules}
                    </li>
                  </ul>

                  {/* subtle glowing effect on focus */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-3xl border-2 border-indigo-400 opacity-0 group-hover:opacity-40 group-focus:opacity-70 transition-opacity pointer-events-none"
                  />
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
