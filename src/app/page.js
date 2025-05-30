'use client';

import React from 'react';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Welcome Back to <span className="text-green-400">FitQuest</span> 🏋️</h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto">
          Your journey to better health starts today. Track workouts, set goals, and fuel your body right!
        </p>
      </section>

      {/* Goals Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Weight Goal', value: '65 kg', icon: '⚖️' },
          { label: 'Calories Burned Today', value: '450 kcal', icon: '🔥' },
          { label: 'Water Intake', value: '2.5 L', icon: '💧' },
          { label: 'Sleep Duration', value: '7 hrs', icon: '🛌' }
        ].map((item, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-2">{item.icon}</div>
            <p className="text-xl font-semibold">{item.value}</p>
            <p className="text-gray-400">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Today's Workout Plan */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">💪 Today&quot;s Workout</h2>
        <div className="bg-gray-900 rounded-lg p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Morning Cardio', detail: '20 min run + jumping jacks' },
            { title: 'Strength Training', detail: 'Push-ups, squats, deadlifts' },
            { title: 'Evening Yoga', detail: '15 min breathing + stretch' }
          ].map((workout, index) => (
            <div key={index} className="p-5 bg-gray-800 rounded-xl shadow hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold text-green-400 mb-2">{workout.title}</h3>
              <p className="text-gray-300">{workout.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="mb-16 text-center">
        <blockquote className="italic text-gray-400 text-xl">
          &quot;Success doesn’t come from what you do occasionally, it comes from what you do consistently.&quot;
        </blockquote>
      </section>

      {/* Navigation Tiles */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Workouts', link: '/workouts', color: 'bg-green-500' },
          { title: 'Nutrition Plans', link: '/nutrition', color: 'bg-yellow-500' },
          { title: 'Progress Tracker', link: '/progress', color: 'bg-blue-500' },
          { title: 'Community Forum', link: '/community', color: 'bg-pink-500' },
        ].map((tile, index) => (
          <Link
            key={index}
            href={tile.link}
            className={`${tile.color} text-white font-bold text-center p-6 rounded-xl shadow hover:scale-105 transition-transform duration-300`}
          >
            {tile.title}
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
