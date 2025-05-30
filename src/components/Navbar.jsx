'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const goToProfile = () => {
    const id = session?.user?.id;
    if (id) {
      router.push(`/profile/${id}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide hover:text-blue-500 transition-colors duration-300"
        >
          FitnessApp
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {status === 'loading' ? (
            <span className="text-gray-400 italic">Loading...</span>
          ) : session?.user ? (
            <>
              <Link
                href="/challenges"
                className="relative inline-block text-lg font-semibold text-white px-6 py-2 rounded-full overflow-hidden group cursor-pointer
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400 before:to-purple-600 
                  before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100
                  active:scale-95 shadow-md transition-transform duration-300"
              >
                Challenges
              </Link>

              <button
                onClick={goToProfile}
                aria-label="Go to Profile"
                className="relative inline-flex items-center justify-center px-6 py-2 font-semibold rounded-full text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
                  shadow-lg hover:shadow-pink-400/50 transform transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                Profile
              </button>

              <button
                onClick={handleSignOut}
                aria-label="Sign Out"
                className="relative inline-flex items-center justify-center px-6 py-2 font-semibold rounded-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white
                  shadow-md hover:shadow-red-600/50 transform transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              aria-label="Sign In"
              className="relative inline-flex items-center justify-center px-7 py-2 font-semibold rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white
                shadow-lg hover:shadow-blue-500/60 transform transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          {status === 'loading' ? (
            <span className="text-gray-400 italic px-2">Loading...</span>
          ) : session?.user ? (
            <>
              <Link
                href="/challenges"
                className="block text-center px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Challenges
              </Link>
              <button
                onClick={() => {
                  goToProfile();
                  setIsMenuOpen(false);
                }}
                className="block text-center px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium"
              >
                Profile
              </button>
              <button
                onClick={handleSignOut}
                className="block text-center px-4 py-2 rounded-md bg-gradient-to-r from-red-600 to-red-800 text-white font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                signIn();
                setIsMenuOpen(false);
              }}
              className="block text-center px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
